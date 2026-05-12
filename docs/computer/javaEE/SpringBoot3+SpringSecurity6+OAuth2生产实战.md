# Spring Boot 3 + Spring Security 6 + OAuth2 生产实战：从协议原理到高并发认证架构落地

link: https://mp.weixin.qq.com/s/TLO1i3ecTC4Cj9I8OTVNYA

> 摘要：这不是一篇“能跑起来”的入门文章，而是一篇面向生产环境的认证授权实战手册。文章围绕 Spring Boot 3、Spring Security 6、Spring Authorization Server、OAuth2/OIDC、JWT、Redis、PostgreSQL、Gateway、Kubernetes 展开，重点回答四个问题：协议为什么这样设计、系统在高并发下如何稳定运行、代码如何达到生产级、架构如何从单体平滑演进到云原生。

#### 目录

1. 为什么要重做认证体系
2. OAuth2/OIDC 与 Spring Security 6 核心原理
3. 生产级认证中心总体架构
4. 领域建模与工程分层设计
5. 认证服务器生产级实现
6. 资源服务器与网关鉴权设计
7. 高并发与可扩展设计
8. 安全治理与常见生产问题
9. 云原生部署与可观测性
10. 完整落地建议与演进路线
11. 附录：联调与调用示例

### 1. 为什么要重做认证体系

#### 1.1 业务背景

假设我们服务的是一个互联网交易平台，典型特征如下：

+ 日活 500 万+
+ 峰值登录与鉴权流量 8,000 ~ 20,000 QPS
+ 终端同时覆盖 Web、App、小程序、开放平台
+ 内部已拆分为订单、用户、商品、营销、库存、支付等多个微服务
+ 部分接口开放给第三方 ISV 与合作伙伴

随着系统从单体走向分布式，原有“Session + 单应用登录”的模式会快速失效：

+ 多系统重复登录，无法实现统一 SSO
+ 微服务之间调用身份混乱，服务账号与用户身份混用
+ 认证逻辑散落在各个服务，安全策略无法统一
+ Token 生命周期、吊销、刷新缺少治理，导致安全风险和用户体验问题并存
+ 无法支撑多租户、细粒度授权、审计追踪、第三方开放接入

#### 1.2 为什么选择 Spring Authorization Server

在 Spring Boot 3 / Spring Security 6 体系下，企业新项目的主流选择通常有四类：

|方案|优势|劣势|适用场景|
|---|---|---|---|
|Spring Authorization Server|与 Spring 生态强集成、可高度定制、适合私有化|学习和实现成本较高|中大型企业、自建认证中心|
|Keycloak|功能完整、开箱即用、支持 SSO/Federation|运维和二次开发成本较高|需要快速落地 IAM 平台|
|Auth0 / Okta|SaaS 化、运维省心|成本与数据合规限制明显|海外业务或快速试点|
|自研简化 JWT 服务|上手快|风险极高，协议与安全细节容易踩坑|不建议用于正式生产|

本文选择：

+ Spring Boot 3.2.x
+ Spring Security 6.2.x
+ Spring Authorization Server 1.2.x
+ PostgreSQL / MySQL
+ Redis
+ Spring Cloud Gateway

#### 1.3 目标不是“登录成功”，而是“可持续治理”

一套真正可用的认证系统，目标不只是签发一个 JWT，而是要同时满足：

+ 安全性：最小权限、强认证、密钥轮换、吊销机制、审计闭环
+ 可用性：认证中心故障不拖垮核心交易链路
+ 扩展性：支持多终端、多租户、多客户端、多授权模型
+ 性能：高并发下鉴权链路低延迟、可水平扩展
+ 工程性：统一配置、统一日志、统一监控、统一灰度与回滚

### 2. OAuth2/OIDC 与 Spring Security 6 核心原理

#### 2.1 必须先澄清的角色边界

OAuth2 里最容易混淆的是几个核心角色：

+ Resource Owner：用户
+ Client：前端应用、移动端、第三方系统、内部服务
+ Authorization Server：认证授权中心，负责登录、同意授权、颁发 Token
+ Resource Server：业务服务，负责校验 Token 并保护资源
很多项目失败，不是框架不会用，而是边界设计错误：

+ 把网关当成认证中心
+ 把业务服务当成 Token 颁发者
+ 把用户 Token 和服务间 Token 混为一谈
+ 把“登录”与“授权”混为一个概念

#### 2.2 OAuth2 核心流程

面向用户终端的主流流程是 `Authorization Code + PKCE`：

```
1. 客户端将用户重定向到 Authorization Server
2. 用户在认证中心完成登录
3. 用户确认授权范围（scope）
4. Authorization Server 返回 authorization code
5. 客户端使用 code + code_verifier 交换 access token / refresh token
6. 客户端携带 access token 访问 Resource Server
7. Resource Server 验签并执行权限判定
```

为什么必须强调 PKCE：

+ 公共客户端无法安全保存 client_secret
+ 授权码在中间链路上可能被拦截
+ `code_challenge/code_verifier` 能降低授权码被盗用的风险

结论很明确：

+ Web SPA、App、小程序：优先 `Authorization Code + PKCE`
+ 服务间调用：优先 `Client Credentials`
+ 不再建议使用密码模式

#### 2.3 OIDC 解决的是“认证”，OAuth2 解决的是“授权”

OAuth2 本身并不定义用户身份标准，OIDC 在其之上补齐：

+ `id_token`：表示“用户是谁”
+ `userinfo endpoint`：获取标准用户信息
+ 标准 claims：`sub`、`name`、`email`、`preferred_username`

如果你的系统需要 SSO、统一用户中心、第三方登录对接，通常应该启用 OIDC，而不是只停留在 OAuth2。

#### 2.4 JWT 不是越大越好

JWT 常见结构如下：

```json
{
  "iss": "https://auth.example.com",
  "sub": "u_10001",
  "aud": ["order-service"],
  "exp": 1711609200,
  "iat": 1711605600,
  "jti": "01HTXYZ...",
  "scope": ["order.read", "order.write"],
  "roles": ["ROLE_USER"],
  "tenant_id": "t_001"
}
```

生产环境设计 JWT 时有三个常见误区：

+ 把用户完整资料塞进 Token，导致头部过大、泄露面扩大
+ 把动态权限全部塞进 Token，导致权限变更无法及时生效
+ 把敏感信息写进 claims，例如手机号、证件号、银行卡后四位

推荐原则：

+ Token 只放鉴权必要字段
+ 动态权限尽量走缓存或授权中心查询
+ 使用 jti 支撑黑名单、审计和幂等控制

#### 2.5 Spring Security 6 的关键变化

Spring Security 6 最大的变化不是语法，而是配置模型与责任拆分更清晰：

+ `SecurityFilterChain` 替代 `WebSecurityConfigurerAdapter`
+ `Method Security` 使用 `@EnableMethodSecurity`
+ `Resource Server`、`Authorization Server` 各自职责更清晰
+ 默认更偏向组合式配置，方便多链路、多入口分治

理解它的最佳方式不是记 API，而是理解 `Filter Chain`：

```
请求进入容器
-> 进入匹配到的 SecurityFilterChain
-> 完成身份认证 Authentication
-> 构造安全上下文 SecurityContext
-> 执行授权决策 AuthorizationManager
-> 通过后进入 Controller / Service
```

也就是说，Spring Security 的本质不是“注解鉴权”，而是“一条可编排的认证与授权责任链”。

### 3. 生产级认证中心总体架构

#### 3.1 总体架构图

```
                              ┌─────────────────────┐
                               │    Web / App / ISV  │
                               └──────────┬──────────┘
                                          │
                                 OAuth2 / OIDC
                                          │
                               ┌──────────▼──────────┐
                               │ Spring Cloud Gateway│
                               │   统一入口与预鉴权   │
                               └──────────┬──────────┘
                                          │
               ┌──────────────────────────┼──────────────────────────┐
               │                          │                          │
      ┌────────▼────────┐        ┌────────▼────────┐        ┌────────▼────────┐
      │  Order Service  │        │  User Service   │        │ Product Service │
      │ Resource Server │        │ Resource Server │        │ Resource Server │
      └────────┬────────┘        └────────┬────────┘        └────────┬────────┘
               │                          │                          │
               └──────────────────────────┼──────────────────────────┘
                                          │
                               ┌──────────▼──────────┐
                               │ Authorization Server│
                               │ 登录/授权/发 Token   │
                               └───────┬───────┬─────┘
                                       │       │
                             ┌─────────▼─┐   ┌─▼─────────┐
                             │ PostgreSQL│   │   Redis   │
                             │ 持久化存储 │   │ 缓存/黑名单│
                             └───────────┘   └───────────┘
```

#### 3.2 关键设计原则

这套架构成立的前提，不是组件堆砌，而是以下原则：

1. 认证中心独立部署，不与业务服务耦合。
2. 资源服务器本地验签，避免所有请求都回源认证中心。
3. 网关做“统一入口控制”，业务服务做“最终权限决策”。
4. 短期 Access Token + 可控 Refresh Token + 黑名单机制组合使用。
5. 密钥、客户端、用户、审计日志分别治理，不混在一个表或一个模块里。

#### 3.3 认证链路与业务链路解耦

很多系统把认证中心设计成同步强依赖，结果一旦认证中心抖动，业务接口全部雪崩。

正确做法：

+ Token 验签使用 JWKS 公钥本地校验
+ 资源服务器对 JWKS 做本地缓存
+ 只有少量场景才使用 introspection 或回源检查
+ 吊销状态通过 Redis 黑名单、事件广播或短 Token 机制兜底

这样认证中心的主要职责回归为：

+ 登录与多因素认证
+ 客户端管理
+ Token 颁发与刷新
+ 授权记录管理
+ 用户会话治理

而不是每次业务请求都参与实时校验。

#### 3.4 典型模块拆分

建议按职责拆成以下模块：

```
auth-platform/
├── auth-server                    # Authorization Server
├── auth-core                      # 公共领域模型、错误码、工具类
├── auth-client-sdk                # 业务服务公共鉴权封装
├── auth-admin-api                 # 客户端管理、密钥轮换、黑名单管理
├── gateway-plugin                 # 网关预鉴权与透传规范
└── docs                           # 鉴权协议、联调文档、运维手册
```

好处有两个：

+ 避免把所有安全代码塞到一个 `config` 包里
+ 便于多团队协作和版本化治理

### 4. 领域建模与工程分层设计

#### 4.1 核心实体

生产项目里，认证系统至少需要这些领域对象：

+ `UserAccount`：用户账号
+ `RegisteredOAuthClient`：OAuth2 客户端
+ `AuthorizationGrantRecord`：授权记录
+ `LoginSession`：登录会话
+ `TokenBlacklistRecord`：Token 黑名单
+ `JwkKeyMetadata`：密钥元数据
+ `AuditEvent`：安全审计事件

#### 4.2 分层建议

推荐分层：

```
controller
application
domain
infrastructure
```

职责如下：

+ `controller`：处理 HTTP 请求与响应模型
+ `application`：编排登录、授权、吊销、黑名单、会话管理
+ `domain`：放核心规则，例如 Token 生命周期、租户隔离规则
+ `infrastructure`：JPA/MyBatis、Redis、消息、邮件、短信、外部 IDP 接入

#### 4.3 数据模型建议

以下是比“只建三张 OAuth2 官方表”更接近生产的建模方式。

##### 4.3.1 客户端表

```sql
CREATE TABLE oauth_client (
    id                BIGSERIAL PRIMARY KEY,
    client_id         VARCHAR(64)  NOT NULL UNIQUE,
    client_secret     VARCHAR(255),
    client_name       VARCHAR(128) NOT NULL,
    client_type       VARCHAR(32)  NOT NULL,
    grant_types       VARCHAR(512) NOT NULL,
    scopes            VARCHAR(1024) NOT NULL,
    redirect_uris     TEXT,
    post_logout_uris  TEXT,
    access_ttl_sec    INTEGER      NOT NULL,
    refresh_ttl_sec   INTEGER      NOT NULL,
    require_pkce      BOOLEAN      NOT NULL DEFAULT TRUE,
    require_consent   BOOLEAN      NOT NULL DEFAULT TRUE,
    tenant_id         VARCHAR(64),
    status            VARCHAR(16)  NOT NULL,
    created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

##### 4.3.2 黑名单表

```sql
CREATE TABLE oauth_token_blacklist (
    id              BIGSERIAL PRIMARY KEY,
    token_jti       VARCHAR(64)  NOT NULL UNIQUE,
    token_type      VARCHAR(16)  NOT NULL,
    subject         VARCHAR(128) NOT NULL,
    client_id       VARCHAR(64)  NOT NULL,
    expires_at      TIMESTAMP    NOT NULL,
    reason          VARCHAR(128),
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_oauth_blacklist_expire ON oauth_token_blacklist (expires_at);
```

##### 4.3.3 审计事件表

```sql
CREATE TABLE auth_audit_event (
    id               BIGSERIAL PRIMARY KEY,
    trace_id         VARCHAR(64),
    event_type       VARCHAR(64)  NOT NULL,
    subject          VARCHAR(128),
    client_id        VARCHAR(64),
    tenant_id        VARCHAR(64),
    ip               VARCHAR(64),
    user_agent       VARCHAR(512),
    result           VARCHAR(16)  NOT NULL,
    error_code       VARCHAR(64),
    event_time       TIMESTAMP    NOT NULL,
    details          JSONB
);
```

这三类表非常关键，因为正式生产运维最常见的问题往往不是“发不出 Token”，而是：

+ 某个客户端被泄露后如何快速禁用
+ 某个用户投诉账号异常登录如何审计
+ 某个 Refresh Token 被重复使用后如何定位风险

### 5. 认证服务器生产级实现

本节给出的是“生产思路型代码”，重点体现职责和设计要点，而不是最短 demo。

#### 5.1 Maven 依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-authorization-server</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>

    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-registry-prometheus</artifactId>
    </dependency>
</dependencies>
```

#### 5.2 安全配置分三条链，而不是一锅炖

这是 Spring Security 6 非常适合生产的一个点：不同入口走不同链。

```java
package com.example.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    SecurityFilterChain authorizationServerChain(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
            .oidc(Customizer.withDefaults());

        http.exceptionHandling(ex -> ex.defaultAuthenticationEntryPointFor(
            new LoginUrlAuthenticationEntryPoint("/login"),
            new MediaTypeRequestMatcher(org.springframework.http.MediaType.TEXT_HTML)
        ));

        return http.build();
    }

    @Bean
    @Order(2)
    SecurityFilterChain actuatorChain(HttpSecurity http) throws Exception {
        http.securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health", "/actuator/prometheus").permitAll()
                .anyRequest().hasRole("OPS"))
            .csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    @Order(3)
    SecurityFilterChain appChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/error").permitAll()
                .anyRequest().authenticated())
            .formLogin(Customizer.withDefaults());
        return http.build();
    }
}
```

为什么必须拆多条链：

+ `/oauth2/**`、`/.well-known/**` 与业务接口的安全需求不同
+ `actuator` 端点不应与普通用户认证混用
+ 登录页与授权页应支持浏览器重定向语义

#### 5.3 客户端仓库不要只用内存

演示项目喜欢 `InMemoryRegisteredClientRepository`，但生产里应至少支持数据库持久化与动态管理。

```java
package com.example.auth.config;

import java.time.Duration;
import java.util.UUID;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;

@Configuration
public class ClientRepositoryConfig {

    @Bean
    RegisteredClientRepository registeredClientRepository(
        JdbcTemplate jdbcTemplate,
        PasswordEncoder passwordEncoder
    ) {
        JdbcRegisteredClientRepository repository = new JdbcRegisteredClientRepository(jdbcTemplate);

        if (repository.findByClientId("web-bff") == null) {
            RegisteredClient webBff = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("web-bff")
                .clientSecret(passwordEncoder.encode("change-me-in-vault"))
                .clientName("Web BFF Client")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("https://bff.example.com/login/oauth2/code/web-bff")
                .postLogoutRedirectUri("https://portal.example.com/logout/callback")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("order.read")
                .scope("order.write")
                .clientSettings(ClientSettings.builder()
                    .requireProofKey(true)
                    .requireAuthorizationConsent(true)
                    .build())
                .tokenSettings(TokenSettings.builder()
                    .accessTokenTimeToLive(Duration.ofMinutes(15))
                    .refreshTokenTimeToLive(Duration.ofDays(7))
                    .reuseRefreshTokens(false)
                    .build())
                .build();
            repository.save(webBff);
        }

        if (repository.findByClientId("internal-order-service") == null) {
            RegisteredClient internal = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("internal-order-service")
                .clientSecret(passwordEncoder.encode("rotate-me"))
                .clientName("Order Internal Client")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .scope("internal.read")
                .scope("inventory.reserve")
                .clientSettings(ClientSettings.builder()
                    .requireAuthorizationConsent(false)
                    .build())
                .tokenSettings(TokenSettings.builder()
                    .accessTokenTimeToLive(Duration.ofMinutes(5))
                    .build())
                .build();
            repository.save(internal);
        }

        return repository;
    }
}
```

这里体现了两个生产原则：

+ 面向用户的客户端与服务间客户端要分开治理
+ 不同客户端应配置不同 Token TTL，而不是一刀切

#### 5.4 JWK 与密钥轮换设计

很多教程会在应用启动时动态生成 RSA 密钥，这在生产环境几乎不可接受，因为应用重启就会导致旧 Token 无法验证。

正确设计：

+ 私钥从 KMS、Vault 或受控密钥文件加载
+ 公钥通过 JWKS 暴露
+ 使用 `kid` 支撑多把密钥并行轮换
+ 新旧密钥重叠一段时间，确保旧 Token 平滑过期

```java
package com.example.auth.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwkConfig {

    @Bean
    JWKSource<SecurityContext> jwkSource(KeyMaterialLoader keyMaterialLoader) {
        RSAPublicKey publicKey = keyMaterialLoader.loadPublicKey();
        RSAPrivateKey privateKey = keyMaterialLoader.loadPrivateKey();

        RSAKey rsaKey = new RSAKey.Builder(publicKey)
            .privateKey(privateKey)
            .keyID(keyMaterialLoader.currentKid())
            .build();

        return new ImmutableJWKSet<>(new JWKSet(rsaKey));
    }
}
```

对应的 `KeyMaterialLoader` 建议从以下来源读取：

+ Kubernetes Secret 挂载文件
+ HashiCorp Vault
+ 云厂商 KMS/HSM

#### 5.5 自定义 JWT Claims：只放必要信息

```java
package com.example.auth.token;

import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.stereotype.Component;

@Component
public class JwtClaimCustomizer implements OAuth2TokenCustomizer<JwtEncodingContext> {

    @Override
    public void customize(JwtEncodingContext context) {
        Authentication principal = context.getPrincipal();

        if ("access_token".equals(context.getTokenType().getValue()) && principal != null) {
            Set<String> roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

            context.getClaims().claim("roles", roles);
            context.getClaims().claim("tenant_id", resolveTenantId(principal));
            context.getClaims().claim("login_type", resolveLoginType(context));
        }
    }

    private String resolveTenantId(Authentication principal) {
        return "t_default";
    }

    private String resolveLoginType(JwtEncodingContext context) {
        AuthorizationGrantType grantType = context.getAuthorizationGrantType();
        if (AuthorizationGrantType.CLIENT_CREDENTIALS.equals(grantType)) {
            return "service";
        }
        return "user";
    }
}
```

这里特意避免了原始文章中常见的几个问题：

+ 不用 `==` 比较授权类型
+ 不把完整用户资料塞进 Token
+ 仅在 `access_token` 中增加面向资源服务器的 `claims`

#### 5.6 登录增强：风控、审计、设备信息

正式生产里，用户名密码校验只是第一层，建议在认证成功/失败时同时落审计事件。

```java
package com.example.auth.audit;

import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationAuditListener {

    private final AuditEventService auditEventService;

    @EventListener
    public void onSuccess(AuthenticationSuccessEvent event) {
        auditEventService.record(AuditEventCommand.builder()
            .eventType("LOGIN_SUCCESS")
            .subject(event.getAuthentication().getName())
            .eventTime(Instant.now())
            .result("SUCCESS")
            .build());
    }

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent event) {
        auditEventService.record(AuditEventCommand.builder()
            .eventType("LOGIN_FAILURE")
            .subject(String.valueOf(event.getAuthentication().getPrincipal()))
            .eventTime(Instant.now())
            .result("FAIL")
            .errorCode(event.getException().getClass().getSimpleName())
            .build());
    }
}
```

如果是高安全业务，还应接入：

+ 异地登录识别
+ 设备指纹
+ 图形验证码/滑块
+ MFA（二次验证）
+ 登录失败阈值限制

#### 5.7 Refresh Token 并发刷新控制

线上非常高频的问题是：同一用户多端并发刷新，导致一次刷新颁发多个新 Token。

解决策略：

1. `reuseRefreshTokens(false)`，旧 Refresh Token 用一次即失效。
2. 刷新时对 `refresh_token:jti` 加分布式锁。
3. 为刷新动作增加幂等窗口，避免重复颁发。

核心思路示例：

```java
package com.example.auth.token;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenGuardService {

    private final StringRedisTemplate redisTemplate;

    public boolean tryAcquire(String refreshTokenJti) {
        String key = "auth:refresh-lock:" + refreshTokenJti;
        Boolean success = redisTemplate.opsForValue()
            .setIfAbsent(key, "1", Duration.ofSeconds(5));
        return Boolean.TRUE.equals(success);
    }

    public void release(String refreshTokenJti) {
        redisTemplate.delete("auth:refresh-lock:" + refreshTokenJti);
    }
}
```

#### 5.8 令牌吊销与黑名单

JWT 的最大优势是无状态，但无状态不等于不可治理。

一个常见可落地的方案是：

+ Access Token 短期有效，例如 5~15 分钟
+ Refresh Token 存储于服务端授权表
+ 用户退出、密码修改、管理员封禁时，将 Access Token 的 `jti` 放入 Redis 黑名单
+ 黑名单 TTL 与 Token 剩余生命周期对齐

```java
package com.example.auth.token;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenBlacklistService {

    private final StringRedisTemplate redisTemplate;

    public void blacklist(String jti, Duration ttl) {
        redisTemplate.opsForValue().set(buildKey(jti), "1", ttl);
    }

    public boolean isBlacklisted(String jti) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(buildKey(jti)));
    }

    private String buildKey(String jti) {
        return "auth:blacklist:" + jti;
    }
}
```

这不是绝对强一致方案，但在“短 Access Token + 本地验签”的架构下，是性能与安全的平衡点。

### 6. 资源服务器与网关鉴权设计

#### 6.1 资源服务器应本地验签

业务服务不要每次请求都调用认证中心验 Token，否则认证中心会成为全站瓶颈。

资源服务器典型配置：

```java
package com.example.resource.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class ResourceServerConfig {

    @Bean
    SecurityFilterChain resourceServerSecurity(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/api/orders/**").hasAuthority("SCOPE_order.read")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())))
            .csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
    Converter<Jwt, ? extends AbstractAuthenticationToken> jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new CustomJwtGrantedAuthoritiesConverter());
        return converter;
    }
}
```

自定义 claims 与权限映射：

```java
package com.example.resource.config;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

public class CustomJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Set<GrantedAuthority> authorities = new HashSet<>();

        List<String> scopes = jwt.getClaimAsStringList("scope");
        if (scopes != null) {
            scopes.forEach(scope -> authorities.add(new SimpleGrantedAuthority("SCOPE_" + scope)));
        }

        List<String> roles = jwt.getClaimAsStringList("roles");
        if (roles != null) {
            roles.forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
        }

        return authorities;
    }
}
```

#### 6.2 方法级授权才是业务最终边界

网关只能做粗粒度控制，真正的业务授权仍应下沉到服务自身。

```java
package com.example.order.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    @GetMapping("/api/orders/{orderId}")
    @PreAuthorize("hasAuthority('SCOPE_order.read') and @tenantPermissionEvaluator.canAccessOrder(authentication, #orderId)")
    public String detail(@PathVariable Long orderId) {
        return "order-" + orderId;
    }
}
```

生产经验里，一个很重要的原则是：

+ 网关负责认证与基础限流
+ 服务负责领域权限和数据权限

不要试图把所有权限逻辑都堆在网关上。

#### 6.3 Gateway 做预鉴权，但不替代业务授权

Spring Cloud Gateway 可做：

+ 白名单路径放行
+ JWT 基础解析
+ Header 标准化透传，例如 `X-User-Id`、`X-Tenant-Id`
+ 请求级限流
+ 黑名单预检查

示意过滤器：

```java
package com.example.gateway.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtRelayFilter implements GlobalFilter, Ordered {

    private final ReactiveJwtDecoder jwtDecoder;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String auth = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (auth == null || !auth.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = auth.substring(7);
        return jwtDecoder.decode(token)
            .flatMap(jwt -> chain.filter(mutate(exchange, jwt)));
    }

    private ServerWebExchange mutate(ServerWebExchange exchange, Jwt jwt) {
        return exchange.mutate().request(builder -> builder
            .header("X-User-Id", jwt.getSubject())
            .header("X-Tenant-Id", String.valueOf(jwt.getClaim("tenant_id"))))
            .build();
    }

    @Override
    public int getOrder() {
        return -100;
    }
}
```

注意：

+ 网关透传的 Header 只能作为辅助信息
+ 业务服务仍需自行验证 Token 与权限，不能完全信任网关头

### 7. 高并发与可扩展设计

这一节是本文的重点。多数文章讲到“鉴权”就结束了，但生产里真正的挑战恰恰发生在高并发与扩展阶段。

#### 7.1 认证中心的性能瓶颈在哪里

认证系统的热点通常不在“签名”本身，而在以下几个环节：

+ 用户登录时的密码校验
+ 授权码换 Token 过程中的客户端与授权记录查询
+ Refresh Token 刷新并发竞争
+ 黑名单检查
+ 审计日志写入
+ 公钥拉取与缓存失效

#### 7.2 高并发设计要点

##### 7.2.1 密码校验是 CPU 热点

`BCrypt` 故意设计得比较慢，这是安全需要。但在登录洪峰时，CPU 会迅速拉高。

建议：

+ 登录接口独立线程池或独立 Pod 伸缩
+ 根据安全等级选择合适的成本因子
+ 对恶意登录做 IP、设备、账号维度限流

##### 7.2.2 Access Token 走本地验签

这是性能提升最大的手段之一。一次本地公钥验签通常远快于一次远程 introspection。

经验规则：

+ 高频业务接口优先 JWT 本地校验
+ 极高安全接口再叠加黑名单或回源检查
+ 不要默认所有请求走 introspection

##### 7.2.3 黑名单放 Redis，且只存必要窗口

黑名单如果全量落数据库并实时查询，很快就会成为瓶颈。

推荐方案：

+ Redis 做热黑名单
+ 只存未过期 Token 的 jti
+ 定时任务清理数据库归档记录

##### 7.2.4 审计异步化

审计日志不能影响主链路延迟。

建议：

+ 登录成功/失败、授权成功、吊销、异常访问等事件先写消息队列或异步缓冲
+ 再异步落库到审计中心

#### 7.3 伸缩架构设计

可以把认证中心拆成两个扩展层面：

控制平面

+ 客户端管理
+ 密钥管理
+ 用户授权管理
+ 审计查询

特点：写多、管理型、低频但高价值。

数据平面

+ `/oauth2/token`
+ `/oauth2/authorize`
+ `/oauth2/jwks`
+ 登录与刷新

特点：读写混合、高并发、低延迟敏感。

在部署时，可以把数据平面单独做横向扩容，而管理平面相对收敛。

#### 7.4 分布式缓存设计

Redis 在认证系统中通常承担这些职责：

+ 登录态风控计数器
+ Refresh Token 并发锁
+ 黑名单缓存
+ 用户权限短缓存
+ 客户端配置热缓存

推荐 key 设计：

```
auth:blacklist:{jti}
auth:refresh-lock:{jti}
auth:login-fail:{username}
auth:client:{clientId}
auth:user-permission:{tenantId}:{userId}
```

#### 7.5 多租户设计

多租户最容易出问题的不是表结构，而是 Token、缓存、权限判断是否都带上租户语义。

生产建议：

+ Token 中写入 `tenant_id`
+ 客户端与用户都与租户绑定
+ 数据权限校验显式比较 `tenant_id`
+ 缓存 key 带租户前缀
+ 审计事件必须记录租户维度

#### 7.6 灰度与版本兼容

认证系统升级风险很高，必须支持渐进式发布。

重点兼容项：

+ `JWT claims` 新旧格式兼容
+ 新旧 `kid` 并存
+ 客户端 `redirect uri` 版本兼容
+ 黑名单和授权表结构变更兼容

建议流程：

1. 新版本先支持兼容读取旧 Token。
2. 新密钥进入 JWKS，但先不默认签发。
3. 小流量灰度签发新 Token。
4. 观察资源服务验签、网关转发、审计链路是否正常。
5. 确认稳定后再切主。

### 8. 安全治理与常见生产问题

#### 8.1 问题一：JWKS 缓存导致密钥轮换后验签失败

现象：

+ 认证中心已经切换新 `kid`
+ 部分资源服务器仍缓存旧公钥
+ 新签发 Token 在局部服务中出现 401

解决：

+ 缩短 JWKS 缓存时间
+ 轮换时保持新旧 key 共存
+ 资源服务器收到未知 `kid` 时触发一次主动刷新

#### 8.2 问题二：客户端 Secret 泄露

这是开放平台常见事故。

治理动作：

1. 立即禁用客户端状态。
2. 清理该客户端相关 Refresh Token。
3. 对已知 Access Token 进行黑名单处理。
4. 生成新 Secret 并通知调用方切换。
5. 审计历史调用 IP、UA、时间分布。

#### 8.3 问题三：权限变更无法即时生效

原因：

+ 权限被编码进 JWT，直到 Token 过期前都不会刷新

解决思路：

+ 缩短 Access Token 生命周期
+ 对高价值权限变更触发会话踢出与黑名单
+ 动态数据权限不直接固化进 Token

#### 8.4 问题四：网关和服务权限判定不一致

根因通常是两边各自维护一套规则。

建议：

+ 权限模型统一来源
+ 通用 scope 命名统一，例如 `order.read`、`order.write`
+ 对关键接口在服务端做最终判定

#### 8.5 问题五：高并发下刷新风暴

常见触发场景：

+ App 多个并发请求同时发现 Token 即将过期
+ 每个请求都发起刷新
+ 结果认证中心压力陡增，且会话状态混乱

客户端侧建议：

+ BFF 或 SDK 层做单飞控制
+ 在 60~120 秒内设置“即将过期窗口”
+ 同一会话只允许一个刷新动作

服务端建议：

+ Refresh Token 分布式锁
+ 一次性 Refresh Token
+ 刷新接口限流与幂等

#### 8.6 安全最佳实践清单

+ 强制 HTTPS，禁止明文传输 Token
+ Web 与 App 统一使用授权码模式 + PKCE
+ Access Token 短有效期，Refresh Token 可控续期
+ Secret、私钥放入 Vault/KMS，不放 Git 仓库
+ 关键操作审计全量留痕
+ 对登录、授权、刷新、吊销分别做限流
+ 高危接口引入二次校验或 step-up authentication
+ 定期轮换密钥和客户端 Secret
+ 严格限制 redirect uri，禁止模糊匹配

### 9. 云原生部署与可观测性

#### 9.1 容器化建议

生产镜像要做到：

+ 基础镜像尽量轻量
+ JVM 参数可配置
+ 时区、编码、日志输出标准化
+ 非 root 运行

示例：

```sh
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY target/auth-server.jar app.jar

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
```

#### 9.2 Kubernetes 部署示例

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: auth-server
  template:
    metadata:
      labels:
        app: auth-server
    spec:
      containers:
        - name: auth-server
          image: registry.example.com/security/auth-server:1.0.0
          ports:
            - containerPort: 9000
          env:
            - name: SPRING_PROFILES_ACTIVE
              value: prod
            - name: JAVA_TOOL_OPTIONS
              value: "-XX:+UseContainerSupport -XX:MaxRAMPercentage=75"
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 9000
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 9000
          resources:
            requests:
              cpu: "500m"
              memory: "512Mi"
            limits:
              cpu: "2"
              memory: "2Gi"
```

#### 9.3 HPA 与容量规划

认证服务容量规划不要只看平均流量，要看尖峰：

+ 上班早高峰
+ 大促活动前集中登录
+ App 版本升级后的集中刷新
+ 某个终端缓存失效导致的风暴

建议至少基于这些指标做 HPA：

+ CPU
+ 每秒 `/oauth2/token` 请求数
+ 登录失败率
+ `P95/P99` 延迟

#### 9.4 指标体系

认证系统应重点观测这些指标：

+ `auth_login_success_total`
+ `auth_login_failure_total`
+ `auth_token_issued_total`
+ `auth_refresh_token_total`
+ `auth_blacklist_hit_total`
+ `auth_jwks_reload_total`
+ `http_server_requests_seconds{uri="/oauth2/token"}`

#### 9.5 日志与链路追踪

建议日志最少包含：

+ `traceId`
+ `clientId`
+ `subject`
+ `tenantId`
+ `grantType`
+ `kid`
+ `jti`
+ `result`

对于登录、授权、刷新、吊销这类关键路径，要确保：

+ 接入 `OpenTelemetry` 或 `SkyWalking/Zipkin`
+ 支持跨网关和服务追踪
+ 审计日志与业务日志可关联

### 10. 完整落地建议与演进路线

#### 10.1 阶段一：统一认证入口

适合从单体或弱分布式演进的团队。

建设重点：

+ 引入独立 Authorization Server
+ 统一登录页和客户端注册
+ 业务服务改造成 Resource Server
+ 所有新接口强制 Bearer Token

#### 10.2 阶段二：统一权限模型

建设重点：

+ scope、role、数据权限模型统一
+ 方法级授权落地
+ 审计日志上线
+ 黑名单与吊销机制上线

#### 10.3 阶段三：高并发与云原生治理

建设重点：

+ Redis 黑名单与并发刷新锁
+ 认证中心多副本部署
+ JWKS 缓存与密钥轮换流程固化
+ 可观测性与容量规划上线

#### 10.4 阶段四：身份平台化

进一步可扩展为：

+ 多因素认证平台
+ 第三方 IdP 联邦登录
+ 开放平台客户端门户
+ 统一账号风控中心
+ 细粒度 ABAC / 策略中心

#### 10.5 生产落地 Checklist

+ 认证中心是否独立部署
+ 是否使用授权码模式 + PKCE
+ 资源服务器是否本地验签
+ Access Token 是否足够短
+ 是否具备黑名单与吊销能力
+ 是否支持密钥轮换且不停机
+ 是否具备登录与授权审计
+ 是否支持高并发刷新控制
+ 是否具备多租户隔离
+ 是否接入监控、日志、追踪与告警

### 11. 附录：联调与调用示例

#### 11.1 获取授权码

浏览器跳转：

```
GET /oauth2/authorize
  ?response_type=code
  &client_id=web-bff
  &redirect_uri=https://bff.example.com/login/oauth2/code/web-bff
  &scope=openid%20profile%20order.read
  &state=abc123
  &code_challenge=xyz
  &code_challenge_method=S256
```

#### 11.2 用授权码换 Token

```sh
curl --location 'https://auth.example.com/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic d2ViLWJmZjpjbGllbnQtc2VjcmV0' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'code=SplxlOBeZQQYbYS6WxSbIA' \
--data-urlencode 'redirect_uri=https://bff.example.com/login/oauth2/code/web-bff' \
--data-urlencode 'code_verifier=verifier-value'
```

#### 11.3 用 Access Token 访问资源

```sh
curl --location 'https://api.example.com/api/orders/10001' \
--header 'Authorization: Bearer eyJraWQiOi...'
```

#### 11.4 客户端模式获取服务间 Token

```sh
curl --location 'https://auth.example.com/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic aW50ZXJuYWwtb3JkZXItc2VydmljZTpyb3RhdGUtbWU=' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'scope=inventory.reserve'
```

### 总结

Spring Boot 3 + Spring Security 6 + OAuth2 的真正难点，从来不是把示例代码跑起来，而是把协议、架构、安全、并发和运维变成一套长期可治理的系统。

如果只追求“登录成功”，一个下午就能做出 demo；但如果目标是支撑多终端、多租户、微服务、高并发和云原生部署，那么必须同时做好下面几件事：

+ 在协议层面理解 OAuth2、OIDC、JWT、PKCE 的边界
+ 在架构层面拆清认证中心、网关、资源服务器职责
+ 在工程层面建设黑名单、审计、密钥轮换、幂等刷新、限流与缓存
+ 在运维层面补齐监控、告警、灰度、容量和灾备

这才是一套真正能进入生产、并且能长期演进的认证授权体系。


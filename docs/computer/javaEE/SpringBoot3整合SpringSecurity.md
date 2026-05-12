# SpringBoot 3.2.5 整合 Spring Security 6.2.5 详细教程

link:`https://mp.weixin.qq.com/s/kkTLRZvOOT60T72n8iot8A`

### 一、教程前言

本教程针对 SpringBoot 3.2.5 与 Spring Security 6.2.5 进行整合，全程基于 JDK 17+（SpringBoot 3.x 最低要求 JDK 17），涵盖从项目初始化、基础配置、用户认证、权限控制到高级功能（JWT、异常处理）的完整实现。

Spring Security 6.2.5 作为 SpringBoot 3.2.5 的适配版本，相比旧版本简化了配置方式，采用 Lambda DSL 新写法，废弃了部分旧 API（如 WebSecurityConfigurerAdapter），本教程将重点说明新版本的配置差异，确保代码可直接运行，同时规避常见整合坑点。

适用人群：具备 SpringBoot 基础，想快速掌握 Spring Security 6.x 整合技巧的开发者；需要搭建企业级安全认证、权限控制体系的开发人员。

### 二、环境准备

#### 2.1 核心环境版本

|组件|版本|说明|
|---|---|---|
|JDK|17 或 21|SpringBoot 3.x 强制要求，推荐 JDK 17（稳定版）|
|SpringBoot|3.2.5|核心框架，统一依赖管理|
|Spring Security|6.2.5|与 SpringBoot 3.2.5 完美适配，无需手动指定版本（由 SpringBoot 父工程管理）|
|Maven|3.6.3+|项目构建工具|
|开发工具|IDEA 2022.3+|推荐，支持 JDK 17 及 SpringBoot 3.x 特性|
|数据库|MySQL 8.0+|用于实现数据库存储用户、角色信息（可选，也可先用内存认证测试）|

#### 2.2 环境验证

1. 验证 JDK 版本：打开终端，输入 `java -version`，输出类似如下内容即为合格：

```sh
java version "17.0.9" 2023-10-17 LTS
Java(TM) SE Runtime Environment (build 17.0.9+9-LTS-201)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.9+9-LTS-201, mixed mode, sharing)
```

2. 验证 Maven 版本：输入 `mvn -v`，确保版本 `≥ 3.6.3`。

### 三、项目初始化（IDEA 操作）

#### 3.1 新建 SpringBoot 项目

打开 IDEA，点击「File → New → Project」，选择「Spring Initializr」，点击「Next」。

填写项目基础信息：

Group：自定义（如 com.example）

Artifact：自定义（如 springboot-security-demo）

Version：1.0.0

Name：springboot-security-demo

Package name：com.example.springbootsecuritydemo（自动生成，可修改）

Java Version：17

Packaging：Jar

Language：Java

选择依赖（关键步骤）：

Web → Spring Web（用于搭建测试接口）

Security → Spring Security（核心依赖，版本自动适配 6.2.5）

SQL → Spring Data JPA（可选，用于操作数据库；也可选择 MyBatis-Plus）

SQL → MySQL Driver（连接 MySQL 数据库，可选）

Developer Tools → Lombok（简化实体类开发，可选）

点击「Next」，选择项目保存路径，点击「Finish」，等待项目初始化完成（首次初始化需下载依赖，耐心等待）。

#### 3.2 项目结构说明

初始化完成后，项目结构如下（核心目录/文件标注）：

```
springboot-security-demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── springbootsecuritydemo/
│   │   │               ├── config/          // 配置类目录（核心：Security配置）
│   │   │               ├── controller/      // 测试接口控制器
│   │   │               ├── entity/          // 实体类（用户、角色）
│   │   │               ├── repository/      // 数据访问层（JPA/MyBatis）
│   │   │               ├── service/         // 业务逻辑层（用户认证、权限）
│   │   │               └── SpringbootSecurityDemoApplication.java  // 启动类
│   │   └── resources/
│   │       ├── application.properties      // 配置文件（数据库、端口等）
│   │       └── static/                     // 静态资源（可选，如登录页面）
│   └── test/                               // 测试类目录
└── pom.xml                                 // 依赖管理文件
```

#### 3.3 验证项目初始化成功

1. 打开启动类 `SpringbootSecurityDemoApplication.java`，点击运行按钮，启动项目。

2. 项目启动成功后，控制台会输出一个随机生成的默认密码（默认用户名为 user），类似如下内容：

```
Using generated security password: 8e557245-73e2-4286-969a-ff57fe326336
```

3. 打开浏览器，访问 `http://localhost:8080`，会自动跳转到 Spring Security 默认的登录页面，输入用户名 user 和控制台输出的密码，登录成功后会显示默认的错误页面（因为没有自定义接口），说明项目初始化及 Spring Security 依赖引入成功。

### 四、基础配置（核心步骤）

Spring Security 6.2.5 不再推荐继承 `WebSecurityConfigurerAdapter`（已废弃），而是采用「配置类 + `@Bean` 注解」的方式配置，核心是配置 `SecurityFilterChain`（安全过滤器链）。

#### 4.1 关闭默认登录页（可选，自定义登录页用）

先创建 `Security` 配置类，关闭默认登录页，方便后续自定义配置：

在 `config` 目录下创建 `SecurityConfig.java` 配置类。

编写配置代码（`Lambda DSL` 新写法）：

```java
package com.example.springbootsecuritydemo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration // 标识为配置类
@EnableWebSecurity // 启用 Spring Security 功能
public class SecurityConfig {
    // 核心配置：配置安全过滤器链
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. 关闭 CSRF 防护（前后端分离项目常用，单体项目可保留）
                .csrf(csrf -> csrf.disable())
                // 2. 配置请求授权规则
                .authorizeHttpRequests(authorize -> authorize
                        // 允许所有请求匿名访问（测试用，后续修改）
                        .anyRequest().permitAll()
                )
                // 3. 关闭默认登录页（可选，自定义登录页时关闭）
                .formLogin(form -> form.disable())
                // 4. 关闭默认注销功能（可选，自定义注销时关闭）
                .logout(logout -> logout.disable());
        return http.build();
    }
}
```

3. 重启项目，访问 `http://localhost:8080`，不会再跳转到默认登录页，说明基础配置生效。

#### 4.2 密码加密配置

Spring Security 6.x 强制要求密码必须加密存储，不能明文存储，否则会报错。我们需要配置 `PasswordEncoder` 密码加密器（推荐使用 `BCrypt` 加密）。

在 `SecurityConfig.java` 中添加如下 `Bean`：

```java
// 密码加密器（BCrypt 加密，不可逆，推荐用于生产环境）
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

说明：`BCrypt` 加密算法会自动生成随机盐值，每次加密后的密码都不同，但可以通过 `matches()` 方法验证明文密码与加密密码是否匹配，无需手动处理盐值。

### 五、用户认证实现（两种方式）

用户认证是 Spring Security 的核心功能，主要实现「验证用户身份」（用户名/密码是否正确），支持两种方式：内存认证（开发测试用）、数据库认证（生产环境用）。

#### 5.1 方式一：内存认证（快速测试）

内存认证无需连接数据库，直接在配置类中定义用户信息，适合开发测试阶段快速验证功能。

修改 `SecurityConfig.java`，添加内存用户配置：

```java
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// 内存用户认证配置（开发测试用）
@Bean
public UserDetailsService inMemoryUserDetailsService() {
    // 定义第一个用户：用户名 admin，密码 123456（加密后），角色 ADMIN
    UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("123456")) // 密码必须加密
            .roles("ADMIN") // 角色（多个角色用 .roles("ADMIN", "USER")）
            .build();
    // 定义第二个用户：用户名 user，密码 654321（加密后），角色 USER
    UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder().encode("654321"))
            .roles("USER")
            .build();
    // 将用户信息存入内存
    return new InMemoryUserDetailsManager(admin, user);
}
```

同时修改 `securityFilterChain` 中的请求授权规则，限制不同角色访问不同接口：

```java
.authorizeHttpRequests(authorize -> authorize
        // 允许匿名访问 /login 接口（后续自定义登录用）
        .requestMatchers("/login").permitAll()
        // 只有 ADMIN 角色能访问 /admin/** 接口
        .requestMatchers("/admin/**").hasRole("ADMIN")
        // 只有 USER 或 ADMIN 角色能访问 /user/** 接口
        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
        // 其他所有请求都需要认证（登录后才能访问）
        .anyRequest().authenticated()
)
```

测试步骤：

重启项目，访问 `http://localhost:8080/admin/test`，会被拦截（因为未登录）。

我们暂时用 Spring Security 提供的默认登录接口（`/login`），发送 `POST` 请求（可用 Postman）：

请求地址：`http://localhost:8080/login`

请求方式：`POST`

请求体（form-data）：`username=admin，password=123456`

登录成功后，再访问 `http://localhost:8080/admin/test`，即可正常访问；访问 `http://localhost:8080/user/test` 也可正常访问。

用 user 用户（`username=user，password=654321`）登录，访问 `http://localhost:8080/admin/test `会被拒绝（权限不足），访问 `http://localhost:8080/user/test` 可正常访问。

#### 5.2 方式二：数据库认证（生产环境）

生产环境中，用户信息、角色信息通常存储在数据库中，我们需要通过 `JPA/MyBatis` 操作数据库，实现自定义`UserDetailsService`（Spring Security 提供的用户信息查询接口）。

##### 5.2.1 数据库设计（MySQL）

创建 3 张表：用户表（`sys_user`）、角色表（`sys_role`）、用户角色关联表（`sys_user_role`），采用 `RBAC` 权限模型（用户-角色-权限）。

```sql
-- 1. 用户表（sys_user）
CREATE TABLE sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '加密后的密码',
    enabled TINYINT NOT NULL DEFAULT 1 COMMENT '是否启用（1=启用，0=禁用）',
    account_non_expired TINYINT NOT NULL DEFAULT 1 COMMENT '账户是否未过期（1=未过期，0=已过期）',
    account_non_locked TINYINT NOT NULL DEFAULT 1 COMMENT '账户是否未锁定（1=未锁定，0=已锁定）',
    credentials_non_expired TINYINT NOT NULL DEFAULT 1 COMMENT '密码是否未过期（1=未过期，0=已过期）',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '系统用户表';
-- 2. 角色表（sys_role）
CREATE TABLE sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID',
    role_name VARCHAR(50) NOT NULL UNIQUE COMMENT '角色名称（如：ROLE_ADMIN、ROLE_USER）',
    role_desc VARCHAR(100) COMMENT '角色描述',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '系统角色表';
-- 3. 用户角色关联表（sys_user_role）
CREATE TABLE sys_user_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '关联ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    FOREIGN KEY (user_id) REFERENCES sys_user(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES sys_role(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_role (user_id, role_id) COMMENT '用户与角色唯一关联'
) COMMENT '用户角色关联表';
-- 插入测试数据
INSERT INTO sys_role (role_name, role_desc) VALUES 
('ROLE_ADMIN', '管理员角色，拥有全部权限'),
('ROLE_USER', '普通用户角色，拥有基础权限');
-- 插入用户（密码：123456，加密后：$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q）
INSERT INTO sys_user (username, password) VALUES 
('admin', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q'),
('user', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q');
-- 关联用户与角色
INSERT INTO sys_user_role (user_id, role_id) VALUES 
(1, 1), -- admin 关联 ADMIN 角色
(2, 2); -- user 关联 USER 角色
```

说明：密码是用 `BCrypt` 加密后的结果（明文 `123456`），可通过 `passwordEncoder().encode("123456")` 生成。

##### 5.2.2 配置数据库连接

修改 `application.properties` 文件，添加数据库连接配置（JPA 配置）：

```properties
# 服务器端口（可选，默认 8080）
server.port=8080
# 数据库连接配置
spring.datasource.url=jdbc:mysql://localhost:3306/spring_security_demo?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456（替换为你的数据库密码）
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# JPA 配置（简化数据库操作）
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
```

##### 5.2.3 编写实体类

在 `entity` 目录下创建 3 个实体类，对应数据库中的 3 张表（使用 `Lombok` 简化代码）：

1. `User` 实体类（实现 `UserDetails` 接口，适配 Spring Security）

```java
package com.example.springbootsecuritydemo.entity;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Data
@Entity
@Table(name = "sys_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    // 是否启用
    private boolean enabled = true;
    // 账户是否未过期
    @Column(name = "account_non_expired")
    private boolean accountNonExpired = true;
    // 账户是否未锁定
    @Column(name = "account_non_locked")
    private boolean accountNonLocked = true;
    // 密码是否未过期
    @Column(name = "credentials_non_expired")
    private boolean credentialsNonExpired = true;
    @Column(name = "create_time")
    private LocalDateTime createTime = LocalDateTime.now();
    // 多对多关联角色（用户-角色）
    @ManyToMany(fetch = FetchType.EAGER) // 立即加载，登录时获取用户角色
    @JoinTable(
            name = "sys_user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles = new ArrayList<>();
    // 核心方法：返回用户的权限（角色）集合
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
    }
    // 以下方法无需修改，直接返回实体类中的属性
    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }
    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
```

2. `Role` 实体类

```java
package com.example.springbootsecuritydemo.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@Entity
@Table(name = "sys_role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName;
    @Column(name = "role_desc")
    private String roleDesc;
    @Column(name = "create_time")
    private LocalDateTime createTime = LocalDateTime.now();
    // 多对多关联用户（角色-用户，与 User 实体类双向关联）
    @ManyToMany(mappedBy = "roles")
    private List<User> users = new ArrayList<>();
}
```

##### 5.2.4 编写数据访问层（Repository）

在 `repository` 目录下创建两个 `Repository` 接口，继承 `JpaRepository`，实现数据库查询：

```java
// UserRepository.java
package com.example.springbootsecuritydemo.repository;
import com.example.springbootsecuritydemo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 根据用户名查询用户（Spring Security 认证时需要）
    Optional<User> findByUsername(String username);
}
// RoleRepository.java
package com.example.springbootsecuritydemo.repository;
import com.example.springbootsecuritydemo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
```

##### 5.2.5 编写自定义 UserDetailsService

创建 `UserDetailsServiceImpl`类，实现 `UserDetailsService` 接口，重写 `loadUserByUsername` 方法，从数据库查询用户信息：

```java
package com.example.springbootsecuritydemo.service;
import com.example.springbootsecuritydemo.entity.User;
import com.example.springbootsecuritydemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    // 核心方法：根据用户名查询用户信息（Spring Security 自动调用此方法进行认证）
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 从数据库查询用户
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("用户名不存在：" + username));
        // 返回 User 实体类（已实现 UserDetails 接口，Spring Security 会自动校验密码和权限）
        return user;
    }
}
```

##### 5.2.6 配置数据库认证

修改 `SecurityConfig.java`，删除内存认证配置，添加数据库认证相关配置，让 Spring Security 使用我们自定义的 `UserDetailsServiceImpl`：

```java
import com.example.springbootsecuritydemo.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    // 密码加密器（不变）
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // 配置 AuthenticationManager（认证管理器，处理认证请求）
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    // 核心配置：安全过滤器链（修改请求授权规则，关联自定义 UserDetailsService）
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/login").permitAll() // 允许匿名访问登录接口
                        .requestMatchers("/admin/**").hasRole("ADMIN") // ADMIN 角色可访问
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN") // USER/ADMIN 可访问
                        .anyRequest().authenticated() // 其他请求需认证
                )
                // 配置表单登录（自定义登录接口可关闭，这里用默认登录接口测试）
                .formLogin(form -> form
                        .loginProcessingUrl("/login") // 登录请求接口（默认就是 /login）
                        .defaultSuccessUrl("/success", true) // 登录成功跳转地址
                        .failureUrl("/login?error") // 登录失败跳转地址
                        .permitAll()
                )
                // 配置注销功能
                .logout(logout -> logout
                        .logoutUrl("/logout") // 注销接口
                        .logoutSuccessUrl("/login") // 注销成功跳转地址
                        .permitAll()
                )
                // 关联自定义 UserDetailsService 和密码加密器
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        return http.build();
    }
}
```

##### 5.2.7 测试数据库认证

重启项目，访问 `http://localhost:8080/admin/test`，会跳转到默认登录页面。

输入数据库中的用户信息（用户名 `admin`，密码 `123456`），登录成功后会跳转到 `/success`（目前未自定义此接口，会报 404，属于正常现象）。

访问 `http://localhost:8080/admin/test`，可正常访问；用 `user` 用户（用户名 `user`，密码 `123456`）登录，访问 `http://localhost:8080/admin/test` 会被拒绝，说明数据库认证和权限控制生效。

### 六、自定义登录接口（前后端分离常用）

生产环境中，前后端分离项目通常不需要 Spring Security 提供的默认登录页面，而是通过自定义接口接收用户名/密码，返回认证结果（如 JWT 令牌）。

#### 6.1 关闭默认表单登录

修改 `SecurityConfig.java` 中的 `securityFilterChain` 方法，关闭默认表单登录：

```java
.formLogin(form -> form.disable()) // 关闭默认表单登录
.httpBasic(httpBasic -> httpBasic.disable()) // 关闭基础认证（可选）
```

#### 6.2 编写登录接口控制器

在 `controller` 目录下创建 `AuthController.java`，编写自定义登录接口：

```java
package com.example.springbootsecuritydemo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
// 登录认证控制器
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    // 自定义登录接口（接收用户名和密码，返回认证结果）
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginDTO loginDTO) {
        Map<String, Object> result = new HashMap<>();
        try {
            // 1. 封装用户名和密码为 Authentication 对象
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginDTO.getUsername(), loginDTO.getPassword()
            );
            // 2. 调用 AuthenticationManager 进行认证（自动调用 UserDetailsServiceImpl 查询用户）
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            // 3. 认证成功，返回结果（后续可替换为 JWT 令牌）
            result.put("code", 200);
            result.put("message", "登录成功");
            result.put("data", authentication.getPrincipal()); // 登录用户信息
        } catch (AuthenticationException e) {
            // 4. 认证失败（用户名不存在、密码错误等）
            result.put("code", 401);
            result.put("message", "用户名或密码错误");
        }
        return result;
    }
    // 登录请求参数DTO（接收前端传递的用户名和密码）
    public static class LoginDTO {
        private String username;
        private String password;
        // getter 和 setter 方法
        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
```

#### 6.3 配置登录接口允许匿名访问

修改 `SecurityConfig.java` 中的请求授权规则，允许匿名访问 `/auth/login` 接口：

```java
.authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/auth/login").permitAll() // 允许匿名访问登录接口
        .requestMatchers("/admin/**").hasRole("ADMIN")
        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
        .anyRequest().authenticated()
)
```

#### 6.4 测试自定义登录接口

使用 Postman 发送 `POST` 请求：

```json
请求地址：
http://localhost:8080/auth/login
请求方式：POST
请求体（JSON）：
{"username":"admin","password":"123456"}
登录成功返回结果：
{
    "code": 200,
    "message": "登录成功",
    "data": {
        "id": 1,
        "username": "admin",
        "password": "$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q",
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "createTime": "2024-05-20T10:00:00",
        "roles": [
            {
                "id": 1,
                "roleName": "ROLE_ADMIN",
                "roleDesc": "管理员角色，拥有全部权限",
                "createTime": "2024-05-20T10:00:00"
            }
        ]
    }
}
```

若输入错误密码（如 1234567），返回结果：

```json
{
    "code": 401,
    "message": "用户名或密码错误"
}
```

### 七、高级功能：整合 JWT 实现无状态认证

前后端分离项目中，通常采用 JWT（JSON Web Token）实现无状态认证，用户登录成功后，服务器返回 JWT 令牌，后续请求携带令牌即可完成认证，无需存储会话信息。

#### 7.1 添加 JWT 依赖

修改 `pom.xml`，添加 JJWT 依赖（Spring Security 6.x 推荐使用 JJWT 实现 JWT）：

```xml
<!-- JJWT 核心依赖（生成、解析 JWT） -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

#### 7.2 编写 JWT 工具类

在 `common` 目录下创建 `JwtUtil.java`，实现 JWT 令牌的生成、解析、验证功能：

```java
package com.example.springbootsecuritydemo.common;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Component
public class JwtUtil {
    // JWT 密钥（自定义，生产环境建议放在配置文件中，加密存储）
    @Value("${jwt.secret:defaultSecret123456}")
    private String secret;
    // JWT 过期时间（单位：毫秒，这里设置为 24 小时）
    @Value("${jwt.expiration:86400000}")
    private long expiration;
    // 从 JWT 令牌中获取用户名
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    // 从 JWT 令牌中获取指定声明
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    // 解析 JWT 令牌，获取所有声明
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secret.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    // 生成 JWT 令牌（无额外信息）
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    // 生成 JWT 令牌（带额外信息）
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims) // 额外信息（如用户ID、角色等）
                .setSubject(userDetails.getUsername()) // 用户名（主题）
                .setIssuedAt(new Date(System.currentTimeMillis())) // 签发时间
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // 过期时间
                .signWith(SignatureAlgorithm.HS256, secret.getBytes()) // 签名算法和密钥
                .compact();
    }
    // 验证 JWT 令牌是否有效（用户名匹配 + 未过期）
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    // 验证 JWT 令牌是否过期
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    // 从 JWT 令牌中获取过期时间
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
```

#### 7.3 修改登录接口，返回 JWT 令牌

修改 `AuthController.java` 的 `login` 方法，使用 `JwtUtil` 生成令牌并返回：

```java
import com.example.springbootsecuritydemo.common.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginDTO loginDTO) {
        Map<String, Object> result = new HashMap<>();
        try {
            // 1. 认证用户名和密码
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginDTO.getUsername(), loginDTO.getPassword()
            );
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            // 2. 生成 JWT 令牌
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getUsername());
            String token = jwtUtil.generateToken(userDetails);
            // 3. 返回结果（令牌 + 用户信息）
            result.put("code", 200);
            result.put("message", "登录成功");
            result.put("token", token); // JWT 令牌
            result.put("username", userDetails.getUsername()); // 用户名
            result.put("roles", userDetails.getAuthorities()); // 用户角色
        } catch (AuthenticationException e) {
            result.put("code", 401);
            result.put("message", "用户名或密码错误");
        }
        return result;
    }
    // LoginDTO 不变，省略...
}
```

#### 7.4 编写 JWT 认证过滤器

创建 `JwtAuthenticationFilter` 类，继承 `OncePerRequestFilter`，实现每次请求都校验 JWT 令牌：

```java
package com.example.springbootsecuritydemo.filter;
import com.example.springbootsecuritydemo.common.JwtUtil;
import com.example.springbootsecuritydemo.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
// JWT 认证过滤器（每次请求都执行，校验令牌）
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 1. 从请求头中获取 JWT 令牌（默认格式：Bearer token）
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        // 2. 校验请求头是否包含有效的 JWT 令牌
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // 无有效令牌，直接放行，后续由 Spring Security 拦截未认证请求
            filterChain.doFilter(request, response);
            return;
        }
        // 3. 提取 JWT 令牌（去掉 "Bearer " 前缀）
        jwt = authHeader.substring(7);
        try {
            // 4. 从 JWT 令牌中解析用户名
            username = jwtUtil.extractUsername(jwt);
            // 5. 若用户名不为空，且当前 Security 上下文无认证信息（未登录）
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // 6. 从数据库查询用户信息
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                // 7. 验证 JWT 令牌是否有效
                if (jwtUtil.isTokenValid(jwt, userDetails)) {
                    // 8. 构建认证对象，存入 Security 上下文（表示用户已登录）
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        } catch (Exception e) {
            // JWT 令牌解析失败、过期等异常，不处理，继续放行
            logger.error("JWT 认证失败：{}", e.getMessage());
        }
        // 9. 放行请求，进入下一个过滤器
        filterChain.doFilter(request, response);
    }
}
```

#### 7.5 配置 JWT 过滤器

修改 `SecurityConfig.java`，将 JWT 过滤器添加到安全过滤器链中，放在 `UsernamePasswordAuthenticationFilter` 之前：

```java
import com.example.springbootsecuritydemo.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    // 密码加密器（不变）
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // 认证管理器（不变）
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    // 核心配置：添加 JWT 过滤器
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/login").permitAll() // 登录接口允许匿名访问
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable()) // 关闭默认表单登录
                .httpBasic(httpBasic -> httpBasic.disable()) // 关闭基础认证
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 无状态认证（不存储会话）
                )
                // 添加 JWT 过滤器，放在 UsernamePasswordAuthenticationFilter 之前
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        return http.build();
    }
}
```

#### 7.6 测试 JWT 认证

```
重启项目，使用 Postman 发送登录请求，获取 JWT 令牌：
               请求地址：http://localhost:8080/auth/login
               请求体：{"username":"admin","password":"123456"}
               返回结果中获取 token 字段（如：eyJhbGciOiJIUzI1NiJ9...）

发送请求访问受保护接口（如 http://localhost:8080/admin/test），携带JWT令牌进行认证：
               请求地址：http://localhost:8080/admin/test
               请求方式：GET（或POST，根据接口定义调整）
               请求头：添加 Authorization，值为 Bearer 你的JWT令牌（注意Bearer后有一个空格，替换“你的JWT令牌”为步骤1获取的token字段值）

验证不同角色权限： 用admin用户的令牌访问 /admin/test，接口正常返回（无403权限不足），说明ADMIN角色权限生效；
               用user用户（用户名user，密码123456）登录获取令牌，访问 /admin/test，会返回403 Forbidden（权限不足），访问 /user/test 可正常返回，符合权限配置规则。

验证令牌异常场景：
              令牌过期：等待24小时（或修改JwtUtil的expiration参数缩短过期时间）后，携带原令牌访问接口，会返回401 Unauthorized（未认证）；

令牌无效：手动修改令牌任意字符，携带修改后的令牌访问接口，会触发JWT解析失败，接口返回401 Unauthorized；

不携带令牌：直接访问 /admin/test 或 /user/test，接口返回401 Unauthorized，说明未认证请求被拦截。

测试注销（可选）：前后端分离项目的注销无需后端处理会话（无状态认证），前端直接删除本地存储的JWT令牌即可，后续请求不再携带令牌，即视为注销成功。
```


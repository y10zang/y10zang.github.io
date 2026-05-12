# Spring Boot 3.2.5 整合 Sa-Token 1.44.0 完整教程

link: `https://mp.weixin.qq.com/s/A_LqOzTHJcZGNqTBxT8hKA?`

### 一、项目概述与版本说明

#### 1.1 版本兼容性

Spring Boot: 3.2.5 (Java 17+)

Sa-Token: 1.44.0

Java: 17+

数据库: MySQL 8.0+ (可选，用于会话持久化)

### 二、快速开始

#### 2.1 创建项目

通过 Spring Initializr 创建项目，选择以下依赖：

Spring Boot 3.2.5

Spring Web

Spring Data Redis (可选，用于分布式会话)

MySQL Driver (可选)

Lombok

#### 2.2 添加 Sa-Token 依赖

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Sa-Token 核心包 -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-spring-boot3-starter</artifactId>
        <version>1.44.0</version>
    </dependency>
    <!-- Sa-Token 集成 Redis (可选，用于分布式会话) -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-dao-redis</artifactId>
        <version>1.44.0</version>
    </dependency>
    <!-- Sa-Token 集成 JWT (可选) -->
    <dependency>
        <groupId>cn.dev33</groupId>
        <artifactId>sa-token-jwt</artifactId>
        <version>1.44.0</version>
    </dependency>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- 参数校验 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### 三、基础配置

#### 3.1 基础配置文件

```yml
# application.yml
server:
  port: 8080
  servlet:
    context-path: /
spring:
  application:
    name: sa-token-demo
  # Redis配置 (如果使用Redis)
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 10s
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
# Sa-Token 配置
sa-token:
  # token名称 (同时也是cookie名称)
  token-name: satoken
  # token有效期，单位s 默认30天, -1代表永不过期
  timeout: 2592000
  # token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒
  activity-timeout: -1
  # 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)
  is-concurrent: true
  # 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)
  is-share: true
  # token风格
  token-style: uuid
  # 是否输出操作日志
  is-log: false
  # 是否尝试从请求体里读取token
  is-read-body: true
  # 是否尝试从header里读取token
  is-read-header: true
  # 是否尝试从cookie里读取token
  is-read-cookie: true
  # 是否在初始化配置时打印版本字符画
  is-print: true
```

#### 3.2 高级配置

```yml
# application-sa-token.yml (可单独配置)
sa-token:
  jwt:
    # 是否启用JWT
    secret-key: 12345678901234567890123456789012
    # JWT秘钥
    is-enabled: false
  # 全局异常处理
  is-throw-exception: true
  # 路由拦截配置
  is-print: false
  # 登录验证
  is-log: true
  # 配置 Sa-Token 拦截器排除路径
  exclude-routes:
    - /user/doLogin
    - /user/register
    - /swagger-ui/**
    - /swagger-resources/**
    - /v3/api-docs
    - /webjars/**
    - /doc.html
```

### 四、核心功能实现

#### 4.1 实体类定义

```java
// User.java
package com.example.satoken.entity;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;
@Data
public class User implements Serializable {
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String email;
    private String phone;
    private Integer status;  // 0-禁用 1-正常
    private Integer userType; // 用户类型
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

#### 4.2 登录DTO

```java
// LoginDTO.java
package com.example.satoken.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class LoginDTO {
    @NotBlank(message = "用户名不能为空")
    private String username;
    @NotBlank(message = "密码不能为空")
    private String password;
    private Boolean rememberMe = false;
}
```

#### 4.3 权限认证接口实现

```java
// StpInterfaceImpl.java
package com.example.satoken.service;
import cn.dev33.satoken.stp.StpInterface;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
/**
 * 自定义权限验证接口扩展
 */
@Component
public class StpInterfaceImpl implements StpInterface {
    /**
     * 返回一个账号所拥有的权限码集合
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        // 这里模拟从数据库查询用户的权限
        // 实际项目中应该从数据库或缓存中获取
        List<String> permissionList = new ArrayList<>();
        // 根据用户ID获取权限
        Long userId = Long.parseLong(loginId.toString());
        // 模拟数据
        if (userId == 1L) {
            permissionList.add("user:add");
            permissionList.add("user:delete");
            permissionList.add("user:update");
            permissionList.add("user:query");
        } else if (userId == 2L) {
            permissionList.add("user:query");
        }
        return permissionList;
    }
    /**
     * 返回一个账号所拥有的角色标识集合
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        List<String> roleList = new ArrayList<>();
        // 根据用户ID获取角色
        Long userId = Long.parseLong(loginId.toString());
        // 模拟数据
        if (userId == 1L) {
            roleList.add("admin");
        } else if (userId == 2L) {
            roleList.add("user");
        }
        return roleList;
    }
}
```

#### 4.4 全局 Sa-Token 配置

```java
// SaTokenConfigure.java
package com.example.satoken.config;
import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {
    // 注册 Sa-Token 拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册 Sa-Token 拦截器，定义详细认证规则
        registry.addInterceptor(new SaInterceptor(handler -> {
            // 1. 基础规则
            SaRouter
                // 对所有路径进行鉴权
                .match("/**")
                // 排除不需要鉴权的路径
                .notMatch("/auth/login", "/auth/register", "/auth/logout")
                .notMatch("/swagger-ui/**", "/v3/api-docs/**", "/doc.html")
                .notMatch("/error")
                // 检查登录状态
                .check(r -> StpUtil.checkLogin());
            // 2. 按角色权限拦截
            SaRouter
                .match("/admin/**", r -> StpUtil.checkRole("admin"));
            // 3. 按权限码拦截
            SaRouter
                .match("/user/add", r -> StpUtil.checkPermission("user:add"))
                .match("/user/delete", r -> StpUtil.checkPermission("user:delete"))
                .match("/user/update", r -> StpUtil.checkPermission("user:update"))
                .match("/user/query", r -> StpUtil.checkPermission("user:query"));
        })).addPathPatterns("/**");
    }
}
```

### 五、控制器实现

#### 5.1 认证控制器

```java
// AuthController.java
package com.example.satoken.controller;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.SaTokenInfo;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.satoken.dto.LoginDTO;
import com.example.satoken.entity.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/auth")
public class AuthController {
    /**
     * 用户登录
     */
    @PostMapping("/login")
    public SaResult login(@Valid @RequestBody LoginDTO loginDTO) {
        // 这里应该查询数据库验证用户名密码
        // 模拟登录验证
        if ("admin".equals(loginDTO.getUsername()) && "123456".equals(loginDTO.getPassword())) {
            // 登录成功
            StpUtil.login(10001);
            // 获取 token 信息
            SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
            // 返回给前端
            Map<String, Object> data = new HashMap<>();
            data.put("token", tokenInfo.getTokenValue());
            data.put("tokenName", tokenInfo.getTokenName());
            data.put("loginId", StpUtil.getLoginId());
            return SaResult.data(data);
        } else if ("user".equals(loginDTO.getUsername()) && "123456".equals(loginDTO.getPassword())) {
            StpUtil.login(10002);
            SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
            Map<String, Object> data = new HashMap<>();
            data.put("token", tokenInfo.getTokenValue());
            data.put("tokenName", tokenInfo.getTokenName());
            data.put("loginId", StpUtil.getLoginId());
            return SaResult.data(data);
        }
        return SaResult.error("用户名或密码错误");
    }
    /**
     * 查询登录状态
     */
    @GetMapping("/isLogin")
    public SaResult isLogin() {
        boolean isLogin = StpUtil.isLogin();
        return SaResult.data(isLogin);
    }
    /**
     * 获取当前登录用户信息
     */
    @SaCheckLogin
    @GetMapping("/userInfo")
    public SaResult getUserInfo() {
        Object loginId = StpUtil.getLoginId();
        // 模拟查询用户信息
        User user = new User();
        user.setId(Long.parseLong(loginId.toString()));
        user.setUsername("admin");
        user.setNickname("管理员");
        user.setEmail("admin@example.com");
        return SaResult.data(user);
    }
    /**
     * 获取当前登录用户的权限列表
     */
    @SaCheckLogin
    @GetMapping("/permissions")
    public SaResult getPermissions() {
        Object loginId = StpUtil.getLoginId();
        return SaResult.data(StpUtil.getPermissionList(loginId));
    }
    /**
     * 获取当前登录用户的角色列表
     */
    @SaCheckLogin
    @GetMapping("/roles")
    public SaResult getRoles() {
        Object loginId = StpUtil.getLoginId();
        return SaResult.data(StpUtil.getRoleList(loginId));
    }
    /**
     * 用户注销
     */
    @PostMapping("/logout")
    public SaResult logout() {
        StpUtil.logout();
        return SaResult.ok("注销成功");
    }
    /**
     * 踢人下线
     */
    @SaCheckPermission("admin:kick")
    @PostMapping("/kick/{loginId}")
    public SaResult kickOut(@PathVariable Object loginId) {
        StpUtil.kickout(loginId);
        return SaResult.ok("用户已被踢下线");
    }
}
```

#### 5.2 用户管理控制器

```java
// UserController.java
package com.example.satoken.controller;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/user")
public class UserController {
    /**
     * 查询用户列表 (需要登录)
     */
    @SaCheckLogin
    @GetMapping("/list")
    public SaResult listUsers() {
        // 模拟数据
        List<String> users = new ArrayList<>();
        users.add("用户1");
        users.add("用户2");
        users.add("用户3");
        return SaResult.data(users);
    }
    /**
     * 添加用户 (需要 user:add 权限)
     */
    @SaCheckPermission("user:add")
    @PostMapping("/add")
    public SaResult addUser() {
        return SaResult.ok("添加用户成功");
    }
    /**
     * 删除用户 (需要 user:delete 权限)
     */
    @SaCheckPermission("user:delete")
    @DeleteMapping("/delete/{id}")
    public SaResult deleteUser(@PathVariable String id) {
        return SaResult.ok("删除用户成功: " + id);
    }
    /**
     * 修改用户 (需要 user:update 权限)
     */
    @SaCheckPermission("user:update")
    @PutMapping("/update/{id}")
    public SaResult updateUser(@PathVariable String id) {
        return SaResult.ok("修改用户成功: " + id);
    }
    /**
     * 查询用户详情 (需要 user:query 权限)
     */
    @SaCheckPermission("user:query")
    @GetMapping("/detail/{id}")
    public SaResult getUserDetail(@PathVariable String id) {
        return SaResult.data("用户" + id + "的详细信息");
    }
    /**
     * 管理员功能 (需要 admin 角色)
     */
    @SaCheckRole("admin")
    @GetMapping("/admin/list")
    public SaResult adminList() {
        return SaResult.data("管理员专用数据");
    }
    /**
     * 多权限验证示例
     * 需要同时拥有 user:add 和 user:update 权限
     */
    @SaCheckPermission(value = {"user:add", "user:update"}, mode = SaMode.AND)
    @PostMapping("/batch")
    public SaResult batchOperate() {
        return SaResult.ok("批量操作成功");
    }
    /**
     * 权限验证 (任意一个权限)
     */
    @SaCheckPermission(value = {"user:add", "user:delete"}, mode = SaMode.OR)
    @PostMapping("/any")
    public SaResult anyPermission() {
        return SaResult.ok("拥有任一权限即可访问");
    }
}
```

### 六、注解式鉴权

#### 6.1 自定义注解

```java
// PermissionAnnotations.java
package com.example.satoken.annotation;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 自定义权限注解
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface RequirePermission {
    String[] value();
    cn.dev33.satoken.annotation.SaMode mode() default cn.dev33.satoken.annotation.SaMode.AND;
}
/**
 * 自定义角色注解
 */
@Retention(RetentionPolicy.RUNTime)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface RequireRole {
    String[] value();
    cn.dev33.satoken.annotation.SaMode mode() default cn.dev33.satoken.annotation.SaMode.AND;
}
```

#### 6.2 使用示例控制器

```java
// DemoController.java
package com.example.satoken.controller;
import cn.dev33.satoken.annotation.SaCheckDisable;
import cn.dev33.satoken.annotation.SaCheckSafe;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.satoken.annotation.RequirePermission;
import com.example.satoken.annotation.RequireRole;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.TimeUnit;
@RestController
@RequestMapping("/demo")
public class DemoController {
    /**
     * 使用自定义权限注解
     */
    @RequirePermission("demo:test")
    @GetMapping("/test1")
    public SaResult test1() {
        return SaResult.ok("拥有demo:test权限");
    }
    /**
     * 使用自定义角色注解
     */
    @RequireRole("super-admin")
    @GetMapping("/test2")
    public SaResult test2() {
        return SaResult.ok("拥有super-admin角色");
    }
    /**
     * 二级认证示例
     */
    @SaCheckSafe
    @GetMapping("/sensitive")
    public SaResult sensitiveOperation() {
        return SaResult.ok("敏感操作成功");
    }
    /**
     * 服务封禁示例
     */
    @GetMapping("/checkBan")
    public SaResult checkBan() {
        // 检查账号是否被封禁
        StpUtil.checkDisable(StpUtil.getLoginId());
        return SaResult.ok("账号正常，可以访问");
    }
    /**
     * 封禁账号
     */
    @PostMapping("/ban/{userId}")
    public SaResult banUser(@PathVariable String userId, 
                           @RequestParam(defaultValue = "10") int minutes) {
        // 封禁账号10分钟
        StpUtil.disable(userId, minutes * 60);
        return SaResult.ok("账号已封禁" + minutes + "分钟");
    }
    /**
     * 解封账号
     */
    @PostMapping("/unban/{userId}")
    public SaResult unbanUser(@PathVariable String userId) {
        StpUtil.untieDisable(userId);
        return SaResult.ok("账号已解封");
    }
}
```

### 七、全局异常处理

#### 7.1 全局异常处理器

```java
// GlobalExceptionHandler.java
package com.example.satoken.handler;
import cn.dev33.satoken.exception.*;
import cn.dev33.satoken.util.SaResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 未登录异常
     */
    @ExceptionHandler(NotLoginException.class)
    public SaResult handlerNotLoginException(NotLoginException e) {
        return SaResult.error(401, e.getMessage())
                .setCode(e.getType());
    }
    /**
     * 权限异常
     */
    @ExceptionHandler(NotPermissionException.class)
    public SaResult handlerNotPermissionException(NotPermissionException e) {
        return SaResult.error(403, "无此权限：" + e.getPermission());
    }
    /**
     * 角色异常
     */
    @ExceptionHandler(NotRoleException.class)
    public SaResult handlerNotRoleException(NotRoleException e) {
        return SaResult.error(403, "无此角色：" + e.getRole());
    }
    /**
     * 服务封禁异常
     */
    @ExceptionHandler(DisableServiceException.class)
    public SaResult handlerDisableServiceException(DisableServiceException e) {
        return SaResult.error(403, "账号被封禁：" + e.getDisableTime() + "秒后解封");
    }
    /**
     * 二级认证异常
     */
    @ExceptionHandler(NotSafeException.class)
    public SaResult handlerNotSafeException(NotSafeException e) {
        return SaResult.error(403, "需要进行二级认证：" + e.getService());
    }
    /**
     * 全局异常
     */
    @ExceptionHandler(Exception.class)
    public SaResult handlerException(Exception e) {
        e.printStackTrace();
        return SaResult.error(500, "系统异常：" + e.getMessage());
    }
}
```

### 八、高级配置

#### 8.1 Sa-Token 配置类

```java
// SaTokenConfig.java
package com.example.satoken.config;
import cn.dev33.satoken.config.SaTokenConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
@Configuration
public class SaTokenConfig {
    @Bean
    @Primary
    public SaTokenConfig getSaTokenConfigPrimary() {
        SaTokenConfig config = new SaTokenConfig();
        config.setTokenName("satoken");
        config.setTimeout(2592000); // 30天
        config.setActiveTimeout(-1); // 无操作永不过期
        config.setIsConcurrent(true); // 允许并发登录
        config.setIsShare(true); // 共享token
        config.setTokenStyle("uuid"); // token风格
        config.setIsLog(false); // 不输出日志
        // 多端登录配置
        config.setIsConcurrent(true);
        // 是否允许从请求体读取Token
        config.setIsReadBody(true);
        // 是否尝试从header里读取token
        config.setIsReadHeader(true);
        // 是否尝试从cookie里读取token
        config.setIsReadCookie(true);
        return config;
    }
}
```

#### 8.2 会话监听器

```java
// StpListener.java
package com.example.satoken.listener;
import cn.dev33.satoken.listener.SaTokenListener;
import cn.dev33.satoken.stp.SaLoginModel;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
@Component
@Slf4j
public class StpListener implements SaTokenListener {
    /**
     * 每次登录时触发
     */
    @Override
    public void doLogin(String loginType, Object loginId, String tokenValue, SaLoginModel loginModel) {
        log.info("用户 {} 登录成功，token: {}", loginId, tokenValue);
    }
    /**
     * 每次注销时触发
     */
    @Override
    public void doLogout(String loginType, Object loginId, String tokenValue) {
        log.info("用户 {} 注销成功", loginId);
    }
    /**
     * 每次被踢下线时触发
     */
    @Override
    public void doKickout(String loginType, Object loginId, String tokenValue) {
        log.warn("用户 {} 被踢下线", loginId);
    }
    /**
     * 每次被顶下线时触发
     */
    @Override
    public void doReplaced(String loginType, Object loginId, String tokenValue) {
        log.warn("用户 {} 被顶下线", loginId);
    }
    /**
     * 每次被封禁时触发
     */
    @Override
    public void doDisable(String loginType, Object loginId, String service, int level, long disableTime) {
        log.warn("用户 {} 服务 {} 被封禁，时长: {}秒", loginId, service, disableTime);
    }
    /**
     * 每次被解封时触发
     */
    @Override
    public void doUntieDisable(String loginType, Object loginId, String service) {
        log.info("用户 {} 服务 {} 被解封", loginId, service);
    }
    /**
     * 每次打开二级认证时触发
     */
    @Override
    public void doOpenSafe(String loginType, String tokenValue, String service, long safeTime) {
        log.info("token {} 开启二级认证: {}，有效期: {}秒", tokenValue, service, safeTime);
    }
    /**
     * 每次关闭二级认证时触发
     */
    @Override
    public void doCloseSafe(String loginType, String tokenValue, String service) {
        log.info("token {} 关闭二级认证: {}", tokenValue, service);
    }
    /**
     * 每次创建Session时触发
     */
    @Override
    public void doCreateSession(String id) {
        log.debug("创建Session: {}", id);
    }
    /**
     * 每次注销Session时触发
     */
    @Override
    public void doLogoutSession(String id) {
        log.debug("注销Session: {}", id);
    }
}
```

### 九、测试接口

#### 9.1 测试控制器

```java
// TestController.java
package com.example.satoken.controller;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/test")
public class TestController {
    /**
     * 测试登录状态
     */
    @GetMapping("/checkLogin")
    public SaResult checkLogin() {
        boolean isLogin = StpUtil.isLogin();
        String tokenValue = StpUtil.getTokenValue();
        Object loginId = StpUtil.getLoginIdDefaultNull();
        Map<String, Object> data = new HashMap<>();
        data.put("isLogin", isLogin);
        data.put("token", tokenValue);
        data.put("loginId", loginId);
        data.put("loginDevice", StpUtil.getLoginDevice());
        data.put("tokenTimeout", StpUtil.getTokenTimeout());
        data.put("sessionTimeout", StpUtil.getSessionTimeout());
        return SaResult.data(data);
    }
    /**
     * 测试踢人下线
     */
    @GetMapping("/kickSelf")
    public SaResult kickSelf() {
        StpUtil.logout();
        return SaResult.ok("自己踢自己下线成功");
    }
    /**
     * 测试强制注销
     */
    @GetMapping("/logoutByLoginId/{loginId}")
    public SaResult logoutByLoginId(@PathVariable String loginId) {
        StpUtil.logout(loginId);
        return SaResult.ok("强制注销成功: " + loginId);
    }
    /**
     * 测试获取权限列表
     */
    @GetMapping("/permissions")
    public SaResult getPermissions() {
        Object loginId = StpUtil.getLoginId();
        return SaResult.data(StpUtil.getPermissionList(loginId));
    }
    /**
     * 测试获取角色列表
     */
    @GetMapping("/roles")
    public SaResult getRoles() {
        Object loginId = StpUtil.getLoginId();
        return SaResult.data(StpUtil.getRoleList(loginId));
    }
    /**
     * 测试封禁
     */
    @GetMapping("/disable/{minutes}")
    public SaResult disable(@PathVariable int minutes) {
        Object loginId = StpUtil.getLoginId();
        StpUtil.disable(loginId, minutes * 60);
        return SaResult.ok("账号已封禁" + minutes + "分钟");
    }
    /**
     * 测试解封
     */
    @GetMapping("/untieDisable")
    public SaResult untieDisable() {
        Object loginId = StpUtil.getLoginId();
        StpUtil.untieDisable(loginId);
        return SaResult.ok("账号已解封");
    }
}
```

### 十、Swagger 集成

#### 10.1 添加 Swagger 依赖

```xml
<!-- SpringDoc OpenAPI (适用于Spring Boot 3.x) -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

#### 10.2 Swagger 配置

```java
// SwaggerConfig.java
package com.example.satoken.config;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sa-Token 权限认证系统")
                        .version("1.0.0")
                        .description("基于Spring Boot 3.2.5和Sa-Token 1.44.0的权限认证系统")
                        .contact(new Contact()
                                .name("开发者")
                                .email("dev@example.com")))
                .addSecurityItem(new SecurityRequirement().addList("satoken"))
                .components(new Components()
                        .addSecuritySchemes("satoken", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .name("satoken")
                                .description("Sa-Token认证")));
    }
}
```

### 十一、启动类

```java
// SaTokenApplication.java
package com.example.satoken;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class SaTokenApplication {
    public static void main(String[] args) {
        SpringApplication.run(SaTokenApplication.class, args);
        System.out.println("\n========== Sa-Token 系统启动成功 ==========");
        System.out.println("后台管理: http://localhost:8080/swagger-ui.html");
        System.out.println("登录接口: POST http://localhost:8080/auth/login");
        System.out.println("测试登录: {\"username\": \"admin\", \"password\": \"123456\"}");
        System.out.println("======================================\n");
    }
}
```

### 十二、测试用例

#### 12.1 使用 Postman 测试

```json
# 1. 登录
POST http://localhost:8080/auth/login
Content-Type: application/json
{
    "username": "admin",
    "password": "123456"
}

# 2. 测试登录状态
GET http://localhost:8080/test/checkLogin
Header: satoken: {上一步返回的token}

# 3. 测试权限接口
GET http://localhost:8080/user/list
Header: satoken: {token}

# 4. 测试管理员接口
GET http://localhost:8080/user/admin/list
Header: satoken: {token}

# 5. 注销
POST http://localhost:8080/auth/logout
Header: satoken: {token}
```

#### 12.2 测试账号

```json
{
  "admin账号": {
    "username": "admin",
    "password": "123456",
    "权限": ["user:add", "user:delete", "user:update", "user:query"],
    "角色": ["admin"]
  },
  "普通用户账号": {
    "username": "user",
    "password": "123456",
    "权限": ["user:query"],
    "角色": ["user"]
  }
}
```

### 十三、常见问题

#### 13.1 版本兼容性问题

```
# 确保使用正确的starter
# Spring Boot 2.x 使用: sa-token-spring-boot-starter
# Spring Boot 3.x 使用: sa-token-spring-boot3-starter
```

#### 13.2 跨域问题

```java
// CorsConfig.java
package com.example.satoken.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

#### 13.3 配置文件优先级

1. application.yml
2. application-{profile}.yml
3. 系统环境变量
4. Java系统属性

### 十四、扩展功能

#### 14.1 集成 Redis

```yml
# application-redis.yml
sa-token:
  # 配置 Token 持久化到 Redis
  token-prefix: satoken:
  timeout: 2592000
  activity-timeout: -1
  is-concurrent: true
  is-share: true
  # 开启持久化
  is-store: true
```

#### 14.2 多账号体系

```java
// 定义多个StpUtil
// 在StpInterfaceImpl中通过loginType参数区分不同账号体系
public class StpInterfaceImpl implements StpInterface {
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        if ("admin".equals(loginType)) {
            // 管理员权限
        } else if ("user".equals(loginType)) {
            // 用户权限
        }
        return new ArrayList<>();
    }
}
```

### 十五、项目启动

克隆或创建项目

修改`application.yml`中的配置

运行`SaTokenApplication.main()`

访问`http://localhost:8080/swagger-ui.html`查看API文档

使用Postman测试接口

这个教程提供了完整的Spring Boot 3.2.5整合Sa-Token 1.44.0的解决方案，包含了认证、鉴权、会话管理、异常处理等完整功能。


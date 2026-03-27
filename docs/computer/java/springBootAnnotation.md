# Spring Boot Web 后端开发：全场景常用注解速查指南

在 Spring Boot 开发中，注解（Annotation）是灵魂所在。它们极大地简化了配置、依赖管理、请求映射及数据持久化等工作。本文将按功能模块分类，详解 14 大类 常用注解，涵盖作用、场景及核心代码示例。

## 1. 核心启动与配置注解

构建应用的基石，负责引导启动与环境配置。

|注解	|核心作用	|典型场景|
|---|---|---|
|`@SpringBootApplication`	|主启动类标识。组合了 `@Configuration + @EnableAutoConfiguration + @ComponentScan`。	Spring Boot |应用入口。|
|`@Configuration`	|声明配置类，可包含 `@Bean` 方法。	|定义额外的 `Bean` 或复杂配置。|
|`@ComponentScan`	|定义组件扫描路径（默认扫描当前包及子包）。	|手动指定扫描 `@Component`, `@Service` 等类的路径。|
|`@PropertySource`	|加载指定的属性文件到 `Environment`。|加载自定义配置文件（如 `custom.properties`）。|
|`@Value`	|注入配置文件中的单个属性值。	|获取 `application.properties` 中的配置项。|
|`@ConfigurationProperties`	|将配置属性批量绑定到 `Java Bean`。	|结构化读取配置（如 `app.name, app.version`）。|
|`@Import / @ImportResource`	|导入其他配置类或 `XML` 文件。	|整合旧项目配置或模块化配置。|

### 常见应用

1. 启动类

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

2. 配置类与 Bean 定义

```java
@Configuration
public class AppConfig {
    @Bean
    public MyService myService() { 
        return new MyService(); 
    }
}
```

3. 组件扫描

```java
@Configuration
@ComponentScan(basePackages = "com.example.service")
public class ScanConfig {}
```

4. 属性加载与注入

```java
@Configuration
@PropertySource("classpath:custom.properties")
public class PropConfig {
    @Value("${server.port}")
    private int port;
}
```

5. 配置属性绑定

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name; 
    private String version;
    // getter/setter 省略
}
```

6. 导入配置

```java

@Configuration
@Import(DatabaseConfig.class)
@ImportResource("classpath:old-config.xml")
public class CombinedConfig {}
```

## 2. 控制器与请求映射注解

处理 HTTP 请求的核心，RESTful API 开发必备。

### 2.1 类级别注解

|注解	|作用	|区别|
|---|---|---|
|`@Controller`	|标记为 MVC 控制器，通常返回视图名称。	|适用于传统服务端渲染（`Thymeleaf/JSP`）。|
|`@RestController`	|`@Controller + @ResponseBody`。返回值直接作为 HTTP 响应体（`JSON/XML`）。	|RESTful API 首选，无需在每个方法加 `@ResponseBody`。|

### 2.2 请求映射与方法参数

|注解	|作用	|代码示例|
|---|---|---|
|`@RequestMapping`	|通用请求映射，可指定 path, method, params 等。	|`@RequestMapping(value="/hello", method=RequestMethod.GET)`|
|`@GetMapping`	|处理 GET 请求（查询）。	|`@GetMapping("/users")`|
|`@PostMapping`	|处理 POST 请求（创建）。	|`@PostMapping("/users")`|
|`@PutMapping`	|处理 PUT 请求（全量更新）。	|`@PutMapping("/users/{id}")`|
|`@DeleteMapping`	|处理 DELETE 请求（删除）。	|`@DeleteMapping("/users/{id}")`|
|`@PatchMapping`	|处理 PATCH 请求（部分更新）。	|`@PatchMapping("/users/{id}")`|
|`@RequestBody`	|将 HTTP 请求体（JSON）反序列化为 Java 对象。	|`public User create(@RequestBody User user)`|
|`@RequestParam`	|获取 URL 查询参数（`?key=value`）。	|`public List<User> list(@RequestParam(defaultValue="0") int page)`|
|`@PathVariable`	|获取 URL 路径变量（`/users/{id}`）。	|`public User get(@PathVariable Long id)`|
|`@RequestHeader`	|获取请求头信息（如 `Token`, `User-Agent`）。	|`@RequestHeader("Authorization") String token`|
|`@CookieValue`	|获取 Cookie 值。	|`@CookieValue("sessionId") String sessionId`|
|`@ModelAttribute`	|绑定表单数据到对象，或为模型添加公共属性。	|`public String register(@ModelAttribute User user)`|

## 3. 依赖注入与组件注册

Spring IOC 容器的核心，管理 Bean 的生命周期。

|注解	|层级/作用	|说明|
|---|---|---|
|`@Component`	|通用组件	|任意层，Spring 自动扫描注册。|
|`@Service`	|业务逻辑层	|`@Component` 的特化，语义更清晰。|
|`@Repository`	|数据访问层	|`@Component` 的特化，自动转换持久层异常。|
|`@Autowired`	|按类型注入	|可用于字段、构造器、Setter。推荐构造器注入。|
|`@Qualifier`	|按名称注入	|配合 `@Autowired` 解决同类型多 `Bean` 歧义。|
|`@Primary`	|首选 `Bean`	|当存在多个同类型 `Bean` 时，优先注入此 `Bean`。|
|`@Resource`	|`JSR-250` 标准	|默认按名称注入，也可指定 `name` 属性。|
|`@Lazy`	|延迟加载	|直到第一次使用时才创建 `Bean`，优化启动或解决循环依赖。|
|`@Scope`	|作用域	|定义 `Bean` 生命周期（`singleton, prototype, request, session`）。|
|`@PostConstruct`	|初始化回调	|依赖注入完成后执行，用于初始化逻辑。|
|`@PreDestroy`	|销毁回调	|`Bean` 销毁前执行，用于资源释放。|

## 4. 数据访问 (JPA / Spring Data)

ORM 映射与数据库操作。

### 4.1 实体映射

|注解	|作用	|示例|
|---|---|---|
|`@Entity`	|标记 `JPA` 实体类。	|`@Entity @Table(name="users")`|
|`@Id / @GeneratedValue`	|主键及生成策略。	|`@Id @GeneratedValue(strategy=GenerationType.IDENTITY)`|
|`@Column`	|字段列映射（名称、非空、长度）。	|`@Column(name="user_name", nullable=false)`|
|`@Transient`	|忽略字段，不存入数据库。	|`@Transient private int tempCalc;`|
|`@Enumerated`	|枚举映射（`STRING` 或 `ORDINAL`）。	|`@Enumerated(EnumType.STRING)`|
|`@Lob`	|大对象（`CLOB/BLOB`）。	|`@Lob private byte[] image;`|

### 4.2 关联关系

|注解	|关系类型	|关键点|
|---|---|---|
|`@OneToOne`	|一对一	|配合 `@JoinColumn` 指定外键。|
|`@OneToMany`	|一对多	|通常在“一”的一方，配合 `mappedBy`。|
|`@ManyToOne`	|多对一	|通常在“多”的一方，拥有外键。|
|`@ManyToMany`	|多对多	|需配合 `@JoinTable` 定义中间表。|

### 4.3 Repository 查询

|注解	|作用	|示例|
|---|---|---|
|`@Query`	|自定义 `JPQL/SQL` 查询。	|`@Query("SELECT u FROM User u WHERE u.email=:email")`|
|`@Modifying`	|标识更新/删除操作。	|配合 `@Query` 执行 `UPDATE` 语句。|
|`@Param`	|命名参数绑定。	|`User findByEmail(@Param("email") String email)`|

### 5. 事务、缓存与异步

提升系统性能、一致性与并发处理能力。

|类别	|注解	|作用与场景|
|---|---|---|
|事务	|`@Transactional`	|声明式事务。控制传播行为、隔离级别、超时、只读等。常用于 `Service` 层。|
|缓存	|`@EnableCaching`	|开启缓存支持（配置类）。|
||`@Cacheable`	|查缓存。先查缓存，命中则返回，未命中则执行方法并缓存结果。|
||`@CachePut`	|更新缓存。总是执行方法，并将结果更新到缓存。|
||`@CacheEvict`	|清除缓存。删除指定 `key` 的缓存。|
|异步	|`@EnableAsync`	|开启异步支持。|
||`@Async`	|标记方法异步执行，调用者立即返回，不阻塞主线程。|
|定时	|`@EnableScheduling`	|开启定时任务支持。|
||`@Scheduled`	|定义定时任务（`cron, fixedRate, fixedDelay`）。|

### 6. 异常处理与跨域

增强系统的健壮性与兼容性。

|注解	|作用	|典型用法|
|---|---|---|
|`@RestControllerAdvice`	|全局异常处理（`REST` 风格）。组合了 `@ControllerAdvice + @ResponseBody`。	|统一捕获 `Controller` 抛出的异常，返回标准 `JSON` 错误格式。|
|`@ExceptionHandler`	|指定处理的异常类型。	|写在 `Advice` 类的方法上，如 `@ExceptionHandler(ResourceNotFoundException.class)`。|
|`@InitBinder`	|自定义数据绑定。	|如自定义日期格式化解析。|
|`@CrossOrigin`	|跨域支持。	|加在 `Controller` 类或方法上，允许特定来源访问。|

### 7. 条件化配置 (自动配置核心)

Spring Boot 自动配置的底层原理，用于高级定制。

|注解	|触发条件	|场景|
|---|---|---|
|`@ConditionalOnClass`	|类路径存在指定类。	|引入某依赖后才自动配置相关 `Bean`。|
|`@ConditionalOnMissingBean`	|容器中不存在指定 `Bean`。|	提供默认实现，用户可自定义覆盖。|
|`@ConditionalOnProperty`	|配置文件属性匹配。	|根据 `application.properties` 开关功能。|
|`@ConditionalOnWebApplication`	|当前是 `Web` 环境。	|仅 `Web` 项目生效的配置。|
|`@Profile`	|激活特定环境 `Profile`。	|`@Profile("dev")` 仅在开发环境加载。|

### 8. 测试注解

单元测试与集成测试利器。

|注解	|适用范围	|特点|
|---|---|---|
|`@SpringBootTest`	|集成测试	|加载完整应用上下文，测试全链路。|
|`@WebMvcTest`	|`Controller` 层测试	|切片测试，只加载 `Web` 相关 `Bean`，需 `Mock Service`。|
|`@DataJpaTest`	|`Repository` 层测试	|自动配置内存数据库，测试 `JPA` 操作。|
|`@MockBean`	|所有测试	|将 `Mockito` 模拟对象注入容器，替换真实 `Bean`。|
|`@Sql`	|数据准备	|测试前执行 `SQL` 脚本初始化数据。|

### 9. Lombok 常用注解

消除样板代码，让代码更简洁（需安装插件）。

|注解	|生成内容	|推荐场景|
|---|---|---|
|`@Data`	|`Getter, Setter, toString, equals, hashCode`	|普通 `DTO/POJO`。|
|`@Builder`	|建造者模式	|构建复杂对象，链式调用。|
|`@NoArgsConstructor / @AllArgsConstructor`	|无参/全参构造器	|`JPA` 实体必须有无参构造。|
|`@Slf4j`	|日志对象 `log`	|替代手动定义 `Logger`。|
|`@RequiredArgsConstructor`	|包含 `final/@NonNull` 字段的构造器	|依赖注入推荐（配合 `private final` 字段）。|
|`@Value`	|不可变类 (`Immutable`)	|所有字段 `private final`，无 `Setter`。|

### 10. Spring Security 常用注解

方法级安全控制。

|注解	|作用	|表达式示例|
|---|---|---|
|`@PreAuthorize`	|方法执行前校验权限（推荐）。	|`@PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")`|
|`@PostAuthorize`	|方法执行后校验返回值权限。	|`@PostAuthorize("returnObject.owner == authentication.name")`|
|`@Secured`	|基于角色的简单校验。	|`@Secured("ROLE_ADMIN")`|
|`@AuthenticationPrincipal`	|注入当前登录用户对象。	|`public User getCurrent(@AuthenticationPrincipal UserDetails user)`|


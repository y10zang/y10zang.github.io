# 简单的MyBatis实例

下面是一个简单的MyBatis实例，展示如何进行基本的CRUD操作。

### 1. 项目结构

```
src/main/
  java/
    com/example/
      entity/User.java
      mapper/UserMapper.java
      MyBatisDemo.java
  resources/
    mybatis-config.xml
    mapper/UserMapper.xml
```

### 2. Maven依赖 (pom.xml)

```xml
<dependencies>
    <!-- MyBatis核心 -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.9</version>
    </dependency>
    
    <!-- MySQL驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.28</version>
    </dependency>
    
    <!-- 日志 -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.7.36</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.11</version>
    </dependency>
</dependencies>
```

### 3. 实体类 (User.java)

```java
package com.example.entity;
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private String email;
    public User() {}
    public User(String name, Integer age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    // Getter和Setter方法
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                '}';
    }
}
```

### 4. Mapper接口 (UserMapper.java)

```java
package com.example.mapper;
import com.example.entity.User;
import java.util.List;
public interface UserMapper {
    // 根据ID查询用户
    User selectUserById(Integer id);
    
    // 查询所有用户
    List<User> selectAllUsers();
    
    // 添加用户
    int insertUser(User user);
    
    // 更新用户
    int updateUser(User user);
    
    // 删除用户
    int deleteUser(Integer id);
}
```

### 5. MyBatis配置文件 (mybatis-config.xml)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 类型别名 -->
    <typeAliases>
        <package name="com.example.entity"/>
    </typeAliases>
    
    <!-- 环境配置 -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mydb?useSSL=false&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="yourpassword"/>
            </dataSource>
        </environment>
    </environments>
    
    <!-- 映射器 -->
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

### 6. Mapper XML文件 (UserMapper.xml)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
    <!-- 根据ID查询用户 -->
    <select id="selectUserById" resultType="User">
        SELECT * FROM user WHERE id = #{id}
    </select>
    
    <!-- 查询所有用户 -->
    <select id="selectAllUsers" resultType="User">
        SELECT * FROM user
    </select>
    
    <!-- 添加用户 -->
    <insert id="insertUser" parameterType="User">
        INSERT INTO user (name, age, email) 
        VALUES (#{name}, #{age}, #{email})
    </insert>
    
    <!-- 更新用户 -->
    <update id="updateUser" parameterType="User">
        UPDATE user 
        SET name = #{name}, age = #{age}, email = #{email} 
        WHERE id = #{id}
    </update>
    
    <!-- 删除用户 -->
    <delete id="deleteUser" parameterType="int">
        DELETE FROM user WHERE id = #{id}
    </delete>
</mapper>
```

### 7. 主程序 (MyBatisDemo.java)

```java
package com.example;
import com.example.entity.User;
import com.example.mapper.UserMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
public class MyBatisDemo {
    
    public static void main(String[] args) throws IOException {
        // 1. 读取配置文件
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        
        // 2. 创建SqlSessionFactory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        
        // 3. 创建SqlSession
        try (SqlSession session = sqlSessionFactory.openSession()) {
            // 4. 获取Mapper接口
            UserMapper userMapper = session.getMapper(UserMapper.class);
            
            // 5. 测试查询所有用户
            System.out.println("=== 查询所有用户 ===");
            List<User> users = userMapper.selectAllUsers();
            users.forEach(System.out::println);
            
            // 6. 测试添加用户
            System.out.println("\n=== 添加用户 ===");
            User newUser = new User("张三", 25, "zhangsan@example.com");
            int insertResult = userMapper.insertUser(newUser);
            System.out.println("添加结果: " + insertResult + ", 新用户ID: " + newUser.getId());
            
            // 7. 测试查询用户
            System.out.println("\n=== 查询ID为1的用户 ===");
            User user = userMapper.selectUserById(1);
            System.out.println(user);
            
            // 8. 测试更新用户
            System.out.println("\n=== 更新用户 ===");
            if (user != null) {
                user.setAge(26);
                user.setEmail("zhangsan.new@example.com");
                int updateResult = userMapper.updateUser(user);
                System.out.println("更新结果: " + updateResult);
                
                // 再次查询验证更新
                user = userMapper.selectUserById(1);
                System.out.println("更新后: " + user);
            }
            
            // 9. 测试删除用户
            System.out.println("\n=== 删除用户 ===");
            int deleteResult = userMapper.deleteUser(5); // 删除ID为5的用户
            System.out.println("删除结果: " + deleteResult);
        }
    }
}
```

### 数据库准备

在MySQL中创建数据库和表：

```sql
CREATE DATABASE mydb;
USE mydb;
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT,
  email VARCHAR(100)
);
```

# SpringBoot + Mybatis 实例

下面给出一个 完整的 Spring Boot + MyBatis（使用 mybatis‑spring‑boot‑starter）的示例工程。
示例的目标是实现对 User 表的 CRUD 操作，演示：

Maven 依赖配置

`application.yml` 中的数据库连接配置

实体类、Mapper 接口、Mapper XML

Service / Repository（可选）层的实现

控制器（REST API）供前端调用

单元测试示例

技术栈

> Spring Boot 3.x（对应 Spring Boot 3.2）<br>
> MyBatis‑Spring‑Boot‑Starter 2.x <br>
> MySQL 8.x（或兼容的 MariaDB）<br>
> Lombok（简化 getter/setter）<br>
> JUnit 5（单元测试）


目录结构（约）

```
src/main/
 ├─ java/
 │   └─ com.example.demo/
 │        ├─ DemoApplication.java
 │        ├─ entity/User.java
 │        ├─ mapper/UserMapper.java
 │        ├─ mapper/xml/UserMapper.xml
 │        ├─ service/UserService.java
 │        └─ controller/UserController.java
 └─ resources/
      ├─ application.yml
      └─ mapper/
           └─ UserMapper.xml
```

下面一步一步展开每个文件的内容。

### Maven 依赖 (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>mybatis-springboot-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mybatis-springboot-demo</name>
    <description>demo for MyBatis + Spring Boot</description>
    <properties>
        <!-- Spring Boot 3.x -->
        <spring-boot.version>3.2.4</spring-boot.version>
        <java.version>17</java.version>
        <!-- MyBatis‑Spring‑Boot‑Starter 2.x 与 SpringBoot 3.x 对齐 -->
        <mybatis-spring-boot.version>3.0.3</mybatis-spring-boot.version>
    </properties>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter-bom</artifactId>
                <version>${mybatis-spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <dependencies>
        <!-- Spring Boot starter (includes Spring Core, Web, etc.) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <!-- Spring Web（RESTful API） -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- MyBatis Spring Boot Starter -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>
        <!-- MySQL驱动 -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- Lombok（可选） -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!-- 单元测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- JUnit 5 (already included in spring-boot-starter-test) -->
    </dependencies>
    <build>
        <plugins>
            <!-- Maven Compiler Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
            <!-- Spring Boot Maven Plugin（打包为可执行 jar） -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

关键点

`mybatis-spring-boot-starter` 通过 自动配置 把 `MyBatis` 的 `SqlSessionFactory`、`SqlSession`、`MapperScannerConfigurer` 等注入 `Spring` 容器，无需手动写 `mybatis-config.xml`。

`mybatis-spring-boot-starter-bom` 用来管理 `MyBatis` 与 `Spring Boot` 的兼容版本（这里使用 3.0.x 与 Boot 3.x 对齐）。
若使用 `Lombok`，记得在 IDE 中开启注解处理，编译时会自动生成 `getter`、`setter`、构造函数等。

### 数据库准备

在本地 MySQL 中执行下面的 SQL，创建表和测试数据：

```sql
CREATE DATABASE IF NOT EXISTS demo_db;
USE demo_db;
CREATE TABLE user (
    id   BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age  INT,
    email VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO user (name, age, email) VALUES
('Alice', 30, 'alice@example.com'),
('Bob',   25, 'bob@example.com');
```

### Spring Boot 配置 (application.yml)

```yaml
spring:
  datasource:
    # 使用数据库连接池（Spring Boot 默认 Hikari）
    url: jdbc:mysql://localhost:3306/demo_db?useSSL=false&serverTimezone=UTC
    username: root
    password: your_password_here
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 下面是可选的连接池属性
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000  # MyBatis 自动映射的别名（可选）; 这里直接写包名即可
mybatis:
  # 扫描的 Mapper 接口所在的包
  mapper-locations: classpath:mapper/*.xml
  # 别名别名别名设置（可选）
  type-aliases-package: com.example.demo.entity
  configuration:
    # 下划线自动转驼峰
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

说明

`mapper-locations` 指向 `src/main/resources/mapper` 目录下的 XML 文件。

> `type-aliases-package` 让 `MyBatis` 能把 `com.example.demo.entity.User` 直接映射为 `User`，简化结果映射。

### 实体类 (User.java)

```java
package com.example.demo.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 简单的 User 实体
 */
@Data       // @Getter @Setter @RequiredArgsConstructor @ToString 合集
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

为什么用 `Lombok`？

`@Data` 自动生成 `getter`、`setter`、`toString()`、`equals()`、`hashCode()`，以及无参/全参构造函数，省去样板代码。

若不想使用 `Lombok`，可手动编写这些方法。

### Mapper 接口 (UserMapper.java)

```java
import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
/**
 * MyBatis Mapper，标记为 @Mapper 后可直接被 Spring 扫描注入。
 */
@Mapper
public interface UserMapper {
    /** 根据主键查询 */
    User selectById(Long id);
    /** 查询全部用户 */
    List<User> selectAll();
    /** 新增用户（返回生成的主键） */
    int insert(User user);
    /** 更新（返回受影响的行数） */
    int update(User user);
    /** 逻辑删除（软删）示例——这里演示物理删 */
    int deleteById(Long id);
}
```

注意

`@Mapper` 注解让 `Spring` 在启动时自动将该接口注册为 `Bean`。

如果你想把 SQL 放在 XML 文件里，这里的接口只声明方法签名，返回值和参数保持即可。

### Mapper XML (UserMapper.xml)

路径：`src/main/resources/mapper/UserMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.mapper.UserMapper">
    <!-- 根据主键查询 -->
    <select id="selectById" resultType="User">
        SELECT id, name, age, email FROM user WHERE id = #{id}
    </select>
    <!-- 查询全部 -->
    <select id="selectAll" resultType="User">
        SELECT id, name, age, email FROM user
    </select>
    <!-- 新增 -->
    <insert id="insert" parameterType="User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO user(name, age, email) VALUES(#{name}, #{age}, #{email})
    </insert>
    <!-- 更新 -->
    <update id="update" parameterType="User">
        UPDATE user SET name = #{name}, age = #{age}, email = #{email}
        WHERE id = #{id}
    </update>
    <!-- 删除 -->
    <delete id="deleteById" parameterType="long">
        DELETE FROM user WHERE id = #{id}
    </delete>
</mapper>
```

关键属性

`namespace` 必须与 `Mapper` 接口全限定名保持一致。

`useGeneratedKeys+keyProperty` 用来把自增主键回写到实体对象（如 id 字段）。

参数使用 `#{}` 绑定，避免 `SQL` 注入。

### Service 层（可选但推荐） (UserService.java)

```java
package com.example.demo.service;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
/**
 * 业务层，封装 Mapper，业务逻辑可以在这里写。
 */
@Service
public class UserService {
    @Autowired
    private final UserMapper userMapper;
    
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    public User findById(Long id) {
        return userMapper.selectById(id);
    }
    public List<User> findAll() {
        return userMapper.selectAll();
    }
    public User create(User user) {
        int affected = userMapper.insert(user);
        if (affected > 0) {
            return user; // 已经把自增的 id 填充到对象中
        }
        return null;
    }
    public boolean update(User user) {
        return userMapper.update(user) > 0;
    }
    public boolean delete(Long id) {
        return userMapper.deleteById(id) > 0;
    }
}
```

为什么要有 Service 层？

> 中间层可以聚合多个 `Mapper` 的调用，实现事务控制（使用 `@Transactional`）。

业务规则（校验、日志、统计）等都可以放在这里。

### REST 控制器 (UserController.java)

```java
package com.example.demo.controller;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
/**
 * 简单的 CRUD REST API
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private final UserService userService;
    
    /** 查询所有用户 */
    @GetMapping
    public ResponseEntity<List<User>> listAll() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    /** 根据 ID 查询 */
    @GetMapping("/{id}")
    public ResponseEntity<User> getOne(@PathVariable Long id) {
        User user = userService.findById(id);
        return (user == null)
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(user);
    }
    /** 创建新用户 */
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        User created = userService.create(user);
        return (created == null)
                ? ResponseEntity.badRequest().build()
                : ResponseEntity.ok(created);
    }
    /** 更新用户 */
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody User user) {
        // 确保路径 ID 与请求体 ID 一致
        if (!id.equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        boolean updated = userService.update(user);
        return updated ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
    /** 删除用户 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = userService.delete(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}
```

#### RESTful 设计

```
GET /api/users：列表
GET /api/users/{id}：单条记录
POST /api/users：创建
PUT /api/users/{id}：完整更新
DELETE /api/users/{id}：删除
```

### 主入口 (DemoApplication.java)

```java
package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/**
 * Spring Boot 启动类
 */
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 单元测试示例 (UserMapperTest.java)

```java
package com.example.demo.mapper;
import com.example.demo.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest   // 加载完整的 Spring Boot 应用上下文
class UserMapperTest {
    @Autowired
    private UserMapper userMapper;
    @Test
    void testSelectAll() {
        List<User> users = userMapper.selectAll();
        assertTrue(users.size() >= 0);
        System.out.println("查询到的用户数：" + users.size());
    }
    @Test
    void testInsertAndSelect() {
        User newUser = new User(null, "Charlie", 28, "charlie@example.com");
        int affected = userMapper.insert(newUser);
        assertEquals(1, affected);
        System.out.println("插入后 id = " + newUser.getId());
        User fetched = userMapper.selectById(newUser.getId());
        assertNotNull(fetched);
        assertEquals("Charlie", fetched.getName());
    }
}
```

运行方式：在 IDE（如 IntelliJ IDEA、VS Code）中直接右键点击测试方法运行，或在命令行`mvn test`。

### 完整打包与运行

```bash
# 1. 先确保本地有 MySQL，且表已经创建（上文 step 2）
# 2. 修改 application.yml 中的 username/password 为自己的账号
# 3. 编译并打包
mvn clean package
# 4. 运行
java -jar target/mybatis-springboot-demo-0.0.1-SNAPSHOT.jar
```

启动后，Spring Boot 会在 3000 端口（默认）上启动 `RESTful API`。

可以使用 `curl/Postman` 进行测试：

```bash
# 查询所有用户
curl http://localhost:8080/api/users# 创建用户
curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"David","age":31,"email":"david@example.com"}'
```

### 常见扩展（可选）

|需求	|示例代码/配置|
|---|---|
|事务管理	|在 `Service` 方法上加 `@Transactional`，`Spring Boot` 会自动为其创建事务。|
|分页插件	|在 `application.yml` 加入 `mybatis-pagehelper` 配置，或使用 `PageHelper Spring Boot Starter`。|
|动态 `SQL`	|在 `XML` 中使用 `<if>, <choose>` 等标签编写更复杂的查询条件。|
|多数据源	|在 `application.yml` 为不同业务配置多个 `datasource`，并在 `MybatisConfig` 中分别注入 `SqlSessionFactory`。|
|全局异常处理	|编写 `@ControllerAdvice` 类统一返回统一错误格式。|
|`Swagger / OpenAPI`	|添加 `springdoc-openapi-ui` 依赖，自动为 `REST API` 生成文档。|

### 小结

通过 `mybatis‑spring‑boot‑starter`，`MyBatis` 的配置大幅简化——只要在 `mapper-locations` 与 `mapper` 接口上标注 `@Mapper` 即可； <br>
`application.yml` 只需配置数据源即可，无需手动写 `mybatis-config.xml`； <br>
采用 `Mapper` 接口 +` XML` 方式可以写比较复杂的 `SQL`，而 `Mapper` 接口+`@Select` 注解（可选）也能省去 `XML` 文件； <br>
通过 `Service` 层统一业务，配合 `@Transactional` 能轻松控制事务； <br>
最后通过 `REST Controller` 对外提供增删改查接口，即可完成一个完整的 `CRUD` 示例。

# SpringBoot + Mybatis 例子2

`pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.5.14-SNAPSHOT</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name/>
	<description/>
	<url/>
	<licenses>
		<license/>
	</licenses>
	<developers>
		<developer/>
	</developers>
	<scm>
		<connection/>
		<developerConnection/>
		<tag/>
		<url/>
	</scm>
	<properties>
		<java.version>21</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<!-- MyBatis Spring Boot Starter -->
		<!-- Source: https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>3.0.5</version>
			<scope>compile</scope>
		</dependency>
		<!-- Source: https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
		<dependency>
			<groupId>com.mysql</groupId>
			<artifactId>mysql-connector-j</artifactId>
			<version>9.6.0</version>
			<scope>runtime</scope>
		</dependency>
		<!-- Source: https://mvnrepository.com/artifact/org.projectlombok/lombok -->
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>1.18.44</version>
			<scope>compile</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
	<repositories>
		<repository>
			<id>spring-snapshots</id>
			<name>Spring Snapshots</name>
			<url>https://repo.spring.io/snapshot</url>
			<releases>
				<enabled>false</enabled>
			</releases>
		</repository>
	</repositories>
	<pluginRepositories>
		<pluginRepository>
			<id>spring-snapshots</id>
			<name>Spring Snapshots</name>
			<url>https://repo.spring.io/snapshot</url>
			<releases>
				<enabled>false</enabled>
			</releases>
		</pluginRepository>
	</pluginRepositories>

</project>
```

目录结构

```
src/main/
 ├─ java/
 │   └─ com.example.demo/
 │        ├─ DemoApplication.java
 │        ├─ entity/
 │        │  └─ User.java
 │        ├─ mapper/
 │        │  └─ UserMapper.java
 │        ├─ service/
 │        │  ├─ impl/
 │        │  │   └─ UserServiceImpl.java
 │        │  └─ UserService.java
 │        └─ controller/
 │           └─ UserController.java
 └─ resources/
      ├─ application.yaml
      └─ mapper/
           └─ UserMapper.xml
```

`application.yaml`

```yml
server:
  port: 8099
spring:
  application:
    name: demo
  datasource:
    # 使用数据库连接池（Spring Boot 默认 Hikari）
    url: jdbc:mysql://localhost:3306/test_db?useUnicode=true&characterEncoding=utf-8
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 下面是可选的连接池属性
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  main:
    allow-bean-definition-overriding: true
mybatis:
  # 扫描的 Mapper 接口所在的包
#  config-location: classpath:mybatis-config.xml
  mapper-locations: classpath:mapper/*.xml
#  type-aliases-package: com.example.demo.entity
  configuration:
    # 下划线自动转驼峰
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

主启动类

```java
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.example.demo.mapper")
@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
```

`User.java`

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 简单的 User 实体
 */
@Data       // @Getter @Setter @RequiredArgsConstructor @ToString 合集
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}

```

`UserController.java`

```java
import com.example.demo.entity.User;
import com.example.demo.service.impl.UserServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
/**
 * 简单的 CRUD REST API
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Resource
    private UserServiceImpl userService;

    /** 查询所有用户 */
    @GetMapping
    public List<User> listAll() {
        System.out.println("------查询开始------");
        List<User> users = userService.findAll();
        System.out.println("------> " + users);
        System.out.println("------查询结束------");
        return users;
    }
    /** 根据 ID 查询 */
    @GetMapping("/{id}")
    public ResponseEntity<User> getOne(@PathVariable Long id) {
        User user = userService.selectUserById(id);
        return (user == null)
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(user);
    }
    /** 创建新用户 */
    @PostMapping
    public int create(@RequestBody User user) {
        return userService.insertUser(user);
    }
    /** 更新用户 */
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody User user) {
        // 确保路径 ID 与请求体 ID 一致
        if (!id.equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        boolean updated = userService.updateUser(user);
        return updated ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
    /** 删除用户 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
```

`UserService.java`

```java
import com.example.demo.entity.User;

import java.util.List;

public interface UserService {

    // 根据ID查询用户
    User selectUserById(Long id);

    // 查询所有用户
    List<User> findAll();

    // 添加用户
    int insertUser(User user);

    // 更新用户
    boolean updateUser(User user);

    // 删除用户
    boolean deleteUser(Long id);
}
```

`UserServiceImpl.java`

```java
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;
/**
 * 业务层，封装 Mapper，业务逻辑可以在这里写。
 */
@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    public User selectUserById(Long id) {
        return userMapper.selectById(id);
    }
    public List<User> findAll() {
        return userMapper.selectAll();
    }
    public int insertUser(User user) {
        int affected = userMapper.insert(user);
        if (affected > 0) {
            return affected; // 已经把自增的 id 填充到对象中
        }
        return 0;
    }
    public boolean updateUser(User user) {
        return userMapper.update(user) > 0;
    }
    public boolean deleteUser(Long id) {
        return userMapper.deleteById(id) > 0;
    }
}
```

`UserMapper.java`

```java
import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
/**
 * MyBatis Mapper，标记为 @Mapper 后可直接被 Spring 扫描注入。
 */
public interface UserMapper {
    // 根据ID查询用户
    User selectById(Long id);

    // 查询所有用户
    List<User> selectAll();

    // 添加用户
    int insert(User user);

    // 更新用户
    int update(User user);

    // 删除用户
    int deleteById(Long id);
}
```

`UserMapper.xml`

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.mapper.UserMapper">
    <!-- 查询全部 -->
    <select id="selectAll" resultType="com.example.demo.entity.User">
        SELECT id, name, age, email FROM user
    </select>
    <!-- 根据ID查询用户 -->
    <select id="selectById" resultType="com.example.demo.entity.User">
        SELECT id, name, age, email FROM user WHERE id = #{id}
    </select>
    <!-- 添加用户 -->
    <insert id="insert" parameterType="com.example.demo.entity.User">
        INSERT INTO user (id, name, age, email)
        VALUES (#{id}, #{name}, #{age}, #{email})
    </insert>

    <!-- 更新用户 -->
    <update id="update" parameterType="com.example.demo.entity.User">
        UPDATE user
        SET name = #{name}, age = #{age}, email = #{email}
        WHERE id = #{id}
    </update>

    <!-- 删除用户 -->
    <delete id="deleteById" parameterType="Long">
        DELETE FROM user WHERE id = #{id}
    </delete>
</mapper>
```

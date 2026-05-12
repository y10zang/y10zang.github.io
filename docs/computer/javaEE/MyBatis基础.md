# Day 31: MyBatis基础（ORM概念、MyBatis配置、Mapper接口、动态SQL）

link: `https://mp.weixin.qq.com/s/7vnQDCZUXvzH3XsESVBsNw?`

### 学习目标

• 理解ORM（对象关系映射）的基本概念与优势 <br>
• 掌握MyBatis核心组件与架构工作流程 <br>
• 学会配置MyBatis集成Spring Boot 3.x <br>
• 熟练使用Mapper接口与XML映射文件进行CRUD操作 <br>
• 掌握动态SQL标签的实用技巧与常见陷阱规避 <br>
• 理解MyBatis缓存机制并合理配置提升性能 <br>
• 了解Windows平台下MyBatis的优化配置

### 一、ORM概念与优势

#### 1.1 什么是ORM？

对象关系映射（Object-Relational Mapping，ORM） 是一种编程技术，用于在关系型数据库和面向对象编程语言之间建立映射关系，实现数据库表与程序对象的自动转换。

#### 1.2 ORM的核心映射关系

|数据库概念|Java面向对象概念|
|---|---|
|表（Table）|（Class）|
|列（Column）|属性（Field）|
|行（Row）|对象（Object）|
|主键（Primary Key）|标识符（ID）|
|外键（Foreign Key）|对象引用（Reference）|

#### 1.3 ORM vs 传统JDBC：优势对比

##### 传统JDBC的痛点

1. 重复代码多：每次操作都要编写连接、语句、结果集处理代码
2. SQL与代码耦合：SQL语句硬编码在Java代码中，维护困难
3. 手动类型转换：ResultSet到对象的转换需要手动处理
4. 异常处理繁琐：需要多层`try-catch-finally`
5. 性能优化困难：连接池、缓存等需要额外实现

##### ORM的优势

1. 简化开发：自动生成CRUD代码，减少重复劳动
2. 解耦SQL：SQL与Java代码分离，便于维护和优化
3. 类型安全：编译期类型检查，避免运行时错误
4. 内置优化：提供连接池、缓存、懒加载等企业级特性
5. 跨数据库支持：通过方言适配不同数据库，提高可移植性

#### 1.4 MyBatis的定位：半自动化ORM

与Hibernate等全自动ORM不同，MyBatis采取半自动化策略：

• 保留SQL灵活性：开发者直接编写和优化SQL语句 <br>
• 自动化结果映射：自动将ResultSet转换为Java对象 <br>
• 动态SQL支持：提供标签化动态SQL拼接，避免Java代码拼接

适用场景对比：

• MyBatis：复杂查询、性能敏感、SQL调优需求高 <br>
• Hibernate：简单CRUD、快速开发、数据库无关性要求高

### 二、MyBatis架构与核心组件

#### 2.1 MyBatis整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         接口层                                  │
│                         SqlSession                              │
│    (MyBatis对外提供的唯一API入口，执行SQL、获取Mapper、管理事务)│
└────────────────────────┬────────────────────────────────────────┘
                         │ 调用
┌────────────────────────▼────────────────────────────────────────┐
│                      核心处理层                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  配置解析    │  │  SQL解析     │  │  SQL执行     │           │
│  │ (XML/注解)   │  │ (动态SQL生成)│  │ (Executor)   │           │
│  └──────────────┘  └──────────────┘  └──────┬───────┘           │
│                                             │                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────▼───────┐           │
│  │  结果映射    │  │  参数映射    │  │ StatementHandler│        │
│  │ (ResultSet)  │  │ (参数转换)   │  │ (PreparedStatement)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└────────────────────────┬────────────────────────────────────────┘
                         │ 依赖
┌────────────────────────▼────────────────────────────────────────┐
│                      基础支撑层                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│  │   日志模块 │ │  数据源模块│ │   缓存模块 │ │  事务模块  │    │
│  │ (Logging)  │ │ (DataSource)│ │   (Cache)  │ │(Transaction)│  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘    │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│  │  类型转换  │ │  反射模块  │ │资源加载模块│ │  解析器模块 │   │
│  │(TypeHandler)││ (Reflector) ││(ClassLoader)││  (XPath)   │    │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

MyBatis架构分为三层：

1. 基础支撑层：事务管理、连接池、缓存、日志
2. 核心处理层：SQL解析、参数映射、SQL执行、结果映射
3. 接口层：Mapper接口、SqlSession API

#### 2.2 四大核心组件详解

##### （1）SqlSessionFactory（会话工厂）

• 作用：创建SqlSession实例的工厂 <br>
• 生命周期：应用级别，通常整个应用只有一个实例 <br>
• 创建方式：

```java
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

##### （2）SqlSession（数据库会话）

• 作用：执行SQL操作的主要接口

• 生命周期：请求级别或方法级别，线程不安全

• 核心方法：

• `selectOne()`：查询单条记录

• `selectList()`：查询多条记录

• `insert()`：插入记录

• `update()`：更新记录

• `delete()`：删除记录

• `commit()`：提交事务

• `rollback()`：回滚事务

##### （3）Mapper接口（数据访问接口）

• 作用：定义数据访问方法，MyBatis通过动态代理生成实现

• 实现原理：JDK动态代理 + MappedStatement映射

##### （4）Executor（SQL执行器）

• 类型：

• `SimpleExecutor`：简单执行器，每次执行都创建新Statement

• `ReuseExecutor`：重用执行器，缓存Statement

• `BatchExecutor`：批处理执行器，用于批量操作

• `CachingExecutor`：缓存执行器，装饰模式，提供二级缓存

##### 2.3 MyBatis工作流程（执行时序）

1. 配置加载：读取`mybatis-config.xml`和`Mapper.xml`
2. 会话创建：`SqlSessionFactory`创建`SqlSession`
3. 获取`Mapper`：`SqlSession.getMapper()`获取代理对象
4. 方法调用：调用Mapper接口方法
5. SQL解析：根据方法签名找到对应的`MappedStatement`
6. 参数处理：`ParameterHandler`将Java参数转换为SQL参数
7. SQL执行：`StatementHandler`执行SQL语句
8. 结果映射：`ResultSetHandler`将`ResultSet`转换为Java对象
9. 返回结果：将结果返回给调用者

### 三、MyBatis配置详解

#### 3.1 核心配置文件：`mybatis-config.xml`

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 1. 属性配置（外部化配置） -->
    <properties resource="db.properties">
        <property name="username" value="root"/>
    </properties>
    <!-- 2. 设置（核心行为配置） -->
    <settings>
        <!-- 开启驼峰命名自动映射 -->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!-- 开启延迟加载 -->
        <setting name="lazyLoadingEnabled" value="true"/>
        <!-- 关闭积极加载 -->
        <setting name="aggressiveLazyLoading" value="false"/>
        <!-- 开启二级缓存（默认true） -->
        <setting name="cacheEnabled" value="true"/>
        <!-- SQL日志输出 -->
        <setting name="logImpl" value="SLF4J"/>
    </settings>
    <!-- 3. 类型别名 -->
    <typeAliases>
        <typeAlias alias="User" type="com.example.entity.User"/>
        <package name="com.example.entity"/>
    </typeAliases>
    <!-- 4. 类型处理器 -->
    <typeHandlers>
        <typeHandler handler="com.example.handler.JsonTypeHandler"/>
    </typeHandlers>
    <!-- 5. 环境配置（支持多环境） -->
    <environments default="development">
        <environment id="development">
            <!-- 事务管理器 -->
            <transactionManager type="JDBC"/>
            <!-- 数据源 -->
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
        <environment id="production">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${prod.driver}"/>
                <property name="url" value="${prod.url}"/>
                <property name="username" value="${prod.username}"/>
                <property name="password" value="${prod.password}"/>
                <property name="poolMaximumActiveConnections" value="20"/>
                <property name="poolMaximumIdleConnections" value="10"/>
            </dataSource>
        </environment>
    </environments>
    <!-- 6. Mapper文件注册 -->
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
        <mapper class="com.example.mapper.UserMapper"/>
        <package name="com.example.mapper"/>
    </mappers>
</configuration>
```

#### 3.2 Spring Boot 3.x整合配置

##### （1）`pom.xml`依赖配置（JDK 21 + Spring Boot 3.2.x）

```xml

<!-- Spring Boot父项目 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
</parent>
<!-- JDK版本 -->
<properties>
    <java.version>21</java.version>
    <mybatis-plus.version>3.5.6</mybatis-plus.version>
</properties>
<!-- 核心依赖 -->
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- MyBatis Plus Spring Boot 3 Starter（Jakarta EE兼容） -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
        <version>${mybatis-plus.version}</version>
    </dependency>
    <!-- MySQL驱动（支持JDK 21） -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.3.0</version>
    </dependency>
    <!-- Lombok简化代码 -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <!-- HikariCP连接池（Spring Boot默认，性能最优） -->
    <!-- 已包含在spring-boot-starter-jdbc中 -->
</dependencies>
```

##### （2）`application.yml`配置

```yaml

# Spring Boot应用配置
spring:
  application:
    name: mybatis-demo
  # 数据源配置（Windows平台MySQL）
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mybatis_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
    username: root
    password: 123456
    # HikariCP连接池配置（Windows性能优化）
    hikari:
      connection-timeout: 30000
      minimum-idle: 10
      maximum-pool-size: 30
      idle-timeout: 600000
      max-lifetime: 1800000
      connection-test-query: SELECT 1
  # JPA配置（可选，用于DDL生成）
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
# MyBatis Plus配置
mybatis-plus:
  # Mapper XML文件位置
  mapper-locations: classpath:mapper/**/*.xml
  # 实体类扫描包
  type-aliases-package: com.example.entity
  # 全局配置
  global-config:
    db-config:
      # 主键类型：ASSIGN_ID（雪花算法）、ASSIGN_UUID、AUTO
      id-type: ASSIGN_ID
      # 逻辑删除配置
      logic-delete-field: is_deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
  # 配置项
  configuration:
    # 自动驼峰命名映射
    map-underscore-to-camel-case: true
    # 开启二级缓存（默认true）
    cache-enabled: true
    # SQL日志输出
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 返回结果null也映射字段
    call-setters-on-nulls: true
```

#### 3.3 Windows平台特殊配置

##### （1）文件路径处理

```
# Windows路径使用正斜杠或双反斜杠
mybatis-plus:
  mapper-locations: 
    - classpath:mapper/*.xml
    - file:C:/myproject/mappers/*.xml  # Windows路径
```

##### （2）字符编码配置

```yml
# 确保Windows控制台中文显示正常
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
```

##### （3）性能优化参数

```yml
# Windows下MySQL连接优化
spring:
  datasource:
    hikari:
      # Windows文件系统较慢，适当增加超时时间
      connection-timeout: 30000
      # Windows线程切换开销较大，减少连接数
      maximum-pool-size: 20
      # Windows内存管理特点
      leak-detection-threshold: 60000
```

### 四、Mapper映射文件详解

#### 4.1 Mapper XML文件结构

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
    <!-- 1. 结果映射定义 -->
    <resultMap id="UserResultMap" type="User">
        <id property="id" column="id"/>
        <result property="userName" column="user_name"/>
        <result property="email" column="email"/>
        <result property="createTime" column="create_time"/>
        <result property="updateTime" column="update_time"/>
    </resultMap>
    <!-- 2. SQL片段复用 -->
    <sql id="Base_Column_List">
        id, user_name, email, create_time, update_time
    </sql>
    <!-- 3. CRUD操作定义 -->
</mapper>
```

#### 4.2 增删改查标签详解

##### （1）select标签

```xml
<!-- 根据ID查询 -->
<select id="selectById" parameterType="Long" resultType="User">
    SELECT <include refid="Base_Column_List"/>
    FROM user
    WHERE id = #{id}
</select>
<!-- 多条件查询 -->
<select id="selectByCondition" parameterType="map" resultMap="UserResultMap">
    SELECT <include refid="Base_Column_List"/>
    FROM user
    <where>
        <if test="userName != null and userName != ''">
            AND user_name LIKE CONCAT('%', #{userName}, '%')
        </if>
        <if test="email != null and email != ''">
            AND email = #{email}
        </if>
    </where>
</select>
```

##### （2）insert标签

```xml
<!-- 插入数据，返回自增主键 -->
<insert id="insert" parameterType="User" useGeneratedKeys="true" keyProperty="id">
    INSERT INTO user (user_name, email, create_time, update_time)
    VALUES (#{userName}, #{email}, #{createTime}, #{updateTime})
</insert>
<!-- 批量插入 -->
<insert id="batchInsert" parameterType="list">
    INSERT INTO user (user_name, email, create_time, update_time)
    VALUES 
    <foreach collection="list" item="item" separator=",">
        (#{item.userName}, #{item.email}, #{item.createTime}, #{item.updateTime})
    </foreach>
</insert>
```

##### （3）update标签

```xml
<!-- 更新数据 -->
<update id="update" parameterType="User">
    UPDATE user
    <set>
        <if test="userName != null and userName != ''">
            user_name = #{userName},
        </if>
        <if test="email != null and email != ''">
            email = #{email},
        </if>
        update_time = #{updateTime}
    </set>
    WHERE id = #{id}
</update>
<!-- 动态更新 -->
<update id="updateSelective" parameterType="User">
    UPDATE user
    <trim prefix="SET" suffixOverrides=",">
        <if test="userName != null">user_name = #{userName},</if>
        <if test="email != null">email = #{email},</if>
        update_time = NOW()
    </trim>
    WHERE id = #{id}
</update>
```

##### （4）delete标签

```xml
<!-- 根据ID删除 -->
<delete id="deleteById" parameterType="Long">
    DELETE FROM user WHERE id = #{id}
</delete>
<!-- 批量删除 -->
<delete id="batchDelete" parameterType="list">
    DELETE FROM user WHERE id IN
    <foreach collection="list" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</delete>
```

#### 4.3 高级映射：关联与集合

##### （1）一对一关联（association）

```xml
<!-- 用户与用户详情一对一 -->
<resultMap id="UserWithDetailMap" type="User">
    <id property="id" column="id"/>
    <result property="userName" column="user_name"/>
    <!-- 嵌套用户详情 -->
    <association property="userDetail" javaType="UserDetail">
        <id property="id" column="detail_id"/>
        <result property="realName" column="real_name"/>
        <result property="phone" column="phone"/>
    </association>
</resultMap>
<select id="selectUserWithDetail" resultMap="UserWithDetailMap">
    SELECT u.id, u.user_name, ud.id as detail_id, ud.real_name, ud.phone
    FROM user u
    LEFT JOIN user_detail ud ON u.id = ud.user_id
    WHERE u.id = #{id}
</select>
```

##### （2）一对多关联（collection）

```xml
<!-- 用户与订单一对多 -->
<resultMap id="UserWithOrdersMap" type="User">
    <id property="id" column="id"/>
    <result property="userName" column="user_name"/>
    <!-- 嵌套订单集合 -->
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="orderNo" column="order_no"/>
        <result property="amount" column="amount"/>
    </collection>
</resultMap>
<select id="selectUserWithOrders" resultMap="UserWithOrdersMap">
    SELECT u.id, u.user_name, o.id as order_id, o.order_no, o.amount
    FROM user u
    LEFT JOIN `order` o ON u.id = o.user_id
    WHERE u.id = #{id}
</select>
```

### 五、动态SQL详解

#### 5.1 动态SQL标签总览

|标签|作用|适用场景|
|---|---|---|
|`<if>`	|条件判断|根据参数决定是否拼接SQL片段|
|`<choose>/<when>/<otherwise>`	|多分支选择|类似Java的`switch-case`|
|`<where>`	|智能WHERE子句|自动处理`AND/OR`前缀，空条件省略WHERE|
|`<trim>`	|自定义修剪|灵活处理SQL片段前后缀|
|`<set>`	|智能SET子句|更新语句中自动处理逗号|
|`<foreach>`	|集合遍历|IN查询、批量操作|
|`<bind>`	|变量绑定|创建变量用于OGNL表达式|

#### 5.2 核心标签实战解析

##### （1）`<if>`标签：基础条件判断

```xml
<select id="selectUsers" parameterType="UserQuery" resultType="User">
    SELECT * FROM user
    <where>
        <!-- 字符串判断：null和空字符串 -->
        <if test="userName != null and userName != ''">
            AND user_name LIKE CONCAT('%', #{userName}, '%')
        </if>
        <!-- 数值判断：只需判断null -->
        <if test="age != null">
            AND age = #{age}
        </if>
        <!-- 日期判断 -->
        <if test="startTime != null">
            AND create_time >= #{startTime}
        </if>
    </where>
</select>
```

常见陷阱：

• 忘记判断空字符串：`test="userName != null"`，当`userName=""`时仍会拼接

• 使用错误操作符：`test="status != 0"`，应使用`test="status != null and status != 0"`

• 嵌套过深：多层`<if>`嵌套降低可读性，建议使用`<choose>`

##### （2）`<choose>`标签：多分支选择

```xml
<select id="selectByStatus" parameterType="map" resultType="User">
    SELECT * FROM user
    <where>
        <choose>
            <!-- 优先级1：status=1 -->
            <when test="status == 1">
                status = 1 AND is_active = 1
            </when>
            <!-- 优先级2：status=2 -->
            <when test="status == 2">
                status = 2 AND is_deleted = 0
            </when>
            <!-- 默认情况 -->
            <otherwise>
                status IN (1, 2)
            </otherwise>
        </choose>
    </where>
</select>
```

使用建议：

• 类似Java的`switch-case`，但每个分支独立

• `<otherwise>`不是必须，但建议提供默认逻辑

• 分支条件应互斥，避免多个`<when>`同时满足

##### （3）`<where>`标签：智能WHERE处理

```xml
<select id="dynamicWhere" parameterType="map" resultType="User">
    SELECT * FROM user
    <where>
        <if test="id != null">
            id = #{id}
        </if>
        <if test="userName != null">
            AND user_name = #{userName}
        </if>
        <if test="email != null">
            AND email = #{email}
        </if>
    </where>
</select>
```

自动处理逻辑：

1. 如果`<where>`内无内容，不生成`WHERE`关键字
2. 如果第一个条件有`AND/OR`，自动去除
3. 如果条件中间有`AND/OR`缺失，不自动补全（需开发者保证）

##### （4）`<trim>`标签：灵活修剪

```xml
<!-- 自定义WHERE处理 -->
<select id="dynamicTrim" parameterType="map" resultType="User">
    SELECT * FROM user
    <trim prefix="WHERE" prefixOverrides="AND |OR ">
        <if test="id != null">
            AND id = #{id}
        </if>
        <if test="userName != null">
            OR user_name = #{userName}
        </if>
    </trim>
</select>
<!-- 自定义SET处理 -->
<update id="updateUser" parameterType="User">
    UPDATE user
    <trim prefix="SET" suffixOverrides=",">
        <if test="userName != null">user_name = #{userName},</if>
        <if test="email != null">email = #{email},</if>
        update_time = NOW(),
    </trim>
    WHERE id = #{id}
</update>
```

参数说明：

• `prefix`：前缀，添加到内容前

• `prefixOverrides`：去除的前缀（以`|`分隔）

• `suffix`：后缀，添加到内容后

• `suffixOverrides`：去除的后缀（以`|`分隔）

##### （5）`<foreach>`标签：集合遍历

```xml
<!-- IN查询 -->
<select id="selectByIds" parameterType="list" resultType="User">
    SELECT * FROM user
    WHERE id IN
    <foreach collection="list" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
<!-- 批量插入 -->
<insert id="batchInsert" parameterType="list">
    INSERT INTO user (user_name, email) VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.userName}, #{user.email})
    </foreach>
</insert>
```

collection参数规则：

|接口参数类型|collection值|说明|
|---|---|---|
|`List<User>`（无`@Param`）|`list`	|默认名称|
|`List<User> users`（有`@Param("users")`）|`users`	|指定名称|
|`Long[] ids`（无`@Param`）|`array`	|数组默认|
|`Map<String, Object> params`	|`params.keys`	|Map的key|

性能优化建议：

1. 分批处理：单次`IN`查询不超过1000个元素，避免SQL过长
2. 使用`JOIN`替代：大集合查询考虑用`JOIN`替代`IN`
3. 数据库参数限制：MySQL的`max_allowed_packet`默认4MB

##### （6）`<bind>`标签：变量绑定

```xml
<select id="selectByLike" parameterType="string" resultType="User">
    <!-- 创建变量，避免SQL注入 -->
    <bind name="pattern" value="'%' + userName + '%'"/>
    SELECT * FROM user
    WHERE user_name LIKE #{pattern}
</select>
<!-- 复杂表达式 -->
<select id="selectByComplex" parameterType="map" resultType="User">
    <bind name="nameCondition" value="'%' + userName + '%'"/>
    <bind name="emailCondition" value="email != null ? '%' + email + '%' : null"/>
    SELECT * FROM user
    <where>
        <if test="userName != null">
            AND user_name LIKE #{nameCondition}
        </if>
        <if test="email != null">
            AND email LIKE #{emailCondition}
        </if>
    </where>
</select>
```

使用场景：

• SQL函数调用：`<bind name="now" value="@java.time.LocalDateTime@now()"/>`

• 字符串拼接：避免在test表达式中直接拼接

• 复杂计算：将计算结果绑定到变量

#### 5.3 动态SQL执行流程图

```
+-------------------+
|   输入参数        |
+-------------------+
        |
        v
+-------------------+
|   参数绑定        |
+-------------------+
        |
        v
+-------------------+
|  动态SQL标签解析  |
|  (if/where/choose |
| /trim/set/foreach)|
+-------------------+
        |
        v
+-------------------+
|  条件判断         |
|  OGNL表达式求值   |
+-------------------+
        |
        v
+-------------------+
|  SQL片段组装      |
+-------------------+
        |
        v
+-------------------+
|  最终SQL生成      |
+-------------------+
        |
        v
+-------------------+
|  JDBC执行         |
+-------------------+
        |
        v
+-------------------+
|  结果映射         |
+-------------------+
        |
        v
+-------------------+
|  返回Java对象     |
+-------------------+
```

#### 5.4 安全注意事项：`#{}` vs `${}`

核心区别

|占位符|处理方式|安全性|适用场景|
|---|---|---|---|
|`#{}`	|预编译（PreparedStatement）|安全，防SQL注入|参数值（95%场景）|
|`${}`	|字符串替换|危险，有注入风险|动态表名、列名（5%场景）|

安全示例

```xml

<!-- 安全：使用#{} -->
<select id="selectByName" resultType="User">
    SELECT * FROM user WHERE user_name = #{userName}
</select>
<!-- 危险：使用${}（仅演示，不推荐） -->
<select id="selectByDynamicTable" resultType="map">
    SELECT * FROM ${tableName} WHERE id = #{id}
</select>
```

防御措施

1. 输入验证：对`${}`参数进行白名单校验
2. 最小权限：数据库账号禁用DDL权限
3. 代码审查：定期扫描XML中的`${}`使用
4. 参数化处理：尽可能使用`#{}`

### 六、缓存机制详解

#### 6.1 缓存层次图

```
┌─────────────────────────────────────┐
│              全局应用层             │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  SqlSessionFactory (工厂级)         │
│  ┌───────────────────────────────┐  │
│  │   二级缓存 (全局缓存)         │  │
│  │   - Mapper 级别               │  │
│  │   - 默认关闭                  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  SqlSession (会话级)                │
│  ┌───────────────────────────────┐  │
│  │   一级缓存 (本地缓存)         │  │
│  │   - 默认开启                  │  │
│  │   - PerpetualCache (HashMap)  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│              数据库层               │
└─────────────────────────────────────┘
```

#### 6.2 一级缓存（本地缓存）

特性

• 作用域：SqlSession级别

• 默认开启：无需配置

• 生命周期：与SqlSession相同

• 失效条件：

1. 执行`INSERT/UPDATE/DELETE`
2. 调用`SqlSession.clearCache()`
3. 执行`SqlSession.commit()`或`rollback()`
4. 配置`flushCache="true"`

验证示例

```java
@Test
public void testFirstLevelCache() {
    try (SqlSession session = sqlSessionFactory.openSession()) {
        UserMapper mapper = session.getMapper(UserMapper.class);
        // 第一次查询：访问数据库
        User user1 = mapper.selectById(1L);
        System.out.println("第一次查询：" + user1);
        // 第二次查询：从一级缓存获取（不访问数据库）
        User user2 = mapper.selectById(1L);
        System.out.println("第二次查询：" + user2);
        // 验证是否为同一对象
        System.out.println("是否为同一对象：" + (user1 == user2)); // true
        // 执行更新操作，清空一级缓存
        user1.setUserName("NewName");
        mapper.update(user1);
        // 第三次查询：重新访问数据库
        User user3 = mapper.selectById(1L);
        System.out.println("第三次查询：" + user3);
    }
}
```

#### 6.3 二级缓存（全局缓存）

开启步骤

1. 实体类实现Serializable
2. `Mapper.xml`中添加`<cache/>`标签
3. SqlSession提交或关闭后生效

```xml
配置详解
<!-- 基础配置 -->
<cache/>
<!-- 详细配置 -->
<cache
  eviction="LRU"               <!-- 淘汰策略：LRU/FIFO/SOFT/WEAK -->
  flushInterval="60000"        <!-- 刷新间隔：60秒 -->
  size="1024"                  <!-- 最大缓存数 -->
  readOnly="true"              <!-- 是否只读：true/false -->
/>
```

二级缓存执行流程

1. 查询时先检查二级缓存
2. 二级缓存命中则直接返回
3. 未命中则查询数据库
4. 结果存入一级缓存
5. SqlSession提交/关闭时同步到二级缓存

#### 6.4 缓存配置最佳实践

适合缓存的场景

1. 查询频繁，更新较少：系统配置、字典数据
2. 结果集相对固定：地区信息、分类信息
3. 非实时性要求：统计数据、报表数据

不适合缓存的场景

1. 数据频繁更新：订单状态、库存数量
2. 实时性要求高：交易数据、监控数据
3. 数据量过大：全表查询结果

Windows平台缓存优化

```yml
# Windows文件系统特点优化
mybatis-plus:
  configuration:
    # Windows文件I/O较慢，适当增加缓存大小
    cache:
      size: 2048
    # Windows内存管理优化
    local-cache-scope: session
```

### 七、Windows平台配置与优化

#### 7.1 Windows环境搭建

##### （1）JDK 21安装（Windows）

1. 访问Oracle官网
2. 下载`Windows x64 Installer`
3. 运行安装程序，默认路径`C:\Program Files\Java\jdk-21`
4. 配置环境变量：

```
• JAVA_HOME: C:\Program Files\Java\jdk-21
• Path: 添加%JAVA_HOME%\bin
```

##### （2）MySQL 8.3安装（Windows）

1. 访问MySQL官网
2. 下载MySQL Installer
3. 选择安装类型：Developer Default
4. 配置root密码：建议使用强密码
5. 设置字符集：`utf8mb4`
6. 配置端口：默认`3306`

##### （3）IntelliJ IDEA配置

1. 项目JDK：设置为JDK 21
2. Maven配置：使用阿里云镜像加速
3. 编码设置：UTF-8
4. 控制台编码：GBK（Windows控制台兼容）

#### 7.2 Windows性能优化配置

##### （1）连接池优化（HikariCP）

```yml
spring:
  datasource:
    hikari:
      # Windows线程调度开销较大，减少连接数
      maximum-pool-size: 20
      # Windows文件I/O延迟较高，增加超时
      connection-timeout: 30000
      # Windows内存回收特点
      leak-detection-threshold: 60000
      # Windows下连接验证优化
      connection-test-query: SELECT 1
      validation-timeout: 5000
```

##### （2）MyBatis配置优化

```yml
mybatis-plus:
  configuration:
    # Windows下日志输出优化
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # Windows文件系统缓存优化
    cache-enabled: true
    local-cache-scope: session
    # Windows下类型处理器性能优化
    default-enum-type-handler: org.apache.ibatis.type.EnumTypeHandler
```

##### （3）JVM参数优化（Windows）

```xml
<!-- pom.xml中配置 -->
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <jvmArguments>
            <!-- Windows下内存管理优化 -->
            -Xms512m
            -Xmx1024m
            -XX:MaxMetaspaceSize=256m
            -XX:+UseG1GC
            <!-- Windows控制台编码 -->
            -Dfile.encoding=UTF-8
            <!-- Windows下反射优化 -->
            --add-opens java.base/java.lang=ALL-UNNAMED
            --add-opens java.base/java.time=ALL-UNNAMED
        </jvmArguments>
    </configuration>
</plugin>
```

#### 7.3 Windows常见问题解决

##### （1）中文乱码问题

```yml
# 解决方案：统一编码配置
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db?useUnicode=true&characterEncoding=utf8
  # 控制台输出编码
  output:
    ansi:
      enabled: always
```

##### （2）文件路径问题

```java
// Windows路径处理
String configPath = "C:\\myproject\\mybatis-config.xml";
// 或使用正斜杠（MyBatis支持）
String configPath = "C:/myproject/mybatis-config.xml";
```

##### （3）权限问题

1. MySQL权限：确保应用账号有足够权限
2. 文件权限：确保应用有配置文件读写权限
3. 端口占用：检查`3306`端口是否被占用

### 八、实战代码示例

#### 8.1 项目结构

```
src/main/java
├── com.example
│   ├── MybatisDemoApplication.java      # 启动类
│   ├── config
│   │   ├── MybatisConfig.java          # MyBatis配置
│   │   └── DataSourceConfig.java       # 数据源配置
│   ├── entity
│   │   ├── User.java                    # 用户实体
│   │   └── UserDetail.java             # 用户详情实体
│   ├── mapper
│   │   └── UserMapper.java             # Mapper接口
│   └── service
│       ├── UserService.java            # 业务服务
│       └── impl
│           └── UserServiceImpl.java    # 服务实现
src/main/resources
├── application.yml                      # 配置文件
└── mapper
    └── UserMapper.xml                   # Mapper映射文件
```

#### 8.2 实体类定义

##### （1）`User.java`

```java
package com.example.entity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.experimental.Accessors;
import java.io.Serializable;
import java.time.LocalDateTime;
/**
 * 用户实体类
 * 对应数据库表：user
 */
@Data
@Accessors(chain = true)
@TableName("user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 主键ID（雪花算法）
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 年龄
     */
    private Integer age;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    /**
     * 逻辑删除标志（0-未删除，1-已删除）
     */
    @TableLogic
    private Integer isDeleted;
}
```

##### （2）`UserDetail.java`

```java
package com.example.entity;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;
/**
 * 用户详情实体类
 * 对应数据库表：user_detail
 */
@Data
@TableName("user_detail")
public class UserDetail implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private Long userId;
    private String realName;
    private String phone;
    private String address;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
```

#### 8.3 Mapper接口定义

`UserMapper.java`

```java
package com.example.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 1. 根据ID查询（自定义结果映射）
    User selectByIdCustom(@Param("id") Long id);
    // 2. 多条件动态查询
    List<User> selectByCondition(@Param("condition") Map<String, Object> condition);
    // 3. 批量插入
    int batchInsert(@Param("list") List<User> userList);
    // 4. 分页查询
    IPage<User> selectPageCustom(Page<User> page, @Param("userName") String userName);
    // 5. 关联查询：用户详情
    User selectWithDetail(@Param("id") Long id);
    // 6. 动态更新
    int updateSelective(User user);
    // 7. IN查询
    List<User> selectByIds(@Param("ids") List<Long> ids);
    // 8. 复杂动态SQL示例
    List<User> selectByComplexCondition(@Param("query") Map<String, Object> query);
}
```

#### 8.4 Mapper XML映射文件

`UserMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
    <!-- 开启二级缓存 -->
    <cache eviction="LRU" flushInterval="60000" size="1024" readOnly="true"/>
    <!-- 基础字段列表 -->
    <sql id="Base_Column_List">
        id, user_name, email, age, create_time, update_time, is_deleted
    </sql>
    <!-- 1. 自定义ID查询 -->
    <select id="selectByIdCustom" resultType="User">
        SELECT <include refid="Base_Column_List"/>
        FROM user
        WHERE id = #{id}
        AND is_deleted = 0
    </select>
    <!-- 2. 多条件动态查询 -->
    <select id="selectByCondition" resultType="User">
        SELECT <include refid="Base_Column_List"/>
        FROM user
        <where>
            is_deleted = 0
            <if test="condition.userName != null and condition.userName != ''">
                AND user_name LIKE CONCAT('%', #{condition.userName}, '%')
            </if>
            <if test="condition.email != null and condition.email != ''">
                AND email = #{condition.email}
            </if>
            <if test="condition.age != null">
                AND age = #{condition.age}
            </if>
            <if test="condition.startTime != null">
                AND create_time >= #{condition.startTime}
            </if>
            <if test="condition.endTime != null">
                AND create_time &lt;= #{condition.endTime}
            </if>
        </where>
        ORDER BY create_time DESC
    </select>
    <!-- 3. 批量插入 -->
    <insert id="batchInsert" parameterType="list">
        INSERT INTO user (user_name, email, age, create_time, update_time)
        VALUES
        <foreach collection="list" item="user" separator=",">
            (
            #{user.userName},
            #{user.email},
            #{user.age},
            #{user.createTime},
            #{user.updateTime}
            )
        </foreach>
    </insert>
    <!-- 4. 自定义分页查询 -->
    <select id="selectPageCustom" resultType="User">
        SELECT <include refid="Base_Column_List"/>
        FROM user
        <where>
            is_deleted = 0
            <if test="userName != null and userName != ''">
                AND user_name LIKE CONCAT('%', #{userName}, '%')
            </if>
        </where>
    </select>
    <!-- 5. 关联查询：用户详情（一对一） -->
    <resultMap id="UserWithDetailMap" type="User">
        <id property="id" column="id"/>
        <result property="userName" column="user_name"/>
        <result property="email" column="email"/>
        <result property="age" column="age"/>
        <result property="createTime" column="create_time"/>
        <result property="updateTime" column="update_time"/>
        <result property="isDeleted" column="is_deleted"/>
        <!-- 关联用户详情 -->
        <association property="userDetail" javaType="UserDetail">
            <id property="id" column="detail_id"/>
            <result property="realName" column="real_name"/>
            <result property="phone" column="phone"/>
            <result property="address" column="address"/>
            <result property="createTime" column="detail_create_time"/>
            <result property="updateTime" column="detail_update_time"/>
        </association>
    </resultMap>
    <select id="selectWithDetail" resultMap="UserWithDetailMap">
        SELECT
            u.id, u.user_name, u.email, u.age, u.create_time, u.update_time, u.is_deleted,
            ud.id as detail_id, ud.real_name, ud.phone, ud.address,
            ud.create_time as detail_create_time, ud.update_time as detail_update_time
        FROM user u
        LEFT JOIN user_detail ud ON u.id = ud.user_id
        WHERE u.id = #{id}
        AND u.is_deleted = 0
    </select>
    <!-- 6. 动态更新 -->
    <update id="updateSelective" parameterType="User">
        UPDATE user
        <set>
            <if test="userName != null and userName != ''">
                user_name = #{userName},
            </if>
            <if test="email != null and email != ''">
                email = #{email},
            </if>
            <if test="age != null">
                age = #{age},
            </if>
            update_time = NOW()
        </set>
        WHERE id = #{id}
        AND is_deleted = 0
    </update>
    <!-- 7. IN查询 -->
    <select id="selectByIds" resultType="User">
        SELECT <include refid="Base_Column_List"/>
        FROM user
        WHERE id IN
        <foreach collection="ids" item="id" open="(" separator="," close=")">
            #{id}
        </foreach>
        AND is_deleted = 0
    </select>
    <!-- 8. 复杂动态SQL示例 -->
    <select id="selectByComplexCondition" resultType="User">
        SELECT <include refid="Base_Column_List"/>
        FROM user
        <where>
            is_deleted = 0
            <choose>
                <!-- 优先级1：精确ID查询 -->
                <when test="query.id != null">
                    AND id = #{query.id}
                </when>
                <!-- 优先级2：模糊用户名查询 -->
                <when test="query.userName != null and query.userName != ''">
                    AND user_name LIKE CONCAT('%', #{query.userName}, '%')
                    <if test="query.ageMin != null">
                        AND age >= #{query.ageMin}
                    </if>
                    <if test="query.ageMax != null">
                        AND age &lt;= #{query.ageMax}
                    </if>
                </when>
                <!-- 默认：时间范围查询 -->
                <otherwise>
                    <if test="query.startTime != null">
                        AND create_time >= #{query.startTime}
                    </if>
                    <if test="query.endTime != null">
                        AND create_time &lt;= #{query.endTime}
                    </if>
                </otherwise>
            </choose>
        </where>
        <!-- 动态排序 -->
        <if test="query.orderBy != null">
            ORDER BY ${query.orderBy}
            <if test="query.orderDesc != null and query.orderDesc">
                DESC
            </if>
        </if>
        <!-- 动态分页（MyBatis Plus已提供更好方案） -->
    </select>
</mapper>
```

#### 8.5 服务层实现

`UserServiceImpl.java`

```java
package com.example.service.impl;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.entity.User;
import com.example.mapper.UserMapper;
import com.example.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Override
    public User getByIdCustom(Long id) {
        // 使用自定义查询方法
        return baseMapper.selectByIdCustom(id);
    }
    @Override
    public List<User> getByCondition(String userName, String email, Integer age) {
        Map<String, Object> condition = new HashMap<>();
        if (userName != null && !userName.isEmpty()) {
            condition.put("userName", userName);
        }
        if (email != null && !email.isEmpty()) {
            condition.put("email", email);
        }
        if (age != null) {
            condition.put("age", age);
        }
        return baseMapper.selectByCondition(condition);
    }
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean batchInsertUsers(List<User> userList) {
        // 设置创建和更新时间
        LocalDateTime now = LocalDateTime.now();
        userList.forEach(user -> {
            user.setCreateTime(now);
            user.setUpdateTime(now);
        });
        int result = baseMapper.batchInsert(userList);
        return result > 0;
    }
    @Override
    public IPage<User> getPageByUserName(String userName, Integer pageNum, Integer pageSize) {
        Page<User> page = new Page<>(pageNum, pageSize);
        if (userName != null && !userName.isEmpty()) {
            return baseMapper.selectPageCustom(page, userName);
        } else {
            // 使用MyBatis Plus默认分页
            LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(User::getIsDeleted, 0);
            return baseMapper.selectPage(page, wrapper);
        }
    }
    @Override
    public User getUserWithDetail(Long id) {
        return baseMapper.selectWithDetail(id);
    }
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateUserSelective(User user) {
        user.setUpdateTime(LocalDateTime.now());
        int result = baseMapper.updateSelective(user);
        return result > 0;
    }
    @Override
    public List<User> getUsersByIds(Long... ids) {
        List<Long> idList = Arrays.asList(ids);
        return baseMapper.selectByIds(idList);
    }
    @Override
    public List<User> getByComplexCondition(Map<String, Object> query) {
        return baseMapper.selectByComplexCondition(query);
    }
}
```

#### 8.6 测试类示例

`UserServiceTest.java`

```java
package com.example.service;
import com.example.MybatisDemoApplication;
import com.example.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(classes = MybatisDemoApplication.class)
@Transactional
class UserServiceTest {
    @Autowired
    private UserService userService;
    @Test
    void testInsertAndSelect() {
        // 创建用户
        User user = new User()
                .setUserName("testUser")
                .setEmail("test@example.com")
                .setAge(25)
                .setCreateTime(LocalDateTime.now())
                .setUpdateTime(LocalDateTime.now());
        // 插入
        boolean insertResult = userService.save(user);
        assertTrue(insertResult);
        assertNotNull(user.getId());
        // 查询
        User foundUser = userService.getByIdCustom(user.getId());
        assertNotNull(foundUser);
        assertEquals("testUser", foundUser.getUserName());
        assertEquals("test@example.com", foundUser.getEmail());
        assertEquals(25, foundUser.getAge());
    }
    @Test
    void testDynamicCondition() {
        // 准备测试数据
        User user1 = new User()
                .setUserName("张三")
                .setEmail("zhangsan@example.com")
                .setAge(25);
        User user2 = new User()
                .setUserName("李四")
                .setEmail("lisi@example.com")
                .setAge(30);
        userService.save(user1);
        userService.save(user2);
        // 测试条件查询
        List<User> result1 = userService.getByCondition("张", null, null);
        assertEquals(1, result1.size());
        assertEquals("张三", result1.get(0).getUserName());
        List<User> result2 = userService.getByCondition(null, "lisi@example.com", null);
        assertEquals(1, result2.size());
        assertEquals("李四", result2.get(0).getUserName());
        List<User> result3 = userService.getByCondition(null, null, 30);
        assertEquals(1, result3.size());
        assertEquals(30, result3.get(0).getAge());
    }
    @Test
    void testBatchInsert() {
        List<User> userList = Arrays.asList(
                new User().setUserName("用户1").setEmail("user1@example.com").setAge(20),
                new User().setUserName("用户2").setEmail("user2@example.com").setAge(25),
                new User().setUserName("用户3").setEmail("user3@example.com").setAge(30)
        );
        boolean result = userService.batchInsertUsers(userList);
        assertTrue(result);
        // 验证数据
        List<User> allUsers = userService.list();
        assertTrue(allUsers.size() >= 3);
    }
    @Test
    void testInQuery() {
        // 准备数据
        User user1 = new User().setUserName("用户A");
        User user2 = new User().setUserName("用户B");
        User user3 = new User().setUserName("用户C");
        userService.save(user1);
        userService.save(user2);
        userService.save(user3);
        // IN查询
        List<User> result = userService.getUsersByIds(user1.getId(), user2.getId());
        assertEquals(2, result.size());
        // 验证包含的用户
        List<String> userNames = result.stream().map(User::getUserName).toList();
        assertTrue(userNames.contains("用户A"));
        assertTrue(userNames.contains("用户B"));
    }
    @Test
    void testComplexDynamicSQL() {
        // 准备查询条件
        Map<String, Object> query = new HashMap<>();
        query.put("ageMin", 20);
        query.put("ageMax", 30);
        query.put("orderBy", "age");
        query.put("orderDesc", true);
        // 执行查询
        List<User> result = userService.getByComplexCondition(query);
        // 验证结果
        assertNotNull(result);
        // 如果有数据，验证排序
        if (result.size() > 1) {
            for (int i = 0; i < result.size() - 1; i++) {
                assertTrue(result.get(i).getAge() >= result.get(i + 1).getAge());
            }
        }
    }
}
```

#### 8.7 Spring Boot启动类

`MybatisDemoApplication.java`

```java
package com.example;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
@SpringBootApplication
@MapperScan("com.example.mapper")
@EnableTransactionManagement
public class MybatisDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(MybatisDemoApplication.class, args);
        System.out.println("MyBatis Demo 应用启动成功！");
        System.out.println("JDK版本: " + System.getProperty("java.version"));
        System.out.println("操作系统: " + System.getProperty("os.name"));
    }
}
```

### 九、学习总结与拓展

#### 9.1 核心知识点回顾

1. ORM概念：对象关系映射，数据库表与Java对象的桥梁
2. MyBatis架构：`SqlSessionFactory → SqlSession → Executor → StatementHandler`
3. 配置体系：`mybatis-config.xml + application.yml + Mapper.xml`
4. 动态SQL：`<if>、<choose>、<where>、<set>、<foreach>、<bind>`
5. 缓存机制：一级缓存（`SqlSession`）、二级缓存（`Mapper`）
6. Windows优化：连接池配置、JVM参数、文件路径处理

#### 9.2 常见问题解决方案

|问题现象|可能原因|解决方案|
|---|---|---|
|Mapper接口无法注入|未扫描到Mapper接口|添加`@MapperScan`或`@Mapper`注解|
|中文乱码|编码不统一|配置`characterEncoding=utf8`|
|动态SQL错误|标签嵌套错误|检查标签闭合，使用`<where>`简化|
|缓存数据不一致|缓存未及时更新|配置`flushInterval`，及时提交事务|


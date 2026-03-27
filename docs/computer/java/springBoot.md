# SpringBoot学习笔记

Spring Boot是Pivotal团队在Spring的基础上提供的一套全新的开源框架，其目的是为了简化Spring应用的搭建和开发过程。Spring Boot去除了大量的XML配置文件，简化了复杂的依赖管理。

官网地址：`https://spring.io/projects/spring-boot`

## Spring Boot入门

### 简介

Spring Boot是简化Spring应用开发的一个框架、整个Spring技术栈的一个大整合（Spring全家桶时代）、J2EE开发的一站式解决方案（Spring Cloud是分布式整体解决方案）。

优点：

– 快速创建独立运行的Spring项目以及与主流框架集成 <br>
– 使用嵌入式的Servlet容器，应用无需打成WAR包 <br>
– starters自动依赖与版本控制 <br>
– 大量的自动配置，简化开发，也可修改默认值 <br>
– 无需配置XML，无代码生成，开箱即用 <br>
– 准生产环境的运行时应用监控 <br>
– 与云计算的天然集成 <br>

单体应用与微服务 <br>
– 单体应用：ALL IN ONE（所有内容都在一个应用里面） <br>
– 微服务：每一个功能元素最终都是一个可独立替换和独立升级的软件单元 <br>
微服务是一种架构风格(服务微化)，一个应用应该是一组小型服务，可以通过HTTP的方式进行互通 <br>

HelloWorld案例 <br>
工程创建及案例可以参考文章进行操作：在IDEA中创建SpringBoot项目 <br>

### POM文件

父项目是Spring Boot的版本仲裁中心（他来真正管理Spring Boot应用里面的所有依赖版本），以后我们导入依赖默认是不需要写版本（没有在dependencies里面管理的依赖自然需要声明版本号）

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.11</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

启动器 spring-boot-starter（spring-boot场景启动器），spring-boot-starter-web 帮我们导入了web模块正常运行所依赖的组件。

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

Spring Boot将所有的功能场景都抽取出来，做成一个个的starters(启动器)，只需要在项目里面引入这些starter相关场景的所有依赖都会导入进来。要用什么功能就导入什么场景的启动器。

### 主程序类

```java
// 自动生成的
@SpringBootApplication
public class SpringBootDemo0Application {
	public static void main(String[] args) {
		SpringApplication.run(SpringBootDemo0Application.class, args);
	}
}
```

`@SpringBootApplication`: Spring Boot应用标注在某个类上说明这个类是SpringBoot的主配置类，SpringBoot 就应该运行这个类的main方法来启动SpringBoot应用。


### Spring Boot配置

#### 配置文件

SpringBoot使用一个全局的配置文件，配置文件名固定：`application.properties` 或者 `application.yml`。配置文件放在 `src/main/resources`目录 或者 类路径`/config` 下。作用是修改SpringBoot自动配置的默认值。

#### YAML

YAML配置例子

```yml
server:
    port: 8081
```

等价于XML配置：

```xml
<server>
    <port>8081</port>
</server>
```

【语法】

```
key: value(注意冒号后面有个空格)
以空格的缩进来控制层级关系，只要是左对齐的一列数据，都是同一个层级
```

【值写法】

（1）字面量：普通的值(数字，字符串，布尔)
```
k: v，字面量直接写
字符串默认不用加上单引号或者双引号
""（双引号），name: "zhangsan \n lisi" 会输出 zhangsan 换行 lisi
''（单引号），name: 'zhangsan \n lisi' 会输出 zhangsan \n lisi
```
（2）对象、Map
```
k: v，在下一行来写对象的属性和值
friends:
    lastName: zhangsan
	age: 20
或者：
friends: {lastName:zhangsan,age:18}
```
（3）数组(List、Set)
```
用- 值表示数组中的一个元素
pets:
    ‐ cat
    ‐ dog
    ‐ pig
pets: [cat,dog,pig]
```

#### 配置文件值注入

##### `@ConfigurationProperties`

1）导入配置文件处理器

```xml
<!‐‐导入配置文件处理器，配置文件进行绑定就会有提示‐‐>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-configuration-processor</artifactId>
	<optional>true</optional>
</dependency>
```

2）javaBean对象

`@ConfigurationProperties(prefix = "person")` 会将配置文件和类进行绑定：

```java
/**
 * 将配置文件中配置的每一个属性的值，映射到这个组件中
 * @ConfigurationProperties：告诉SpringBoot将本类中的所有属性和配置文件中相关的配置进行绑定;
 *      prefix = "person":配置文件中哪个下面的所有属性进行一一映射
 * 只有这个组件是容器中的组件，才能容器提供的@ConfigurationProperties功能;
 */
@Component
@ConfigurationProperties(prefix = "person")
public class Person {
    private String lastName;
    private Integer age;
    private Boolean boss;
    private Date birth;
    private Map<String, Object> maps;
    private List<Object> lists;
    private Dog dog;
	....
}
```

3）配置文件 application.yml

```yml
person:
  lastName: haha
  age: 18
  boss: false
  birth: 2022/01/01
  maps: {k1: v1,k2: v2}
  lists:
    - lisi
    - wangwu
  dog:
    name: 芒果
    age: 1
```

或者配置文件`application.properties`

```
#解决乱码问题
spring.message.encoding=UTF-8
#person
person.last-name=haha
person.age=20
person.birth=2022/01/02
person.boss=true
person.maps.k1=v1
person.maps.k2=v2
person.lists=a,b,c
person.dog.name=丸子
person.dog.age=5
```

乱码问题还需要配置：

`File Encodings -> UTF-8`


4）单元测试，先将内容注入（`@Autowired`）然后使用

##### 与`@Value`的区别

`@ConfigurationProperties` 与 `@Value` 的区别：

`@ConfigurationProperties` 是批量注入配置文件中的属性，`@Value` 是一个个指定
`@ConfigurationProperties` 支持松散绑定(松散语法) 、不支持`SpEL`(表达式如`#{2*4}`)、支持`JSR303`数据校验 、支持复杂类型封装(如map)
`@Value` 不支持松散绑定(松散语法) 、支持`SpEL`、不支持`JSR303`数据校验 、不支持复杂类型封装

```java
@Component
// @ConfigurationProperties(prefix = "person")
public class Person {
    @Value("${person.last-name}")
    private String lastName;
    @Value("#{2*4}")
    private Integer age;
    @Value("true")
    private Boolean boss;
    @Value("${person.birth}")
    private Date birth;
    ...
}
```

松散绑定： <br>
– `person.firstName`：使用标准方式 <br>
– `person.first-name`：大写用- <br>
– `person.first_name`：大写用_ <br>
– `PERSON_FIRST_NAME`：推荐系统属性使用这种写法

`JSR303`数据校验：

`@Validated`,

`@NotNull`

使用规则：

如果说，我们只是在某个业务逻辑中需要获取一下配置文件中的某项值，使用`@Value`

 `@Value("${febase.api.host}")`

 `private String febaseHost;`

如果说，我们专门编写了一个javaBean来和配置文件进行映射，我们就直接使用`@ConfigurationProperties`

#### 读取外部配置文件

`@PropertySource`：加载指定的配置文件

```java
@PropertySource("classpath:person.properties")
@Component
@ConfigurationProperties(prefix = "person")
public class Person {
    private String lastName;
    private Integer age;
    private Boolean boss;
    ...
}
```
 
`@ImportResource`：导入Spring的配置文件，让配置文件里面的内容生效--标注在一个配置类上

如下我们自己编写的配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="helloService" class="com.stydyspring.spring_boot_demo0.service.HelloService"></bean>
</beans>
```

我们可以标注在主配置类上：

```java
@SpringBootApplication
// 导入Spring的配置文件让其生效
@ImportResource(locations = {"classpath:beans.xml"})
public class SpringBootDemo0Application {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootDemo0Application.class, args);
    }
}
```

测试：

```java
@SpringBootTest
class SpringBootDemo0ApplicationTests {
    @Autowired
    ApplicationContext ioc;

    @Test
    public void testHelloService(){
        boolean containsBean = ioc.containsBean("helloService");
        System.out.println(containsBean); 
        // 上一步没加@ImportResource之前返回false
        // 添加@ImportResource之后返回true
    }
}
```

SpringBoot推荐给容器中添加组件的方式，推荐使用全注解的方式 `@Configuration`

```java
/**
 * @Configuration：指明当前类是一个配置类，就是来替代之前的Spring配置文件
 * 
 * 在配置文件中用<bean><bean/>标签添加组件。在配置类中使用@Bean注解
 */
@Configuration
public class MyAppConfig {
    // 将方法的返回值添加到容器中;容器中这个组件默认的id就是方法名
    @Bean
    public HelloService helloService(){
        System.out.println("配置类@Bean给容器中添加组件了");
        return new HelloService();
    }
}
```

#### 配置文件占位符

随机数

```
${random.value}、${random.int}、${random.long}、${random.uuid}
${random.int(10)}、${random.int[1024,65536]}
```

占位符获取之前配置的值，如果没有可以是用:指定默认值

```
#person
person.last-name=haha${random.uuid}
person.age=${random.int}
person.birth=2222/02/02
person.boss=false
person.maps.k1=v11111
person.maps.k2=v22222
person.lists=a,b,c,d,e,f
person.dog.name=${person.hello:hello}_dog
person.dog.age=1
```

#### Profile

Profile是Spring对不同环境提供不同配置功能的支持，可以通过激活、指定参数等方式快速切换环境。
多profile文件形式格式如：`application-{profile}.properties/yml`，如 `application-dev.properties`、`application-prod.properties`

默认使用`application.properties`的配置

激活方式：

```
命令行 --spring.profiles.active=dev
java -jar spring-boot-02-config-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev;
配置文件 spring.profiles.active=dev
jvm参数 –Dspring.profiles.active=dev
```

yml支持多文档块方式：

```yml
server:
	port: 8081
spring:
	profiles:
	active: prod

‐‐‐
server:
	port: 8083
spring:
	profiles: dev

‐‐‐
server:
	port: 8084
spring:
	profiles: prod #指定属于哪个环境
```

#### 配置文件加载位置

spring boot 启动会扫描以下位置的application.properties或者application.yml文件作为Spring boot的默认配置文件

```
file:./config/
file:./
classpath:/config/
classpath:/
```

以上是按照优先级从高到低的顺序，所有位置的文件都会被加载，高优先级配置内容会覆盖低优先级配置内容。

可以通过配置`spring.config.location`来改变默认配置。项目打包好以后，可以使用命令行参数的形式，启动项目的时候来指定配置文件的新位置；指定配置文件和默认加载的这些配置文件共同起作用形成互补配置：

```
java -jar spring-boot-02-config-02-0.0.1-SNAPSHOT.jar --spring.config.location=G:/application.properties
```

#### 外部配置加载顺序

Spring Boot支持多种外部配置方式，优先级从高到低。高优先级的配置覆盖低优先级的配置，所有的配置会形成互补配置：

命令行参数

```
所有的配置都可以在命令行上进行指定：
java -jar spring-boot-02-config-02-0.0.1-SNAPSHOT.jar --server.port=8087 --server.context-path=/abc

多个配置用空格分开; --配置项=值
来自java:comp/env的JNDI属性
Java系统属性(System.getProperties())
操作系统环境变量
RandomValuePropertySource配置的random.*属性值
```

由jar包外向jar包内进行寻找。优先加载带profile：

```
jar包外部的application-{profile}.properties或application.yml(带spring.profile)配置文件
jar包内部的application-{profile}.properties或application.yml(带spring.profile)配置文件
```

再来加载不带profile：

```
jar包外部的application.properties或application.yml(不带spring.profile)配置文件
jar包内部的application.properties或application.yml(不带spring.profile)配置文件
@Configuration注解类上的@PropertySource
通过SpringApplication.setDefaultProperties指定的默认属性
```

#### 自动配置原理

配置文件可以配置的属性：`https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#common-application-properties`

自动配置原理：

1）Spring Boot启动时加载主配置类（带有`@SpringBootApplication`），其里面开启了自动配置功能`@EnableAutoConfiguration`

2）`@EnableAutoConfiguration`利用`@Import(AutoConfigurationImportSelector.class)`给容器导入一些组件。导入的组件是通过`List configurations = getCandidateConfigurations(annotationMetadata, attributes);`获取到的。里面通过`SpringFactoriesLoader.loadFactoryNames` 扫描所有jar包类路径下`"META-INF/spring.factories"`，把扫描到的这些文件的内容包装成`properties`对象，从`properties`中获取到`EnableAutoConfiguration.class`类(类名)对应的值，然后把他们添加在容器中。其实就是将类路径下 `META-INF/spring.factories` 里面配置的所有`EnableAutoConfiguration`的值加入到了容器中。每一个这样的 `xxxAutoConfiguration` 类都是容器中的一个组件，都加入到容器中；用他们来做自动配置;

3）每一个自动配置类进行自动配置功能

4）以`HttpEncodingAutoConfiguration`配置类进行分析：
```java
// 表示这是一个配置类，以前编写的配置文件一样，也可以给容器中添加组件
@AutoConfiguration
// 启动指定类的ConfigurationProperties功能，将配置文件中对应的值和xxxProperties绑定起来，并把xxxProperties加入到ioc容器中
@EnableConfigurationProperties(ServerProperties.class)
// Spring底层@Conditional注解(Spring注解版)，根据不同的条件，如果满足指定的条件，整个配置类里面的配置就会生效;
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
// 判断当前项目有没有这个类CharacterEncodingFilter-SpringMVC中进行乱码解决的过滤器
@ConditionalOnClass(CharacterEncodingFilter.class)
// 判断配置文件中是否存在某个配置 spring.servlet.encoding.enabled;如果不存在，判断也是成立的
// 即使我们配置文件中不配置spring.servlet.encoding.enabled=true，也是默认生效的;
@ConditionalOnProperty(prefix = "server.servlet.encoding", value = "enabled", matchIfMissing = true)
public class HttpEncodingAutoConfiguration {

    // 他已经和SpringBoot的配置文件映射了
    private final Encoding properties;

    // 只有一个有参构造器的情况下，参数的值就会从容器中拿
    public HttpEncodingAutoConfiguration(ServerProperties properties) {
        this.properties = properties.getServlet().getEncoding();
    }

    @Bean  // 给容器中添加一个组件，这个组件的某些值需要从properties中获取
    @ConditionalOnMissingBean // 判断容器没有这个组件，就给配置一个
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setEncoding(this.properties.getCharset().name());
        filter.setForceRequestEncoding(this.properties.shouldForce(Encoding.Type.REQUEST));
        filter.setForceResponseEncoding(this.properties.shouldForce(Encoding.Type.RESPONSE));
        return filter;
    }
	...
}
```

根据当前不同的条件判断，决定这个配置类是否生效

一但这个配置类生效，这个配置类就会给容器中添加各种组件，这些组件的属性是从对应的`properties`类中获取的，这些类里面的每一个属性又是和配置文件绑定的

5)、所有在配置文件中能配置的属性都是在`xxxxProperties`类中封装着，配置文件能配置什么就可以参照某个功能对应的这个属性类

使用精髓:

1)、SpringBoot启动会加载大量的自动配置类 ； <br>
2)、我们看我们需要的功能有没有SpringBoot默认写好的自动配置类； <br>
3)、我们再来看这个自动配置类中到底配置了哪些组件(只要我们要用的组件有，我们就不需要再来配置了) <br>
4)、给容器中自动配置类添加组件的时候，会从properties类中获取某些属性。我们就可以在配置文件中指定这些属性的值;

```
xxxxAutoConfigurartion：自动配置类; 给容器中添加组件
xxxxProperties：封装配置文件中相关属性
```

##### `@Conditional`注解

作用：必须是`@Conditional`指定的条件成立，才给容器中添加组件，配置配里面的所有内容才生效
也就是说，自动配置类必须在一定的条件下才能生效

|`@Conditional`扩展注解	|作用（判断是否满足当前指定条件）|
|---|---|
|`@ConditionalOnJava`   |系统的java版本是否符合要求|
|`@ConditionalOnBean`	|容器中存在指定Bean|
|`@ConditionalOnMissingBean`	|容器中不存在指定Bean|
|`@ConditionalOnExpression`	|满足SpEL表达式指定|
|`@ConditionalOnClass`	|系统中有指定的类|
|`@ConditionalOnMissingClass`	|系统中没有指定的类|
|`@ConditionalOnSingleCandidate`	|容器中只有一个指定的Bean，或者这个Bean是首选Bean|
|`@ConditionalOnProperty`	|系统中指定的属性是否有指定的值|
|`@ConditionalOnResource`	|类路径下是否存在指定资源文件|
|`@ConditionalOnWebApplication`	|当前是web环境|
|`@ConditionalOnNotWebApplication`	|当前不是web环境|
|`@ConditionalOnJndi`	|JNDI存在指定项

想要查看生效的自动配置类，可以在配置文件中配置`debug=true`，positive为启动的，negative没启用的

### Spring Boot与日志

#### 日志框架

市场上存在非常多的日志框架：`JUL(java.util.logging)`，`JCL(Apache Commons Logging)`，`Log4j`，`Log4j2`，`Logback`、`SLF4j`、`jboss-logging`等。 Spring Boot在框架内容部使用`JCL`，`spring-boot-starter-logging`采用了 `slf4j+logback`的形式，Spring Boot也能自动适配(`jul、log4j2、logback`) 并简化配置

SpringBoot底层是Spring框架，Spring框架默认是用JCL。SpringBoot选用`SLF4j`（日志抽象层）和`logback`（日志实现）

#### SLF4j

开发时日志记录方法的调用，不应该来直接调用日志的实现类，而是调用日志抽象层里面的方法：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {

  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(HelloWorld.class);
    logger.info("Hello World");
  }
}
```

每一个日志的实现框架都有自己的配置文件。使用slf4j以后，配置文件还是做成日志实现框架自己本身的配置文件。
如何让系统中所有的日志都统一到slf4j：

1.将系统中其他日志框架先排除出去 <br>
2.用中间包来替换原有的日志框架 <br>
3.我们导入slf4j其他的实现

#### SpringBoot日志关系

添加依赖：

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-logging</artifactId>
</dependency>
```

SpringBoot能自动适配所有的日志，而且底层使用`slf4j+logback`的方式记录日志，引入其他框架的时候，只需要把这个框架依赖的日志框架排除掉即可

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring‐core</artifactId>
    <exclusions>
        <exclusion>
            <groupId>commons‐logging</groupId>
            <artifactId>commons‐logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

#### 默认日志配置

日志级别由低到高：`trace<debug<info<warn<error`

SpringBoot默认给我们使用的是info级别的（日志就只会在这个级别及以后的高级别生效），没有指定级别的就用SpringBoot默认规定的级别。

日志输出格式：

```
%d --表示日期时间
%thread --表示线程名
%‐5level --级别从左显示5个字符宽度
%logger{50} --表示logger名字最长50个字符，否则按照句点分割
%msg --日志消息
%n --是换行符
```

```java
public class Hello {
    // 记录器
    Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/world")
    public String hello() {
        logger.trace("trace日志");
        logger.debug("debug日志");
        // 默认
        logger.info("info日志");
        logger.warn("warn日志");
        logger.error("error日志");
        return "Hello World~";
    }
}

默认是info，所以只会输出：
2023-05-23 11:44:27.419 INFO 98527 --- [nio-8080-exec-2] c.s.spring_boot_demo3.controller.Hello   : info日志
2023-05-23 11:44:27.419 WARN 98527 --- [nio-8080-exec-2] c.s.spring_boot_demo3.controller.Hello   : warn日志
2023-05-23 11:44:27.419 ERROR 98527 --- [nio-8080-exec-2] c.s.spring_boot_demo3.controller.Hello   : error日志
```

修改默认级别：

```
logging.level.com.study=trace

2023-05-23 11:50:00.774 TRACE 98971 --- [nio-8080-exec-1] c.s.spring_boot_demo3.controller.Hello   : trace日志
2023-05-23 11:50:00.774 DEBUG 98971 --- [nio-8080-exec-1] c.s.spring_boot_demo3.controller.Hello   : debug日志
2023-05-23 11:50:00.774  INFO 98971 --- [nio-8080-exec-1] c.s.spring_boot_demo3.controller.Hello   : info日志
2023-05-23 11:50:00.774  WARN 98971 --- [nio-8080-exec-1] c.s.spring_boot_demo3.controller.Hello   : warn日志
2023-05-23 11:50:00.774 ERROR 98971 --- [nio-8080-exec-1] c.s.spring_boot_demo3.controller.Hello   : error日志
```

日志配置：

|logging.file.name（建议）	|`logging.file.path`	|例子	|备注|
|---|---|---|--|
|空	|空	|	|只在控制台输出|
|指定文件名	|空	|`my.log`	|输出日志到`my.log`文件|
|空	|指定目录	|`/var/log`	|输出到指定目录的 `spring.log` 文件中|

```
# 日志
# logging.file.name=my.log
# 配置日志路径，默认在此目录下生成一个名为：spring.log的日志文件
logging.file.path=/test/log
# 在控制台输出的日志的格式
logging.pattern.console=%d{yyyy‐MM‐dd}[%thread]%‐5level%logger{50}‐%msg%n
# 指定文件中日志输出的格式
logging.pattern.file=%d{yyyy‐MM‐dd}===[%thread]===%‐5level===%logger{50}====%msg%n
```

#### 指定日志配置

给类路径下放上每个日志框架自己的配置文件即可，SpringBoot就不使用他默认配置的了

|日志系统	|自定义配置文件|
|---|---|
|`Logback`	|`logback-spring.xml , logback-spring.groovy, logback.xml or logback.groovy`|
|`Log4j2`	|`log4j2-spring.xml or log4j2.xml`|
|`JDK (Java Util Logging)`	|`logging.properties`|

`logback.xml`：直接就被日志框架识别了;

`logback-spring.xml`：日志框架就不直接加载日志的配置项，由SpringBoot解析日志配置，可以使用SpringBoot的高级Profile功能（激活对应环境下生效）

```xml
<springProfilename="staging">
  <!‐‐ configuration to be enabled when the "staging" profile is active ‐‐>
  可以指定某段配置只在某个环境下生效
</springProfile>
```

```xml
<appendername="stdout" class="ch.qos.logback.core.ConsoleAppender">
  <layout class="ch.qos.logback.classic.PatternLayout">
    <springProfile name="dev">
      <pattern>%d{yyyy‐MM‐dd HH:mm:ss.SSS} ‐‐‐‐> [%thread] ‐‐‐> %‐5level
        %logger{50} ‐ %msg%n</pattern>
    </springProfile>
    <springProfile name="!dev">
      <pattern>%d{yyyy‐MM‐dd HH:mm:ss.SSS} ==== [%thread] ==== %‐5level
        %logger{50} ‐ %msg%n</pattern>
    </springProfile>
  </layout>
</appender>
```

### Spring Boot与Web开发

#### 静态资源映射规则

1）所有 `/webjars/**` ，都去 `classpath:/META-INF/resources/webjars/` 找资源

`webjars`：是以jar包的方式引入静态资源（网址：`Web Libraries in Jars:https://www.webjars.org/ `）

引入后访问：`http://localhost:8080/webjars/jquery/3.3.1/src/jquery.js`，
就可以找到资源：

2） `/**` 访问当前项目的任何资源，都去「静态资源的文件夹」找映射

```
"classpath:/META‐INF/resources/"
"classpath:/resources/"
"classpath:/static/"
"classpath:/public/"
"/"：当前项目的根路径
```

如，`localhost:8080/abc`，会去静态资源文件夹里面找abc

3）首页映射，静态资源文件夹下的所有index.html页面，被`"/**"`映射

`localhost:8080/` ，会找`index`页面

4）所有的 `**/favicon.ico` 都是在静态资源文件下找

#### Thymeleaf模板引擎

##### thymeleaf使用

默认规则：只要我们把HTML页面放在`classpath:/templates/`，`thymeleaf`就能自动渲染

```java
// 源码
@ConfigurationProperties(prefix="spring.thymeleaf")
public class ThymeleafProperties{

	private static final Charset DEFAULT_ENCODING = Charset.forName("UTF‐8");
	private static final MimeType DEFAULT_CONTENT_TYPE = MimeType.valueOf("text/html");
	public static final String DEFAULT_PREFIX = "classpath:/templates/";
	public static final String DEFAULT_SUFFIX = ".html";
}
```

第一步）添加依赖

```xml
 <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-thymeleaf</artifactId>
  </dependency>
```

第二步）属性配置

```
 # 将缓存关闭 
spring.thymeleaf.cache=false

```
第三步）创建thymeleaf模板文件

创建`success.html`，放入`classpath:/templates/`文件夹下

```html
<!DOCTYPE html>
<!-- 导入thymeleaf的名称空间 -->
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h2>成功页面！</h2>
		<!-- th:text将div里面的文本内容设置为name代表的数据 -->
    <div th:text="${name}"></div>
</body>
</html>
```

第四步）编写控制器

```java
// 这里需要使用@Controller，而不是@RestController
@Controller
@RequestMapping("/api")
public class Hello {
    @ResponseBody
    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }

    @RequestMapping("/success")
    public String success(Model model) {
        // classpath:/templates/success.html
        model.addAttribute("name","alice");
        return "success";
    }
}
```
第五步）访问页面

访问`http://localhost:8080/api/success`，
可以看到html页面内容

##### thymeleaf语法规则

```
th:text：改变当前元素里面的文本内容（th:任意html属性：来替换原生属性的值）
th：任意html属性；来替换原生属性的值
th:include：加载模板的内容： 读取加载节点的内容（不含节点名称），替换div内容
th:replace：替换当前标签为模板中的标签，加载的节点会整个替换掉加载他的div
th:attr 来设置任意属性
th:attrprepend 来追加(不是替换)属性值
th:classappend
th:each每次遍历都会生成当前这个标签
th:href="@{...}" 替换url
th:text="${...}"　　　　 转译特殊字符，特殊符号原方不动输出
th:utext="${...}　　　　会转译字符,特殊符号被转译后输出结果

行内写法

[[ ]]等价于th:text   　　 

[( )]等价于th:utext
```

2）表达式

```
【 Simpleexpressions:(表达式语法) 】
    1、Variable Expressions: ${...}:获取变量值（OGNL）
        1)、获取对象的属性、调用方法
        2)、使用内置的基本对象:
            #ctx : the context object.
            #vars: the context variables.
            #locale : the context locale.
            #request : (only in Web Contexts) the HttpServletRequest object.
            #response : (only in Web Contexts) the HttpServletResponse object.
            #session : (only in Web Contexts) the HttpSession object.
            #servletContext : (only in Web Contexts) the ServletContext object.
        3)、内置的一些工具对象:
            #execInfo : information about the template being processed.
            #messages : methods for obtaining externalized messages inside variables expressions, in the same way as they would be obtained using #{...} syntax.
            #uris : methods for escaping parts of URLs/URIs
            #conversions : methods for executing the configured conversion service (if any).
            #dates : methods for java.util.Date objects: formatting, component extraction, etc.
            #calendars : analogous to #dates , but for java.util.Calendar objects.
            #numbers : methods for formatting numeric objects.
            #strings : methods for String objects: contains, startsWith, prepending/appending, etc.
            #objects : methods for objects in general.
            #bools : methods for boolean evaluation.
            #arrays : methods for arrays.
            #lists : methods for lists.
            #sets : methods for sets.
            #maps : methods for maps.
            #aggregates : methods for creating aggregates on arrays or collections.
            #ids : methods for dealing with id attributes that might be repeated (for example, as aresult of an iteration).

        2、Selection Variable Expressions: *{...}:选择表达式。和${}在功能上是一样（补充:配合th:object="${session.user}）
       	例子：
        <div th:object="${session.user}">
            <p>Name: <span th:text="*{firstName}">Sebastian</span>.</p>
            <p>Surname: <span th:text="*{lastName}">Pepper</span>.</p>
            <p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
        </div>

        3、Message Expressions: #{...}:获取国际化内容 
		
        4、Link URL Expressions: @{...}:定义URL;
        例子：@{/order/process(execId=${execId},execType='FAST')}

        5、Fragment Expressions: ~{...}:片段引用表达式
        例子：<div th:insert="~{commons :: main}">...</div>

【 Literals(字面量) 】
    Text literals: 'one text' , 'Another one!' ,... 
    Number literals: 0 , 34 , 3.0 , 12.3 ,... 
    Boolean literals: true , false
    Null literal: null
    Literal tokens: one , sometext , main ,...

【Text operations:(文本操作)】
    String concatenation: +
    Literal substitutions: |The name is ${name}|

【Arithmetic operations:(数学运算)】
    Binary operators: + , ‐ , * , / , %
    Minus sign (unary operator): ‐

【Booleanoperations:(布尔运算)】
    Binary operators: and , or
    Boolean negation (unary operator): ! , not

【Comparisonsandequality:(比较运算)】
    Comparators: > , < , >= , <= ( gt , lt , ge , le )
    Equality operators: == , != ( eq , ne )

【Conditionaloperators:条件运算(三元运算符)】
    If‐then: (if) ? (then)
    If‐then‐else: (if) ? (then) : (else)
    Default: (value) ?: (defaultvalue)

【Specialtokens:(特殊操作) 】
    No‐Operation: _  代表空操作，如在三元运算符的冒号后面使用
```

### SpringMVC自动配置

#### SpringMVC自动配置

Spring Boot 自动配置好了`SpringMVC`。

以下是SpringBoot对SpringMVC的默认配置(`WebMvcAutoConfiguration`)：

`Inclusion of ContentNegotiatingViewResolver and BeanNameViewResolver beans` <br>
自动配置了`ViewResolver`（视图解析器：根据方法的返回值得到视图对象(View)，视图对象决定如何渲染(转发或重定向)）<br>
`ContentNegotiatingViewResolver`：组合所有的视图解析器的 <br>
如果需要定制视图解析器：我们可以自己给容器中添加一个视图解析器，`ContentNegotiatingViewResolver`会自动的将其组合进来；

`Support for serving static resources, including support for WebJars` <br>
静态资源文件夹路径、`webjars`

`Static index.html support` <br>
静态首页访问

`Custom Favicon support` <br>
`favicon.ico`

自动注册了 `Converter` , `GenericConverter` , `Formatter beans`. <br>
`Converter`：转换器，`public String hello(User user):类型转换使用Converter` <br>
`Formatter`：格式化器，`2017.12.17===Date`; <br>
自己添加的格式化器转换器，我们只需要放在容器中即可（使用@Bean）

`Support for HttpMessageConverters` <br>
`HttpMessageConverter`：SpringMVC用来转换Http请求和响应的;`User---Json`; <br>
`HttpMessageConverters`是从容器中确定，获取所有的`HttpMessageConverter`; <br>
自己给容器中添加`HttpMessageConverter`，只需要将自己的组件注册容器中(`@Bean 或 @Component`)

`Automatic registration of MessageCodesResolver`：定义错误代码生成规则

`Automatic use of a ConfigurableWebBindingInitializer bean` <br>
初始化web数据绑定器的，`WebDataBinder`。他的作用是把请求数据转换为JavaBean <br>
我们可以配置一个`ConfigurableWebBindingInitializer`来替换默认的；(添加到容器)

#### 扩展SpringMVC

扩展方式：编写一个配置类(`@Configuration`)，是`WebMvcConfigurerAdapter`类型，不能标注`@EnableWebMvc`。

既保留了所有的自动配置，也能用我们扩展的配置（SpringMVC的自动配置和我们的扩展配置都会起作用）

```java
// 使用WebMvcConfigurerAdapter可以来扩展SpringMVC的功能
@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {
    // 添加视图映射
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // super.addViewControllers(registry);
        // 浏览器发送 /other 请求来到 success
        registry.addViewController("/other").setViewName("success");
    }
}
```

浏览器访问 `http://localhost:8080/other` ，
可以看到成功映射到了success页面

#### 全面接管SpringMVC

`@EnableWebMvc`（不推荐使用）

SpringBoot对SpringMVC的自动配置不需要了，所有都是我们自己配置。所有的SpringMVC的自动配置都失效了。我们需要在配置类中添加`@EnableWebMvc`即可

```java
// 使用WebMvcConfigurerAdapter可以来扩展SpringMVC的功能
@Configuration
// 全面接管SpringMVC
@EnableWebMvc
public class MyMvcConfig extends WebMvcConfigurerAdapter {
    // 添加视图映射
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // super.addViewControllers(registry);
        // 浏览器发送 /other 请求来到 success
        registry.addViewController("/other").setViewName("success");
    }
}
```

接管前通过`http://localhost:8080/static.html`
可以访问静态页面，全面接管后静态页面的规则就失效了，我们就无法直接访问了

修改SpringBoot的默认配置 <br>
模式:

```
1)、SpringBoot在自动配置很多组件的时候，先看容器中有没有用户自己配置的 (@Bean、@Component)。如果有就用用户配置的，如果没有才自动配置。如果有些组件可以有多个(如ViewResolver)，则将用户配置的和自己默认的组合起来；
2)、在SpringBoot中会有非常多的xxxConfigurer帮助我们进行扩展配置
3)、在SpringBoot中会有很多的xxxCustomizer帮助我们进行定制配置
```

### CRUD案例

将`login.html,success.html`放在`resources/templates`文件夹下

##### 1）默认访问首页

方法1：在controller中添加访问路径的匹配规则

```java
@RequestMapping({"/", "/index.html"})
public String index() {
    return "index";
}
```

方法2：在配置类中注册组件到容器

```java
// 使用WebMvcConfigurerAdapter可以来扩展SpringMVC的功能
@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {
    // 添加视图映射
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/other").setViewName("success");
    }

    // 所有的WebMvcConfigurerAdapter组件都会一起起作用
    @Bean //将组件注册在容器
    public WebMvcConfigurerAdapter webMvcConfigurerAdapter(){
        WebMvcConfigurerAdapter adapter = new WebMvcConfigurerAdapter() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/").setViewName("login");
                registry.addViewController("/index.html").setViewName("login");
            }
        };
        return adapter;
    }
}
```

##### 2）国际化

第一步：编写国际化配置文件，抽取页面需要显示的国际化消息

properties文件

第二步：SpringBoot自动配置好了管理国际化资源文件的组件

我们的配置文件可以直接放在类路径下叫`messages.properties`，或者在`application.properties`里配置路径

```
# 国际化配置的路径 spring.messages.basename=i18n.login
```

第三步：使用`#{}`可以在页面上获取国际化的值

```html
<!DOCTYPE html>
<html lang="en"  xmlns:th="http://www.thymeleaf.org">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="author" content="">
		<title>Signin Template for Bootstrap</title>
		<!-- Bootstrap core CSS -->
		<link href="asserts/css/bootstrap.min.css" th:href="@{/webjars/bootstrap/3.3.5/css/bootstrap.css}" rel="stylesheet">
		<!-- Custom styles for this template -->
		<link href="asserts/css/signin.css" th:href="@{/asserts/css/signin.css}" rel="stylesheet">
	</head>
	<body class="text-center">
		<form class="form-signin" action="dashboard.html" th:action="@{/user/login}" method="post">
			<img class="mb-4" th:src="@{/asserts/img/bootstrap-solid.svg}" src="asserts/img/bootstrap-solid.svg" alt="" width="72" height="72">
			<h1 class="h3 mb-3 font-weight-normal" th:text="#{login.tip}">Please sign in</h1>
			<!--判断-->
			<p style="color: red" th:text="${msg}" th:if="${not #strings.isEmpty(msg)}"></p>
			<label class="sr-only" th:text="#{login.username}">Username</label>
			<input type="text"  name="username" class="form-control" placeholder="Username" th:placeholder="#{login.username}" required="" autofocus="">
			<label class="sr-only" th:text="#{login.password}">Password</label>
			<input type="password" name="password" class="form-control" placeholder="Password" th:placeholder="#{login.password}" required="">
			<div class="checkbox mb-3">
				<label>
          			<input type="checkbox" value="remember-me"/> [[#{login.remember}]]
        		</label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit" th:text="#{login.btn}">Sign in</button>
			<p class="mt-5 mb-3 text-muted">© 2017-2018</p>
			<a class="btn btn-sm" th:href="@{/index.html(l='zh_CN')}">中文</a>
			<a class="btn btn-sm" th:href="@{/index.html(l='en_US')}">English</a>
		</form>
	</body>

</html>
```

第四步：点击链接切换国际化

自己实现一个LocaleResolver，然后在配置类中注册组件到容器

```java
@Bean
public LocaleResolver localeResolver(){
    return new MyLocaleResolver();
}
```

实现效果：

自己脑补

##### 3）登录

```java
@Controller
public class Login {
    // @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    @PostMapping(value = "/user/login")
    public String login(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        Map<String, Object> map, HttpSession session) {
        if (!StringUtils.isEmpty(username) && "1234".equals(password)) {
            session.setAttribute("loginUser", username);
            return "redirect:/main.html";
        } else {
            map.put("msg", "用户名密码错误");
            return "login";
        }
    }
}
```

配置类中添加一个试图映射

```
registry.addViewController("/main.html").setViewName("dashboard");
```

错误消息显示：

```xml
<pstyle="color:red"th:text="${msg}"th:if="${not#strings.isEmpty(msg)}"></p>
```

##### 4）拦截器进行登录检查

###### 拦截器

```java
// 登陆检查
public class LoginHandlerInterceptor implements HandlerInterceptor {
    //目标方法执行之前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object user = request.getSession().getAttribute("loginUser");
        if(user == null){
            //未登陆，返回登陆页面
            request.setAttribute("msg","没有权限请先登陆");
            request.getRequestDispatcher("/index.html").forward(request,response);
            return false;
        }else{
            //已登陆，放行请求
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {}

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {}
}
```

###### 注册拦截器

```java
// 所有的WebMvcConfigurerAdapter组件都会一起起作用
@Bean //将组件注册在容器
public WebMvcConfigurerAdapter webMvcConfigurerAdapter(){
    WebMvcConfigurerAdapter adapter = new WebMvcConfigurerAdapter() {
        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            registry.addViewController("/").setViewName("login");
            registry.addViewController("/index.html").setViewName("login");
            registry.addViewController("/main.html").setViewName("dashboard");
        }

        //注册拦截器
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            //super.addInterceptors(registry);
            // 静态资源; *.css , *.js
            // SpringBoot已经做好了静态资源映射
            registry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**")
                    .excludePathPatterns("/index.html","/","/user/login");
        }
    };
    return adapter;
}
```

##### 5）员工列表

三种引入公共片段的th属性:

```
th:insert:将公共片段整个插入到声明引入的元素中
th:replace:将声明引入的元素替换为公共片段
th:include:将被引入的片段的内容包含进这个标签中
```

```xml
<body>
  <!--引入抽取的topbar-->
  <!--模板名：会使用thymeleaf的前后缀配置规则进行解析-->
  <div th:replace="commons/bar::topbar"></div>

  <div class="container-fluid">
    <div class="row">
      <!--引入侧边栏-->
      <div th:replace="commons/bar::#sidebar(activeUri='emps')"></div>

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <h2><a class="btn btn-sm btn-success" href="emp" th:href="@{/emp}">员工添加</a></h2>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>lastName</th>
                <th>email</th>
                <th>gender</th>
                <th>department</th>
                <th>birth</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr th:each="emp:${emps}">
                <td th:text="${emp.id}"></td>
                <td>[[${emp.lastName}]]</td>
                <td th:text="${emp.email}"></td>
                <td th:text="${emp.gender}==0?'女':'男'"></td>
                <td th:text="${emp.department.departmentName}"></td>
                <td th:text="${#dates.format(emp.birth, 'yyyy-MM-dd HH:mm')}"></td>
                <td>
                  <a class="btn btn-sm btn-primary" th:href="@{/emp/}+${emp.id}">编辑</a>
                  <button th:attr="del_uri=@{/emp/}+${emp.id}" class="btn btn-sm btn-danger deleteBtn">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <form id="deleteEmpForm"  method="post">
        <input type="hidden" name="_method" value="delete"/>
      </form>
    </div>
  </div>

  <!-- Bootstrap core JavaScript
  ================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <script type="text/javascript" src="asserts/js/jquery-3.2.1.slim.min.js" th:src="@{/webjars/jquery/3.3.1/jquery.js}"></script>
  <script type="text/javascript" src="asserts/js/popper.min.js" th:src="@{/webjars/popper.js/1.11.1/dist/popper.js}"></script>
  <script type="text/javascript" src="asserts/js/bootstrap.min.js" th:src="@{/webjars/bootstrap/4.0.0/js/bootstrap.js}"></script>

  <!-- Icons -->
  <script type="text/javascript" src="asserts/js/feather.min.js" th:src="@{/asserts/js/feather.min.js}"></script>
  <script>
    feather.replace()
  </script>
  <script>
    $(".deleteBtn").click(function(){
        //删除当前员工的
        $("#deleteEmpForm").attr("action",$(this).attr("del_uri")).submit();
        return false;
          });
  </script>
</body>
```

##### 6）员工添加

请求添加页面

```java
//来到员工添加页面
@GetMapping("/emp")
public String toAddPage(Model model){
    //来到添加页面,查出所有的部门，在页面显示
    Collection<Department> departments = departmentDao.getDepartments();
    model.addAttribute("depts",departments);
    return "emp/add";
}
```

添加页面的表单（见下方修改）

员工添加功能

```java
//员工添加
//SpringMVC自动将请求参数和入参对象的属性进行一一绑定；要求请求参数的名字和javaBean入参的对象里面的属性名是一样的
@PostMapping("/emp")
public String addEmp(Employee employee){
    //来到员工列表页面
    System.out.println("保存的员工信息："+employee);
    //保存员工
    employeeDao.save(employee);
    // redirect: 表示重定向到一个地址  /代表当前项目路径
    // forward: 表示转发到一个地址
    return "redirect:/emps";
}
```

##### 7）员工修改

查询员工信息并回显

```java
//来到修改页面，查出当前员工，在页面回显
@GetMapping("/emp/{id}")
public String toEditPage(@PathVariable("id") Integer id,Model model){
    Employee employee = employeeDao.get(id);
    model.addAttribute("emp",employee);

    //页面要显示所有的部门列表
    Collection<Department> departments = departmentDao.getDepartments();
    model.addAttribute("depts",departments);
    //回到修改页面(add是一个修改添加二合一的页面);
    return "emp/add";
}
```

修改和添加是同一个页面：

```xml
<!--需要区分是员工修改还是添加；-->
<form th:action="@{/emp}" method="post">
    <!--发送put请求修改员工数据-->
    <!--
    1、SpringMVC中配置HiddenHttpMethodFilter;（SpringBoot自动配置好的）
    2、页面创建一个post表单
    3、创建一个input项，name="_method";值就是我们指定的请求方式
    -->
    <input type="hidden" name="_method" value="put" th:if="${emp!=null}"/>
    <input type="hidden" name="id" th:if="${emp!=null}" th:value="${emp.id}">
    <div class="form-group">
        <label>LastName</label>
        <input name="lastName" type="text" class="form-control" placeholder="zhangsan" th:value="${emp!=null}?${emp.lastName}">
    </div>
    <div class="form-group">
        <label>Email</label>
        <input name="email" type="email" class="form-control" placeholder="zhangsan@atguigu.com" th:value="${emp!=null}?${emp.email}">
    </div>
    <div class="form-group">
        <label>Gender</label><br/>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="gender" value="1" th:checked="${emp!=null}?${emp.gender==1}">
            <label class="form-check-label">男</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="gender" value="0" th:checked="${emp!=null}?${emp.gender==0}">
            <label class="form-check-label">女</label>
        </div>
    </div>
    <div class="form-group">
        <label>department</label>
        <!--提交的是部门的id-->
        <select class="form-control" name="department.id">
            <option th:selected="${emp!=null}?${dept.id == emp.department.id}" th:value="${dept.id}" th:each="dept:${depts}" th:text="${dept.departmentName}">1</option>
        </select>
    </div>
    <div class="form-group">
        <label>Birth</label>
        <input name="birth" type="text" class="form-control" placeholder="zhangsan" th:value="${emp!=null}?${#dates.format(emp.birth, 'yyyy-MM-dd HH:mm')}">
    </div>
    <button type="submit" class="btn btn-primary" th:text="${emp!=null}?'修改':'添加'">添加</button>
</form>
```

修改功能

```java
//员工修改；需要提交员工id；
@PutMapping("/emp")
public String updateEmployee(Employee employee){
    System.out.println("修改的员工数据："+employee);
    employeeDao.save(employee);
    return "redirect:/emps";
}
```

##### 8）员工删除

```xml
<button th:attr="del_uri=@{/emp/}+${emp.id}" class="btn btn-sm btn-danger deleteBtn">删除</button>

<script>
	$(".deleteBtn").click(function(){ //删除当前员工。先修改action地址再提交
        $("#deleteEmpForm").attr("action",$(this).attr("del_uri")).submit();
        return false;
    });
</script>
```

删除功能方法：

```java
//员工删除
@DeleteMapping("/emp/{id}")
public String deleteEmployee(@PathVariable("id") Integer id){
    employeeDao.delete(id);
    return "redirect:/emps";
}
```

#### 错误处理机制

##### 默认处理

浏览器返回一个默认的错误页面

```
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Sun Jun 11 10:32:29 CST 2023
There was an unexpected error (type=Not Found, status=404).
```

客户端请求默认返回JSON数据提示错误

```json
{
    "timestamp": "2023-06-11T02:37:03.631+00:00",
    "status": 404,
    "error": "Not Found",
    "path": "/hello1"
}
```
一但系统出现4xx或者5xx之类的错误，ErrorPageCustomizer就会生效（定制错误的响应规则），就会来到`/error`请求，就会被BasicErrorController处理

```java
@Value("${error.path:/error}")
private String path = "/error";
// 系统出现错误以后来到error请求进行处理;(web.xml注册的错误页面规则)
```
```java
private ModelAndView resolve(String viewName, Map<String, Object> model) {
    //默认SpringBoot可以去找到一个页面? error/404
	String errorViewName = "error/" + viewName;
	//模板引擎可以解析这个页面地址就用模板引擎解析
	TemplateAvailabilityProvider provider = this.templateAvailabilityProviders
            .getProvider(errorViewName, this.applicationContext);
    if (provider != null) {
		//模板引擎可用的情况下返回到errorViewName指定的视图地址
        return new ModelAndView(errorViewName, model);
    }
	//模板引擎不可用，就在静态资源文件夹下找errorViewName对应的页面 error/404.html
    return resolveResource(errorViewName, model);
}
```

##### 定制错误页面

1）有模板引擎的情况下：`error/状态码`。将错误页面命名为 错误状态码.html 放在模板引擎文件夹里面的error文件夹下，发生此状态码的错误就会来到对应的页面；
我们可以使用 4xx 和 5xx 作为错误页面的文件名来匹配这种类型的所有错误。精确优先（优先寻找精确的状态码.html）
页面能获取的信息：timestamp：时间戳、status：状态码、error：错误提示、exception：异常对象、message：异常消息、errors：JSR303数据校验的错误都在这里

2）没有模板引擎（模板引擎找不到这个错误页面），静态资源文件夹下找；

3）以上都没有错误页面，就是默认来到SpringBoot默认的错误提示页面；

定制错误JSON数据

1、方式1：自定义异常处理&返回定制json数据

```java
@ControllerAdvice
public class MyExceptionHandler {
    @ResponseBody
    @ExceptionHandler({UserNotExistException.class})
    public Map<String, Object> handleException(Exception e) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", "user.notexist");
        map.put("message", e.getMessage());
        return map;
    }
}
```

缺点：没有自适应效果（浏览器和客户端请求返回的都是JSON数据）

```json
{"code":"user.notexist","message":"user not exists"}
```

2、转发到`/error`进行自适应响应效果处理

```java
@ControllerAdvice
public class MyExceptionHandler {
    @ExceptionHandler({UserNotExistException.class})
    public String handleException(Exception e, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        request.setAttribute("javax.servlet.error.status_code", 500);
        map.put("code", "user.notexist");
        map.put("message", e.getMessage());
        // 转发到 /error
        return "forward:/error";
    }
}
```

##### 配置嵌入式Servlet容器

SpringBoot默认使用Tomcat作为嵌入式的Servlet容器

##### 定制修改Servlet容器的相关配置

方式1：修改和server有关的配置(ServerProperties【本质也是EmbeddedServletContainerCustomizer】)

```java
server.port=8081
server.context‐path=/crud

server.tomcat.uri‐encoding=UTF‐8
//通用的Servlet容器设置
server.xxx
//Tomcat的设置
server.tomcat.xxx
```

方式2：编写一个EmbeddedServletContainerCustomizer：嵌入式的Servlet容器的定制器，来修改Servlet容器的配置

```
@Bean //一定要将这个定制器加入到容器中
```

```java
@Bean //一定要将这个定制器加入到容器中
publicEmbeddedServletContainerCustomizerembeddedServletContainerCustomizer(){
    return new EmbeddedServletContainerCustomizer() {
        //定制嵌入式的Servlet容器相关的规则
        @Override
        public void customize(ConfigurableEmbeddedServletContainer container) {
            container.setPort(8083);
        }
    };
}
```

##### 注册Servlet三大组件

由于SpringBoot默认是以jar包的方式启动嵌入式的Servlet容器来启动SpringBoot的web应用，没有`web.xml`文件。 注册三大组件（Servlet、Filter、Listener）用以下方式：

###### ServletRegistrationBean

```java
@Configuration
public class MyServerConfig {
    // 注册三大组件
    @Bean
    public ServletRegistrationBean myServlet(){
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(new MyServlet(), "/myServlet");
        return registrationBean;
    }
}

// 请求 http://localhost:8080/myServlet  就会出现MyServlet中返回的内容
```

###### FilterRegistrationBean

```java
@Bean
public FilterRegistrationBean myFilter(){
    FilterRegistrationBean registrationBean = new FilterRegistrationBean();
    registrationBean.setFilter(new MyFilter());
    registrationBean.setUrlPatterns(Arrays.asList("/hello", "/myServlet"));
    return registrationBean;
}

// 请求 http://localhost:8080/myServlet  就会出现MyFilter的doFilter()中输出的内容
```

###### ServletListenerRegistrationBean

```java
@Bean
public ServletListenerRegistrationBean myListener(){
    ServletListenerRegistrationBean<MyListener> registrationBean = new ServletListenerRegistrationBean<>(new MyListener());
    return registrationBean;
}

// 输出结果：
contextInitialized---web应用启动
contextDestroyed---web应用关闭  // 这里是在点击暂停的时候
```

##### 其他嵌入式Servlet容器

Tomcat（默认使用）

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring‐boot‐starter‐web</artifactId>
    // 引入web模块默认就是使用嵌入式的Tomcat作为Servlet容器;
</dependency>
```

Jetty（开发长连接应用）

```xml
<dependency>
    <artifactId>spring‐boot‐starter‐jetty</artifactId>
    <groupId>org.springframework.boot</groupId>
 </dependency>
```

Undertow（不支持JSP）

```xml
<dependency>
   <artifactId>spring‐boot‐starter‐undertow</artifactId>
   <groupId>org.springframework.boot</groupId>
</dependency>
```

### Spring Boot与Docker

#### Docker简介

Docker是一个开源的应用容器引擎，是一个轻量级容器技术。Docker支持将软件编译成一个镜像，然后在镜像中各种软件做好配置，将镜像发布出去，其他使用者可以直接使用这个镜像；运行中的这个镜像称为容器，容器启动是非常快速的。

```
docker镜像(Images)：Docker镜像是用于创建Docker容器的模板
docker容器(Container)：容器是独立运行的一个或一组应用
docker客户端(Client)：客户端通过命令行或者其他工具使用Docker API(docs.docker.com/reference/a…) 与 Docker 的守护进程通信，即：连接docker主机进行操作
docker主机(Host)：一个物理或者虚拟的机器用于执行Docker守护进程和容器。即：安装了Docker程序的机器（Docker直接安装在操作系统之上）
docker仓库(Registry)：Docker仓库用来保存镜像，可以理解为代码控制中的代码仓库。Docker Hub(hub.docker.com) 提供了庞大的镜像集合供使用。
```

使用Docker的步骤:

1）安装Docker <br>
2）去Docker仓库找到这个软件对应的镜像 <br>
3）使用Docker运行这个镜像，这个镜像就会生成一个Docker容器 <br>
4）对容器的启动停止就是对软件的启动停止

#### 安装Docker

安装教程可参考：Docker 安装 | 菜鸟教程:`https://www.runoob.com/docker/ubuntu-docker-install.html`

```
 $ docker info
```

#### Docker常用操作

##### 镜像操作

|操作	|命令	|说明|
|---|---|---|
|检索	|`docker search 关键字` <br>eg：`docker search redis`	|我们经常去docker hub上检索镜像的详细信息，如镜像的TAG|
|拉取	|`docker pull 镜像名:tag`	|:tag是可选的，tag表示标签，多为软件的版本，默认是latest|
|列表	|`docker images`	|查看所有本地镜像|
|删除	|`docker rmi image-id`	|删除指定的本地镜像|

##### 容器操作

流程：软件镜像(QQ安装程序)-->运行镜像-->产生一个容器(正在运行的软件，运行的QQ)

|操作	|命令	|说明|
|---|---|---|
|运行	|`docker run --name container-name -d image-name` <br>eg:`docker run –name myredis <br> –d redis`	|`-name`:自定义容器名 <br>`-d`:后台运行 <br>`image-name`:指定镜像模板|
|列表	|`docker ps`（查看运行中的容器）	|加上`-a`可以查看所有容器|
|停止	|`docker stop container-name/container-id`	|停止当前运行的容器|
|启动	|`docker start container-name/container-id`	|启动容器|
|删除	|`docker rm container-id`	|删除指定容器|
|端口映射	|`-p 6379:6379` <br>eg:`docker run -d -p 6379:6379 --name myredis http://docker.io/redis`	|`-p`: 主机端口(映射到)容器内部的端口 <br>`‐d`:后台运行|
|容器日志	|`docker logs container-name/container-id` | |

更多命令可查看：docker:`https://docs.docker.com/engine/reference/commandline/docker/`

示例（tomcat）：

```
% docker images //查看镜像列表
% docker search tomcat //搜索镜像
% docker pull tomcat //拉取镜像
% docker run --name myTomcat -d tomcat:latest //根据镜像启动容器
% docker ps //查看运行中的容器
    ------输出------
    CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS      NAMES
    700a4fa11db6   tomcat:latest   "catalina.sh run"   25 seconds ago   Up 24 seconds   8080/tcp   myTomcat
% docker stop 700a4fa11db6[容器ID] //停止运行中的容器
% docker ps -a //查看所有的容器
    ------输出------
    CONTAINER ID   IMAGE           COMMAND             CREATED         STATUS                            PORTS     NAMES
    700a4fa11db6   tomcat:latest   "catalina.sh run"   5 minutes ago   Exited (143) About a minute ago             myTomcat
% docker start 700a4fa11db6[容器ID] //启动容器
% docker rm 700a4fa11db6[容器ID] //删除一个容器
% docker run -d -p 8888:8080 tomcat //启动一个做了端口映射的tomcat
    ‐d:后台运行
    ‐p: 将主机的端口映射到容器的一个端口 主机端口:容器内部的端口
    ------docker ps 输出------
    CONTAINER ID   IMAGE     COMMAND             CREATED          STATUS          PORTS                    NAMES
	8dbc9df132b4   tomcat    "catalina.sh run"   19 seconds ago   Up 19 seconds   0.0.0.0:8888->8080/tcp   eloquent_moore
% dockerlogscontainer‐name/container‐id //查看容器的日志
```

示例（mysql）：

```
% docker pull mysql
% docker run --name mysql01 -e MYSQL_ROOT_PASSWORD=123456 -d mysql //启动mysql
    ------输出------
	c9c10a720ba86f440737503396019c80ad0de88b8ae659e19214d8eda3253481
```

几个其他的高级操作：

```
docker run --name mysql03 ‐v /conf/mysql:/etc/mysql/conf.d ‐e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
把主机的/conf/mysql文件夹挂载到mysql docker容器的/etc/mysql/conf.d文件夹里面
改mysql的配置文件就只需要把mysql配置文件放在自定义的文件夹下(/conf/mysql)

docker run --name some‐mysql ‐e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag --character‐set‐server=utf8mb4 ‐‐collation‐server=utf8mb4 --collation -server=utf8mb4_unicode_ci
指定mysql的一些配置参数
```

#### Spring Boot与数据访问

对于数据访问层，无论是SQL还是NOSQL，Spring Boot默认采用整合Spring Data的方式进行统一处理，添加大量自动配置，屏蔽了很多设置。引入各种xxxTemplate、xxxRepository来简化我们对数据访问层的操作。对我们来说只需要进行简单的设置即可。

JDBC、MyBatis、JPA

##### 整合JDBC

创建项目时dependencies添加`SQL -> MySQL Driver`

配置：
```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/jdbc
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

测试代码：

```java
@SpringBootTest
class SpringDemo08JdbcApplicationTests {
    @Autowired
    DataSource dataSource;

    @Test
    void contextLoads() {
        // 默认使用的是 class com.zaxxer.hikari.HikariDataSource 数据源
        System.out.println(dataSource.getClass());
    }
}
```

数据源的相关配置都在DataSourceProperties源代码里面

```java
// 源码
@ConfigurationProperties(
    prefix = "spring.datasource"
)
```

SpringBoot默认可以支持：`org.apache.tomcat.jdbc.pool.DataSource、HikariDataSource、BasicDataSource`、自定义数据源类型。

##### 验证JDBC

配置文件里增加如下配置：

```
#spring.datasource.initialization-mode=always  此行已失效，使用下面的
spring.sql.init.mode=always
```

编写SQL并放在resources文件夹下面

启动springboot工程，刷新数据库，可以看到表成功创建（下次启动还是会创建，所以最好创建完毕后删除sql文件）

##### 编写测试查询代码

##### 整合Druid数据源

引入依赖

```xml
<!--引入自定义数据源druid-->
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid</artifactId>
  <version>1.1.8</version>
</dependency>
```

修改配置文件

```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/jdbc
spring.datasource.username=root
spring.datasource.password=root1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource // 切换数据源
```

测试代码

```java
@Test
void contextLoads() {
    System.out.println(dataSource.getClass()); // class com.alibaba.druid.pool.DruidDataSource
}
```

配置生效：

```java
@Configuration
public class DruidConfig {
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druid(){
        return new DruidDataSource();
    }
    // 这样在配置文件中配置druid的一些属性就可以生效了
}
```

##### 整合Mybatis

在dependencies里添加Mybatis Framework

##### 验证Mybatis

引入上方的druid数据源

配置文件：
```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/jdbc
spring.datasource.username=root
spring.datasource.password=root1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
```

建表语句：

```sql
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `d_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
```

创建JavaBean：`Employee & Department`

###### 注解版

```java
@Mapper //指定这是一个操作数据库的mapper
public interface DepartmentMapper {

    @Select("select * from department where id=#{id}")
    public Department getDeptById(Integer id);

    @Delete("delete from department where id=#{id}")
    public int deleteDeptById(Integer id);

    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("insert into department(departmentName) values (#{departmentName})")
    public int insertDept(Department department);

    @Update("update department set departmentName=#{departmentName} where id=#{id}")
    public int updateDept(Department department);
}
```

测试验证：

```java
@RestController
public class DepartmentController {
    @Autowired
    DepartmentMapper departmentMapper;

    @GetMapping("/dept/{id}")
    public Department getDepartment(@PathVariable("id") Integer id) {
        return departmentMapper.getDeptById(id);
        // 测试链接：http://localhost:8080/dept/1
        // 返回：{"id":1,"departmentName":"开发部"}
    }

    @GetMapping("/dept")
    public Department insertDepartment(Department department) {
        departmentMapper.insertDept(department);
        return department;
        // 测试链接：http://localhost:8080/dept?departmentName=开发部
        // 返回：{"id":1,"departmentName":"开发部"}
    }
}
```

如果此时数据库里字段是（department_name），查询结果就展示不出来名字了：`{"id":1,"departmentName":null}`。如何开启驼峰命名法配置？<br>
方法是自定义MyBatis的配置规则，给容器中添加一个ConfigurationCustomizer：

```java
@org.springframework.context.annotation.Configuration
public class MyBatisConfig {
    @Bean
    public ConfigurationCustomizer configurationCustomizer(){
        return new ConfigurationCustomizer() {
            @Override
            public void customize(Configuration configuration) {
                configuration.setMapUnderscoreToCamelCase(true); // 开启驼峰命名
            }
        };
    }
}
```

另一个问题是，每个mapper上都需要标注`@Mapper`注解，自动扫描配置呢？

```java
@MapperScan(value = "com.example.spring_demo09_mybatis.mapper") // 批量扫描所有的Mapper接口
@SpringBootApplication
public class SpringDemo09MybatisApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringDemo09MybatisApplication.class, args);
    }

}
```

###### 配置文件版

```java
@Mapper
public interface EmployeeMapper {
    public Employee getEmpById(Integer id);
    public void insertEmp(Employee employee);
}
```

mybatis配置文件：

`resources/mybatis/mapper/EmployeeMapper.xml`:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

`resources/mybatis/mybatis-config.xml`:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.spring_demo09_mybatis.mapper.EmployeeMapper">
   <!--    public Employee getEmpById(Integer id);-->
    <select id="getEmpById" resultType="com.example.spring_demo09_mybatis.bean.Employee">
        SELECT * FROM employee WHERE id=#{id}
    </select>

    <!--public void insertEmp(Employee employee);-->
    <insert id="insertEmp">
        INSERT INTO employee(lastName,email,gender,d_id) VALUES (#{lastName},#{email},#{gender},#{dId})
    </insert>
</mapper>
```


修改Spring配置文件增加如下内容：

```
#mybatis
#指定全局配置文件的位置
mybatis.config-location=classpath:mybatis/mybatis-config.xml
#指定sql映射文件的位置
mybatis.mapper-locations=classpath:mybatis/mapper/*.xml
```

测试方法：

```java
@GetMapping("/emp/{id}")
public Employee getEmp(@PathVariable("id") Integer id) {
    return employeeMapper.getEmpById(id);
    // 测试链接：http://localhost:8080/emp/1
    // 返回：{"id":1,"lastName":"Wang","gender":1,"email":"1111@qq.com","dId":1}
}
```

使用参考：`mybatis-spring-boot-autoconfigure - Introduction:http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/`

##### 整合JPA

Spring Data 项目的目的是为了简化构建基于 Spring 框架应用的数据访问技术，包括非关系数据库、 Map-Reduce 框架、云数据服务等等，另外也包含对关系数据库的访问支持。

SpringData 为我们提供使用统一的API来对数据访问层进行操作，这主要是Spring Data Commons项目来实现的。Spring Data Commons让我们在使用关系型或者非关系型数据访问技术时都基于Spring提供的统一标准，标准包含了CRUD(创建、获取、更新、删除)、查询、 排序和分页的相关操作。


统一的Repository接口：

```
Repository<T, ID extends Serializable>：统一接口
RevisionRepository<T, ID extends Serializable, N extends Number & Comparable>：基于乐观锁机制
CrudRepository<T, ID extends Serializable>：基本CRUD操作
PagingAndSortingRepository<T, ID extends Serializable>：基本CRUD及分页
```

提供数据访问模板类 xxxTemplate，如：MongoTemplate、RedisTemplate等

##### 验证JPA

1)、编写一个bean实体类和数据表进行映射，并且配置好映射关系；

```java
package com.example.spring_demo10_jpa.entity;

import javax.persistence.*;

// 使用JPA注解配置映射关系
@Entity //告诉JPA这是一个实体类(和数据表映射的类)
@Table(name = "tbl_user") // @Table来指定和哪个数据表对应，如果省略默认表名就是user
public class User {
    @Id // 代表这是一个主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增主键
    private Integer id;

    @Column(name = "name", length = 50) // 这是和数据表对应的一个列
    private String name;

    @Column // 省略默认列名就是属性名
    private String email;
}
```

2）、编写一个Dao接口来操作实体类对应的数据表(Repository)

```java
// 继承JpaRepository来完成对数据库的操作
public interface UserRepository extends JpaRepository<User, Integer> {
}
```

3）、基本的配置

```
#jpa
#更新或者创建数据表结构
spring.jpa.hibernate.ddl-auto=update
#控制台新鲜事SQL
spring.jpa.show-sql=true
```

4）、启动工程，自动生成数据表：

5）、测试

```java
@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    //    @GetMapping("/user/{id}")
    //    public User getUser(@PathVariable("id") Integer id){
    //        User user = userRepository.findOne(id);
    //        return user;
    //    }

    @GetMapping("/user")
    public User insertUser(User user){
        User save = userRepository.save(user);
        return save;
    }
}
```

请求`http://localhost:8080/user?name=haha&email=qqqq@qq.com`会进行日志输出：

```
Hibernate: insert into tbl_user (email, name) values (?, ?)
```

### Spring Boot启动配置原理

#### 启动流程

`SpringApplication.run`（主程序类）

1、 创建`SpringApplication`对象；

这一步主要是加载并保存所有的 `ApplicationContextInitializer` 和 `ApplicationListener`，并获取到主程序类

2、运行`run()`方法；

回调所有的`SpringApplicationRunListener的starting`、准备环境、创建ioc容器对象（web环境容器和普通环境容器）

#### 事件监听机制

1、准备环境

```
执行ApplicationContextInitializer. initialize()
监听器SpringApplicationRunListener回调contextPrepared
加载主配置类定义信息
监听器SpringApplicationRunListener回调contextLoaded
```

2、刷新启动IOC容器

```
扫描加载所有容器中的组件
包括从META-INF/spring.factories中获取的所有EnableAutoConfiguration组件
```

3、回调容器中所有的`ApplicationRunner、CommandLineRunner`的run方法

4、监听器`SpringApplicationRunListener`回调`finished`


#### Spring Boot自定义starters

编写自动配置：

```java
@Configuration //指定这个类是一个配置类
@ConditionalOnXXX //在指定条件成立的情况下自动配置类生效
@AutoConfigureAfter //指定自动配置类的顺序
@Bean //给容器中添加组件

@ConfigurationPropertie结合相关xxxProperties类来绑定相关的配置
@EnableConfigurationProperties//让xxxProperties生效加入到容器中

自动配置类要能加载，将需要启动就加载的自动配置类，配置在META‐INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
```

设计模式：

启动器starter只用来做依赖导入；

专门写一个自动配置模块，启动器依赖这个自动配置模块；

自定义启动器名-spring-boot-starter

> 来源：岛雨QA

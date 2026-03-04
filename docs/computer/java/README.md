
# SpringBoot HalloWorld

### 在IDEA中创建SpringBoot项目

##### JDK
JDK环境必须是1.8及以上（推荐1.8），此部分略过。

##### Maven
要使用到Maven管理工具，版本要求3.2.5及以上版本。

##### 开发工具
开发工具建议使用IntelliJ IDEA

##### Maven设置
在maven-setting文件中的标签里，设置jdk的默认编码等级为1.8

```xml
<!-- 设置默认编码等级1.8 -->
<mirrors>
      <mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
      </mirror>
  </mirrors>
 
  <profiles>
         <profile>
              <id>jdk-1.8</id>
              <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>1.8</jdk>
              </activation>
              <properties>
                <maven.compiler.source>1.8</maven.compiler.source>
                <maven.compiler.target>1.8</maven.compiler.target>
                <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
              </properties>
         </profile>
  </profiles>


```

##### 在IDEA中配置maven环境
Preferences → Bulid,Execution,Deployment → Maven

##### IDEA新建项目
打开IDEA，点击Create New Project新建一个项目

##### 选择Spring Initializr方式
选择 Spring Initializr 方式，其余默认保持不动，然后点击Next
（Spring Initializr是一个Web应用，它提供了一个基本的项目结构，能够帮助我们快速构建一个基础的Spring Boot项目）

使用spring官方的初始化方法。
https://start.spring.io/

配置项目信息

选择构建工具：Maven/Gradle（推荐 Maven）；<br>
选择语言：Java；<br>
配置 Spring Boot 版本、Group、Artifact、Java 版本等；<br>
点击「Add Dependencies」添加所需依赖（如 Spring Web）。<br>
生成并下载压缩包<br>
点击「GENERATE」按钮，浏览器自动下载springboot-demo.zip压缩包。<br>
解压压缩包到本地目录；<br>
打开 IDEA → 「File → Open」 → 选择解压后的项目目录 → 导入。<br>

##### POM文件
父项目是Spring Boot的版本仲裁中心（他来真正管理Spring Boot应用里面的所有依赖版本），以后我们导入依赖默认是不需要写版本（没有在dependencies里面管理的依赖自然需要声明版本号）

```xml
<!-- pom.xml -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.11</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>


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

##### 创建主程序

```javascript
/**
 * 主程序类
 * @SpringBootApplication：这是一个SpringBoot应用
 */
@SpringBootApplication
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class,args);
    }
}
```

##### 编写业务

```javascript
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String handle01(){
        return "Hello, Spring Boot 2!";
    }
}

```

##### 简化配置
application.properties

```javascript
server.port=8888
```

##### 简化部署
```xml
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

把项目打成jar包，直接在目标服务器执行即可。








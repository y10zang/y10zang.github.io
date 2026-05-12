# SpringBoot 实现代码自动生成

工作 3 年还在写 CRUD?简历投递杳无音讯？面试屡屡受挫，迟迟拿不到 offer？

在竞争激烈的大环境下，只有不断提升核心竞争力才能立于不败之地。

公众号:`https://mp.weixin.qq.com/s/zoWOCbsIUR5YoJeJGkqx6Q?`

为什么会产生此类代码生成工具？

由于 CRUD 的工作占了普通开发很多工作，而这些工作是重复的，所以出现了此类的代码生成工具。这些工具通过模板引擎来生成代码，常见于三方集成工具，IDE 插件等等。

什么是模板引擎？

模板引擎可以在代码生成过程中减少大量机械重复工作，大大提高开发效率，良好的设计使得代码重用，后期维护都降低成本。一个好的模板引擎的使用要考虑的方面无外乎：功能是否强大，使用是否简单，整合性、扩展性与灵活性，性能。

比如：

```
Velocity
FreeMarker
Thymeleaf
...
```

### 简单示例

这里展示通过 MyBatis-Plus 生成代码实现的


#### 准备DB

创建MySQL的schema `test_db`, 导入SQL 文件如下

```sql
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: test_db
-- ------------------------------------------------------
-- Server version 5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_role`
--

DROP TABLE IF EXISTS `tb_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_role`
--

LOCK TABLES `tb_role` WRITE;
/*!40000 ALTER TABLE `tb_role` DISABLE KEYS */;
INSERT INTO `tb_role` VALUES (1,'admin','admin','admin','2021-09-08 17:09:15','2021-09-08 17:09:15');
/*!40000 ALTER TABLE `tb_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'farerboy','dfasdf','suzhou.daipeng@gmail.com',1212121213,'afsdfsaf','2021-09-08 17:09:15','2021-09-08 17:09:15');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_role`
--

DROP TABLE IF EXISTS `tb_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_role`
--

LOCK TABLES `tb_user_role` WRITE;
/*!40000 ALTER TABLE `tb_user_role` DISABLE KEYS */;
INSERT INTO `tb_user_role` VALUES (1,1);
/*!40000 ALTER TABLE `tb_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-08 17:12:11
```

#### 添加POM依赖

包括mybatis-plus-generator和默认的模板引擎velocity依赖的velocity-engine-core。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.1</version>
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.2</version>
</dependency>
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.0</version>
</dependency>
```

#### 代码生成配置

```java
import com.baomidou.mybatisplus.generator.FastAutoGenerator;

/**
 * This class is for xxxx.
 *
 * @author farerboy
 */
public class TestGenCode {

    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/test_db?useSSL=false&autoReconnect=true&characterEncoding=utf8", "test", "bfXa4Pt2lUUScy8jakXf")
                .globalConfig(builder ->
                        builder.author("farerboy") // 设置作者
                                .enableSwagger() // 开启 swagger 模式
                )
                .packageConfig(builder ->
                        builder.parent("tech.farerboy.springboot.mysql8.mybatisplus.anno") // 设置父包名
                                .moduleName("gencode") // 设置父包模块名
                )
                .strategyConfig(builder ->
                        builder.addInclude("tb_user", "tb_role", "tb_user_role")
                )
                .execute();
    }
}
```

#### 生成代码

##### 进一步理解

主要了解MyBatis-Plus生成代码的原理。

代码生成的基本原理

其实代码生成是非常简单的，有了模板引擎的介绍，我们再看下MyBatis-Plus的代码生成工具是如何生成代码的。

配置的装载, `FastAutoGenerator`本质上就是通过`builder`注入各种配置，并将它交给代码生成主类：`AutoGenerator`

```java
public void execute() {
    new AutoGenerator(this.dataSourceConfigBuilder.build())
        // 全局配置
        .global(this.globalConfigBuilder.build())
        // 包配置
        .packageInfo(this.packageConfigBuilder.build())
        // 策略配置
        .strategy(this.strategyConfigBuilder.build())
        // 注入配置
        .injection(this.injectionConfigBuilder.build())
        // 模板配置
        .template(this.templateConfigBuilder.build())
        // 执行
        .execute(this.templateEngine);
}
```

`AutoGenerator`中`execute`方法，包括初始化配置和模板引擎（默认是Velocity），然后将配置交给模板引擎初始化执行文件输出

```java
/**
  * 生成代码
  *
  * @param templateEngine 模板引擎
  */
public void execute(AbstractTemplateEngine templateEngine) {
    logger.debug("==========================准备生成文件...==========================");
    // 初始化配置
    if (null == config) {
        config = new ConfigBuilder(packageInfo, dataSource, strategy, template, globalConfig, injection);
    }
    if (null == templateEngine) {
        // 为了兼容之前逻辑，采用 Velocity 引擎 【 默认 】
        templateEngine = new VelocityTemplateEngine();
    }
    templateEngine.setConfigBuilder(config);
    // 模板引擎初始化执行文件输出
    templateEngine.init(config).batchOutput().open();
    logger.debug("==========================文件生成完成！！！==========================");
}
```

模板引擎中batchOuput方法中，包含获取表的信息并根据模板来生成类文件。

```java
/**
  * 批量输出 java xml 文件
  */
@NotNull
public AbstractTemplateEngine batchOutput() {
    try {
        ConfigBuilder config = this.getConfigBuilder();
        List<TableInfo> tableInfoList = config.getTableInfoList();
        tableInfoList.forEach(tableInfo -> {
            Map<String, Object> objectMap = this.getObjectMap(config, tableInfo);
            Optional.ofNullable(config.getInjectionConfig()).ifPresent(t -> {
                t.beforeOutputFile(tableInfo, objectMap);
                // 输出自定义文件
                outputCustomFile(t.getCustomFile(), tableInfo, objectMap);
            });
            // entity
            outputEntity(tableInfo, objectMap);
            // mapper and xml
            outputMapper(tableInfo, objectMap);
            // service
            outputService(tableInfo, objectMap);
            // controller
            outputController(tableInfo, objectMap);
        });
    } catch (Exception e) {
        throw new RuntimeException("无法创建文件，请检查配置信息！", e);
    }
    return this;
}
```

获取表的列表，由`ConfigBuilder`完成

```java
public List<TableInfo> getTableInfoList() {
    if (tableInfoList.isEmpty()) {
        // TODO 暂时不开放自定义
        List<TableInfo> tableInfos = new IDatabaseQuery.DefaultDatabaseQuery(this).queryTables();
        if (!tableInfos.isEmpty()) {
            this.tableInfoList.addAll(tableInfos);
        }
    }
    return tableInfoList;
}
```

然后获取上述单个表(tableInfo)的具体信息(objectMap)

```java
/**
  * 渲染对象 MAP 信息
  *
  * @param config    配置信息
  * @param tableInfo 表信息对象
  * @return ignore
  */
@NotNull
public Map<String, Object> getObjectMap(@NotNull ConfigBuilder config, @NotNull TableInfo tableInfo) {
    StrategyConfig strategyConfig = config.getStrategyConfig();
    Map<String, Object> controllerData = strategyConfig.controller().renderData(tableInfo);
    Map<String, Object> objectMap = new HashMap<>(controllerData);
    Map<String, Object> mapperData = strategyConfig.mapper().renderData(tableInfo);
    objectMap.putAll(mapperData);
    Map<String, Object> serviceData = strategyConfig.service().renderData(tableInfo);
    objectMap.putAll(serviceData);
    Map<String, Object> entityData = strategyConfig.entity().renderData(tableInfo);
    objectMap.putAll(entityData);
    objectMap.put("config", config);
    objectMap.put("package", config.getPackageConfig().getPackageInfo());
    GlobalConfig globalConfig = config.getGlobalConfig();
    objectMap.put("author", globalConfig.getAuthor());
    objectMap.put("kotlin", globalConfig.isKotlin());
    objectMap.put("swagger", globalConfig.isSwagger());
    objectMap.put("date", globalConfig.getCommentDate());
    // 启用 schema 处理逻辑
    String schemaName = "";
    if (strategyConfig.isEnableSchema()) {
        // 存在 schemaName 设置拼接 . 组合表名
        schemaName = config.getDataSourceConfig().getSchemaName();
        if (StringUtils.isNotBlank(schemaName)) {
            schemaName += ".";
            tableInfo.setConvert(true);
        }
    }
    objectMap.put("schemaName", schemaName);
    objectMap.put("table", tableInfo);
    objectMap.put("entity", tableInfo.getEntityName());
    return objectMap;
}
```

根据`TableInfo`和`objectMap`输出类文件，以输出`Entity`实体类为例

```java
/**
  * 输出实体文件
  *
  * @param tableInfo 表信息
  * @param objectMap 渲染数据
  * @since 3.5.0
  */
protected void outputEntity(@NotNull TableInfo tableInfo, @NotNull Map<String, Object> objectMap) {
    String entityName = tableInfo.getEntityName();
    String entityPath = getPathInfo(OutputFile.entity);
    if (StringUtils.isNotBlank(entityName) && StringUtils.isNotBlank(entityPath)) {
        getTemplateFilePath(template -> template.getEntity(getConfigBuilder().getGlobalConfig().isKotlin())).ifPresent((entity) -> {
            String entityFile = String.format((entityPath + File.separator + "%s" + suffixJavaOrKt()), entityName);
            outputFile(new File(entityFile), objectMap, entity, getConfigBuilder().getStrategyConfig().entity().isFileOverride());
        });
    }
}
```

在`outputFile`中来确定生成文件的名字和路径

```java
/**
  * 输出文件
  *
  * @param file         文件
  * @param objectMap    渲染信息
  * @param templatePath 模板路径
  * @param fileOverride 是否覆盖已有文件
  * @since 3.5.2
  */
protected void outputFile(@NotNull File file, @NotNull Map<String, Object> objectMap, @NotNull String templatePath, boolean fileOverride) {
    if (isCreate(file, fileOverride)) {
        try {
            // 全局判断【默认】
            boolean exist = file.exists();
            if (!exist) {
                File parentFile = file.getParentFile();
                FileUtils.forceMkdir(parentFile);
            }
            writer(objectMap, templatePath, file);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }
}
```

最后通过`writer`方法生成文件

```java
/**
  * 将模板转化成为文件
  *
  * @param objectMap    渲染对象 MAP 信息
  * @param templatePath 模板文件
  * @param outputFile   文件生成的目录
  * @throws Exception 异常
  * @since 3.5.0
  */
public void writer(@NotNull Map<String, Object> objectMap, @NotNull String templatePath, @NotNull File outputFile) throws Exception {
    this.writer(objectMap, templatePath, outputFile.getPath());
    logger.debug("模板:" + templatePath + ";  文件:" + outputFile);
}
```

本质上就是调用模板引擎来生成

```java
    @Override
    public void writer(@NotNull Map<String, Object> objectMap, @NotNull String templatePath, @NotNull File outputFile) throws Exception {
        Template template = velocityEngine.getTemplate(templatePath, ConstVal.UTF8);
        try (FileOutputStream fos = new FileOutputStream(outputFile);
             OutputStreamWriter ow = new OutputStreamWriter(fos, ConstVal.UTF8);
             BufferedWriter writer = new BufferedWriter(ow)) {
            template.merge(new VelocityContext(objectMap), writer);
        }
    }
```

比如`Entity`，`velocityEngine.getTemplate`会获取如下`entity.vm`模板生成`Entity`的类文件。

```java
package ${package.Entity};

#foreach($pkg in ${table.importPackages})
import ${pkg};
#end
#if(${swagger})
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
#end

/**
 * <p>
 * $!{table.comment}
 * </p>
 *
 * @author ${author}
 * @since ${date}
 */
#if(${table.convert})
@TableName("${schemaName}${table.name}")
#end
#if(${swagger})
@ApiModel(value = "${entity}对象", description = "$!{table.comment}")
#end
#if(${superEntityClass})
class ${entity} : ${superEntityClass}#if(${activeRecord})<${entity}>#end() {
#elseif(${activeRecord})
class ${entity} : Model<${entity}>() {
#elseif(${entitySerialVersionUID})
class ${entity} : Serializable {
#else
class ${entity} {
#end

## ----------  BEGIN 字段循环遍历  ----------
#foreach($field in ${table.fields})
#if(${field.keyFlag})
#set($keyPropertyName=${field.propertyName})
#end
#if("$!field.comment" != "")
    #if(${swagger})
    @ApiModelProperty(value = "${field.comment}")
    #else
    /**
     * ${field.comment}
     */
    #end
#end
#if(${field.keyFlag})
## 主键
#if(${field.keyIdentityFlag})
    @TableId(value = "${field.annotationColumnName}", type = IdType.AUTO)
#elseif(!$null.isNull(${idType}) && "$!idType" != "")
    @TableId(value = "${field.annotationColumnName}", type = IdType.${idType})
#elseif(${field.convert})
    @TableId("${field.annotationColumnName}")
#end
## 普通字段
#elseif(${field.fill})
## -----   存在字段填充设置   -----
#if(${field.convert})
    @TableField(value = "${field.annotationColumnName}", fill = FieldFill.${field.fill})
#else
    @TableField(fill = FieldFill.${field.fill})
#end
#elseif(${field.convert})
    @TableField("${field.annotationColumnName}")
#end
## 乐观锁注解
#if(${field.versionField})
    @Version
#end
## 逻辑删除注解
#if(${field.logicDeleteField})
    @TableLogic
#end
    #if(${field.propertyType} == "Integer")
    var ${field.propertyName}: Int? = null
    #else
    var ${field.propertyName}: ${field.propertyType}? = null
    #end

#end
## ----------  END 字段循环遍历  ----------
#if(${entityColumnConstant})
    companion object {
#foreach($field in ${table.fields})

        const val ${field.name.toUpperCase()} : String = "${field.name}"

#end
    }

#end
#if(${activeRecord})
    override fun pkVal(): Serializable? {
#if(${keyPropertyName})
        return${keyPropertyName}
#else
        return null
#end
    }

#end
    override fun toString(): String {
        return"${entity}{" +
#foreach($field in ${table.fields})
#if($!{foreach.index}==0)
        "${field.propertyName}=" + ${field.propertyName} +
#else
        ", ${field.propertyName}=" + ${field.propertyName} +
#end
#end
        "}"
    }
}
```

同理生成`mapper`, `service`, `controller`等文件。是不是很简单？

如何看MyBatis-Plus生成代码的功能？

简单而言，对于初学者好像能生成代码作用很大，实际情况是很鸡肋！

从上面的源码我们可以看出，生成类只适合单表结构，表的关联无法处理；

对于单表的CRUD类，如果可以自动化生成，必然是可以很好的抽象的，而`BaseMapper`, `BaseServiceImpl`的封装已经足够了；

通常真正可以通过一体化集成前端代码的生成，才有一定的意义；

当然少部分情况快速提供接口的可以考虑，不过其实也省不了什么时间。

架构设计之道在于在不同的场景采用合适的架构设计，架构设计没有完美，只有合适。

在代码的路上，我们一起砥砺前行。用代码改变世界！

# 一文带你掌握MyBatis-Plus代码生成器：从入门到精通，实现原理与自定义模板全解析

link:`https://mp.weixin.qq.com/s/MtCFFGqjm60pXTFpAT4BYw?`

### 1.背景：为什么需要代码生成器？

近年来，随着AI编程和低代码平台的兴起，开发效率成为技术圈的热门话题。虽然这些工具能够在一定程度上提升开发效率，但对于复杂的业务逻辑和定制化需求，仍然需要程序员手动编写代码。

特别是在后端开发中，业务接口的编写往往存在大量重复性工作：实体类、`Mapper`、`Service`、`Controller`等基础代码结构相似，却需要反复编写。这时候，一个优秀的代码生成器就能大显身手。

今天我要详细介绍的就是MyBatis-Plus Generator（简称MPG），这款强大的代码生成工具能够根据数据库表结构，自动生成包括`Entity`、`Mapper`、`Service`、`Controller`在内的全套代码，真正实现"一键生成，开箱即用"。

### 2.快速入门：5分钟上手代码生成

#### 2.1 引入依赖

```xml
  <!-- 代码生成器  -->
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.5.12</version>
  </dependency>
  <!-- 模板引擎（Freemarker示例） -->
  <dependency>
      <groupId>org.freemarker</groupId>
      <artifactId>freemarker</artifactId>
      <version>2.3.32</version>
  </dependency>
```

#### 2.2 准备测试数据表

创建一张测试用户表`tb_user`:

```sql
CREATE TABLE `tb_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_no` varchar(255) NOT NULL COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) NOT NULL COMMENT '手机号',
  `gender` tinyint(4) NOT NULL DEFAULT '0' COMMENT '性别  0：男生   1：女生',
  `birthday` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '出生日期',
  `is_delete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标志 0：否  1：是',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `creator` bigint(20) DEFAULT NULL COMMENT '创建人',
  `updater` bigint(20) DEFAULT NULL COMMENT '更新人',
  `address` varchar(1024) DEFAULT NULL COMMENT '地址',
  `role_id` varchar(100) DEFAULT NULL COMMENT '角色id',
  `hobby` varchar(255) DEFAULT NULL COMMENT '爱好',
  `remark` varchar(255) DEFAULT NULL COMMENT '个人说明',
  `org_id` bigint(20) DEFAULT NULL COMMENT '公司id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_user_no` (`user_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
```

#### 2.3 基础配置生成代码

MPG提供了流畅的`Builder`模式API，让配置过程直观易懂：

```java
public class CodeGeneratorTest {

    public static void main(String[] args) {
        // 使用 FastAutoGenerator 快速配置代码生成器
        FastAutoGenerator.create("jdbc:mysql://127.0.0.1:3306/db_test?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&allowMultiQueries=true",
                        "root",
                        "root")
                .globalConfig(builder -> {  // 全局配置
                    builder.author("ZFJ") // 设置作者
                            .commentDate("yyyy-MM-dd")  // 设置日期
                            .enableSpringdoc()  // 开启openapi3文档注释
                            .outputDir("src/main/java")  // 输出目录
                            .disableOpenDir(); // 不打开路径
                })
                .packageConfig(builder -> {
                    builder.parent("com.shepherd.example") // 设置父包名
                            .entity("entity") // 设置entity实体类包名
                            .mapper("dao") // 设置Mapper接口包名
                            .service("service") // 设置Service接口包名
                            .serviceImpl("service.impl") // 设置Service实现类包名
                            .xml("mappers"); // 设置 MapperXML文件包名
                })
                .strategyConfig(builder -> {
                    builder.addInclude("tb_user") // 设置需要生成的表名
                            .addTablePrefix("tb_") // 添加表前缀
                            // 设置实体类
                            .entityBuilder()
                            .enableLombok(new ClassAnnotationAttributes("@Data","lombok.Data")) // 启用 Lombok
                            .enableTableFieldAnnotation() // 启用字段注解
                            .javaTemplate("/templates/entity.java") // 设置实体类模板
                            // 设置mapper接口
                            .mapperBuilder()
                            .mapperTemplate("/templates/mapper.java") // 设置mapper目标
                            .convertMapperFileName((entityName -> entityName + "DAO")) // 设置mapper接口文件名
                            .enableBaseResultMap()
                            .enableBaseColumnList()
                            // 设置service接口
                            .serviceBuilder()
                            .serviceTemplate("/templates/service.java") // 设置Service模板
                            .convertServiceFileName((entityName -> entityName + "Service")) // 设置service文件名
                            .serviceImplTemplate("/templates/serviceImpl.java") // 设置ServiceImpl模板
                            // 设置controller类
                            .controllerBuilder()
                            .template("/templates/controller.java")
                            .enableRestStyle(); // 启用 REST 风格
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用 Freemarker 模板引擎
                .execute(); // 执行生成
    }
}
```

运行生成代码文件如下所示：

### 3.核心配置

#### 3.1 全局配置（GlobalConfig）

全局配置提供了对代码生成器整体行为的设置，包括输出目录、作者信息、`Kotlin `模式、`Swagger` 集成、`Springdoc`、时间类型策略等

|方法|说明|示例|
|---|---|---|
|`disableOpenDir()`|禁止自动打开输出目录|默认值: true|
|`outputDir(String)`|指定代码生成的输出目录|如：`System.getProperty("user.dir") + "/src/main/java"`|
|`author(String)`|设置作者名|默认值:baomidou  配置文件中的作者名|
|`enableKotlin()`|开启 Kotlin 模式|默认值: false|
|`enableSwagger()`|开启 Swagger 模式|默认值: false|
|`dateType(DateType)`|设置时间类型策略|`DateType.ONLY_DATE` 默认值: `DateType.TIME_PACK`|
|`commentDate(String)`|设置注释日期格式|默认值: `yyyy-MM-dd`|
|`enableSpringdoc`|开启Springdoc文档|默认值：false|

#### 3.2 策略配置（StrategyConfig）

策略配置是MPG的核心部分，它允许开发者根据项目需求定制代码生成的规则，包括命名模式、表和字段的过滤、以及各个代码模块的生成策略。

|方法|说明|示例|
|---|---|---|
|`enableCapitalMode`|开启大写命名|默认值: false|
|`enableSkipView`|开启跳过视图|默认值: false|
|`disableSqlFilter`|禁用 SQL 过滤|默认值: true，如果 SQL 过滤不支持，可以关闭此选项|
|`enableSchema`|启用 schema|默认值: false，多 schema 场景时启用|
|`likeTable(LikeTable)`|模糊表匹配(SQL 过滤)|与 `notLikeTable` 互斥，只能配置一项|
|`notLikeTable(LikeTable)`|模糊表排除(SQL 过滤)|与 `likeTable` 互斥，只能配置一项|
|`addInclude(String…)`|增加表匹配(内存过滤)|与 `addExclude` 互斥，只能配置一项，支持正则匹配，如 `^t_.*` 匹配所有以 `t_` 开头的表名|
|`addExclude(String…)`|增加表排除匹配(内存过滤)|与 `addInclude` 互斥，只能配置一项，支持正则匹配，如 `.*st$` 匹配所有以 `st` 结尾的表名|
|`addTablePrefix(String…)`|增加过滤表前缀||
|`addTableSuffix(String…)`|增加过滤表后缀||
|`addFieldPrefix(String…)`|增加过滤字段前缀||
|`addFieldSuffix(String…)`|增加过滤字段后缀||
|`outputFile`|内置模板输出文件处理|参考测试用例 `H2CodeGeneratorTest.testOutputFile`|
|`entityBuilder`|实体策略配置||
|`controllerBuilder`|`Controller` 策略配置||
|`mapperBuilder`|`Mapper` 策略配置||
|`serviceBuilder`|`Service` 策略配置||

可以看到策略配置对提供统一的生成规则配置，还支持`entity, mapper, service, controller`等类分别配置，条理清晰，功能强大。碍于篇幅问题，我这里就只展示一下实体类entity的生成策略配置，其他的详见官网文档。

##### Entity 策略配置

实体策略配置用于定制实体类的生成规则，包括父类、序列化版本 UID、文件覆盖、字段常量、链式模型、Lombok 模型等

|方法|说明|示例|
|---|---|---|
|`nameConvert(INameConvert)`|名称转换实现||
|`superClass(Class<?>)`|设置父类|`BaseEntity.class`|
|`superClass(String)`|设置父类|`com.baomidou.global.BaseEntity`|
|`disableSerialVersionUID`|禁用生成 `serialVersionUID`|默认值: `true`|
|`enableFileOverride`|覆盖已生成文件|默认值: `false`|
|`enableColumnConstant`|开启生成字段常量|默认值: `false`|
|`enableChainModel`|开启链式模型|默认值: `false`|
|`enableLombok`|开启 `Lombok` 模型|默认值: `false` 默认只有`Getter,Setter`,自3.5.10后增加`ToString`|
|`enableRemoveIsPrefix`|开启 `Boolean` 类型字段移除 is 前缀|默认值: `false`|
|`enableTableFieldAnnotation`|开启生成实体时生成字段注解|默认值: `false`|
|`enableActiveRecord`|开启 `ActiveRecord` 模型|默认值: `false`|
|`versionColumnName(String)`|乐观锁字段名(数据库字段)|`versionColumnName` 与 `versionPropertyName` 二选一即可|
|`versionPropertyName(String)`|乐观锁属性名(实体)|`versionColumnName` 与 `versionPropertyName` 二选一即可|
|`logicDeleteColumnName(String)`|逻辑删除字段名(数据库字段)|`logicDeleteColumnName` 与 `logicDeletePropertyName` 二选一即可|
|`logicDeletePropertyName(String)`|逻辑删除属性名(实体)|`logicDeleteColumnName` 与 `logicDeletePropertyName` 二选一即可|
|`naming`|数据库表映射到实体的命名策略|默认下划线转驼峰命名: `NamingStrategy.underline_to_camel`|
|`columnNaming`|数据库表字段映射到实体的命名策略|默认为 `null`，未指定按照 `naming` 执行|
|`addSuperEntityColumns(String…)`|添加父类公共字段||
|`addIgnoreColumns(String…)`|添加忽略字段||
|`addTableFills(IFill…)`|添加表字段填充||
|`addTableFills(List)`|添加表字段填充||
|`idType(IdType)`|全局主键类型||
|`convertFileName(ConverterFileName)`|转换文件名称||
|`formatFileName(String)`|格式化文件名称||
|`toString(boolean)`|是否生成`ToString`方法|默认为`true`, 自`3.5.10`开始|
|`fieldUseJavaDoc`|启用字段文档注释|默认为`true`, 自`3.5.10`开始|
|`classAnnotations(ClassAnnotationAttributes)`|添加实体类注解|自`3.5.10`开始|
|`tableAnnotationHandler`|表注解处理器|自`3.5.10`开始|
|`tableFieldAnnotationHandler`|字段注解处理器|自`3.5.10`开始|
|`enableLombok(ClassAnnotationAttributes…)`|开启 `Lombok` 模型并设置`Lombok`注解|自`3.5.10`开始. 使用`@Data`示例: `enableLombok(new ClassAnnotationAttributes(“@Data”,“lombok.Data”))`|

当然了除了上面提到的全局配置和策略配置，还有数据源配置，包名配置等等，但这些都比较简单，顾名思义数据源配置就是配置数据源的，包名配置就是配置生成代码类的包名路径，具体方法api还是请移步官网查看

### 4. 自定义模板：打造团队专属代码风格

#### 4.1 自定义DTO生成模板

MPG默认不提供DTO模板，但我们可以轻松扩展。创建`templates/entityDTO.java.ftl`：

```java
package ${package.Entity};

<#list importEntityFrameworkPackages as pkg>
import ${pkg};
</#list>

<#list importEntityJavaPackages as pkg>
import ${pkg};
</#list>

/**
 * <p>
 * ${table.comment!}
 * </p>
 *
 * @author ${author}
 * @since ${date}
 */
@Data
@Schema(description = "${table.comment!}")
public class ${entity}DTO {
<#-- ----------  BEGIN 字段循环遍历  ---------->
<#list table.fields as field>
    @Schema(description = "${field.comment!}")
    private ${field.propertyType} ${field.propertyName};
</#list>
<#------------  END 字段循环遍历  ---------->
}
```

关于`Freemarker`模版的语法，请另行查阅资料。

在上面生成示例代码中追加注入配置：

```java
.injectionConfig(injectConfig -> {
                    injectConfig.customFile(new CustomFile.Builder()
                            .fileName("DTO.java") // 文件名称
                            .templatePath("templates/entityDTO.java.ftl") //指定生成模板路径
                            .packageName("model.dto") // 包名,
                            .build());
```

再次运行就能生成如下代码：

```java
@Data
@Schema(description = "用户信息")
public class UserDTO {
    @Schema(description = "主键")
    private Long id;
    @Schema(description = "编号")
    private String userNo;
    @Schema(description = "昵称")
    private String name;
    @Schema(description = "邮箱")
    private String email;
    @Schema(description = "手机号")
    private String phone;
    @Schema(description = "性别  0：男生   1：女生")
    private Byte gender;
    @Schema(description = "出生日期")
    private LocalDateTime birthday;
    @Schema(description = "删除标志 0：否  1：是")
    private Byte isDelete;
    @Schema(description = "创建时间")
    private LocalDateTime createTime;
    @Schema(description = "更新时间")
    private LocalDateTime updateTime;
    @Schema(description = "创建人")
    private Long creator;
    @Schema(description = "更新人")
    private Long updater;
    @Schema(description = "地址")
    private String address;
    @Schema(description = "角色id")
    private String roleId;
    @Schema(description = "爱好")
    private String hobby;
    @Schema(description = "个人说明")
    private String remark;
    @Schema(description = "公司id")
    private Long orgId;
}
```

#### 4.2 定制功能丰富的Controller模板

默认生成的`Controller`比较基础，如果业务的CRUD代码没有包含复杂处理逻辑，那么我们可以通过定制代码减少编码重复，创建更实用的模板`templates/controller.java.ftl`：

```java
<#assign serviceNameLower = table.serviceName?uncap_first>
<#assign entityNameLower = table.entityName?uncap_first>

package ${package.Controller};

import ${package.Service}.${table.serviceName};
import ${package.Param}.${table.entityName}Param;
import ${package.Query}.${table.entityName}Query;
import ${package.VO}.${table.entityName}VO;
import com.plasticene.boot.common.pojo.ResponseVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;


/**
 * <p>
 * ${table.comment!}
 * </p>
 *
 * @author ${author}
 * @since ${date}
 */
@RestController
@RequestMapping("<#if package.ModuleName?? && package.ModuleName != "">/${package.ModuleName}</#if>/<#if controllerMappingHyphenStyle>${controllerMappingHyphen}<#else>${table.entityPath}</#if>")
@Tag(name = "${table.comment!}")
public class ${table.controllerName} {
    @Resource
    private ${table.serviceName} ${serviceNameLower};

    @PostMapping
    @Operation(summary = "创建")
    public ResponseVO<Long> create(@RequestBody @Validated ${table.entityName}Param ${entityNameLower}Param) {
        Long id = ${serviceNameLower}.create(${entityNameLower}Param);
         return ResponseVO.success(id);
    }

    @PutMapping
    @Operation(summary = "修改")
    public ResponseVO<Void> update(@RequestBody @Validated ${table.entityName}Param ${entityNameLower}Param) {
        ${serviceNameLower}.update(${entityNameLower}Param);
        return ResponseVO.success();
    }

    @DeleteMapping
    @Operation(summary = "删除")
    public ResponseVO<Void> delete(@RequestBody List<Long> idList) {
        ${serviceNameLower}.delete(idList);
        return ResponseVO.success();
    }

    @GetMapping("/page")
    @Operation(summary = "分页")
    public ResponseVO<PageResult<${table.entityName}VO>> page(${table.entityName}Query ${entityNameLower}Quey) {
        PageResult<${table.entityName}VO> pageVO = ${serviceNameLower}.page(${entityNameLower}Query);
        return ResponseVO.success(pageVO);
    }

    @GetMapping("/{id}")
    @Operation(summary = "详情")
    public ResponseVO<${table.entityName}VO> detail(@PathVariable("id") Long id) {
        ${table.entityName}VO ${entityNameLower}VO = ${serviceNameLower}.detail(id);
        return ResponseVO.success(${entityNameLower}VO);
    }

}
```

再次运行上面生成示例代码：`UserController`

```java
package com.shepherd.example.controller;

import com.shepherd.example.service.UserService;
import com.shepherd.example.model.param.UserParam;
import com.shepherd.example.model.query.UserQuery;
import com.shepherd.example.model.vo.UserVO;
import com.plasticene.boot.common.pojo.ResponseVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;


/**
 * <p>
 * 用户信息
 * </p>
 *
 * @author ZFJ
 * @since 2025-12-03
 */
@RestController
@RequestMapping("/user")
@Tag(name = "用户信息")
public class UserController {
    @Resource
    private UserService userService;

    @PostMapping
    @Operation(summary = "创建")
    public ResponseVO<Long> create(@RequestBody @Validated UserParam userParam) {
        Long id = userService.create(userParam);
         return ResponseVO.success(id);
    }

    @PutMapping
    @Operation(summary = "修改")
    public ResponseVO<Void> update(@RequestBody @Validated UserParam userParam) {
        userService.update(userParam);
        return ResponseVO.success();
    }

    @DeleteMapping
    @Operation(summary = "删除")
    public ResponseVO<Void> delete(@RequestBody List<Long> idList) {
        userService.delete(idList);
        return ResponseVO.success();
    }

    @GetMapping("/page")
    @Operation(summary = "分页")
    public ResponseVO<PageResult<UserVO>> page(UserQuery userQuey) {
        PageResult<UserVO> pageVO = userService.page(userQuery);
        return ResponseVO.success(pageVO);
    }

    @GetMapping("/{id}")
    @Operation(summary = "详情")
    public ResponseVO<UserVO> detail(@PathVariable("id") Long id) {
        UserVO userVO = userService.detail(id);
        return ResponseVO.success(userVO);
    }

}
```

至于`service`层的业务定制代码，大家自行尝试定制一下哈。

### 5.深入原理：MPG是如何工作的？

#### 5.1 核心类结构

```
AutoGenerator              // 代码生成器入口
├── ConfigBuilder          // 配置构建器
├── TemplateEngine         // 模板引擎抽象
│   ├── VelocityTemplateEngine
│   ├── FreemarkerTemplateEngine
│   └── BeetlTemplateEngine
└── InjectionConfig        // 注入配置
```

#### 5.2 代码生成流程

1. 配置解析：解析全局配置、数据源配置、包配置、策略配置
2. 表信息获取：通过JDBC获取数据库表结构和字段信息
3. 模板渲染：使用模板引擎将数据模型渲染到模板文件中
4. 文件输出：将渲染结果写入到指定目录

#### 5.3 关键源码分析

调试上面生成代码示例，直接来到`AutoGenerator`的执行方法`#execute()`

```java
 public void execute(AbstractTemplateEngine templateEngine) {
        logger.debug("==========================准备生成文件...==========================");
        
        // 如果配置信息为空，则创建新的配置构建器
        if (null == this.config) {
            this.config = new ConfigBuilder(this.packageInfo, this.dataSource, this.strategy, this.template, this.globalConfig, this.injection);
        }

        // 如果模板引擎为空，则使用默认的Velocity模板引擎
        if (null == templateEngine) {
            templateEngine = new VelocityTemplateEngine();
        }

        // 设置配置构建器并执行批量输出操作
        templateEngine.setConfigBuilder(this.config);
        templateEngine.init(this.config).batchOutput().open();
        logger.debug("==========================文件生成完成！！！==========================");
    }
```

最后到生成各类代码文件的方法`batchOutput()`

```java
    /**
     * 批量输出模板文件
     * <p>
     * 该方法根据配置信息批量生成代码文件，包括实体类、Mapper、Service、Controller等文件。
     * 处理流程如下：
     * 1. 获取配置构建器和表信息列表
     * 2. 遍历每张表，生成对应的对象映射关系
     * 3. 执行自定义文件输出前的回调处理
     * 4. 输出各类代码文件
     *
     * @return AbstractTemplateEngine 模板引擎实例，用于链式调用
     * @throws RuntimeException 当文件创建失败或配置信息有误时抛出运行时异常
     */
    public @NotNull AbstractTemplateEngine batchOutput() {
        try {
            // 获取配置构建器实例
            ConfigBuilder config = this.getConfigBuilder();
            // 获取所有需要处理的表信息列表
            List<TableInfo> tableInfoList = config.getTableInfoList();
            
            // 遍历所有表信息，为每张表生成相应的代码文件
            tableInfoList.forEach((tableInfo) -> {
                // 构建当前表的对象映射关系，用于模板渲染
                Map<String, Object> objectMap = this.getObjectMap(config, tableInfo);
                
                // 处理自定义注入配置（如果存在）
                Optional.ofNullable(config.getInjectionConfig()).ifPresent((t) -> {
                    // 在输出文件前执行自定义回调处理
                    t.beforeOutputFile(tableInfo, objectMap);
                    // 输出自定义文件
                    this.outputCustomFile(t.getCustomFiles(), tableInfo, objectMap);
                });
                
                // 按顺序输出各类标准代码文件
                this.outputEntity(tableInfo, objectMap);
                this.outputMapper(tableInfo, objectMap);
                this.outputService(tableInfo, objectMap);
                this.outputController(tableInfo, objectMap);
            });
            
            return this;
        } catch (Exception e) {
            throw new RuntimeException("无法创建文件，请检查配置信息！", e);
        }
    }
```

### 6.总结

MyBatis-Plus代码生成器作为一款功能强大、扩展性极佳的代码生成工具，通过合理的配置策略和灵活的自定义模板，能够满足绝大多数项目的代码生成需求。深入理解其底层原理并掌握高级应用技巧，不仅能大幅提升开发效率，更能确保团队代码的规范性和一致性。

对于后端开发者而言，定制符合团队规范的代码生成方案，主要有两种实践路径：

#### 📦 方案一：Spring Boot深度集成

将生成策略封装为配置文件，与项目无缝集成

支持一键生成代码到指定项目目录

可进一步封装为Starter，实现团队级标准化

#### 🔧 方案二：工具类灵活定制

提供高度可配置的代码生成工具类

支持运行时动态规则设置

更适合多项目、差异化的生成需求

#### 💡 重要提醒

需要特别说明的是，本文旨在系统介绍MyBatis-Plus代码生成器的技术实现与最佳实践，并非鼓励盲目依赖代码生成。在实际项目中是否采用、如何采用，还需要结合具体的业务场景、团队规范和技术架构来审慎决策。

关键在于：工具是为了提升效率，而好的代码更需要开发者的设计思维和业务理解。希望本文能帮助你做出更明智的技术选型！


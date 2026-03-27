## 目标

1. 熟练掌握MySQL数据库的环境搭建与卸载

2. 熟练掌握DDL、DML、DQL语句

3. 熟练掌握多表中数据的查询处理

4. 熟练掌握MySQL常用的函数

5. 掌握事务的机制

6. 掌握MySQL的存储过程

7. 掌握数据的备份与恢复

8. 掌握权限的管理

## 内容

### 1. 数据库简介

#### 1.1. 数据库的简介

数据库（DataBase，DB）：指长期保存在计算机的存储设备上，按照一定规则组织起来，可以被各种用户或应用共享的数据集合。 

数据库管理系统（DataBase Management System，DBMS）：指一种操作和管理数据库的大型软件，用于建立、使用和维护数据库，对数据库进行统一管理和控制，以保证数据库的安全性和完整性。用户通过数据库管理系统访问数据库中的数据。 

数据库软件应该为数据库管理系统，数据库是通过数据库管理系统创建和操作的。

数据库：存储、维护和管理数据的集合。

#### 1.2. 数据库的分类

1. 关系型数据库(sql)

  ○ Oracle: 是Oracle公司的数据库产品 <br>
  ○ Mysql: 最早属于瑞典的MysqlAB公司的，后被Sun公司收购，Sun在2009年4月20号被Oracle收购。<br>
  ○ SQLServer: 微软旗下的数据库产品 <br>
  ○ Access: 微软旗下的数据库产品 <br>
  ○ DB2: IBM公司旗下的数据库产品

2. 非关系型数据库(nosql)

  ○ HBase是一个分布式的、面向列的开源数据库 <br>
  ○ MongoDB是一个基于分布式文件存储的数据库 <br>
  ○ Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API

### 2. 数据库的安装与配置

#### 2.1. 安装: Windows版

1. 接受条款，下一步，准备开始安装

2. 选择Custom，自定义安装，Next

3. 以自己的操作系统为准，不过大多数都是64位的操作系统，按照图中的选择即可。

4. 下一步

5. 如果检测到了依赖的缺失，点击下方的Execute进行依赖的下载和安装，不要点击Next。这里有点小BUG，这个自动的安装，只会安装64位的，实际上MySQL还依赖vcredist_x86，需要手动安装。这里的界面不是必现的，如果没有依赖缺失，就看不到这样的界面，直接下一步即可

6. 依赖安装完成，点击Next进行MySQL的安装

7. 配置端口信息与防火墙信息。注意:MySQL默认使用3306端口，如果这个端口被占用了，可以设置为其他的端口。但是，最优的选择是查找谁占用了3306端口，并修改其他的程序占用，最好保证3306端口是留给MySQL的。

8. 选择默认即可

9. 设置MySQL的root用户的密码

10. 按照自己的需求选择即可。不推荐修改服务的名称。

11. 选择Execute，安装即可。

12. 安装、配置完全结束

13. 直接下一步，完成！

部分安装失败的原因

1.关闭防火墙 

2.查看系统版本与mysql版本 

3.检查配置是否正确 

4.电脑老旧 

5.尝试以管理员权限安装mysql 

6.卸载完先关机重启	

#### 2.2. 卸载: Windows版

卸载MySQL的时候需要注意，如果卸载的不彻底，会有部分的数据残留，导致下一次再安装MySQL的时候，会有安装不上的情况出现。

1. 打开卸载程序

  ○ 直接打开安装包，里面提供有卸载的功能<br>
  ○ 开始菜单搜索uninstall，找到MySQL<br>
  ○ 控制面板找到MySQL，右键卸载

2. 卸载主程序

3. 清除MySQL的数据MySQL主程序卸载完成后，需要彻底清除MySQL的残留数据。在C盘的ProgramData中，删除MySQL的文件夹即可。ProgramData是一个隐藏文件夹，需要显示隐藏才可以看到。

4. 清除注册表信息

  a. `Windows+R-->regedit-->`打开注册表<br>
  b. 根据路径打开并删除

    ⅰ. HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\Eventlog\Application\MySQL
    ⅱ. HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\Eventlog\Application\MySQL
    ⅲ. HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\Application\MySQL

#### 2.3. 安装: Mac直装版

Mac上的dmg安装包，这里是不需要任何的配置的，直接一路下一步即可！

注意:在最后一步的时候，会弹出一个对话框，告诉你生成了一个临时的root用户的密码，使用这个密码登录到MySQL进行密码的修改即可。

#### 2.4. 卸载: Mac直装版

```
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
vim /etc/hostconfig  (and removed the line MYSQLCOM=-YES-)
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /var/db/receipts/com.mysql.*
```

#### 2.5. 安装: Mac Homebrew版

1. 搜索服务器，这个就是我们需要使用的mysql。需要历史版本的，也可以使用指定的版本，例如: `mysql@5.7`

2. `brew install mysql`安装mysql

3. 使用`mysql_secure_installation进`行密码的设置，完成。安全级别为LOW的情况下，至少需要8位密码

#### 2.6. 卸载: Mac Homebrew版

```
# brew卸载MySQL
brew uninstall mysql

# 清除包残留
brew cleanup

# 清除其他残留
rm -rf /opt/homebrew/etc/my.cnf
rm -rf /opt/homebrew/var/mysql

# 安装包可以清理，也可以不清理
~/Library/Caches/Homebrew
```

#### 2.7. 启动、停止mysql服务

1. windows版本

  a. 此电脑 `->` 右键 `->` 管理 `->` 服务 `->` 找到MySQL80 `->` 右键菜单 <br>
  b. 以管理员的身份运行命令行，使用命令完成操作

```
net start mysql80			// 开启服务
net stop mysql80			// 停止服务
```

2. Mac版本

  a. 直装版左上角苹果logo `->` 系统偏好设置 `->` MySQL `->` Start MySQL Server <br>
  b. Homebrew版

```
# 开启服务
brew services start mysql
# 停止服务
brew services stop mysql
# 查看服务
brew services list
```

#### 2.8. 登录到MySQL

在控制台使用mysql的命令，完成登录和sql的操作。注意，如果windows平台上，需要手动配置环境变量。

```
# 这种方式的登录，敲回车后需要输入密码
1. mysql -u root -p				
# 将用户名和密码都写到指令中，注意：没有空格
2. mysql -uroot -p123456
```

#### 2.9. 修改密码

```sql
# 在MySQL中，密码有几个安全等级，默认的为密码需要同时包含字母、数字、下划线，且长度至少8位
# 查看当前的密码策略
show variables like 'validate_password%';

# 如果结果是一个Empty Set，说明没有加载安全策略组件
install component 'file://component_validate_password';

# 这种密码安全，但是在我们学习阶段比较麻烦，因此我们会修改为简单的密码
# 如果需要修改为简单的密码，可以按照如下过程操作
set global validate_password.policy=LOW;
set global validate_password.length=4;
set global validate_password.mixed_case_count=0;
set global validate_password.number_count=0;
set global validate_password.special_char_count=0;
```

在知道原来的密码的情况下，下面的方式可以修改数据库的密码:

● `mysql> alter user root@localhost identified by‘新密码';`

● `C:\Users\shawn> mysqladmin -uroot –p旧密码 password 新密码`

#### 2.10. 遗忘密码的情况

##### windows版本

1. 停止MySQL80服务

2. 使用管理员身份打开终端，输入`./mysqld --shared-memory --skip-grant-tables`，跳过身份检查

3. 打开一个新的窗口，使用mysql的命令登录

4. 修改密码

```sql
mysql> flush privileges;
mysql> alter user root@localhost identified by '123456';
```

5. 退出所有的终端，重启MySQL服务即可

注意: 如果在上述第二步的时候出现如下错误

```
PS C:\Program Files\MySQL\MySQL Server 8.0\bin> .\mysqld.exe --shared-memory --skip-grant-tables
[System] [MY-010116] [Server] C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe (mysqld 8.0.27) starting as process 8512
[Warning] [MY-010091] [Server] Can't create test file C:\Program Files\MySQL\MySQL Server 8.0\data\mysqld_tmp_file_case_insensitive_test.lower-test
[Warning] [MY-010091] [Server] Can't create test file C:\Program Files\MySQL\MySQL Server 8.0\data\mysqld_tmp_file_case_insensitive_test.lower-test
[ERROR] [MY-013276] [Server] Failed to set datadir to 'C:\Program Files\MySQL\MySQL Server 8.0\data\' (OS errno: 2 - No such file or directory)
[ERROR] [MY-010119] [Server] Aborting
[System] [MY-010910] [Server] C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe: Shutdown complete (mysqld 8.0.27)  MySQL Community Server - GPL.
```

按照下面的方式操作即可:

1. `mysqld --initialize --user=mysql --console`

2. `mysqld -install`

  a. 如果出现`The service already exists`，执行`sc delete mysql`

##### windows平台简单版

1. 停止MySQL的服务

2. 在任意的路径下，新建一个文本文件，其中添加修改密码的操作

```sql
# 例如:
# 在桌面上创建一个文件 root_password.txt
# 其中的内容如下
alter user root@localhost identified by '12345678';
```

3. 使用管理员身份运行命令提示符`mysqld --defaults-file="C:\ProgramData\MySQL\MySQL Server 8.0\my.ini" --init-file="C:\Users\shawn\Desktop\root_password.txt"`

4. 回车运行之后，就可以ctrl+c停止了

5. 启动MySQL的服务，用新的密码登录即可。

##### mac版本

1. 停止mysql服务

2. 打开`my.cnf`文件文件位置:`dmg直装 -> /etc/my.cnfhomebrew ->	intel	-> /usr/local/homebrew/etc/my.cnf	M1	-> /opt/homebrew/etc/my.cnf`

3. 在文件末尾添加一行`skip-grant-tables`

4. 不需要密码登录到MySQL，并修改密码

```sql
# 登录到MySQL
mysql -uroot -p		# 如果提示输入密码，直接回车即可
# 刷新权限
flush privileges;
# 修改密码，密码要求同时包含大写字母、小写字母、数字，长度至少8位。
# 如果想要修改为简单的密码，看下一段
alter user 'root'@'localhost' identified by 'NewPassword123';
```

5. 将服务停止

6. 将`my.cnf`中，刚刚添加的一行跳过权限检查删除掉

7. 启动MySQL服务

#### 2.11. 远程工具的使用

我们可以在控制台上进行sql的操作，但是操作的便利性会有很大的影响。实际上，很多时候我们进行的sql的操作都是在一些可视化的图形工具中完成的，这样开发的效率更高。这种工具有很多，在这里我们选择使用 Navicat。

### 3. SQL的概述与分类

#### 3.1. SQL的简介

`SQL: Structure Query Language（结构化查询语言）`，SQL最早是被美国国家标准局（ANSI）确定为关系型数据库语言的美国标准。后来被国际化标准组织（ISO）采纳为关系型数据库语言的国际标准。

各种数据库厂商都支持ISO标准的SQL，类似于普通话。

各个数据库厂商在标准的基础上，定义了若干自己的扩展，类似于方言。

SQL是一种标准化的语言，允许你在数据库上进行操作，如：创建项目、查询内容、更新内容和删除内容等操作。

这些操作：`Create、Read、Update、Delete`，通常被称为 CRUD操作

#### 3.2. SQL的分类

● `DDL（Data Definition Language）`：数据定义语言，用来定义数据库对象（数据库、表、列）

● `DML（Data Manipulation Language）`：数据操作语言，用于定义数据库记录（数据）

● `DCL（Data Control Language）`：数据控制语言，用于定义访问权限和安全级别

● `DQL（Data Query Language）`：数据查询语言，用于查询记录（数据）

● `TCL（Transaction Control Language）`：事务控制语言

SQL语句大小写是不区分的。`CREATE / create / Create / CrEaTe`但是，一般情况下，我们会大写.

### 4. DDL

#### 4.1. 数据库操作

##### 4.1.1. 创建数据库

```sql
# 创建数据库
CREATE DATABASE mydb1;
# 创建数据库，并采用指定的字符集
CREATE DATABASE mydb2 CHARACTER SET UTF8;
```

##### 4.1.2. 查看数据库

```sql
# 查看当前数据库服务器中的所有的数据库
SHOW DATABASES;
# 查看创建数据库mydb1定义的信息
SHOW CREATE DATABASE mydb1;
```

##### 4.1.3. 修改数据库

```sql
# 将数据库mydb1的字符集修改为GBK
ALTER DATABASE mydb1 CHARACTER SET GBK;
```

##### 4.1.4. 删除数据库

```sql
DROP DATABASE mydb1;
```

##### 4.1.5. 其他操作

```sql
# 切换当前使用的数据库
USE mydb1;
# 查询当前使用的数据库
SELECT DATABASE();
```

#### 4.2. 表操作

##### 4.2.1. 表的概念

```
表：数据在数据库中的存储是以表的形式存在的。一个表中有若干个字段，将数据按照这些字段进行存储。
1、数据表(table),是关系型数据库的基本存储结构。一个关系型数据库是由多个表组成的。
2、数据表是二维的，它由纵向的列和横向的行组成。
3、数据表的行(Row)是横排数据，也被称之为记录(Record)。
4、数据表的列(Column)是竖排数据，也被称之为字段(Field)。
5、表与表之间也可能存在着关系。
```

表与表之间的关系

```
1. 一对一
  在实际开发中应用不多。因为一对一的关系，完全可以放到一个表中
2. 一对多
  一对多建表原则：在多的一方，创建一个字段，作为外键作为指向另外一的那一方的主键。
3. 多对多
   多对多的建表原则：需要创建第三张表，在中间表中至少需要有两个字段。这两个字段分别作为外键指向各自一方的主键。
```

##### 4.2.2. 数据类型

每一个字段在设计表的时候都要去指定类型

|数据类型	|类型描述	|示例|
|---|---|---|
|`int`	|整型，整数类型|	|
|`double`	|浮点型	|`double(5,2)`: 表示最多有5位，其中必须有两位数小数，即最大值是999.99|
|`char`	|固定长度的字符串	|`char(5)`: 固定5位字符，即`'aa'`也占用5位字符|
|`varchar`	|可变长度的字符串	|`varchar(5)`: 可以根据内容动态分配空间，`'aa'`只占用两位。括号里的5表示最大的位数。|
|`text`	|字符串类型|	|
|`blob`	|字节类型|	|
|`date`	|日期类型	|`yyyy-MM-dd`|
|`time`	|时间类型	|`hh:mm:ss`|
|`timestamp`	|时间戳类型	|`yyyy-MM-dd hh:mm:ss`，会自动赋值|
|`datetime`	|时间类型	|`yyyy-MM-dd hh:mm:ss`|

##### 4.2.3. DDL使用

```sql
# DDL操作（表）
# 创建表格
CREATE TABLE t_users(name varchar(50), age INT, gender VARCHAR(10), height INT, weight INT);
# 删除表格
DROP TABLE t_users;
# 查看当前数据库中所有的表
SHOW TABLES;
# 查看创建一个表的信息
SHOW CREATE TABLE t_users;
# 查看一张表的字段信息
DESC t_users;
# 重命名表
ALTER TABLE t_users RENAME TO newName;
# 给一张表添加一个字段
ALTER TABLE t_users ADD score DOUBLE(5,2);
# 修改一张表的字段类型
ALTER TABLE t_users MODIFY score INT;
# 修改一张表的字段名
ALTER TABLE t_users CHANGE name uname VARCHAR(50);
# 修改一张表的字符集
ALTER TABLE t_users CHARACTER SET GBK;
# 删除一张表中的字段
ALTER TABLE t_users DROP score;
# 备份表结构和表数据
CREATE TABLE tname2 AS SELECT * FROM tname1;
# 备份表结构
CREATE TABLE tname2 LIKE tname1;
```

### 5. DML

DML指的是对数据库中的数据进行增、删、改的操作。不要和DDL搞混了。

在SQL中，字符串类型和日期类型需要用单引号括起来

空值：`null / NULL`

#### 5.1. 插入数据

● 语法`INSERT INTO 表名（列名1，列名2 ...）VALUES(列值1，列值2...);`注意：列名与列值的类型、个数、顺序要一一对应。可以把列名当做java中的形参，把列值当做实参。值不要超出列定义的长度。如果插入空值，请使用null插入的日期和字符一样，都使用单引号括起来。

● 练习

```sql
create table emp(
	id int,
	name varchar(100),
	gender varchar(10),
	birthday date,
	salary double(10,2),
	entry_date date,
	resume text
);

INSERT INTO emp(id,name,gender,birthday,salary,entry_date,resume)
VALUES(1,'zhangsan','female','1990-5-10',10000,'2015-5-5','good girl');

INSERT INTO emp(id,name,gender,birthday,salary,entry_date,resume)
VALUES(2,'lisi','male','1995-5-10',10000,'2015-5-5','good boy');

INSERT INTO emp(id,name,gender,birthday,salary,entry_date,resume)
VALUES(3,'你好','male','1995-5-10',10000,'2015-5-5','good boy');
```

● 语法`insert into 新表 select 列 from 已有表`

● 练习

```sql
create table emp1(
	id int,
    name varchar(100),
    gender varchar(10),
    birthday date,
    salary float(10,2),
    entry_date date,
    resume text
);

# 将emp表的所有数据复制到emp1中
INSERT INTO emp1  select * from emp
```

注意事项

1.mysql不支持select into

2.在复制时是按照列的顺序依次进行

3.新表的列与原来表的列的名字,类型都可以不一样,照样复制成功.但是会出现数据转换错误.

具体的:名字不一样,问题不大.类型不一样,出现错误,比如将int型的数据强制转换成varchar型,会显示0,反之亦然

#### 5.2. 删除数据

```sql
# 删除数据
DELETE FROM t_student;
# 删除掉表中所有的数据
TRUNCATE TABLE t_student;
DELETE 和 TRUNCATE
```

1. delete删除表中的数据，表结构还在；删除的数据可以恢复。

2. truncate是直接将表DROP掉，然后再按照原来的结构重新创建一张表。数据不可恢复。

3. truncate删除效率比delete高。

#### 5.3. where

刚才的删除语句，将表中的全部的数据都删除掉了。那么，如果需要按照条件进行删除呢？

此时，可以使用关键字where，来进行条件的约束，筛选出满足条件的数据进行操作。而且，where并不仅仅作用在删除的时候，还可以作用在修改和查询的部分。

|条件	|描述|
|---|---|
|`=`	|相等比较，类似于Java中的`==`|
|`!=` `<>`	|不等比较|
|`>` `<`` >=` `<=`	|大小比较|
|`BETWEEN...AND...`	|判断在两个值之间|
|`IN(...)`	|判断是否包含在指定的集合内|
|`IS NULL`	|判断是否为空|
|`IS NOT NULL`	|判断是否不为空|
|`AND OR NOT`	|逻辑判断，与、或、非|
|`[NOT] LIKE`	|模糊比较|

```sql
# 删除姓名叫"张三"的数据
delete from student where sname = '张三';

# 删除成绩不是100的数据
delete from student where score != 100;

# 删除不及格的数据
delete from student where score < 60;

# 删除成绩在[60, 80]范围的数据
delete from student where score between 60 and 80;

# 删除小组是1，3，5的数据
delete from student where groupid in(1, 3, 5);

# 删除成绩是空的数据
delete from student where score is null;

# 删除成绩不及格的第三组的数据
delete from student where score < 60 and groupid = 3;

# 删除姓张的数据
delete from student where sname like '张%';
```

#### 5.4. 修改数据

● 语法`UPDATE 表名 SET 列名1=列值1，列名2=列值2 。。。 WHERE 列名=值`

● 练习

```sql
# 将所有员工薪水修改为5000元。
UPDATE emp SET salary=5000 

# 将姓名为’zs’的员工薪水修改为3000元。
UPDATE emp SET salary=3000 WHERE name=’ zhangsan’;

# 将姓名为’aaa’的员工薪水修改为4000元,job改为ccc。
UPDATE emp SET salary=4000,gender='female' WHERE name='lisi';

# 将wu的薪水在原有基础上增加1000元。
UPDATE emp SET salary=salary+1000 WHERE gender='male';
```

### 6. DQL

#### 6.1. 基本查询语言的结构

DQL: Data Query Language，数据查询语言，指的是从数据库中查询自己需要的数据。是后续的课程中使用频率非常非常高的SQL语句。

从数据库中，按照条件进行数据的查询，将查询到的结果放入一张虚拟表中返回，不会影响到原表中的数据。

#### 6.1.1. 基础的查询语法

```sql
select ... from ...
select [distinct] ... from ... [where ...] [group by ...] [having ...] [order by ...] [limit ...]
```

##### 6.1.2. 查询语句的执行顺序

1. 先执行from子句: 基于表进行查询操作

2. 再执行where子句: 进行条件筛选或者条件过滤

3. 再执行group by子句: 对剩下的数据进行分组查询。

4. 再执行having子句: 分组后，再次条件筛选或过滤

5. 然后执行select子句: 目的是选择业务需求的字段进行显示

6. 再执行order by子句: 对选择后的字段进行排序

7. 最后执行limit子句: 进行分页查询，或者是查询前n条记录

#### 6.2. 准备数据

在学习接下来的查询的语法之前，我们提前准备几张表，并向这张表中插入一些数据，方便我们之后的查询操作。

##### 6.2.1. student表

|字段名称	|字段类型	|说明|
|---|---|---|
|sid	|`char(6)`	|学生学号|
|sname	|`varchar(50)`	|学生姓名|
|age	|`int`	|学生年龄|
|gender	|`varchar(50)`	|学生性别|

```sql
CREATE TABLE stu (
	sid	CHAR(6),
	sname		VARCHAR(50),
	age		INT,
	gender	VARCHAR(50)
);
INSERT INTO stu VALUES('S_1001', 'liuYi', 35, 'male');
INSERT INTO stu VALUES('S_1002', 'chenEr', 15, 'female');
INSERT INTO stu VALUES('S_1003', 'zhangSan', 95, 'male');
INSERT INTO stu VALUES('S_1004', 'liSi', 65, 'female');
INSERT INTO stu VALUES('S_1005', 'wangWu', 55, 'male');
INSERT INTO stu VALUES('S_1006', 'zhaoLiu', 75, 'female');
INSERT INTO stu VALUES('S_1007', 'sunQi', 25, 'male');
INSERT INTO stu VALUES('S_1008', 'zhouBa', 45, 'female');
INSERT INTO stu VALUES('S_1009', 'wuJiu', 85, 'male');
INSERT INTO stu VALUES('S_1010', 'zhengShi', 5, 'female');
INSERT INTO stu VALUES('S_1011', 'xxx', NULL, NULL);
```

##### 6.2.2. emp表

|字段名称	|字段类型	|说明|
|---|---|---|
|empno	|`int`	|员工编号|
|ename	|`varchar(50)`	|员工姓名|
|job	|`varchar(50)`	|员工工作|
|mgr	|`int`	|领导编号|
|hiredate	|`date`	|入职日期|
|sal	|`decimal(7,2)`	|月薪|
|comm	|`decimal(7,2)`	|奖金|
|deptno	|`int`	|部分编号|

```sql
CREATE TABLE emp(
	empno	INT,
	ename	VARCHAR(50),
	job		VARCHAR(50),
	mgr		INT,
	hiredate	DATE,
	sal		DECIMAL(7,2),
	comm	decimal(7,2),
	deptno	INT
);
INSERT INTO emp values(7369,'SMITH','CLERK',7902,'1980-12-17',800,NULL,20);
INSERT INTO emp values(7499,'ALLEN','SALESMAN',7698,'1981-02-20',1600,300,30);
INSERT INTO emp values(7521,'WARD','SALESMAN',7698,'1981-02-22',1250,500,30);
INSERT INTO emp values(7566,'JONES','MANAGER',7839,'1981-04-02',2975,NULL,20);
INSERT INTO emp values(7654,'MARTIN','SALESMAN',7698,'1981-09-28',1250,1400,30);
INSERT INTO emp values(7698,'BLAKE','MANAGER',7839,'1981-05-01',2850,NULL,30);
INSERT INTO emp values(7782,'CLARK','MANAGER',7839,'1981-06-09',2450,NULL,10);
INSERT INTO emp values(7788,'SCOTT','ANALYST',7566,'1987-04-19',3000,NULL,20);
INSERT INTO emp values(7839,'KING','PRESIDENT',NULL,'1981-11-17',5000,NULL,10);
INSERT INTO emp values(7844,'TURNER','SALESMAN',7698,'1981-09-08',1500,0,30);
INSERT INTO emp values(7876,'ADAMS','CLERK',7788,'1987-05-23',1100,NULL,20);
INSERT INTO emp values(7900,'JAMES','CLERK',7698,'1981-12-03',950,NULL,30);
INSERT INTO emp values(7902,'FORD','ANALYST',7566,'1981-12-03',3000,NULL,20);
INSERT INTO emp values(7934,'MILLER','CLERK',7782,'1982-01-23',1300,NULL,10);
```

##### 6.2.3. dept表

|字段名称	|字段类型	|说明|
|---|---|---|
|deptno	|`int`	|部分编码|
|dname	|`varchar(50)`	|部分名称|
|loc	|`varchar(50)`	|部分所在地点|

```sql
CREATE TABLE dept(
	deptno		INT,
	dname		varchar(14),
	loc			varchar(13)
);
INSERT INTO dept values(10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO dept values(20, 'RESEARCH', 'DALLAS');
INSERT INTO dept values(30, 'SALES', 'CHICAGO');
INSERT INTO dept values(40, 'OPERATIONS', 'BOSTON');
```

#### 6.3. 基础查询

1. 查询所有列`SELECT * FROM stu`;

2. 查询指定列`SELECT sid, sname, age FROM stu`;

#### 6.4. 条件查询

条件查询就是在查询时给出WHERE子句，在WHERE子句中可以使用如下运算符及关键字：

```sql
=、!=、<>、<、<=、>、>=、BETWEEN…AND、IN(set)、IS NULL、AND、OR、NOT、XOR (逻辑异或)
```

1. 查询性别为女，并且年龄小于50的记录

```sql
SELECT * FROM stu
WHERE gender='female' AND  age<50;
```

2. 查询学号为`S_1001`，或者姓名为`liSi`的记录`SELECT * FROM stu WHERE sid ='S_1001' OR sname='liSi'`;

3. 查询学号为`S_1001，S_1002，S_1003`的记录`SELECT * FROM stu WHERE sid IN ('S_1001','S_1002','S_1003')`;

#### 6.5. 模糊查询

按照模糊的条件进行查询，可以使用LIKE条件，或者REGEXP。

##### 6.5.1. like

like用于where子句之后，表示部分的匹配。在like后，通常会有两种通配符:

```
_	=> 表示匹配任意的一位字符。
%	=> 表示匹配任意位的字符。
```

```sql
# 查询所有的姓名以s开头的学生
select * from student where sname like 's%'
# 查询所有的姓名以s开头的，且长度为5的学生
select * from student where sname like 's____'
```

##### 6.5.2. regexp

使用正则表达式进行字符串的匹配。

|模式	|描述|
|---|---|
|`^`	|匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，`^` 也匹配 `'\n'` 或 `'\r'` 之后的位置。|
| `\|` |匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性， 也匹配 `'\n'` 或 `'\r'` 之前的位置。|	
|`.`	|匹配除 `"\n"` 之外的任何单个字符。|
|`[...]`	|字符集合。匹配所包含的任意一个字符。例如， `'[abc]'` 可以匹配 `"plain"` 中的 `'a'`。|
|`[^...]`	|负值字符集合。匹配未包含的任意字符。例如， `'[^abc]'` 可以匹配 `"plain"` 中的`'p'`。|
|`\d`| `[0-9]`, 匹配所有的数字。|
|`p1\|p2\|p3`	|匹配 `p1` 或 `p2` 或 `p3`。例如，`'z\|food'` 能匹配 `"z"` 或 `"food"`。`'(z\|f)ood'` 则匹配 `"zood"` 或 `"food"`。|
|`*`	|匹配前面的子表达式零次或多次。例如，`zo*` 能匹配 `"z"` 以及 `"zoo"`。`*` 等价于`{0,}`。|
|`+`	|匹配前面的子表达式一次或多次。例如，`'zo+'` 能匹配 `"zo"` 以及 `"zoo"`，但不能匹配 `"z"`。`+` 等价于 `{1,}`。|
|`{n}`	|是一个非负整数。匹配确定的 `n` 次。例如，`'o{2}'` 不能匹配 `"Bob"` 中的 `'o'`，但是能匹配 `"food"` 中的两个 `o`。|
|`{n,m}`	|`m` 和 `n` 均为非负整数，其中`n <= m`。最少匹配 `n` 次且最多匹配 `m` 次。|

```sql
# 查询名字以l开头,以i结尾的
select * from stu  where name regexp '^l|i$'

SELECT 'hello' REGEXP '^he'      结果:1  表示匹配
SELECT 'hello' REGEXP '^hh'      结果:0  表示不匹配
```

#### 6.6. 字段控制

##### 6.6.1. 去除重复记录

去除重复记录（两行或两行以上记录中系列的上的数据都相同），例如emp表中sal字段就存在相同的记录。当只查询emp表的sal字段时，那么会出现重复记录，那么想去除重复记录，需要使用`DISTINCT`：

```sql
SELECT DISTINCT sal FROM emp;
```

##### 6.6.2. 列之间的计算

查看雇员的月薪与佣金之和，因为sal和comm两列的类型都是数值类型，所以可以做加运算。如果sal或comm中有一个字段不是数值类型，那么会出错。

```sql
SELECT *,sal+comm FROM emp;
```

comm列有很多记录的值为NULL，因为任何东西与NULL相加结果还是NULL，所以结算结果可能会出现NULL。下面使用了把NULL转换成数值0的函数`IFNULL`

```sql
SELECT *,sal+IFNULL(comm,0) FROM emp;
```

##### 6.6.3. 给列名添加别名

在上面查询中出现列名为`sal+IFNULL(comm,0)`，这很不美观，现在我们给这一列给出一个别名，为total：

```sql
SELECT *, sal+IFNULL(comm,0) AS total FROM emp;
```

给列起别名时，是可以省略AS关键字的：

```sql
SELECT *,sal+IFNULL(comm,0)  total FROM emp;
```

#### 6.7. 结果排序

1. 查询所有学生记录，按年龄升序排序

```sql
SELECT *  FROM stu ORDER BY sage ASC;
# 或者
SELECT *  FROM stu ORDER BY sage;
```

2. 查询所有学生记录，按年龄降序排序

```sql
SELECT *  FROM stu  ORDER BY age DESC;
```

3. 查询所有雇员，按月薪降序排序，如果月薪相同时，按编号升序排序

```sql
SELECT * FROM emp  ORDER BY sal DESC,empno ASC;
```

#### 6.8. 聚合函数

聚合函数，是作用在一列数据上的，对一列的数据进行运算的函数。包含有: `max、min、sum、count、avg`等常见的函数。

● `max()`: 计算指定列数据的最大值

● `min()`: 计算指定列数据的最小值

● `count()`: 计算指定列不为NULL的数据的数量

● `sum()`: 计算指定列的数值的和，如果计算的列的类型不是数值类型，计算结果为0

● `avg()`: 计算指定列的数值的平均值，如果计算的列的类型不是数值类型，计算的结果为0

使用方法如下:

##### 6.8.1. max

```sql
-- 用来计算指定列的最大值
-- 计算最高的工资
select max(sal) from emp;
```

##### 6.8.2. min

```sql
-- 用来计算指定列的最小值
-- 计算最低的工资
select min(sal) from emp;
```

##### 6.8.3. count

```sql
-- 用来统计指定列的数据的数量，注意，NULL不会被统计
-- 1. 计算emp表中有多少人有工资sal
select count(sal) from emp;
-- 2. 计算emp表中有多少行数据
select count(*) from emp;

-- count(*) : 用来统计行记录，只要有这一行就会统计，即便这一行的所有的字段值都是NULL，依然算是一个有效的行
```

##### 6.8.4. sum

```sql
-- 用来统计指定列的数据的和，注意，NULL不会被统计
-- 计算emp表中的工资的和
select sum(sal) from emp;
```

##### 6.8.5. avg

```sql
-- 用来统计指定列的数据的平均值，注意，NULL不会被统计
-- 计算emp表中的平均工资
select avg(sal) from emp;
```

注意:

在上述的需求中，我们需要统计员工的平均工资。但是，有些行的数据中，工资(sal)对应的值是NULL。

例如: 表中一共有20行数据，有2行数据是NULL。那么平均值在计算的时候，会将每一个人的工资加到一起，用这个和除18，而并不是20。因为聚合函数不会统计NULL值的。

如果需求需要将这个和均摊到每一个人的身上，包括NULL的行，那就需要对这条SQL语句进行修改了:

```sql
select avg(ifnull(sal, 0)) from emp;
```

#### 6.9. 分组查询

在进行查询的时候，可以按照某一个或多个字段进行分组。分组字段值相同的行会被视为一个分组。一般情况下，分组的意义是对每一个分组的数据进行聚合的统计，例如统计每一个分组的数量、最大值等操作。

注意事项: 查询的字段中只能包含分组字段和聚合函数

##### 6.9.1. group by

```sql
-- 查询每一个部门的编号以及这个部门的最高工资(sal)
select deptno, max(sal) from emp group by deptno;

-- 查询每一个工作的名字以及这个工作的人数
select job, count(*) from emp group by job;

-- 查询每一个部门、每一个工作的人数
select deptno, job, count(*) from emp group by deptno, job;
```

##### 6.9.2. having

having是一个数据过滤的控制条件，类似于where，但是又和where有不同的地方:

1. `having`是作用在分组之后的数据的，`where`是作用在分组之前的数据的。被`where`过滤掉的数据不参与分组。写法体现: `having`需要写在`group by`之后，`where`需要写在`group by`之前。

2. `having`之后可以使用聚合函数，`where`不可以使用聚合函数。

```sql
-- 查询平均工资高于3000的部门编号及平均工资
select deptno, avg(sal) from emp group by deptno having avg(sal) > 3000;
```

#### 6.10. limit

select查询语句会查询出来一张表中所有的满足条件的数据。limit关键字可以限制查询结果的行数。

```sql
-- 查询emp表中的第0行开始，5行的数据。
select * from emp limit 0, 5;

-- 查询emp表中从第10行开始，7行的数据。
select * from emp limit 10, 7;
```

灵活的使用limit，可以实现分页查询的效果。

```sql
-- 例如: 我需要在一个页面上显示数据库中的数据，但是页面的大小有限，每一页我需要显示20条数据。
-- 第一页的数据:
select * from news limit 0, 20;
-- 第二页的数据:
select * from news limit 20, 20;
-- 第三页的数据:
select * from news limit 40, 20;

-- 往后的每一个分页的内容，只需要控制好每一次limit的起点即可。
```

#### 6.11. 查询总结

##### 6.11.1. 查询语句书写顺序

```sql
select – from - where - group by - having - order by - limit
```

##### 6.11.2. 查询语句执行顺序

```sql
from - where -group by - having - select - order by-limit
```

### 7. 数据完整性

#### 7.1. 完整性约束

我们已经知道了如何创建数据库、如何创建表、如何在表中进行数据的插入操作。但是在实际工作中，我们需要考虑插入到表中的数据是否是合乎逻辑的。因此，有时候我们需要在插入数据的时候，对数据进行校验，以保证插入表中的数据没有逻辑的错误。这就是数据的完整性。而为了保证数据的完整性，我们往往需要借助一些约束来实现。

数据的完整性约束可以分为三类: 实体完整性、域完整性和引用完整性。

#### 7.2. 实体完整性

我们将表中的一行数据，称为一个“实体”，而所谓的实体完整性约束，就是保证这一行数据的唯一的，不会出现重复的行数据。

为了达到这样的目的，实体完整性约束有三种: 唯一约束、主键约束、自增约束。

##### 7.2.1. 唯一约束

关键字: `unique`

作用: 顾名思义，就是修饰某一个字段，这个字段的值在一张表内不能重复！

● 单个键的唯一约束

  ○ 建表的同时添加 <br>
  ○ 建表之后追加

```sql
-- 创建表
create table `student` (
	`id` int unique,		-- 修饰为unique，表示id字段的值不允许出现重复的情况
    `sname` varchar(50)
);
-- 或者
create table `student` (
	`id` int,
    `sname` varchar(50),
    unique(`id`)
);

-- 表创建完成后，在进行数据插入的时候，如果插入了重复的id，则第二次插入数据的时候会有错误提示，无法插入数据，保证这一行数据的唯一
insert into student values (1, 'zhangsan');
insert into student values (2, 'lisi');
```

```sql
-- 创建表
create table student (
	id int,
    sname varchar(50)
);

-- 追加id为唯一约束
alter table student add unique (`id`);
```

● 联合唯一约束

  ○ 描述所谓的“联合唯一约束”，指的是可以将多个字段绑定在一起进行非空的约束。只有当这些字段的值都相同的情况下，才会视为重复的数据，不允许继续插入。<br>
  ○ 建表的时候添加<br>
  ○ 建表之后追加<br>
  ○ 测试

```sql
create table `student` (
	`id` int,
    `sname` varchar(50),
    unique(`id`, `sname`)
);
```

```sql
-- 创建表
create table student (
	id int,
    sname varchar(50)
);

-- 追加id为唯一约束
alter table student add unique (`id`, `sname`);
```

```sql
insert into `student` values (1, 'a');		-- 第一次插入数据，表中没有重复的行，可以添加
insert into `student` values (1, 'b');		-- 虽然表中已经有id为1的行，但是sname并不重复，依然可以添加
insert into `student` values (2, 'b');		-- 同理，表中虽然已经有sname为b的行，但是id并不重复，依然可以添加
insert into `student` values (2, 'b');		-- id和sname的值都与已经存在的某一行数据重复，因此添加失败
```

● 移除约束

```sql
alter table `student` drop index `sid`;
```

##### 7.2.2. 主键约束

关键字: `primary key`

其实，为了保证数据的唯一性，主键才是工作中最常用的约束方式。一般情况下，会将代表这一行数据的唯一标识的字段设置为主键。在进行查询操作的时候，通常情况下也是会使用主键进行行数据的区分。

主键的值不允许出现重复，也不允许出现NULL的情况。

添加主键有几种方式:

1. 在建表的时候添加主键，只添加一个主键

```sql
create table student (
	id int primary key,
    sname varchar(50)
)
```

2. 在建表的时候添加主键，同时添加多个主键

```sql
create table sc (
	sid int,
    cid int,
    score int,
    primary key(sid, cid)	-- 如果有多个主键需要添加，不能在字段的后面直接写primary key。需要通过这样的方式来添加。
)
```

3. 在建表完成后追加主键

```sql
create table course (
	cid int,
    cname varchar(50)
)

alter table course add primary key (cid);
```

删除表中的主键:

```sql
alter table course drop primary key;
```

##### 7.2.3. 自增约束

顾名思义，自增约束表示对某一个字段的值进行自动的增长。只能用在整型数据类型的主键约束上。表示在进行行数据的赋值的时候，如果不设置主键的值，这个值会自动的在之前的值的基础上+1。

```sql
-- 建表
create table student(
	sid int primary key auto_increment,
    sname varchar(50)
)

-- 插入数据
insert into student (sname) values ('zhangsan');		-- 没有设置主键sid的值，则此时的sid自动增长为1
insert into student values (10, 'lisi');				-- 此时已经设置了sid的值，则这行数据的sid就是10
insert into student (sname) values ('wangwu');			-- 没有设置主键sid的值，将会在目前最大的id基础上+1，也就是11
```

注意事项:

在表内会有一个变量，来记录当前的表最大的主键已经到达多少了。需要进行主键自增的时候，从这个记录了最大的主键的基础上进行自增，而不是简单的从上一行的基础上自增。

```sql
insert into student values (100, 'wangwu');
insert into student values (50, 'zhaoliu');
insert into student (sname) values ('tianqi');		-- 当前的表中，记录最大的主键值是100，因此这一行数据主键会自增到101
```

注意事项:

在删除表中的数据的时候，如果使用delete from进行删除，则无法删除表中记录的最大值。

```sql
insert into student values (200, 'xiaoming');
delete from student;
insert into student (sname) values ('xiaohei');		-- 此时的自增，结果依然是201
```

注意事项:

在删除表的时候，除了可以使用delete from进行删除，也可以使用truncate进行删除的操作。前面也说过这两种操作的区别，其中truncate是将现在的表进行drop，然后再按照之前的表结构(字段的名字、类型等信息)，创建出来一张跟这个表结构完全相同的表出来。那么问题来了，delete在删除数据的时候，只是删除数据，并不会对表结构进行修改，也就是说表中记录的最大的主键信息是会保留下来的。但是truncate是drop原来的表，然后创建一张新的表。那么之前的记录的最大主键值的信息也就不存在了。

```sql
insert into student values (200, 'xiaoming');
delete from student;
insert into student (sname) values ('xiaohei');		-- 自增的sid，值是201
truncate student;
insert into student (sname) values ('xiaolan');		-- 从头自增的sid，值是1
```

#### 7.3. 域完整性

域完整性约束，指的是对一个单元格内的数据进行约束，对某一个单元格内的数据进行约束。

##### 7.3.1. 非空约束

关键字: `not null`

顾名思义，就是对某一个字段进行修饰，修饰这一个字段的值不能是NULL。

```sql
create table student (
	sid int primary key,
    sname varchar(30) not null
)

-- 建表之后追加
alter table `student` change `sname` `sname` varchar(30) not null;
-- 建表之后移除
alter table `student` change `sname` `sname` varchar(30);

-- 正常的数据插入
insert into student values (10, 'Jerry');

-- 错误的写法，因为sname已经修饰为not null了
insert into student values (10, NULL);

-- 错误的写法，因为非空的字段的值没有设置
insert into student (sid) values (1);
```

##### 7.3.2. 默认值约束

关键字: `default`

修饰某一个字段，在这个字段进行赋值的时候没有赋值的情况下，这个字段将会拥有一个默认的初始值

```sql
create table student (
	sid int primary key,
    sname varchar(20) default 'unkonwn'
)

-- 正确的使用
insert into student (sid) values (100);		-- 没有设置sname的值，此时会采用默认的值 
insert into student values (101, default);	-- 直接使用关键字default，表示使用默认值
```

##### 7.3.3. 检查约束

检查约束，类似于Java中的枚举，约束这个字段的值只能够在有限的几个值内进行选择。

关键字: `check`

```sql
create table teacher( 
	tid int, 
	tname varchar(20), 
	tgender char(1) check(tgender in('f','m'))	-- 约束这个字段的值只能是m或者f
); 
insert into temp_5 values (1001,'zs','a'); 
select * from teacher;
```

关键字: `enum`

```sql
create table temp_6( 
 	tid int, 
 	tname varchar(20), 
 	tgender enum('f','m')		-- 枚举的写法
);
```

#### 7.4. 引用完整性

主要就是外键约束(foreign key)

字段A的值，依赖于字段B的值。这两个字段可以在同一张表中，也可以在不同的表中。字段A所在的表称之为从表(副表)，字段B所在的表称之为主表(父表)。字段A的值也可以为null. 字段B必须为主键约束。

依赖的字段B，必须是目标表的主键

```sql
-- 1. 在建表的时候添加外键
create table tableName(
	tid int primary key auto_increment, 
	tname varchar(20), 
	tmgr int,
	constraint constraintName Foreign key(tmgr) references tableName(tid)
);

-- 2. 在建表之后追加
alter table tableName1 add constraint constraintName foreign key(colName1) references tableName2(colName2);

-- 3. 撤销外键
ALTER TABLE score DROP FOREIGN KEY score_ibfk_1;
```

EXT:

在添加主键的时候，可以同时设置删除和更新时的约束:

● `RESTRICT`: 默认的约束，不允许修改、删除被引用的字段的值<br>
● `CASCADE`: 级联修改，在修改、删除被引用的字段的时候，引用方的一行数据也随之修改和删除<br>
● `SET NULL`: 空值处理，在修改、删除被引用的字段的时候，引用方的引用字段的值会设置为`NULL`<br>
● `NO ACTION`: 不处理，在修改、删除被引用的字段的时候，引用方的引用字段不作任何改变

语法:

```sql
alter table tableName1 add constraint constraintName foreign key(colName1) references tableName2(colName2) on delete restrict on update restrict;
```

### 8. 多表查询

#### 8.1. 多表查询介绍

##### 8.1.1. 什么是多表查询

有的时候，我们的业务需求的数据并不只是在一张表中，而是分布在两张或两张以上的表中，而这些表中通常都会存在着“有关系”的字段。那么此时的查询操作，我们需要从多张表中查询数据，我们称之为多表关联查询。或者叫做连接查询。

##### 8.1.2. 多表查询基本写法

```sql
-- 从两张表中查询数据
select * from A, B;

-- 从两张表中查询数据
select * from A join B;
```

TIPS:

其实，连接两张表进行查询，标准SQL采用的是join的语法。上述的`select * from A, B;`的写法，其实只是在MySQL中的“方言”，只在MySQL中生效，在其他的DBMS中就不一定能使用了。

```sql
select * from A, B; 其实是等价于 select * from A inner join B; 的。那么什么是inner join呢？后面会讲。
```

##### 8.1.3. 笛卡尔积

在做连接查询的时候，一张表中的每一行数据都会和另一张表中的每一行数据进行关联，形成笛卡尔积。

假如A表中有`m`行数据，B表中有`n`行数据，连接查询之后的结果就是`m*n`行数据，其中有太多的数据是我们不需要的了。

##### 8.1.4. 连接查询条件限制

通过上图，我们知道了在两张表进行连接查询的时候，会出现大量的无效的数据。因此，我们就需要通过一些操作，去除连接查询之后的无用的数据，只得到我们需要的数据！而这个过程是可以通过条件的限制来实现的:

1. MySQL的查询方言

```sql
-- 用where进行条件的过滤，得到满足条件的所有的数据。
select * from A, B where A.empno = B.mgr;
```

2. 标准SQL的语法

```sql
-- 用on的方式，进行连接查询的多余数据过滤
select * from A join B on A.empno = B.mgr;
```

#### 8.2. 连接查询分类

将两张表连接在一起查询的时候，通常情况下我们需要进行一定的条件限制，来达到去除查询结果笛卡尔积中多余的数据，保留我们需要的数据的目的。通常情况下，进行连接查询的多张表之间是有一定的逻辑关联的，具体表现为有一个相同的字段，在两张表中都会出现。因此，我们在进行连接查询的时候就会使用这个字段的值进行数据的过滤。

那么，连接查询就会出现这样的几种情况:

● A表中，通过关联的字段，可以在B表中查询到数据。

● A表中，通过关联的字段，无法在B表中查询到数据。

● B表中，通过关联的字段，无法的A表中查询到数据。

此时，根据所需的不同结果，可以将连接查询分为两类: 内连接、外连接

##### 8.2.1. 内连接

内连接，使用`inner join`来表示，在进行查询的时候，inner是可以省略的，因此通常情况下直接写join就是内连接。

所谓内连接，以左表为驱动表，右表为从动表。查询结果中保留A表的数据通过连接的字段，在B表中能够查询到的数据。

```sql
-- 查询员工的编号、职位、入职时间、部门编号、部门名称
select empno, job, hiredate, deptno, dname from emp join dept on emp.deptno = dept.deptno;

-- 查询LOCATION在NEW YORK的员工数量
select count(*) from emp join dept on emp.deptno = dept.deptno where loc = 'NEW YORK';
```

##### 8.2.2. 外连接

外连接，使用`outer join`来表示，但是外连接还有更加明细的分类: 左外连接和右外连接。

● 左外连接: 以左表为驱动表，右表为从动表，查询结果中保留A表的数据通过连接的字段，在B表中能够查询到的数据。如果通过这个连接字段无法在B表中查询到数据，则B表与之关联的就是null数据。

● 右外连接: 以右表为驱动表，左表为从动表，查询结果中保留B表的数据通过连接的字段，在A表中能够查询到的数据。如果通过这个连接字段无法在A表中查询到数据，则A表与之关联的就是null数据。

总结来说

左外连接查询结果: 包含左表中的所有数据，右表与之关联的数据，如果在右表没有与之关联的数据，则用null填充。

右外连接查询结果: 包含右表中的所有数据，左表与之关联的数据，如果在左表没有与之关联的数据，则用null填充。

语法: 左外连接使用 `left outer join`来表示，右外连接使用 `right outer join`来表示。

而outer是可以省略不写的，也就是: 左外连接: `left join`，右外连接: `right join`

```sql
-- 查询所有的部门的人数
select deptno, dname, count(empno) from dept left join emp on dept.deptno = emp.deptno;
```

##### 8.2.3. 全连接

全连接，又叫全外连接。全连接的意义是保留两张表中的所有的数据。如果在另外一张表中没有与之连接的数据，使用null进行填充。也就是说，其实全连接就是将左外连接和右外连接的查询结果合并到一起并去除重复的数据。

MySQL不支持全连接！

虽然MySQL不支持全连接，但是可以使用其他的方式来间接实现:

将左外连接和右外连接的查询结果，使用union合并到一起即可。

#### 8.2.4. 自然连接

我们在进行连接查询的时候，通常会在需要连接的两张表中找到字段关联在一起，而绝大多数情况下我们所需要进行的是等值连接。在进行数据库和表的设计的时候，这样用来联系多张表之间的关系的字段，一般情况下命名是相同的。

所谓“自然连接“指的就是找到需要进行连接查询的两张表中名字相同、类型也相同的字段，自动的使用这个字段作为连接的字段。如果不存在这样的名字相同的字段，会有错误。

```sql
select * from emp natural join dept;
select * from emp natural right join dept;
```

#### 8.3. 子查询

##### 8.3.1. 子查询简介

有的时候，当一个查询语句A所需要的数据，不是直观在表中体现，而是由另外一个查询语句B查询出来的结果，那么查询语句A就是主查询语句，查询语句B就是子查询语句。这种查询我们称之为高级关联查询，也叫做子查询。

子查询语句的返回数据形式：

```
- 返回单行单列	=> 可以被视为一个数值来使用
- 返回多行单列	=> 可以被视为一个集合来使用
- 返回单行多列	=> 可以被视为一个虚拟表使用
- 返回多行多列	=> 可以被视为一个虚拟表使用
```

子查询语句的位置可以在以下几个子句中：

```
- 在where子句中:	子查询的结果可用作条件筛选时使用的值。
- 在from子句中:		子查询的结果可充当一张表或视图，需要使用表别名。
- 在having子句中:	子查询的结果可用作分组查询再次条件过滤时使用的值
- 在select子句中:	子查询的结果可充当一个字段。仅限子查询返回单行单列的情况。
```

##### 8.3.2. 在where子句中

```sql
# 需求：查询工资大于员工编号为7369这个员工的所有员工信息。
# 解析：
# 第一步：目的是查询工资大于某一个数num的所有员工信息
#     select * from emp where sal>num
# 第二步：num的值7369员工的工资
#     select sal from emp where empno = 7369;
# 第三步：将主查询中的代词使用子查询语句替换
select * from emp where sal>(select sal from emp where empno = 7369);

# 需求：查询工资大于10号部门的平均工资的所有员工信息
select * from emp where sal>(select avg(ifnull(sal,0)) from emp where deptno=10);

# 需求：查询工资大于10号部门的平均工资的非10号部门的员工信息。
select * from emp where sal>(select avg(ifnull(sal,0)) from emp where deptno=10) and deptno<>10;

# 需求：查询与7369同部门的同事信息。
select * from emp where deptno=(select deptno from emp where empno=7369) and empno<>7369;
```

##### 8.3.3. 在from子句中

```sql
# 需求：查询员工的姓名，工资，及其部门的平均工资。
# 解析：
# 第一步：先查询每个部门的平均工资
# select deptno,avg(ifnull(sal,0)) from emp group by deptno;
# 第二步：将上一个查询语句的返回结果当成一张表，与员工表进行关联查询
select A.ename, A.sal, B.avg_sal
from emp A join (select deptno,avg(ifnull(sal,0)) avg_sal from emp group by deptno) B on A.deptno = B.deptno
```

##### 8.3.4. 在having子句中

```sql
# 需求：查询平均工资大于30号部门的平均工资的部门号，和平均工资
select deptno,avg(ifnull(sal,0)) from emp group by deptno having avg(ifnull(sal,0))>
(select avg(ifnull(sal,0)) from emp where deptno=30);
```

##### 8.3.5. 在select子句中

```sql
# 查询每个员工的信息及其部门的平均工资，工资之和，部门人数
select A.empno,A.ename,A.sal,
(select avg(ifnull(sal,0)) from emp B where B.deptno=A.deptno) avg_sal,
(select sum(sal) from emp C where C.deptno=A.deptno) sum_sal,
(select count(*) from emp D where D.deptno=A.deptno) count_
from emp A;
```

##### 8.3.6. SQL完整的执行顺序

```sql
select distinct..from t1 [inner|left|right] join t2 on 条件 
where...group by...having...order by...limit

1. from t1
2. on 条件
3. [inner|left|right] join t2
4. where...
5. group by...
6. having...
7. select...
8. distinct...
9. order by...
10. limit....
```

#### 8.4. 合并查询结果集

##### 8.4.1. 合并查询结果集概述

合并结果集，就是将两次或者多次的查询结果，合并到一起，存入一张查询结果虚拟表中。

进行结果集合并的多张表，要求字段的数量是完全相同的。

A查询的结果有5个字段，B查询的结果有5个字段。此时是可以合并到一起的。

A查询的结果有5个字段，B查询的结果有3个字段。此时是无法合并到一起的。

##### 8.4.2. 合并查询结果集语法

● `union`: 对两次的查询结果进行合并，对最终的合并结果会进行去重的处理。

● `union all` : 对两次的查询结果的直接合并，没有进行去重的处理。

### 9. MySQL的函数

#### 9.1. 功能性函数

##### 9.1.1. IFNULL

这个函数在之前的SQL中已经使用过了，函数有两个参数，形式为: `IFNULL(field, value)`

逻辑: 如果第一个参数field是NULL，则返回第二个参数value的值，否则就返回field本身的值

```sql
select ifnull(null, 10);		-- 查询结果是10
select ifnull(10, 20);			-- 查询结果是10
select ifnull(`id`, 0);			-- 如果id字段的值是NULL，就返回0，否则就返回id字段的值
```

##### 9.1.2. IF

这个函数有点类似于Java中的三目运算符，函数有三个参数，形式为: `IF(condition, value1, value2)`

逻辑: 如果第一个参数condition条件成立，就返回value1的值，否则就返回value2的值。

```sql
select if(10 > 20, 10, 20);		-- 因为10 > 20不成立，因此返回20
select if(10 > 5, 10, 5);		-- 因为10 > 5成立，因此返回10
select if(`chinese` > `math`, `chinese`, `math`);	-- 如果chinese字段的值大于math字段的值，就返回chinese字段的值，否则就返回math字段的值
```

##### 9.1.3. CASE

这个函数是MySQL中非常强大的一个函数，可以使用他来实现类似Java中的分支结构。通过模拟Java的if的实现和switch的实现，来实现一些简单的分支流程控制。case..when有两种写法:

1. 类似Java的if

```sql
-- 需求: 已知sc表中有一个字段名为`score`表示一个学生的成绩。通过这个成绩字段的不同范围，查询出不同的结果:
-- < 0 或者 > 100, 等级为"错误成绩"
-- [0, 60), 等级为"不及格"
-- [60, 80), 等级为"良"
-- [80, 100], 等级为"优"
select `sid`, `score`, 
    case 
        when `score` < 0 or `score` > 100 then '错误成绩'
        when `score` < 60 then '不及格'
        when `score` < 80 then '良'
        else '优'
    end as 'level'
from `sc`;
```

2. 类似Java的switch

```sql
-- 需求: 已知sc表中有一个字段名为`subject`表示成绩的科目。通过这个字段的不同的值，查询出不同的描述信息:
-- 如果是chinese，查询出"语文"
-- 如果是math，查询出"数学"
-- 如果是english，查询出"英语"
-- 其他的保持原样
select `subject`,
    case `subject`
        when 'chinese' then '语文'
        when 'math' then '数学'
        when 'english' then '英语'
        else `subject`
    end as '翻译'
from `sc`
```

##### 9.1.4. 行转列实现

1. 数据准备

|sname	|subject	|score|
|---|---|---|
|张小三	|语文	|78|
|张小三	|数学	|77|
|张小三	|英语	|90|
|张小三	|历史	|89|
|张小三	|体育	|80|
|李小四	|数学	|90|
|李小四	|英语	|80|
|李小四	|体育	|88|
|李小四	|政治	|88|
|李小四	|历史	|78|
|王小五	|语文	|90|
|王小五	|英语	|80|
|王小五	|政治	|89|
|王小五	|体育	|90|

```sql
-- 建表
create table `sc` (
	`sname` varchar(20),
    `subject` varchar(20),
    `score` int
);
-- 插入数据
insert into `sc` values 
	('张小三', '语文', 78),
	('张小三', '数学', 77),
	('张小三', '英语', 90),
	('张小三', '历史', 89),
	('张小三', '体育', 80),
	('李小四', '数学', 90),
	('李小四', '英语', 80),
	('李小四', '体育', 88),
	('李小四', '政治', 88),
	('李小四', '历史', 78),
	('王小五', '语文', 90),
	('王小五', '英语', 80),
	('王小五', '政治', 89),
	('王小五', '体育', 90);
```

2. 需求实现1

|姓名	|语文	|数学	|英语	|历史	|政治	|体育|
|---|---|---|---|---|---|---|
|张小三	|78	|77	|90	|89	|0	|80|
|李小四	|0	|90	|80	|78	|88	|88|
|王小五	|90	|0	|80	|0	|89	|90|

```sql
-- if实现版本
select `sname` as '姓名',
    sum(if(`subject` = '语文', `score`, 0)) as '语文',
    sum(if(`subject` = '数学', `score`, 0)) as '数学',
    sum(if(`subject` = '英语', `score`, 0)) as '英语',
    sum(if(`subject` = '历史', `score`, 0)) as '历史',
    sum(if(`subject` = '政治', `score`, 0)) as '政治',
    sum(if(`subject` = '体育', `score`, 0)) as '体育'
from `sc` group by `sname`;

-- case实现版本
select `sname` as '姓名',
	sum(case `subject` when '语文' then `score` else 0 end) as '语文',
	sum(case `subject` when '数学' then `score` else 0 end) as '数学',
	sum(case `subject` when '英语' then `score` else 0 end) as '英语',
	sum(case `subject` when '历史' then `score` else 0 end) as '历史',
	sum(case `subject` when '政治' then `score` else 0 end) as '政治',
	sum(case `subject` when '体育' then `score` else 0 end) as '体育'
from `sc` group by `sname`;
```

3. 需求实现1

|姓名	|语文	|数学	|英语	|历史	|政治	|体育|总成绩|
|---|---|---|---|---|---|---|---|
|张小三	|78	|77	|90	|89	|0	|80|414|
|李小四	|0	|90	|80	|78	|88	|88|424|
|王小五	|90	|0	|80	|0	|89	|90|349|

```sql
-- if实现版本
select `sname` as '姓名',
    sum(if(`subject` = '语文', `score`, 0)) as '语文',
    sum(if(`subject` = '数学', `score`, 0)) as '数学',
    sum(if(`subject` = '英语', `score`, 0)) as '英语',
    sum(if(`subject` = '历史', `score`, 0)) as '历史',
    sum(if(`subject` = '政治', `score`, 0)) as '政治',
    sum(if(`subject` = '体育', `score`, 0)) as '体育',
    sum(`score`) as '总成绩'
from `sc` group by `sname`;

-- case实现版本
select `sname` as '姓名',
	sum(case `subject` when '语文' then `score` else 0 end) as '语文',
	sum(case `subject` when '数学' then `score` else 0 end) as '数学',
	sum(case `subject` when '英语' then `score` else 0 end) as '英语',
	sum(case `subject` when '历史' then `score` else 0 end) as '历史',
	sum(case `subject` when '政治' then `score` else 0 end) as '政治',
	sum(case `subject` when '体育' then `score` else 0 end) as '体育',
    sum(`score`) as '总成绩'
from `sc` group by `sname`;
```

4. 需求实现3

|姓名	|语文	|数学	|英语	|历史	|政治	|体育	|总成绩|
|---|---|---|---|---|---|---|---|
|张小三	|78	|77	|90	|89	|0	|80	|414|
|李小四	|0	|90	|80	|78	|88	|88	|424|
|王小五	|90	|0	|80	|0	|89	|90	|349|
|总成绩	|168	|167	|250	|167	|177	|258	|1187|

```sql
-- if实现版本
select `sname` as '姓名',
    sum(if(`subject` = '语文', `score`, 0)) as '语文',
    sum(if(`subject` = '数学', `score`, 0)) as '数学',
    sum(if(`subject` = '英语', `score`, 0)) as '英语',
    sum(if(`subject` = '历史', `score`, 0)) as '历史',
    sum(if(`subject` = '政治', `score`, 0)) as '政治',
    sum(if(`subject` = '体育', `score`, 0)) as '体育',
    sum(`score`) as '总成绩'
from `sc` group by `sname`
union
select '总成绩' as '姓名',
    sum(if(`subject` = '语文', `score`, 0)) as '语文',
    sum(if(`subject` = '数学', `score`, 0)) as '数学',
    sum(if(`subject` = '英语', `score`, 0)) as '英语',
    sum(if(`subject` = '历史', `score`, 0)) as '历史',
    sum(if(`subject` = '政治', `score`, 0)) as '政治',
    sum(if(`subject` = '体育', `score`, 0)) as '体育',
    sum(`score`) as '总成绩'
from `sc`;


-- case实现版本
select `sname` as '姓名',
	sum(case `subject` when '语文' then `score` else 0 end) as '语文',
	sum(case `subject` when '数学' then `score` else 0 end) as '数学',
	sum(case `subject` when '英语' then `score` else 0 end) as '英语',
	sum(case `subject` when '历史' then `score` else 0 end) as '历史',
	sum(case `subject` when '政治' then `score` else 0 end) as '政治',
	sum(case `subject` when '体育' then `score` else 0 end) as '体育',
    sum(`score`) as '总成绩'
from `sc` group by `sname`
union
select '总成绩' as '姓名',
	sum(case `subject` when '语文' then `score` else 0 end) as '语文',
	sum(case `subject` when '数学' then `score` else 0 end) as '数学',
	sum(case `subject` when '英语' then `score` else 0 end) as '英语',
	sum(case `subject` when '历史' then `score` else 0 end) as '历史',
	sum(case `subject` when '政治' then `score` else 0 end) as '政治',
	sum(case `subject` when '体育' then `score` else 0 end) as '体育',
    sum(`score`) as '总成绩'
from `sc`;
```

##### 9.1.5. exists

顾名思义，就是判断数据是否存在的！`exists`的作用为判断一个表中的数据，是否在另外的一张表中能够查询到与之对应的数据

效率要比连接查询和子查询高！

```sql
-- 案例1: 查询有员工的部门
select distinct dept.* from dept left join emp on dept.deptno = emp.deptno where empno is not null;

select * from dept where exists(
		select 1 from emp where dept.deptno = emp.deptno
);


-- 案例2: 查询没有员工的部门
select distinct dept.* from dept left join emp on dept.deptno = emp.deptno where empno is null;

select * from dept where not exists(
		select 1 from emp where dept.deptno = emp.deptno
);

-- 案例3: 查询有部门的员工
select * from emp where exists (
		select 1 from dept where dept.deptno = emp.deptno
);

-- 案例4: 查询没有部门的员工信息
select * from emp where not exists (
		select 1 from dept where dept.deptno = emp.deptno
);

-- 案例5: 查询有下属的员工信息
select * from emp A where exists (
		select 1 from emp B where B.mgr = A.empno
);

-- 案例6: 查询有领导的员工信息
select * from emp A where exists (
		select 1 from emp B where A.mgr = B.empno
);
```

#### 9.2. 日期函数

|函数	|描述|
|---|---|
|`ADDTIME (date2 ,time_interval )`	|将`time_interval`加到`date2`|
|`CURRENT_DATE ( )`	|当前日期|
|`CURRENT_TIME ( )`	|当前时间|
|`CURRENT_TIMESTAMP ( )`	|当前时间戳|
|`DATE (datetime )`	|返回`datetime`的日期部分|
|`DATE_ADD (date2 , INTERVAL d_value d_type )`	|在`date2`中加上日期或时间|
|`DATE_SUB (date2 , INTERVAL d_value d_type )`	|在`date2`上减去一个时间|
|`DATEDIFF (date1 ,date2 )`	|两个日期差|
|`NOW ()`	|当前时间|
|`YEAR\|Month\|Day(datetime )`	|年月日|

#### 9.3. 字符串函数

|函数	|描述|
|---|---|
|`CHARSET(str)`	|返回字串字符集|
|`CONCAT (string2 [... ])`	|连接字串|
|`INSTR (string ,substring )`	|返回`substring`在`string`中出现的位置,没有返`0`|
|`UCASE (string2 )`	|转换成大写|
|`LCASE (string2 )`	|转换成小写|
|`LEFT (string2 ,length )`	|从`string2`中的左边起取`length`个字符|
|`LENGTH (string )`	|`string`长度|
|`REPLACE (str ,search_str ,replace_str )`	|在`str`中用`replace_str`替换`search_str`|
|`STRCMP (string1 ,string2 )`	|逐字符比较两字串大小,|
|`SUBSTRING (str , position [,length ])`	|从`str`的`position`开始,取`length`个字符|
|`LTRIM (string2 ) RTRIM (string2 ) `	|trim 去除前端空格或后端空格|

#### 9.4. 数学函数

|函数	|描述|
|---|---|
|`ABS (number2 )`	|绝对值|
|`BIN (decimal_number )`	|十进制转二进制|
|`CEILING (number2 )`	|向上取整|
|`CONV(number2,from_base,to_base)`	|进制转换|
|`FLOOR (number2 )`	|向下取整|
|`FORMAT (number,decimal_places )`	|保留小数位数|
|`HEX (DecimalNumber )`	|转十六进制|
|`LEAST (number , number2 [...])`	|求最小值|
|`MOD (numerator ,denominator )`	|求余|
|`RAND([seed])`	|`RAND([seed])`|

#### 9.5. 使用示例

```sql
-- mysql常用的函数
SELECT ADDTIME('2007-12-30 21:50:50', '1:1:1') 
SELECT ADDTIME(NOW(),'1:1:1')
SELECT CURRENT_DATE()
SELECT CURRENT_TIME()
SELECT CURRENT_TIMESTAMP()
SELECT DATE(NOW())-- 获取当前时间的日期部分

SELECT DATE_ADD('2016-6-6' ,INTERVAL  -1 DAY)
SELECT DATEDIFF('2016-6-8','2016-6-10')  -- 前面的时间-后面的时间的差值
SELECT NOW();

SELECT YEAR|MONTH|DAY(DATETIME )-- 不能这样做
SELECT YEAR(NOW())-- 单独获取年
SELECT MONTH(NOW())-- 单独获取月
SELECT DAY(NOW())-- 单独获取日

-- 对字符串的操作
SELECT CHARSET('hello') -- 当前的编码格式
SELECT CONCAT('he','lo') -- 合并字符串
SELECT *,CONCAT(ename,job) FROM emp;
SELECT INSTR('hello','e')-- 当在原字符串中找不到子字符串时,会返回0
SELECT LEFT('hello',2)-- -- 不能这样做
SELECT REPLACE('hello','h','wo')
SELECT STRCMP('hello','heloo') -- 比较两个字符串   前面大返回1   后面大返回-1  相等返回0
SELECT LTRIM('       hello') -- 去除左边的空格
SELECT RTRIM('hello     ') -- 去除右边的空格
SELECT MOD(34,0); -- 返回null
```

#### 9.6. 自定义函数

##### 9.6.1. 什么是自定义函数

在上方我们已经学习了很多的函数了，但是虽然系统给我们提供的函数再怎么多，依然不能满足我们所有的需求。有时候对于一些较为复杂的逻辑，我们就需要用自定义的函数来实现。

其实自定义函数与Java中的类似，都需要指定函数的名字、函数的参数、函数的返回值和函数需要实现的逻辑功能，只是在语法上有所区别。Java的函数用Java代码来书写，MySQL的函数与后面要学习的存储过程类似，都是一组SQL集。

##### 9.6.2. 函数与存储过程的区别

● 函数可以return值，存储过程不能直接return，但是有输出参数可以输出多个返回值；

● 函数可以嵌入到sql语句中使用，而存储过程不能；

● 函数一般用于实现较简单的有针对性的功能（如求绝对值、返回当前时间等），存储过程用于实现复杂的功能（如复杂的业务逻辑功能）；

● 函数的关键字是`function`, 存储过程是:`procedure`

##### 9.6.3. 自定义函数实现

1. 定义一个函数，返回一个数字的绝对值

```sql
-- 如果之前存在这个函数，先将其删除
drop function if exists `my_abs`;

-- 自定义分隔符,这里定义的分隔符是;; 定义好后,只有遇到;;才会结束
delimiter ;;

-- 创建函数，num为形参，returns为返回值
create function `my_abs`(`num` int) returns int
deterministic
deterministic
-- 函数开始
begin
	if `num` >= 0 then
		return `num`;
	else
		return -`num`;
	end if;
-- 函数结束
end
;;

-- 将分隔符重新定义为;
delimiter ;
```

2. 定义一个函数，通过成绩的不同区间，返回对应的级别: 不及格、良、优、错误成绩

```sql
-- 如果之前存在这个函数，先将其删除
drop function if exists `get_level_info`;

-- 自定义分隔符
delimiter ;;

-- 创建函数
create function `get_level_info`(`score` int) returns varchar(20) charset utf8
deterministic
begin
	if `score` < 0 or `score` > 100 then
		return '错误成绩';
	elseif `score` < 60 then
		return '不及格';
	elseif `score` < 80 then
		return '良';
	else
		return '优'
	end if;
end
;;

delimiter ;
```

3. 定义一个函数，提取一个字符串中的中文部分

```sql
-- 如果之前存在这个函数，先将其删除
drop function if exists `get_name`;
-- 自定义分隔符
delimiter ;;
-- 创建函数
create function `get_name`(`name` varchar(50) charset utf8) returns varchar(50) charset utf8
deterministic
begin
	declare i int default 0;
	declare l int default char_length(`name`);
	declare tmp varchar(50) default '';
	
	while i <= l do
		if mid(`name`, i, 1) regexp '[\\u4e00-\\u9fa5]' then
			set tmp = concat(tmp, mid(`name`, i, 1));
		end if;
		set i = i + 1;
	end while;
	
	return tmp;
end
;;

delimiter ;
```

#### 9.7. 窗口函数

MySQL在8.0版本之后，支持了窗口函数。

##### 9.7.1. 窗口函数的简介

在了解窗口函数之前，我们先看这个需求应该怎么实现: 查询每一个员工的信息，及其部门的平均薪资。

```sql
-- 实现方式1: 通过子查询实现
select A.*, B.avg_sal
from emp A join (select deptno,avg(ifnull(sal,0)) avg_sal from emp group by deptno) B on A.deptno = B.deptno

-- 实现方式2: 通过子查询实现
select emp.*, (select avg(ifnull(sal,0)) from emp B where B.deptno = A.deptno)
from emp A;
```

通过这个查询可以看到，想要进行明细的查询和聚合统计的查询，需要进行两次查询操作，比较麻烦，而且查询效率也不高。那么，能不能简化这样的流程呢？窗口函数就应运而生了！

那么，窗口函数是什么呢？

● 窗口函数又名开窗函数，属于分析函数的一种。

● 是一种用于解决复杂报表统计需求的函数。

● 窗口函数常用于计算基于组的某种值，它和聚合函数的不同之处是：对于每个组返回多行，而聚合函数对于每个组只返回一行。简单的说窗口函数对每条详细记录开一个窗口,进行聚合统计的查询

● 开窗函数指定了分析函数工作的数据窗口大小，这个数据窗口大小可能会随着行的变化而变化。

● 窗口函数一般不单独使用

● 窗口函数内也可以分组和排序

##### 9.7.2. 窗口函数案例

使用`over()`函数，为查询到的每一行数据开一个数据窗口。窗口内的数据为本次查询到的所有的数据。

一般是对窗口内的数据进行聚合统计的操作。

```sql
-- 需求: 查询每一个员工的基本信息，及所有的员工的数量
select *, count(*) over() from `emp`;

-- 需求: 查询每一个员工的基本信息，及所有员工的工资和
select *, sum(`sal`) over() from `emp`;

-- 需求: 查询每一个员工的基本信息，及所有员工的平均奖金
select *, avg(ifnull(`comm`, 0)) over() from `emp`;

-- 需求: 查询每一个员工的基本信息，及所有员工的平均工龄
select *, avg(round(datediff(now(), `hiredate`)/365, 1)) over() from `emp`;
```

##### 9.7.3. 窗口分组

通过指定的字段，对数据进行分组，此时窗口内的数据为指定分组的数据。

例如: `` count(*) over(partition by `deptno`) ``, 此时将数据通过deptno字段进行了分组，窗口内的数据是与本行的deptno相同的数据。

```sql
-- 需求: 查询每一个员工的基本信息，及其部门的人数
select *, count(*) over(partition by `deptno`) from `emp`;

-- 需求: 查询每一个员工的基本信息，及其部门的最高工资
select *, max(`sal`) over(partition by `deptno`) from `emp`;

-- 需求: 查询每一个员工的基本信息，及其部门的平均薪资
select *, avg(ifnull(`sal`, 0)) over(partition by `deptno`) from `emp`;

-- 需求: 查询每一个员工的基本信息，及部门的平均工龄
select *, avg(round(datediff(now(), `hiredate`)/365, 1)) over(partition by `deptno`) from `emp`;

-- 需求: 查询每一个员工的基本信息，及当前岗位的人数
select *, count(*) over(partition by `job`) from `emp`;
```

##### 9.7.4. 窗口数据排序

使用`order by`子句，可以实现窗口内的数据按照指定的条件进行升序或者降序的排列。此时需要注意的是: 窗口内的数据会逐行递增

```sql
select *, sum(`sal`) over(partition by `deptno` order by `sal` desc) from `emp`;
```

##### 9.7.5. 排名函数

有了窗口函数，就可以对数据进行排名次了。常见的排名函数有三种: `row_number()、rank()、dense_rank()`;

● `row_number`: 对每一行的数据进行编号，不会出现相同的名次

● `rank`: 常见的排名函数，会出现并列的名次，同时会出现名次跳跃的情况

● `dense_rank`: 常见的排名函数，会出现并列的名次，不会出现名次跳跃的情况

|score	|row_number	|rank|	dense_rank|
|---|---|---|---|
|100	|1	|1	|1|
|99	|2	|2	|2|
|99	|3	|2	|2|
|98	|4	|4	|3|
|98	|5	|4	|3|
|97	|6	|6	|4|

```sql
-- 查询每一个员工的基本信息，及员工在自己部门内的工资排名
select *, rank() over(partition by `deptno` order by `sal` desc) from `emp`;

-- 查询每一个员工的基本信息，及员工在所有人中的工资排名
select *, dense_rank() over(order by `sal` desc) from `emp`;

-- 查询每一个员工的基本信息，及员工在同一个工种内的工资排名
select *, rank() over(partition by `job` order by `sal` desc) from `emp`;

-- 查询每一个员工的基本信息，及员工在所有人中的工龄排名
select *, rank() over(order by `hiredate`) from `emp`;

-- 查询每一个员工的基本信息，及员工在当前部门中的工龄排名
select *, rank() over(partition by `deptno` order by `hiredate`) from `emp`;
```

### 10. 存储过程

#### 10.1. 什么是存储过程

MySQL从1.5版本开始支持存储过程(PROCEDURE)

在我们进行查询操作的时候，有的时候我们可能会进行重复性的查询工作。例如: 我需要从固定的几张表中查询固定的几个字段的值，可以每次查询的时候传入的条件的值不同，但是查询的表和字段始终没有改变。那么这个时候我们应该怎么去优化这个流程呢？这就可以使用到存储过程来完成了。

存储过程简单来说，就是为以后的使用而保存的一条或多条MySQL语句的集合。可将其视为批件，虽然它们的作用不仅限于批处理。存储过程就是有业务逻辑和流程的集合，可以在存储过程中创建表，更新数据，删除等等。

通过把处理封装在容易使用的单元中，简化复杂的操作(正如前面例子所述)。由于不要求反复建立一系列处理步骤，这保证了数据的完整性。如果所有开发人员和应用程序都使用同一(试验和测试)存储过程，则所使用的代码都是相同的。这一点的延伸就是防止错误。需要执行的步骤越多，出错的可能性就越大。防止错误保证了数据的一致性。简化对变动的管理。如果表名、列名或业务逻辑(或别的内容)有变化，只需要更改存储过程的代码。使用它的人员甚至不需要知道这些变化。

```sql
-- 常用的结构

-- 如果之前存在这个存储过程，先将其删除。不允许出现两个名字相同的存储过程。
drop procedure if exists `procedure_name`;

-- 设定分隔符
delimiter ;;

-- 创建存储过程
create procedure `procedure_name`(in `a` int, in `b` varchar(20))
begin
	-- 存储过程中的逻辑
end;
;;

-- 恢复分隔符
delimiter ;
```

#### 10.2. 初识存储过程

定义一个存储过程，实现查询两个日期之间入职的员工信息

```sql
drop procedure if exists `select_emp_by_hiredate`;
delimiter ;;
create procedure `select_emp_by_hiredate`(in `from_date` date, in `to_date` date)
begin
	select * from `emp` where `hiredate` between `from_date` and `to_date`;
end;
;;
delimiter ;

-- 调用存储过程
call `select_emp_by_hiredate`('1981-01-01', '1981-09-01');
```

#### 11.3. 变量

MySQL中，变量可以分为局部变量、用户变量、会话变量、全局变量的划分

##### 11.3.1. 局部变量

局部变量一般用在sql语句块中，比如存储过程的`begin/end`。其作用域仅限于该语句块，在该语句块执行完毕后，局部变量就消失了。

局部变量一般用declare来声明，可以使用default来说明默认值。

```sql
drop procedure if exists `test`;
delimiter ;;
create procedure `test`()
begin
	declare number int default 0;
	select number;
end;
;;
delimiter ;

call `test`();
```

##### 11.3.2. 用户变量

用户变量的作用域要比局部变量要广。用户变量可以作用于当前整个连接，但是当当前连接断开后，其所定义的用户变量都会消失。

```sql
set @变量名
```

对用户变量赋值有两种方式，一种是直接用`"="`号，另一种是用`":="`号。其区别在于使用`set`命令对用户变量进行赋值时，两种方式都可以使用；当使用`select`语句对用户变量进行赋值时，只能使用`":="`方式，因为在`select`语句中，`"="`号被看作是比较操作符。

```sql
drop procedure if exists `test`;
delimiter ;;
create procedure `test`(in `a` int, in `b` int)
begin
	set @number1 = 0;
	set @number2 := 0;
	select @number1:= `a` + `b` as `sum`, @number2 := `a` - `b` as `sub`;
end;
;;
delimiter ;

call `test`(20, 5);
select @number1, @number2;
```

##### 11.3.3. 会话变量

服务器为每个连接的客户端维护一系列会话变量。在客户端连接时，使用相应全局变量的当前值对客户端的会话变量进行初始化。设置会话变量不需要特殊权限，但客户端只能更改自己的会话变量，而不能更改其它客户端的会话变量。会话变量的作用域与用户变量一样，仅限于当前连接。当当前连接断开后，其设置的所有会话变量均失效。

```sql
-- 设置会话变量有如下三种方式：
set session var_name = value;

set @@session.var_name = value;

set var_name = value;

-- 查看一个会话变量也有如下三种方式：

select @@var_name;

select @@session.var_name;

show session variables like "%var%";

mysql> show session variables;
```

##### 11.3.4. 全局变量

全局变量影响服务器整体操作。当服务器启动时，它将所有全局变量初始化为默认值。这些默认值可以在选项文件中或在命令行中指定的选项进行更改。要想更改全局变量，必须具有SUPER权限。全局变量作用于server的整个生命周期，但是不能跨重启。即重启后所有设置的全局变量均失效。要想让全局变量重启后继续生效，需要更改相应的配置文件。

```sql
-- 要设置一个全局变量，有如下两种方式：

set global var_name = value; //注意：此处的global不能省略。根据手册，set命令设置变量时若不指定GLOBAL、SESSION或者LOCAL，默认使用SESSION

set @@global.var_name = value; //同上

-- 要想查看一个全局变量，有如下两种方式：

select @@global.var_name;

show global variables like "%var%";

mysql> show global variables;
```

#### 11.4. 参数

定义存储过程的时候，有三种模式的参数: `IN、OUT、INOUT`

|模式	|说明|
|---|---|
|`IN`	|调用存储过程的时候，实际参数的值会传递到存储过程内部。对形参进行的修改也不会影响实参。|
|`OUT`	|调用存储过程的时候，实际参数的值不会传递到存储过程的内部。此时存储过程的形参默认的初始值是NULL。对形参的修改会影响实际参数的值。|
|`INOUT`	|复合模式，调用存储过程的时候，实际参数的值会传递到存储过程的内部，对形参的修改也会影响到实际参数的值。|

```sql
drop procedure if exists `parameter_test`;
delimiter ;;
create procedure `parameter_test`(in `a_in` int, out `a_out` int, inout `a_in_out` int)
begin 
	select a_in, a_out, a_in_out;
	set a_in = 100;
	set a_out = 100;
	set a_in_out = 100;
end;
;;
delimiter ;

set @v_in := 10;
set @v_out := 20;
set @v_in_out := 30;
call parameter_test(@v_in, @v_out, @v_in_out);
select @v_in, @v_out, @v_in_out ;
```

### 11. 数据库的备份与恢复

#### 11.1. 手动复制

```
a. 可以先登陆mysql 查看数据文件的位置：
   show global variables like '%datadir%'
  
b. 在某一个位置创建备份目录backup. 比如：D:\backup

c. 将%datadir%下的所有文件，copy到backup下。

d. 先模拟某一个数据库mydb毁坏。drop database mydb;

e. 先终止服务项。再将所有的数据，copy到%datadir%下。然后再去查看。
```

#### 11.2. 使用mysqldump命令进行备份

```
a. 在命令提示符下输入(别登陆到mysql内)：
   mysqldump -uUsername -pPwd --all-databases > filename.sql #备份所有数据库

b. 备份一部分数据库
   mysqldump -uUsername -pPwd --databases dbname1 dbname2 > filename.sql

c. 备份某个数据库中的某些表
   mysqldump -uUsername -pPwd dbname tablename1 tablename2 > filename.sql

d. 恢复数据
   登入到mysql内，使用source命令
   语法： source filename.sql
   注意： 路径是绝对路径
```

#### 11.3. 使用其他工具

很多的数据库连接工具都可以实现数据库的备份与恢复的操作，例如: navicat、workbench等。

### 12. DCL

#### 12.1. DCL的作用

DCL语句主要用来做用户的创建、管理，权限的授予、撤销等操作的。

#### 12.2. 管理用户

创建、删除用户的操作，必须要使用root用户才可以完成！

```sql
-- 创建用户语法:
create user username@ip identified by 'password';

-- 修改用户密码:
alter user username@ip identified by 'newPassword';
set password for username@ip = password('newPassword');

-- 删除用户:
drop user username@ip
```

#### 12.3. 权限管理

```sql
-- 查看用户权限：使用超级管理员root
show grants for username

-- 授权：使用超级管理员root
grant 权限名[,权限名.....] on dbname.* to username@ip

-- DDL权限：create、alter、create view.....,drop
-- DML权限：insert、update、delete
-- DQL权限: select

-- 案例：授于某用户全部权限
grant all privileges on *.* to 'scott'@'localhost' identified by '123456' with grant option;
-- 案例：启用root用户的远程连接操作
-- 8.0之前版本: grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
create user 'root'@'%' identified by '123456';
grant all privileges on *.* to 'root'@'%' with grant option;

-- 撤销权限
revoke 权限名 [,权限名.....] on dbname.* from username@ip

-- 刷新权限
flush privilages;
```

如果在授权远程登录的时候，出现如下问题:

`Unable to load authentication plugin 'caching_sha2_password'`

原因: 是因为mysql8使用的是caching_sha2_password加密规则。

解决: 

● `alter user ‘test’@’%’ identified with mysql_native_password by '123456'`;

● 修改`my.cnf`文件，在末尾添加: `default_authentication_plugin=mysql_native_password`

#### 12.4. 视图

一张数据表中的数据有很多很多，会涉及到很多的行，涉及到很多的列。那么，如果我只希望其中的一部分数据被某一个用户能够查询到或者能够修改，应该怎么做呢？

此时，可以借助视图来实现这样的效果。

所谓视图，可以理解为一张表的映射，映射出这张表的一部分的数据。可以通过视图查询到原数据表中的一部分数据，也可以进行数据的插入、修改、删除的操作。

```sql
-- 创建视图
create view `v_emp` as select `empno`, `ename`, `sal`, `deptno` from `emp`;

-- 删除视图
drop view if exists `v_emp`;
```

### 13. TCL

#### 13.1. 事务的介绍

我们先来看一个场景:

```
假如把每一张银行卡的信息存入数据库的表中进行存储，每一张表中存储有银行卡的卡号、余额信息。小明需要给小红转账1000元钱，那么在数据库中需要进行的操作是什么？
	- 将小明的银行卡余额，减1000
	- 将小红的银行卡余额，加1000
```

那么，如果在上述的操作中，如果第一步成功了，小明的余额已经减过了。但是在给小红的银行卡余额增1000的时候出现了问题，导致本次操作失败了。那么本次转账整体失败，小明的余额也需要回滚到减1000之前的状态。

当一个业务需求涉及到多个DML操作时，这个业务(或者多个DML操作)当成一个整体来处理。在处理的过程中，如果有失败或异常，我们要回到业务开始时。如果成功处理，我们再将数据持久化到磁盘中。这样一个过程我们称之为一个事务。事务具有原子性。不可切割。

总结: 事务指逻辑上的一组操作，组成这组操作的各个单元，要么全成功，要么全不成功。

#### 13.2. 事务的特性

● 原子性(Atomicity)指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。

● 一致性(Consistency)事务必须使数据库从一个一致性状态变换到另外一个一致性状态。转账前和转账后的总金额不变。

● 隔离性(Isolation)事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。

● 持久性(Durability)指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。

#### 13.3. MySQL的事务

##### 13.3.1. 隐式事务

隐式事务，或者称为自动事务。不需要进行额外的控制，每一条DML语句都是一个事务，可以自动提交。

● 事务开始于

  ○ 连接到数据库上，并执行一条DML语句`insert`、`update`或`delete`。<br>
  ○ 前一个事务结束后，又输入了另一条DML语句。

● 事务结束于

  ○ 执行`commit`或`rollback`语句。<br>
  ○ 执行一条DDL语句，例如`create table`语句，在这种情况下，会自动执行`commit`语句。<br>
  ○ 执行一条DCL语句，例如`grant`语句，在这种情况下，会自动执行`commit`。<br>
  ○ 断开与数据库的连接。<br>
  ○ 执行了一条DML语句，该语句却失败了，在这种情况中，会为这个无效的DML语句执行`rollback`语句。

##### 13.3.2. 显式事务

```sql
-- 禁用自动提交的功能
set autocommit = 0;

-- 开启一个事务(可以省略不写)
start transaction;

-- 执行一组DML操作
...

-- 设置回滚点
savepoint spName;

-- 结束事务
commit;					-- 提交事务
rollback;				-- 回滚到事务的起点
rollback to spName;		-- 回滚到指定的回滚点
```

#### 13.4. 并发事务

##### 13.4.1. 并发事务出现的问题

如果有多个事务，同时操作同一个数据库中的同一个数据的时候，会出现如下的问题:

● 脏读: 事务A读取了事务B刚刚更新的数据，但是事务B回滚了，这样就导致事务A读取的为脏数据，我们称之为脏读。如公司某财务人员更新公司入账报表时，在DML语句中的数字后少添加了一个0，但是未提交。然后吃饭，吃饭回来，发现错误，然后更正后做了提交。而在吃饭期间，老板要求秘书查看一下报表，秘书看到的是少个0的数据。这就是脏读。

● 不可重复读: 事务A读取同一条记录两次，但是在两次之间事务B对该条记录进行了修改并提交，导致事务A两次读取的数据不一致。

它和脏读的区别是: 脏读是事务A读取了另一个事务B未提交的脏数据，而不可重复读则是事务A读取了事务B提交的数据。

多数情况下，不可重复读并不是问题，因为我们多次查询某个数据时，当然要以最后查询得到的结果为主。但在另一些情况下就有可能发生问题，比如，老板让B和C分别核对事务A操作的数据，结果可能不同，老板是怀疑B呢，还是C呢？

● 幻读: 事务A在修改全表的数据，比如将字段age全部修改为0岁，在未提交时，事务B向表中插入或删除数据，如插入一条age为25岁的数据。这样导致事务A读取的数据与需要修改的数据不一致，就和幻觉一样。幻读和不可重复读的相同点: 都是针对于另外一个已经提交的事务而言。不同点: 不可重复读是针对于同一条记录来说的 (`delete`或`update`同一条记录, 而幻读是针对于一批数据来说的 (`insert`))。

##### 13.4.2. 事务的隔离级别

我们知道了多个事务同时对相同的数据进行处理的时候，会出现上述的问题，那么应该怎么去解决这个问题呢？

可以通过设置事务的隔离级别

● 未提交读(read uncommitted)就是不做隔离控制，可以读到 “脏数据“，可能发生不可重复读，也可能出现幻读。

● 提交读(read committed)提交读就是不允许读取事务没有提交的数据。显然这种级别可以避免了脏读问题。但是可能发生不可重复读，幻读。这个隔离级别是大多数数据库的默认隔离级别。(除了MySQL)

● 可重复读(repeatable read)为了避免提交读级别不可重复读的问题，在事务中对符合条件的记录上"排他锁”，这样其他事务不能对该事务操作的数据进行修改，可避免不可重复读的问题产生。由于只对操作数据进行上锁的操作，所以当其他事务插入或删除数据时，会出现幻读的问题，此种隔离级别为Mysql默认的隔离级别。

● 序列化(Serializable)在事务中对表上锁，这样在事务结束前，其他事务都不能够对表数据进行操作（包括新增，删除和修改）。这样避免了脏读，不可重复读和幻读，是最安全的隔离级别。但是由于该操作是堵塞的，因此会严重影响性能。

|   |避免脏读	|避免不可重复读	|避免幻读|
|---|---|---|---|
|`read uncommitted`|`×`	|`×`	|`×`|
|`read committed`|`√`	|`×`	|`×`|
|`read committed`|`√`	|`√`	|`×`|
|`Serializable`|`√`	|`√`	|`√`|

```sql
-- 查看当前隔离级别
select @@transaction_isolation;
-- 设置当前MysqL连接的级别
set transaction isolation level read committed；
-- 设置数据库系统的全局隔离级别
set global transaction isolation level read committed;
-- 一般需要重启生效
```

### 14. 索引

#### 14.1. 索引的介绍

我们小学的时候都学习过怎样查字典。在一本字典中有很多很多的字，这些字会按照一定的顺序排列，通常以拼音首字母排列。那么我们怎样从一本字典中快速的找到我想要的呢？从前往后一页一页的判断，这样能够找到我想要查的字。但是效率比较低。

此时，就有一个神器出现了 -- 目录。我们都会在字典的开头部分找到目录的，目录上记录了一些索引，以及所对应的页码，通过目录，我们可以大幅度的缩小要查询的范围。例如: 我想查”千”这个字，那我从目录上可以看到“Q”是从哪个页码开始的，然后从这一页开始查询就可以了。

我们已经学习了数据库，也知道将数据存入表中。在生产环境中，查询操作的频率要远远高于增删改的操作。其实，这就是一个“查字典”的过程。如果你的表中的数据比较少，那么从前往后一条条的查询数据，也能够让你快速的找到你想要查找的数据。但是，如果你的表中的数据量非常的大呢？怎样通过查询条件快速的定位到你想要查询的数据呢？此时，我们就希望有一个“目录”来缩小我们查询的范围，而这个“目录”，就是索引。

#### 14.2. 索引的优缺点

优点:

假设表中有10000条数据，没有索引的时候，我需要按照条件到表中查询数据，那么我的做法就是一行行的数据去进行判断，判断是是不是我想要查询的数据。但是有了索引，它可以帮我去除很多无用的数据，大大的缩小查询的范围，查询的效率就会高很多。

因此，优点很明显，就是减少了需要扫描的数据量，从而极大的提高了查询的效率！

缺点:

任何事情都是有两面性的，索引能给我们带来极大的查询效率的提升，同时本身也是有一些缺点的:

- 创建和维护索引是需要消耗时间的，并且时间随着数据量的增多而增多。
- 索引也需要占用物理存储空间的。一张表除了数据占存储空间之外，索引也需要占用存储空间。
  (设想一下: 字典的目录，不也是需要有单独的几页来存放吗？)
- 在增删改数据的时候，同时需要维护索引。

#### 14.3. 索引的创建规则

上文我们说到了，索引能够给我们带来查询效率的提升，但是索引本身也是有缺点的。那么什么情况下适合用索引，什么情况下不适合用索引呢？

● 适合用索引

```sql
- 在经常需要搜索的列上，适合添加索引。
  select sname from student;
  
- 在经常进行连接的列上，适合添加索引。
  select sname, score from student join sc on student.sid = sc.sid;

- 在经常进行范围检查的列上，适合添加索引。
  select sid, score from sc where score between 60 and 80;

- 在经常需要排序的列上，适合添加索引。
  select sid, score from sc order by score desc;
```

● 不适合用索引

```sql
- 在不经常需要搜索的列上，不适合添加索引。
  有些列不经常使用，添加上索引后，只会带来存储空间的占用和维护效率的低下。
  
- 对于重复值较多的列，不适合添加索引。
  例如: 性别列，即便添加上了索引，也没有明显的感觉到查询效率的提升的。反而会带来更多的空间占用和维护效率低下。
  
- 当某一列的修改效率要求高于查询效率时，不适合添加索引。
  添加上索引，势必会带来修改效率的降低（因为要维护索引）。
```

#### 14.4. 索引的分类

● 主键索引: 是的，主键其实就是一种索引，可以提高按照主键查询数据时候的效率。主键不能为空，且不能重复。

● 唯一索引: 完整性约束部分的唯一约束`UNIQUE`，也是一种索引，同样可以提升使用这个键进行查询时候的效率。唯一列不能重复，但是可以为空。

● 普通索引: 就是为某一个键添加一个普通的索引，加速查询。但是对非空、重复都没有要求。

● 全文索引: 查找一段文件中的关键词，对于长文章的检索提升较大。

索引在添加的时候，按照约束的列的数量，也可以分为

● 单列索引

一个索引只可以包含一个列，例如: 为姓名添加一个索引、为成绩添加一个索引。

一张表中可以同时存在多个单列索引。

● 联合索引

一个索引中包含了多个列。

例如: `primary key(sid, cid)、unique(sid, cid)、index(sid, cid)`

#### 14.5. 创建删除索引

● 建表的同时创建索引

```sql
-- 在建表的同时，创建索引
create table `sc` (
	`sid` int primary key,
	`sname` varchar(20),
	`score` int,
	index (`score`)
);

-- 查看表中的索引
show index from `sc`;
-- 此时会看到两个索引: 主键索引`sid`和普通索引`score`
```

● 在已经存在的表中创建索引

```sql
-- 创建表，不创建索引
create table `sc`(
	`sid` int,
	`sname` varchar(20),
	`score` int,
	`desc` longtext
);

-- ALTER方式添加索引
alter table `sc` add primary key (`sid`);			-- 添加主键索引
alter table `sc` add unique (`sname`);				-- 添加唯一索引
alter table `sc` add index idx_score (`score`);		-- 添加普通索引
alter table `sc` add fulltext (`desc`);				-- 添加全文索引
```

● 删除索引

```sql
alter table `sc` drop primary key;		-- 删除主键索引
alter table `sc` drop index `sname`;	-- 删除唯一索引
alter table `sc` drop index idx_score;	-- 删除普通索引
alter table `sc` drop index `desc`;		-- 删除全文索引
```

#### 14.6. 索引测试

1. 创建一张表，并添加数据

```sql
drop table if exists `sc`;

create table `sc` (
	`sid` int,
	`sname` varchar(20),
	`score` int
);

-- 创建存储过程
drop procedure if exists `init_data`;
delimiter ;;

create procedure `init_data` (data_count int)
begin
	declare i int default 0;
	while i < data_count do 
		insert into `sc` values (i, 'zhangsan', round((rand() * 100)));
		set i = i + 1;
	end while;
end;;
delimiter ;

-- 添加500000条数据（可以视自己的电脑配置，适当的调整数据的数量）
call init_data(5000000);
```

2. 不添加索引，进行查询

```sql
mysql> select * from `sc` where `sid` = 9999;

# +------+----------+-------+
# | sid  | sname    | score |
# +------+----------+-------+
# | 9999 | zhangsan |    39 |
# +------+----------+-------+
# 1 row in set (1.09 sec)

mysql> select * from `sc` where `score` = 59;
# 55272 rows in set (1.12 sec)
```

3. 添加索引

```sql
mysql> alter table `sc` add primary key (`sid`);
# Query OK, 0 rows affected (4.21 sec)
# Records: 0  Duplicates: 0  Warnings: 0

mysql> select * from `sc` where `sid` = 9999;
# +------+----------+-------+
# | sid  | sname    | score |
# +------+----------+-------+
# | 9999 | zhangsan |    39 |
# +------+----------+-------+
# 1 row in set (0.01 sec)


mysql> alter table `sc` add index idx_score (`score`);
# Query OK, 0 rows affected (3.67 sec)
# Records: 0  Duplicates: 0  Warnings: 0

mysql> select * from `sc` where `score` = 59;
# 55272 rows in set (0.14 sec)
```

从上述的查询中，可以看出来，添加了索引之后，数据查询的效率要提升很多。

4. 覆盖索引

```sql
# 我们通过`score`列进行查询的时候，因为已经构建了索引，因此查询的效率得到了提升。
# 但是我们刚才查询的是*，也就是所有的列。那么我们找到了`score=59`的匹配行之后，还需要再查询这个行的其他列，而这都是需要时间的。
# 而如果我们只查询索引字段，就可以直接在索引数据结构中找到数据了，速度很快！这就是覆盖索引。

mysql> select `score` from `sc` where `score` = 59;
# 55272 rows in set (0.02 sec)
```

#### 14.7. 最左匹配

```sql
-- 现在为sc表创建一个组合索引
-- 以下创建索引，实际上创建了两个联合索引 (`sid`), (`sid`, `sname`)
alter table `sc` add index idx_id_name (`sid`, `sname`);
-- 以下创建索引，实际上创建了三个联合索引 (`sid`), (`sid`, `sname`), (`sid`, `sname`, `score`)
alter table `sc` add index idx_id_name_score (`sid`, `sname`, `score`);

-- 所谓的最左匹配，我们在进行查询的时候，where后面的条件应该和索引中的字段顺序一致
mysql> select * from `sc` where `sid` = 9999 and `sname` = 'zhangsan' and `score` = 39;
-- 但是！如果我把顺序换一下，好像依然能够用到索引，效率依然是非常高的！
-- 这就是MySQL的优化了，你的查询条件中包含索引中的字段的时候，底层会自动的给你调整顺序的！
mysql> select * from `sc` where `score` = 39 and `sid` = 9999 and `sname` = 'zhangsan';

-- 那么，最左匹配，到底有什么影响呢？
-- InnoDB存储引擎下，索引默认的存储格式是B+树，
mysql> select * from `sc` where `sname` = 'zhangsan' and `score` = 39;
# 54398 rows in set (1.18 sec)
-- 可以看出本次查询并没有使用到索引，为什么呢？而B+数据项是复合的数据结构，是按照从左到右的顺序来建立搜索树的。例如我们的索引创建的是(`sid`, `sname`, `score`)，B+树会优先比较`sid`来确定下面的搜索方向，如果`sid`相同，再比较`sname`，`sname`相同再比较`score`，最终得到数据。
-- 但是上述的查询中，缺少了`sid`，因此B+树就不知道下面该查什么范围的数据了，索引也就无效了。
```

### 15. bin-log日志

#### 15.1. MySQL的日志

MySQL在服务启停、执行SQL的时候，会有各种日志的生成，这些日志可以分为以下类型:

|日志类型	|日志内容|
|---|---|
|错误日志	|记录MySQL在运行、启动、停止的时候遇到的错误信息|
|通用查询日志	|记录建立的客户端连接和执行的语句|
|二进制日志	|DML操作，修改数据库的数据操作的日志|
|中继日志	|从主服务器接收的数据更改日志|
|慢查询日志	|查询时间超过`long_query_time`设定的时间，或者不使用索引的查询|
|DDL日志	|DDL操作，涉及到元数据的变更的日志|

其中，二进制日志中记录的是DML的操作，也就是增、删、改数据的日志信息，称为`binary-log`，也就是我们要说的bin-log日志。

MySQL的bin-log日志，可以说是上述的日志中最重要的日志。其中记录的不仅仅是DML的操作，DDL的操作也会记录在其中。可以说除了查询操作(select、show)，都会记录在这样的日志中！

bin-log日志中，以事件的新式记录日志，记录你进行的SQL操作，同时还记录操作所消耗的时间等信息。学习bin-log日志最主要的目的是为了复制和恢复

● 复制: MySQL的主从架构下，Master将二进制日志传递给Slaves，以达到Master和Slaves之间的数据一致性。

● 恢复: 通过mysqlbinlog工具，恢复数据。

#### 15.2. 启用bin-log

##### 15.2.1. 查看bin-log是否开启

MySQL8的bin-log日志是默认开启的，因此我们更多关注如何关闭即可。

```sql
mysql> show variables like 'log_bin%';

# +---------------------------------+-----------------------------+
# | Variable_name                   | Value                       |
# +---------------------------------+-----------------------------+
# | log_bin                         | ON                          |
# | log_bin_basename                | /var/lib/mysql/binlog       |
# | log_bin_index                   | /var/lib/mysql/binlog.index |
# | log_bin_trust_function_creators | OFF                         |
# | log_bin_use_v1_row_events       | OFF                         |
# +---------------------------------+-----------------------------+
#
# 其中 log_bin 的值为ON，表示bin-log已经开启。
```

##### 15.2.2. 通过配置文件禁用bin-log

● 通过修改MySQL的配置文件可以关闭`bin-log`日志:

```
配置文件的路径:

- Windows: C:\Program Data\MySQL\MySQL Server8.0\my.ini
- Mac通过dmg直接安装: /etc/my.cnf
- Mac通过HomeBrew安装: $HOMEBREW_HOME/etc/my.cnf
- CentOS: /etc/my.cnf
```

● 在 `[mysqld]` 标签下添加`skip-log-bin`

● 重启MySQL服务

##### 15.2.3. 通过命令禁用bin-log

```sql
-- 禁用bin-log
mysql> SET SQL_LOG_BIN=0;
-- 启用bin-log
mysql> SET SQL_LOG_BIN=1;

-- 设置完成后需要重启MySQL服务生效
```

#### 15.3. 常用命令

```sql
-- 查看是否启用bin-log日志
show variables like 'log_bin';

-- 查看bin-log日志的目录
show variables like '%log_bin%';

-- 查看使用的bin-log文件大小
show binary logs;

-- 查看正在使用的bin-log文件名和Position
show master status;

-- 查看bin-log文件内容，默认查看第一个bin-log文件
show binlog events;

-- 查看指定的bin-log文件内容
show binlog events in 'binlog.000003';

-- 查看指定的bin-log文件内容，从指定位置开始查看
show binlog events in 'binlog.000003' from 865;

-- 查看指定的bin-log文件内容，从指定位置开始查看，查看指定偏移量
show binlog events in 'binlog.000003' from 125 limit 3;

-- 设置bin-log文件保存时间，单位是天
-- set global expire_log_days=3; MySQL8以下
-- 方式一：
set global binlog_expire_logs_seconds=2592000;
-- 方式二：在配置文件中修改 my.cnf / my.ini

-- 删除当前的bin-log文件
reset master;
```

#### 15.4. bin-log生成的时机

##### 15.4.1. 写bin-log的时机

● 事务执行过程中，会将日志写入到`binlog-cache`。系统为每一个线程分配了一个`binlog-cache`，大小由`binlog_cache_size`来控制。如果写入的数据量超出了这个大小，会暂存到磁盘，生成临时的文件。

● 事务提交后，会将`binlog-cache`内的日志写入到binlog。如果有临时文件的生成，也会将临时文件中的数据写入到binlog。写入完成后，清除`binlog-cache`的内容并删除临时文件。

● binlog的内容持久化到磁盘，这个过程会占用磁盘的IO。

由上述过程可以看出，持久化到磁盘的bin-log文件中的是最后一步。而在这里，需要了解一个参数: `sync_binlog`。这个参数表示提交多少个事务之后，将binlog的内容持久化到磁盘文件中。

● `sync_binlog=0`每次提交事务都只会提交到binlog中，不会持久化到磁盘文件中。

● `sync_binlog=1`每次提交事务都会把日志持久化到磁盘文件中。

● `sync_binlog=N`例如设置为100，意义为提交100个事务，将日志持久化到磁盘文件中。

sync_binlog的值设置

```
通常情况下，我们会在1和N之间进行选择:

1:
	优点: 安全，不会丢失事务。
	缺点: 磁盘IO消耗高。
	
N:
	优点: 效率高，不会占用太多的磁盘IO。
	缺点: 不安全，如果服务器异常重启，会丢失最近N个事务的binlog日志。
```

##### 15.4.2. 生成新的bin-log文件

● MySQL服务停止或重启

● 当前正在使用的binlog文件大小超过上限`(max_binlog_size)`

● 使用`flush logs`命令刷新

#### 15.5. bin-log文件解析

##### 15.5.1. bin-log日志格式

bin-log日志格式有三种类型:

● `STATEMENT`

● `ROW`

● `MIXED`

在`MySQL5.7.7`之前，默认的格式是`STATEMENT`，`5.7.7`之后，默认的格式是`ROW`，可以通过`binlog_format`参数来设置日志的格式:

```
binlog_format=STATEMENT
binlog_format=ROW
binlog_format=MIXED
```

##### 15.5.2. 三种日志格式的区别

● STATEMENT

```
每一条会修改数据的SQL操作(DDL、DML)都会记录在bin-log中。

- 优点:
    不需要记录每一行的变化，减少bin-log日志量，减少磁盘消耗，提高性能。

- 缺点:
    主从模式下，有些语句不支持；容易出现主从不一致。
```

● ROW

```
5.1.5版本开始，MySQL支持了ROW格式，也是现在的默认的日志格式。这种格式下，不记录SQL语句，仅保存哪条记录被修改了。

- 优点:
    1. 会记录每一条记录被修改的细节。
    2. 在主从模式下，不会出现存储过程、function、触发器无法被正确复制的问题。
   
- 缺点:
    会产生大量的日志内容。
```

● MIXED

```
从5.1.8版本开始，MySQL支持Mixed格式。这种其实其实是STATEMENT和ROW格式的结合。
- 一般的语句修改使用STATEMENT格式保存bin-log。
- 对应STATEMENT无法完成的主从复制操作，例如存储过程、函数等，采用ROW格式保存bin-log。
```

##### 15.5.3. bin-log文件描述

bin-log日志文件包含两类:

● `binlog.index`索引文件，是一个普通的文本文件，可以直接查看里面的内容。其中记录的是当前的bin-log文件列表。

● `binlog.0000*`这种文件是二进制文件，其中记录着操作的日志。

###### 15.5.3.1. bin-log日志文件查看

```sql
# 查看bin-log二进制文件中的所有内容
mysqlbinlog -v --base64-output=decode-rows binlog.000001

# 查看bin-log二进制文件中指定范围的内容
mysqlbinlog -v --base64-output=decode-rows binlog.000001 \
--start-position="100" \
--stop-position="1000" \
--start-datetime="2021-01-01 10:00:05" \
--stop-datetime="2021-01-10 12:00:00"
```

###### 15.5.3.2. bin-log日志文件组成

bin-log日志文件中记录的都是一些事件Event，其中第一个Event表示当前日志文件的起点和格式，最后一个Event表示下一个日志的起点和格式。中间的都是当前日志文件中记录的事件信息。

###### 15.5.3.3. bin-log日志文件事件

```sql
# at 235
# 220126 23:18:44 server id 1  end_log_pos 475 CRC32 0x5372bdc8  Query   thread_id=8     exec_time=0     error_code=0    Xid = 9
SET TIMESTAMP=1643210324.145384/*!*/;
SET @@session.pseudo_thread_id=8/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.time_zone='SYSTEM'/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'caching_sha2_password' AS '$A$005$h^X^Sc^A^VI    ^D/!^]%N-^K^K^CYn7vZ6L6SMh9v5bwFvMZSqDcl6sEH.8quuhEr4C.ASsx9'
/*!*/;
```

这是我截取到的一部分的event，其中包含以下内容:<br>
● `position`:第一行的`at 235`，表示这条事件记录是从文件的第235个字节开始<br>
● `timestamp`:第二行的，`#220126 23:18:44`，表示这个事件发生的时间<br>
● `server id`:事件发生的服务器标识<br>
● `end_log_pos`:当前事件的结束位置`+1`，即下一个事件的起始位置<br>
● `thread_id`:执行这个事件的线程id<br>
● `exec_time`:执行这个事件花费的时间<br>
● `error_code`:事件的错误码，0表示没有错误

###### 15.5.3.4. bin-log中的事件查看

我们可以通过查看bin-log文件，查看文件中保存的事件，也可以通过命令，更加直观的查看

```sql
mysql> show binlog events in 'binlog.000015';
+---------------+------+----------------+-----------+-------------+---------------------------------------------------------------------------------------------------+
| Log_name      | Pos  | Event_type     | Server_id | End_log_pos | Info                                                                                              |
+---------------+------+----------------+-----------+-------------+---------------------------------------------------------------------------------------------------+
| binlog.000015 |    4 | Format_desc    |         1 |         125 | Server ver: 8.0.27, Binlog ver: 4                                                                 |
| binlog.000015 |  125 | Previous_gtids |         1 |         156 |                                                                                                   |
| binlog.000015 |  156 | Anonymous_Gtid |         1 |         233 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 |  233 | Query          |         1 |         394 | use `mydb2`; create table user(`uid` int primary key, `name` varchar(20), `age` int) /* xid=41 */ |
| binlog.000015 |  394 | Anonymous_Gtid |         1 |         473 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 |  473 | Query          |         1 |         549 | BEGIN                                                                                             |
| binlog.000015 |  549 | Table_map      |         1 |         609 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 |  609 | Write_rows     |         1 |         662 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 |  662 | Xid            |         1 |         693 | COMMIT /* xid=42 */                                                                               |
| binlog.000015 |  693 | Anonymous_Gtid |         1 |         772 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 |  772 | Query          |         1 |         848 | BEGIN                                                                                             |
| binlog.000015 |  848 | Table_map      |         1 |         908 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 |  908 | Write_rows     |         1 |         957 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 |  957 | Xid            |         1 |         988 | COMMIT /* xid=43 */                                                                               |
| binlog.000015 |  988 | Anonymous_Gtid |         1 |        1067 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 | 1067 | Query          |         1 |        1143 | BEGIN                                                                                             |
| binlog.000015 | 1143 | Table_map      |         1 |        1203 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 | 1203 | Write_rows     |         1 |        1254 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 | 1254 | Xid            |         1 |        1285 | COMMIT /* xid=44 */                                                                               |
| binlog.000015 | 1285 | Anonymous_Gtid |         1 |        1364 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 | 1364 | Query          |         1 |        1440 | BEGIN                                                                                             |
| binlog.000015 | 1440 | Table_map      |         1 |        1500 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 | 1500 | Write_rows     |         1 |        1552 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 | 1552 | Xid            |         1 |        1583 | COMMIT /* xid=45 */                                                                               |
| binlog.000015 | 1583 | Anonymous_Gtid |         1 |        1662 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 | 1662 | Query          |         1 |        1738 | BEGIN                                                                                             |
| binlog.000015 | 1738 | Table_map      |         1 |        1798 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 | 1798 | Write_rows     |         1 |        1849 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 | 1849 | Xid            |         1 |        1880 | COMMIT /* xid=46 */                                                                               |
| binlog.000015 | 1880 | Anonymous_Gtid |         1 |        1959 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 | 1959 | Query          |         1 |        2044 | BEGIN                                                                                             |
| binlog.000015 | 2044 | Table_map      |         1 |        2104 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 | 2104 | Update_rows    |         1 |        2172 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 | 2172 | Xid            |         1 |        2203 | COMMIT /* xid=47 */                                                                               |
| binlog.000015 | 2203 | Anonymous_Gtid |         1 |        2282 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                              |
| binlog.000015 | 2282 | Query          |         1 |        2358 | BEGIN                                                                                             |
| binlog.000015 | 2358 | Table_map      |         1 |        2418 | table_id: 100 (mydb2.user)                                                                        |
| binlog.000015 | 2418 | Delete_rows    |         1 |        2470 | table_id: 100 flags: STMT_END_F                                                                   |
| binlog.000015 | 2470 | Xid            |         1 |        2501 | COMMIT /* xid=48 */                                                                               |
| binlog.000015 | 2501 | Rotate         |         1 |        2545 | binlog.000016;pos=4                                                                               |
+---------------+------+----------------+-----------+-------------+---------------------------------------------------------------------------------------------------+
40 rows in set (0.00 sec)
```

#### 15.6. bin-log恢复数据

##### 15.6.1. 准备工作

```sql
-- 刷新bin-log，生成一个新的bin-log文件，方便我们进行恢复
mysql> flush logs;

-- 创建一张新的表
mysql> create table `t_user`(`uid` int primary key, `uname` varchar(20), `age` int);
-- 插入数据若干
mysql> insert into `t_user` values (1, 'zhangsan', 18);
mysql> insert into `t_user` values (2, 'lisi', 20);
mysql> insert into `t_user` values (3, 'wangwu', 19);
mysql> insert into `t_user` values (4, 'zhaoliu', 21);
mysql> insert into `t_user` values (5, 'tianqi', 18);
-- 修改数据
mysql> update `t_user` set `age` = 20 where `uid` = 5;
-- 删除数据
mysql> delete from `t_user` where `uid` = 4;

-- 刷新bin-log，记录刚才的操作
mysql> flush logs;
```

##### 15.6.2. 恢复数据


我们已经进行了一些DDL、DML的操作，假如我不小心把表删除了

```sql
mysql> drop table `t_user`;
```

此时可以查看bin-log中的events

```sql
mysql> show binlog events in 'binlog.000017';
+---------------+------+----------------+-----------+-------------+---------------------------------------------------------------------------------------------------------+
| Log_name      | Pos  | Event_type     | Server_id | End_log_pos | Info                                                                                                    |
+---------------+------+----------------+-----------+-------------+---------------------------------------------------------------------------------------------------------+
| binlog.000017 |    4 | Format_desc    |         1 |         125 | Server ver: 8.0.27, Binlog ver: 4                                                                       |
| binlog.000017 |  125 | Previous_gtids |         1 |         156 |                                                                                                         |
| binlog.000017 |  156 | Anonymous_Gtid |         1 |         233 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 |  233 | Query          |         1 |         399 | use `mydb2`; create table `t_user`(`uid` int primary key, `uname` varchar(20), `age` int) /* xid=431 */ |
| binlog.000017 |  399 | Anonymous_Gtid |         1 |         478 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 |  478 | Query          |         1 |         554 | BEGIN                                                                                                   |
| binlog.000017 |  554 | Table_map      |         1 |         616 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 |  616 | Write_rows     |         1 |         669 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 |  669 | Xid            |         1 |         700 | COMMIT /* xid=432 */                                                                                    |
| binlog.000017 |  700 | Anonymous_Gtid |         1 |         779 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 |  779 | Query          |         1 |         855 | BEGIN                                                                                                   |
| binlog.000017 |  855 | Table_map      |         1 |         917 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 |  917 | Write_rows     |         1 |         966 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 |  966 | Xid            |         1 |         997 | COMMIT /* xid=433 */                                                                                    |
| binlog.000017 |  997 | Anonymous_Gtid |         1 |        1076 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 | 1076 | Query          |         1 |        1152 | BEGIN                                                                                                   |
| binlog.000017 | 1152 | Table_map      |         1 |        1214 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 | 1214 | Write_rows     |         1 |        1265 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 | 1265 | Xid            |         1 |        1296 | COMMIT /* xid=434 */                                                                                    |
| binlog.000017 | 1296 | Anonymous_Gtid |         1 |        1375 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 | 1375 | Query          |         1 |        1451 | BEGIN                                                                                                   |
| binlog.000017 | 1451 | Table_map      |         1 |        1513 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 | 1513 | Write_rows     |         1 |        1565 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 | 1565 | Xid            |         1 |        1596 | COMMIT /* xid=435 */                                                                                    |
| binlog.000017 | 1596 | Anonymous_Gtid |         1 |        1675 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 | 1675 | Query          |         1 |        1751 | BEGIN                                                                                                   |
| binlog.000017 | 1751 | Table_map      |         1 |        1813 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 | 1813 | Write_rows     |         1 |        1864 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 | 1864 | Xid            |         1 |        1895 | COMMIT /* xid=436 */                                                                                    |
| binlog.000017 | 1895 | Anonymous_Gtid |         1 |        1974 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 | 1974 | Query          |         1 |        2059 | BEGIN                                                                                                   |
| binlog.000017 | 2059 | Table_map      |         1 |        2121 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 | 2121 | Update_rows    |         1 |        2189 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 | 2189 | Xid            |         1 |        2220 | COMMIT /* xid=437 */                                                                                    |
| binlog.000017 | 2220 | Anonymous_Gtid |         1 |        2299 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                    |
| binlog.000017 | 2299 | Query          |         1 |        2375 | BEGIN                                                                                                   |
| binlog.000017 | 2375 | Table_map      |         1 |        2437 | table_id: 103 (mydb2.t_user)                                                                            |
| binlog.000017 | 2437 | Delete_rows    |         1 |        2489 | table_id: 103 flags: STMT_END_F                                                                         |
| binlog.000017 | 2489 | Xid            |         1 |        2520 | COMMIT /* xid=438 */                                                                                    |
| binlog.000017 | 2520 | Rotate         |         1 |        2564 | binlog.000018;pos=4                                                                                     |
+---------------+------+----------------+-----------+-------------+---------------------------------------------------------------------------------------------------------+
40 rows in set (0.00 sec)
```

可以看到每一个Event的Pos信息，那么我们就可以通过Pos信息恢复数据

```sql
# --start-position: 指定起始的事件位置，如果不指定，默认从头开始
# --stop-position: 指定结束的事件位置，如果不指定，默认到结尾
# --start-datetime: 指定起始的事件时间，如果不指定，默认从头开始
# --stop-datetime: 指定结束的事件时间，如果不指定，默认到结尾

mysqlbinlog --stop-position=2489 --database=mydb2 binlog.000017 | mysql -uroot -p123456
```

可以看到数据都恢复啦！

### 16. MySQL的系统架构（主从架构）

#### 16.1. MySQL集群架构的介绍

我们在前面使用到MySQL数据库的时候，只是一个单机的数据库服务。在实际的生产环境中，数据量可能会非常庞大，这样单机服务的MySQL在使用的时候，性能会受到影响影响。并且单机服务的MySQL的数据安全性也会受到影响。因此在生产环境中，我们通常搭建MySQL的集群架构，来提高庞大数据量的基础上的高性能读写的需求。

在常见的集群架构中，最常见的就是主从架构`(Master-Slaves)`

##### 16.1.1. 主从架构介绍

MySQL的主从架构，又有一些其他的名称：主从模式、主从复制等。所谓的主从架构指的是建立多个完全一样的数据库，其中一个数据库作为主库（主要是用的数据库），其他的作为从库（次要的数据库）。主从架构分为很多种：一主一从、双主架构、一主多从、多主多从等模式。通常主库可读可写，从库只读。

MySQL最常见也是最简单的主从架构的实现就是主从复制(MySQL Replication)模式，这也是MySQL自带的功能，无需借助第三方的工具，就可以实现一个主从架构的集群模式。

主从架构相比较于单机服务的MySQL来说，优势有很多，最常见的优势就是：写操作连接主库，读操作连接从库，实现读写分离。

##### 16.1.2. 主从复制的原理

主从复制是通过重演binlog来实现主库数据的异步复制。即在主库上打开binlog记录每一次的数据库操作，然后从库会有一个IO线程，负责跟主库建立TCP连接，请求主库将binlog传输到从库。此时主库上会有一个Log Dump线程，负责通过这个TCP连接吧binlog日志传输给从库的IO线程。接着从库的IO线程会把读取到的binlog日志数据写入自己的中继日志文件(Relay)中。然后从库上另外一个SQL线程会读取中继日志文件中的操作，进行操作重演，达到还原数据的目的。

1. 主库的数据发生了变更，将日志写入到主库的binlog中。

2. 主库的LogDump线程，将binlog文件传输到从库的IO线程。

3. 从库的IO线程将接收到的binlog写入到relay log中。

4. 从库的SQL线程读取relay log中的日志，并操作重演，将结果同步到从库中。

#### 16.2. MySQL主从复制的实现

##### 16.2.1. 环境说明

要实现MySQL的主从架构的搭建，需要满足以下条件：

● 所有节点的MySQL版本必须一致。

● 所有节点的时间必须同步。

● 所有节点需要启动binlog服务。

##### 16.2.2. 主库配置

我们需要编辑MySQL配置文件，这个配置文件在不同的操作系统中的位置和名字都不同，需要根据自己的操作系统来查找这个文件：

● `Windows: C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`

● `Linux: /etc/my.cnf`

● macOS:  <br>
  ○ dmg安装: `/etc/my.cnf` <br>
  ○ homebrew安装: <br>
    ■ `Intel CPU: /usr/local/homebrew/etc/my.cnf` <br>
    ■ `AppleSilicon CPU: /opt/homebrew/etc/my.cnf`

```sql
# 在[mysqld]的下方添加或修改如下属性:
# 服务节点的唯一标识，需要给集群中的每个服务分配一个单独的ID
server-id=101
# 打开binlog日志，并指定文件名
log_bin=master-bin
# binlog日志文件
log_bin-index=master-bin.index
```

修改完成之后，需要重启MySQL服务。
为root用户分配replication slave的权限：

```sql
# 登录到主库
mysql -uroot -p

# 为root用户分配权限
# MySQL8中，需要先添加 'root'@'%' 这个用户
# create user 'root'@'%' identified by '123456'
mysql> grant replication slave on *.* to 'root'@'%';
mysql> flush privileges;
# 查看主节点同步状态
mysql> show master status;
# +-------------------+----------+--------------+------------------+-------------------+
# | File              | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
# +-------------------+----------+--------------+------------------+-------------------+
# | master-bin.000001 |      543 |              |                  |                   |
# +-------------------+----------+--------------+------------------+-------------------+
# 1 row in set (0.00 sec)
```

在上述输出结果中:

File: 当前日志文件

Position: 日志文件中的索引

Binlog_Do_DB: 需要记录binlog日志的库，不设置表示全部的库

Binlog_Ignore_DB: 不需要记录binlog日志的库

##### 16.2.3. 从库配置

我们需要编辑MySQL配置文件，这个配置文件在不同的操作系统中的位置和名字都不同，需要根据自己的操作系统来查找这个文件：

● `Windows: C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`

● `Linux: /etc/my.cnf`

● macOS: <br>
  ○ dmg安装: `/etc/my.cnf` <br>
  ○ homebrew安装: <br>
    ■ `Intel CPU: /usr/local/homebrew/etc/my.cnf` <br>
    ■ `AppleSilicon CPU: /opt/homebrew/etc/my.cnf`

```sql
# 在[mysqld]的下方添加或修改如下属性:
# 服务节点的唯一标识，需要给集群中的每个服务分配一个单独的ID
# 一定要注意，不能和其他节点重复
server-id=102
# 打开binlog日志，并指定文件名
log_bin=slave-bin
# 打开relaylog日志
relay_log=slave-relay-bin
relay_log-index=slave-relay-bin.index
skip-slave-start
```

修改完成之后，需要重启MySQL服务。

然后登录到其他从库，设置从主库同步状态:

```sql
# 登录从库
mysql -uroot -p
# 设置同步主节点
change master to
master_host='192.168.10.101',		# 设置主库的地址
master_port=3306,					 # 设置主库使用的端口号
master_user='root',					 # 设置主库的用户名
master_password='123456',			 # 设置主库的密码
master_log_file='master-bin.000001', # 设置主库正在使用的binlog文件，可以在主库使用 show master status 查询
master_log_pos=543;					  # 设置从什么位置同步
# 开启slave
start slave;
# 查看主从同步状态
show slave status;
# 也可以使用 show slave status \G
```

```sql
*************************** 1. row ***************************
               Slave_IO_State: Waiting for source to send event
                  Master_Host: 192.168.10.101
                  Master_User: root
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: master-bin.000001
          Read_Master_Log_Pos: 916
               Relay_Log_File: slave-relay-bin.000002
                Relay_Log_Pos: 1133
        Relay_Master_Log_File: master-bin.000001
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
```

正常的结果是如上所示的结果，但是总有意外的时候:

有些同学可能会出现 `Slave_IO_Running: Connecting` 的状态，甚至是NO的状态，说明从库的IO线程启动失败。原因如下:

1. 可能是主库设置错误，检查 master_host 和 master_port 的设置是否正确

2. 可能是主库的用户名和密码错误，检查 master_user 和 master_password 是否正确

3. 可能是主库防火墙未关闭，检查防火墙

4. 可能是主库不能远程登录，检查主库用户的远程登录权限

5. 可能是 master_log_file 文件设置出问题

6. 可能是虚拟机克隆，导致的两个节点的uuid相同检查 `/var/lib/mysql/auto.cnf` 中记录的uuid，如果相同的话，随便修改一个，重启服务即可

上述几种错误情况在修改之后，都是需要重新启动slave服务的。先使用 stop slave 停止服务；再使用 start slave 开启

有些同学可能会出现 `Slave_SQL_Running: No` 的状态，说明从库的SQL线程启动失败，一般是因为执行主库同步过来的数据的时候失败了，例如需要创建的数据库、表已经存在导致。

解决方案：

1. 删除从库中同名的库、表，从主库的日志中恢复数据。

2. 如果想要保留从库中的库、表，先停止slave服务，设置 `set global sql_slave_skip_counter = 1;` 来设置需要跳过的错误的个数。1是可以修改的，想要跳过几个错误，就设置为多少。然后启动slave服务即可。

##### 16.2.4. 主从复制测试

我们在主库中创建数据库、创建表，可以在从库中看到有数据同步过来了。而且在从库中使用 `show slave status \G` 来查看从库的状态的时候，会发现记录的Pos位置已经更新。

#### 16.3. MySQL主主复制的实现

##### 16.3.1. 主主复制介绍

MySQL的主从复制架构下，可以实现读写分离、业务分流，来降低单个数据库的压力。但是这种模式下会存在单点故障的问题，即如果主库节点宕机的情况下，对从库进行的操作并不会同步到主库中。这个数据库也就无效了。因此有的时候我们会搭建主主复制的架构，也叫做双主架构。

双主架构的实现，是在主从架构的基础之上的。将两台MySQL之间互为彼此的主库，同时又互为对方的从库。这样的实施方案下，既能做到分流，也能解决单点故障的问题。因为任何的一台节点故障，另外的一台都可以继续提供服务。

##### 16.3.2. 主库1配置

我们需要编辑MySQL配置文件，这个配置文件在不同的操作系统中的位置和名字都不同，需要根据自己的操作系统来查找这个文件：

```
Windows: C:\ProgramData\MySQL\MySQL Server 8.0\my.ini
Linux: /etc/my.cnf
macOS: 
  dmg安装: /etc/my.cnf
  homebrew安装: 
    Intel CPU: /usr/local/homebrew/etc/my.cnf
    AppleSilicon CPU: /opt/homebrew/etc/my.cnf
```

```sql
# 在[mysqld]的下方添加或修改如下属性:
# 服务节点的唯一标识，需要给集群中的每个服务分配一个单独的ID
server-id=101
# 打开binlog日志，并指定文件名
log_bin=master-101-bin
# binlog日志文件
log_bin-index=master-101-bin.index
# 打开relaylog日志
relay_log=master-101-relay-bin
relay_log-index=master-101-relay-bin.index
skip-slave-start
# 防止两个主库中同时操作自增的字段导致字段冲突
auto_increment_increment=2	# 自增步长，一般有几个MySQL就设置为几
auto_increment_offset=1		# 自增起始值
```

修改完成之后，需要重启MySQL服务。

为root用户分配replication slave的权限：

```sql
# 登录到主库
mysql -uroot -p

# 为root用户分配权限
# MySQL8中，需要先添加 'root'@'%' 这个用户
# create user 'root'@'%' identified by '123456'
mysql> grant replication slave on *.* to 'root'@'%';
mysql> flush privileges;
```

##### 16.3.3. 主库2配置

我们需要编辑MySQL配置文件，这个配置文件在不同的操作系统中的位置和名字都不同，需要根据自己的操作系统来查找这个文件：

```
● Windows: C:\ProgramData\MySQL\MySQL Server 8.0\my.ini
● Linux: /etc/my.cnf
● macOS: 
  ○ dmg安装: /etc/my.cnf
  ○ homebrew安装: 
    ■ Intel CPU: /usr/local/homebrew/etc/my.cnf
    ■ AppleSilicon CPU: /opt/homebrew/etc/my.cnf
```

```sql
# 在[mysqld]的下方添加或修改如下属性:
# 服务节点的唯一标识，需要给集群中的每个服务分配一个单独的ID
server-id=102
# 打开binlog日志，并指定文件名
log_bin=master-102-bin
# binlog日志文件
log_bin-index=master-102-bin.index
# 打开relaylog日志
relay_log=master-102-relay-bin
relay_log-index=master-102-relay-bin.index
skip-slave-start
# 防止两个主库中同时操作自增的字段导致字段冲突
auto_increment_increment=2	# 自增步长，一般有几个MySQL就设置为几
auto_increment_offset=2		# 自增起始值
```

修改完成之后，需要重启MySQL服务。

为root用户分配replication slave的权限：

```sql
# 登录到主库
mysql -uroot -p

# 为root用户分配权限
# MySQL8中，需要先添加 'root'@'%' 这个用户
# create user 'root'@'%' identified by '123456'
mysql> grant replication slave on *.* to 'root'@'%';
mysql> flush privileges;
```

##### 16.3.4. 设置同步

● 查看master1的binlog

```
+-----------------------+----------+--------------+------------------+-------------------+
| File                  | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+-----------------------+----------+--------------+------------------+-------------------+
| master-101-bin.000001 |      156 |              |                  |                   |
+-----------------------+----------+--------------+------------------+-------------------+
```

设置master2同步master1

```sql
# 登录从库
mysql -uroot -p
# 设置同步主节点
change master to
master_host='192.168.10.101',				
master_port=3306,							
master_user='root',					 		
master_password='123456',			 		
master_log_file='master-101-bin.000001', 	
master_log_pos=156;
```

查看master2的binlog

```
+-----------------------+----------+--------------+------------------+-------------------+
| File                  | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+-----------------------+----------+--------------+------------------+-------------------+
| master-102-bin.000001 |      553 |              |                  |                   |
+-----------------------+----------+--------------+------------------+-------------------+
```

设置master1同步master2

```sql
# 登录从库
mysql -uroot -p
# 设置同步主节点
change master to
master_host='192.168.10.102',				
master_port=3306,							
master_user='root',					 		
master_password='123456',			 		
master_log_file='master-102-bin.000001', 	
master_log_pos=553;
```

开启同步

```sql
# 分别启动两个数据库的slave
start slave

# 如果出现错误：Slave failed to initialize relay log info structure from the repository
# 说明之前存在主从模式下的relay log，使用reset slave命令清除即可
```

### 17. MySQL分库分表

#### 17.1. 什么是分库分表

MySQL数据库常见的优化方案中，有一种方案就是“分库分表”。那么什么叫“分库分表”呢？其实“分库分表”，从名字上就可以理解是什么意思：

● 分库：将一个数据库拆分成若干数据库，其中的表分布到不同的数据库中。

● 分表：将一个表拆分成若干的小表，其中的数据分布在多张表中。

一个大的数据库可以拆分成为小个数据库，一个大的表也可以拆分成为若干个小的表。拆分之后得到的小的数据库、小的表中的数据量肯定会变少，这样就可以在一定程度上提升查询时候的效率。

#### 17.2. 为什么要分库分表

在企业中，随着时间的积累和用户的积累，数据库中的数据量会变得越来越大。如果一张表中的数据量变得非常的庞大了，例如有数千万行数据，此时在这张表中查询数据的时候，将会变得非常的慢。而且，如果这个时候涉及到了多表的联合查询，将会更加耗时，甚至对于性能不高的机器来说，可能还会直接卡死。

因此，我们就需要对这些数据表“减负”，将一个数据库中的数据，分布到多个数据库中存储；将一张表中的数据，分布到多张表中存储。这样可以有效地减少单个表中的数据量，从而达到提高查询效率的目的。

在进行库表切分的时候，常见的有两种方式来实现：垂直切分 和 水平切分。

#### 17.3. 垂直切分

##### 17.3.1. 垂直分库

垂直分库就是将一个数据库中的表，拆分到多个切分之后的数据库中。在拆分的时候，需要以表为切分的依据，按照不同的业务场景，将数据表拆分到不同的数据库中。

如下图所示：

切分之前的数据库中，涵盖的数据太多、太复杂，一个电商系统中很多的业务场景下用到的数据表，都在一个数据库中。如果需要对这样的数据库进行垂直切分，需要首先提炼出不同的业务场景，例如用户信息的数据库、商品信息的数据库、订单信息的数据库。然后将原来数据库中的表，根据业务场景，拆分到不同的数据库中即可。

例如：订单表、订单详情表，这些都是与订单相关联的数据，就可以将它们拆分到订单数据库中。

##### 17.3.2. 垂直分表

垂直分表就是将一个数据表中的数据，拆分到多个切分之后的数据表中。在拆分的时候，需要以字段为切分的依据，将不同属性的字段拆分到不同的数据表中。

如下图所示：

原来的学生表中的字段非常的多，涵盖的学生的信息也非常的全面。但是这些字段其实是可以分为不同的属性的，在需要垂直分表的时候，就可以将这样的数据表，按照不同的字段属性，对表进行拆分。
例如：sid、sname、age、gender都是属于学生的基本信息的，可以将其拆分到学生基本信息表中。

#### 17.4. 水平切分

##### 17.4.1. 水平分库

水平分库就是将一个数据库中的表，拆分到多个切分之后的数据库中。在拆分的时候，需要以某字段的值为依据，按照一定的切分规则，将数据拆分到不同的数据库中。切分之后的数据库中每个表的结构都是一样的，但是数据是完全不同的。

##### 17.4.2. 水平分表

水平分表就是将一个数据表中的数据，拆分到多个切分之后的数据库中。在拆分的时候，需要以某字段的值为依据，按照一定的切分规则，将数据拆分到不同的数据表中。切分之后每一个表的结构是完全相同的，但是表中的数据是完全不同的。

##### 17.4.3. 常见的水平切分规则

● 范围切分：根据指定的字段，切分若干范围，将不同范围的数据切分到不同的表中。例如：学生表中，主键为sid，且单调递增。在范围切分的规则中，可以将 `[0, 100]` 的学生切分到一个表中，`[101, 200]`的学生切分到一个表中，以此类推。

● 哈希切分：根据指定的字段，根据哈希值，将不同范围的数据切分到不同的表中。例如：学生表中，主键为sid，且单调递增。在哈希切分的时候，可以提前制定好需要分的表的数量，用哈希值求模的方式，将数据拆分到不同的表中。

## 实战应用

```sql
-- 1：查询没有上级领导的员工的编号，姓名，工资
select `empno`, `ename`, `sal` from `emp` A where not exists (
	select 1 from `emp` B where A.`mgr` = B.`empno`
);
select distinct A.`empno`, A.`ename`, A.`sal` from `emp` A left join `emp` B on A.`mgr` = B.`empno` where B.`empno` is null;

-- 2：查询emp表中没有奖金的员工的姓名，职位，工资，以及奖金
select `ename`, `job`, `sal`, `comm` from `emp` where `comm` is null or `comm` = 0;

-- 3：查询emp表中含有奖金的员工的编号，姓名，职位，以及奖金
select `empno`, `ename`, `job`, `comm` from `emp` where `comm` is not null;

-- 4：查询含有上级领导的员工的姓名，工资以及上级领导的编号
select `empno`, `ename`, `sal`, `mgr` from `emp` A where exists (
	select 1 from `emp` B where A.`mgr` = B.`empno`
);
select distinct A.`empno`, A.`ename`, A.`sal`, A.`mgr` from `emp` A join `emp` B on A.`mgr` = B.`empno`;

-- 5：查询emp表中名字以‘S’开头的所有员工的姓名
select `ename` from `emp` where `ename` like 'S%';

-- 6：查询emp表中名字的最后一个字符是'S'的员工的姓名
select `ename` from `emp` where `ename` like '%S';

-- 7：查询倒数的第2个字符是‘E’的员工的姓名
select `ename` from `emp` where `ename` like '%E_';

-- 8：查询emp表中员工的倒数第3个字符是‘N’的员工姓名
select `ename` from `emp` where `ename` like '%N__';

-- 9：查询emp表中员工的名字中包含‘A’的员工的姓名
select `ename` from `emp` where `ename` like '%A%';

-- 10：查询emp表中名字不是以'K'开头的员工的所有信息
select `ename` from `emp` where `ename` not like 'K%';

-- 11：查询emp表中名字中不包含‘A’的所有员工的信息
select `ename` from `emp` where `ename` not like '%A%';

-- 12：做文员的员工人数（job= CLERK 的）
select count(*) from `emp` where `job` = 'CLERK';

-- 13：销售人员 job: SALESMAN 的最高薪水
select max(`sal`) from `emp` where `job` = 'SALESMAN';

-- 14：最早和最晚入职时间
select min(`hiredate`), max(`hiredate`) from `emp`;

-- 15：查询emp表中员工的编号，姓名，职位，工资，并且工资在1000~2000之间。
select `empno`, `ename`, `job`, `sal` from `emp` where `sal` between 1000 and 2000;

-- 16：查询emp表中员工在10号部门，并且含有上级领导的员工的姓名，职位，上级领导编号以及所属部门的编号
select distinct A.`ename`, A.`job`, A.`mgr`, B.`deptno` from `emp` A join `emp` B on A.`mgr` = B.`empno` where A.`deptno` = 10;

-- 17：查询emp表中名字中包含'E'，并且职位不是MANAGER的员工的编号，姓名，职位，以及工资
select `empno`, `ename`, `job`, `sal` from `emp` where `ename` like '%E%' and `job` <> 'MANAGER';

-- 18：查询emp表中10号部门或者20号部门中员工的编号，姓名，所属部门的编号
select `empno`, `ename`, `deptno` from `emp` where `deptno` in (10, 20);

-- 19：查询emp表中没有奖金或者名字的倒数第2个字母不是T的员工的编号，姓名，职位以及奖金
select `empno`, `ename`, `comm` from `emp` where `comm` is null or `ename` not like '%T_';

-- 20：查询工资高于3000或者部门编号是30的员工的姓名，职位，工资，入职时间以及所属部门的编号
select `ename`, `job`, `sal`, `hiredate`, `deptno` from `emp` where `sal` > 3000 or `deptno` = 30;

-- 21：查询不是30号部门的员工的所有信息
select * from `emp` where `depto` <> 30;

-- 22：查询奖金不为空的员工的所有信息
select * from `emp` where `comm` is not null;

-- 23：查询emp表中所有员工的编号，姓名，职位，根据员工的编号进行降序排列
select `empno`, `ename`, `job` from `emp` order by `empno` desc;

-- 24：查询emp表中部门编号是10号或者30号中，所有员工姓名，职务，工资，根据工资进行升序排列
select `ename`, `job`, `sal` from `emp` where `deptno` in (10, 30) order by `sal`;

-- 25：查询emp表中所有的数据，然后根据部门的编号进行升序排列，如果部门编号一致，根据员工的编号进行降序排列
select * from `emp` order by `deptno`, `empno` desc;

-- 26：查询emp表中工资高于1000或者没有上级领导的员工的编号，姓名，工资，所属部门的编号，以及上级领导的编号，根据部门编号进行降序排列，如果部门编号一致根据工资进行升序排列。
select empno, ename, sal, deptno, mgr from emp where sal > 1000 or mgr is null order by deptno desc, sal;

-- 27：查询emp表中名字中不包含S的员工的编号，姓名，工资，奖金，根据工资进行升序排列，如果工资一致，根据编号进行降序排列
select empno, ename, sal, comm from emp where ename not regexp 'S' order by sal, empno desc;

-- 28：统计emp表中员工的总数量
select count(*) from emp;

-- 29：统计emp表中获得奖金的员工的数量
select count(*) from emp where comm > 0;

-- 30：求出emp表中所有的工资累加之和
select sum(sal) from emp;

-- 31：求出emp表中所有的奖金累加之和
select sum(comm) from emp;

-- 32：求出emp表中员工的平均工资
select avg(sal) from emp;

-- 33：求出emp表中员工的平均奖金
select avg(comm) from emp;
select avg(ifnull(comm, 0)) from emp;
select sum(comm) / count(*) from emp;

-- 34：求出emp表中员工的最高工资
select max(sal) from emp;

-- 35：求出emp表中员工编号的最大值
select max(empno) from emp;

-- 36：查询emp表中员工的最低工资。
select min(sal) from emp;

-- 37：查询emp表中员工的人数，工资的总和，平均工资，奖金的最大值，奖金的最小值,并且对返回的列起别名。
select count(*) c, sum(sal) ss, avg(sal) avg_sal, max(comm) max_comm, min(comm) min_comm from emp;

-- 38：查询工资在1000~3000之间每一个员工的编号，姓名，职位，工资
select empno, ename, job, sal from emp where sal between 1000 and 3000;

-- 39：查询emp表中奖金在500~2000之间所有员工的编号，姓名，工资以及奖金
select empno, ename, sal, comm from emp where comm between 500 and 2000;

-- 40：查询员工的编号是7369，7521
select * from emp where empno in (7369, 7521);

-- 41：查询emp表中，职位是ANALYST
select * from emp where job = 'ANALYST';

-- 42：查询emp表中职位不是ANALYST
select * from emp where job <> 'ANALYST'

-- 43：查询每个部门的最高工资
select deptno, max(sal) from emp group by deptno;

-- 44：查询每个职位的平均工资
select job, avg(sal) from emp group by job;

-- 45：查询每个部门的人数
select deptno, count(*) from emp group by deptno;

-- 46：查询工资大于1000的员工 每个部门的最大工资
select deptno, max(sal) from emp where sal > 1000 group by deptno;

-- 47：查询每个领导(主管)的手下人数
select mgr, count(*) from emp where mgr is not null group by mgr;
select e1.mgr, count(*) from emp e1 join emp e2 on e1.mgr = e2.empno group by e1.mgr;

-- 48：查询每个部门下每个主管的手下人数
select e1.mgr, e1.deptno, count(*) from emp e1 join emp e2 on e1.mgr = e2.empno group by e1.mgr, e1.deptno;

-- 49：查询emp表中每个部门的编号，人数，工资总和，最后根据人数进行升序排列，如果人数一致，根据工资总和降序排列。
select deptno, count(*) c, sum(sal) s from emp group by deptno order by c, s desc;

-- 50：查询工资在1000~3000之间的员工信息，每个部门的编号，平均工资，最低工资，最高工资，根据平均工资进行升序排列。
select deptno, avg(sal) avg_sal, min(sal), max(sal) from emp where sal between 1000 and 3000 group by deptno order by avg_sal;

-- 51：查询含有上级领导的员工，每个职业的人数，工资的总和，平均工资，最低工资，最后根据人数进行降序排列，如果人数一致，根据平均工资进行升序排列 
select job, count(*) c, sum(sal), avg(sal) a, min(sal) from emp e1 where exists (
	select 1 from emp e2 where e1.mgr = e2.empno
) group by job order by c, a;

-- 52：查询每个部门的平均工资 要求平均工资大于2000
select deptno, avg(sal) a from emp group by deptno having a > 2000;

-- 53：查询emp表中每个部门的平均工资高于2000的部门编号，部门人数，平均工资，最后根据平均工资降序排序
select deptno, count(*), avg(sal) a from emp group by deptno having a > 2000 order by a desc;

-- 54：查询emp表中工资在1000-3000之间的员工，每个部门的编号，工资总和，平均工资，过滤掉平均工资低于2000的部门，按照平均工资进行升序排序。
select deptno, sum(sal), avg(sal) a from emp where sal between 1000 and 3000 group by deptno having a >= 2000 order by a;

-- 55：查询emp表中不是以s开头，每个职位的名字，人数，工资总和，最高工资，过滤掉平均工资是3000的职位，根据人数升序排序如果一直根据工资总和降序排序
select job, count(*) c, sum(sal) s, max(sal) from emp where job not like 'S%' group by job having avg(sal) <> 3000 order by c, s desc;

-- 56：查询emp表中每年入职的人数(提高题)
select year(hiredate), count(*) from emp where hiredate is not null group by year(hiredate);

-- 57：查询每个部门的最高平均工资(提高题)
select deptno, avg(sal) from emp group by deptno;

-- 58：查询平均工资最高的部门编号
select deptno from (
	select deptno, avg_sal, rank() over(order by avg_sal desc) rk from (
		select deptno, avg(sal) avg_sal from emp group by deptno
	) t
) t2 where t2.rk = 1

-- 59：查询emp表中工资最高的员工信息
select * from emp where sal = ( select max(sal) from emp );
select * from (
	select *, rank() over(order by sal desc) rk from emp
) t where rk = 1

-- 60：查询emp表中工资大于平均工资的所有员工的信息
select * from emp where sal > (select avg(sal) from emp);
select emp.* from emp join (select avg(sal) avg_sal from emp) t on emp.sal > t.avg_sal;

-- 61：查询工资高于20号部门最大工资的员工信息
select * from emp where sal > (select max(sal) from emp where deptno = 20);
select emp.* from emp join (select max(sal) max_sal from emp where deptno=20) t on emp.sal > t.max_sal;

-- 62：查询和Jones相同工作的其他员工信息
select * from emp where job = (select job from emp where ename = 'JONES') and ename <> 'JONES';
select e1.* from emp e1 join emp e2 on e2.ename = 'JONES' and e1.job = e2.job where e1.ename <> 'JONES';

-- 63：查询工资最低的员工的同事们的信息 (同事=相同job)
select * from emp where job in (
	select job from emp where sal = (
		select min(sal) from emp
	)
);

-- 64：查询最后入职的员工信息
select * from emp where hiredate = (select max(hiredate) from emp);

-- 65：查询名字为king的部门编号和部门名称
select emp.deptno, dname from emp join dept on emp.deptno = dept.deptno where ename = 'KING';

-- 66：查询有员工的部门信息(编号和部门名称)
select deptno, dname from dept where exists (
	select 1 from emp where emp.deptno = dept.deptno
);
select distinct dept.deptno, dname from dept join emp on dept.deptno = emp.deptno;

-- 67：查询平均工资最高的部门信息(最大难度)
select dept.* from (
	select deptno, avg_sal, rank() over(order by avg_sal desc) rk from (
		select deptno, avg(sal) avg_sal from emp group by deptno
	) t
) t2 join dept on dept.deptno = t2.deptno where rk = 1;

-- 68：每个部门的人数,根据人数排序
select deptno, count(*) c from emp group by deptno order by c;

-- 69：每个部门中，每个主管的手下人数
select e1.mgr, e1.deptno, count(*) from emp e1 join emp e2 on e1.mgr = e2.empno group by e1.mgr, e1.deptno;

-- 70：每种工作的平均工资
select job, avg(sal) from emp group by job;

-- 71：每年的入职人数
select distinct year(hiredate), count(*) over(partition by year(hiredate)) from emp;

-- 72：少于等于3个人的部门信息
select dept.* from dept join emp on dept.deptno = emp.deptno group by dept.deptno having count(*) <= 3;

-- 73：拿最低工资的员工信息
select * from emp e1 where sal = (select min(sal) from emp);

-- 74：只有一个下属的主管信息
select e2.* from emp e1 join emp e2 on e1.mgr = e2.empno group by e1.mgr having count(*) = 1;

-- 75：平均工资最高的部门编号
select deptno from (
	select deptno, avg_sal, rank() over(order by avg_sal desc) rk from (
		select deptno, avg(sal) avg_sal from emp group by deptno
	) t
) t2 where t2.rk = 1

-- 76：最后入职的员工信息
select * from (
	select *, rank() over(order by hiredate desc) rk from emp
) t where rk = 1;

-- 77：工资多于平均工资的员工信息
select * from emp where sal > (select avg(sal) from emp);

-- 78：查询员工信息，部门名称 
select emp.*, dept.dname from emp join dept on dept.deptno = emp.deptno;

-- 79：员工信息，部门名称，所在城市
select emp.*, dept.dname, dept.loc from emp join dept on dept.deptno = emp.deptno;

-- 80：DALLAS 市所有的员工信息
select emp.* from emp join dept on emp.deptno = dept.deptno where loc = 'DALLAS';

-- 81：按城市分组，计算每个城市的员工数量
select loc, count(*) from emp join dept on dept.deptno = emp.deptno group by loc;

-- 82：查询员工信息和他的主管姓名
select e1.*, e2.ename from emp e1 join emp e2 on e1.mgr = e2.empno;

-- 83：员工信息，员工主管名字，部门名
select e1.*, e2.ename, dname from emp e1 join emp e2 on e1.mgr = e2.empno join dept on dept.deptno = e2.deptno;

-- 84：员工和他所在部门名
select emp.*, dept.dname from emp join dept on emp.deptno = dept.deptno;

-- 85：查询emp表中所有员工的姓名以及该员工上级领导的编号，姓名，职位，工资
select e1.ename, e2.empno, e2.ename, e2.job, e2.sal from emp e1 join emp e2 on e1.mgr = e2.empno;

-- 86：查询emp表中名字中没有字母'K'的所有员工的编号，姓名，职位以及所在部门的编号，名称，地址
select empno, ename, job, dept.deptno, dname, loc from emp join dept on emp.deptno = dept.deptno where ename not like '%K%';

-- 87：查询dept表中所有的部门的所有的信息，以及与之关联的emp表中员工的编号，姓名，职位，工资
select dept.*, empno, ename, job, sal from dept join emp on dept.deptno = emp.deptno;

-- 88：查询每个城市员工的工资总和
select loc, sum(sal) from dept join emp on dept.deptno = emp.deptno group by loc;
```

## 总结

### 重点

● 基础的DDL、DML、DQL语句

● 连接查询

● 子查询

● 常用函数、自定义函数、窗口函数

● 存储过程

### 难点

● 多表连接查询

● exists

● 窗口函数


### 作业

数据准备

```sql
-- 建表
-- 学生表
CREATE TABLE `Student`(
    `s_id` VARCHAR(20),
    `s_name` VARCHAR(20) NOT NULL DEFAULT '',
    `s_birth` VARCHAR(20) NOT NULL DEFAULT '',
    `s_sex` VARCHAR(10) NOT NULL DEFAULT '',
    PRIMARY KEY(`s_id`)
);
-- 课程表
CREATE TABLE `Course`(
    `c_id`  VARCHAR(20),
    `c_name` VARCHAR(20) NOT NULL DEFAULT '',
    `t_id` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`c_id`)
);
-- 教师表
CREATE TABLE `Teacher`(
    `t_id` VARCHAR(20),
    `t_name` VARCHAR(20) NOT NULL DEFAULT '',
    PRIMARY KEY(`t_id`)
);
-- 成绩表
CREATE TABLE `Score`(
    `s_id` VARCHAR(20),
    `c_id`  VARCHAR(20),
    `s_score` INT(3),
    PRIMARY KEY(`s_id`,`c_id`)
);
-- 插入学生表测试数据
insert into Student values('01' , '赵雷' , '1990-01-01' , '男');
insert into Student values('02' , '钱电' , '1990-12-21' , '男');
insert into Student values('03' , '孙风' , '1990-05-20' , '男');
insert into Student values('04' , '李云' , '1990-08-06' , '男');
insert into Student values('05' , '周梅' , '1991-12-01' , '女');
insert into Student values('06' , '吴兰' , '1992-03-01' , '女');
insert into Student values('07' , '郑竹' , '1989-07-01' , '女');
insert into Student values('08' , '王菊' , '1990-01-20' , '女');

-- 课程表测试数据
insert into Course values('01' , '语文' , '02');
insert into Course values('02' , '数学' , '01');
insert into Course values('03' , '英语' , '03');

-- 教师表测试数据
insert into Teacher values('01' , '张三');
insert into Teacher values('02' , '李四');
insert into Teacher values('03' , '王五');

-- 成绩表测试数据
insert into Score values('01' , '01' , 80);
insert into Score values('01' , '02' , 90);
insert into Score values('01' , '03' , 99);
insert into Score values('02' , '01' , 70);
insert into Score values('02' , '02' , 60);
insert into Score values('02' , '03' , 80);
insert into Score values('03' , '01' , 80);
insert into Score values('03' , '02' , 80);
insert into Score values('03' , '03' , 80);
insert into Score values('04' , '01' , 50);
insert into Score values('04' , '02' , 30);
insert into Score values('04' , '03' , 20);
insert into Score values('05' , '01' , 76);
insert into Score values('05' , '02' , 87);
insert into Score values('06' , '01' , 31);
insert into Score values('06' , '03' , 34);
insert into Score values('07' , '02' , 89);
insert into Score values('07' , '03' , 98);
```

题目

```sql
-- 1、查询"01"课程比"02"课程成绩高的学生的信息及课程分数:

select a.s_id 
from 
(
select *
from score
where c_id = '01'
) a
left join 
(
select *
from score
where c_id = '02'
) b
 on b.s_id =a.s_id 
 where a.s_score > b.s_score or b.s_score is null
;

select stu.*,c.*
from student stu
join score a on a.c_id = '01' and a.s_id= stu.s_id
left join score b on b.c_id = '02' and b.s_id= stu.s_id
join score c on c.s_id= stu.s_id
where a.s_score > b.s_score or b.s_score is null
;

-- 2、查询"01"课程比"02"课程成绩低的学生的信息及课程分数:
select stu.*,c.s_score
from student stu
join score a on a.c_id = '02' and a.s_id= stu.s_id
left join score b on b.c_id = '01' and b.s_id= stu.s_id
join score c on c.s_id= stu.s_id
where a.s_score >= b.s_score or b.s_score is null
;

-- 3、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩:
select 
a.s_id,stu.s_name,avg(a.s_score) as avgscore
from score a
join student stu on a.s_id = stu.s_id
group by a.s_id,stu.s_name
having avgscore >= 60
;

-- 4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩:(包括有成绩的和无成绩的)
select 
a.s_id,stu.s_name,avg(a.s_score) as avgscore
from score a
join student stu on a.s_id = stu.s_id
group by a.s_id,stu.s_name
having avgscore < 60
union all
select stu.s_id,stu.s_name,NULL as avgscore
from student stu
left join score a on stu.s_id = a.s_id
where a.s_score is null
;


select stu.s_id,stu.s_name,NULL as avgscore
from student stu
where not exists (select 1 from score a where a.s_id = stu.s_id)
;

select stu.s_id,stu.s_name,NULL as avgscore
from student stu
left join score a on stu.s_id = a.s_id
where a.s_score is null
;

select stu.s_id,stu.s_name,NULL as avgscore
from student stu
where stu.s_id not in (select s_id from score )
;

-- 5、查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩:
select 
stu.s_id,stu.s_name,count(a.s_score) as totalSubjects,sum(a.s_score) as sumScores
from student stu
left join score a on a.s_id = stu.s_id
group by stu.s_id,stu.s_name
;

select 
stu.s_id,stu.s_name,
count(a.s_score) over(partition by stu.s_id) as totalSubjects,
sum(a.s_score) over(partition by stu.s_id) as sumScores
from student stu
left join score a on a.s_id = stu.s_id
;

-- 6、查询"李"姓老师的数量:
select count(1)
from teacher
where t_name like '李%'
;

-- 7、查询学过"张三"老师授课的同学的信息:
select distinct stu.*
from student stu
join score a on a.s_id = stu.s_id
join course b on b.c_id = a.c_id
join teacher c on c.t_id =b.t_id 
where c.t_name = '张三'
;

select stu.*
from student stu
where exists (select 1 from score a,course b,teacher c where c.t_name='张三' and  c.t_id = b.t_id and b.c_id = a.c_id and stu.s_id = a.s_id)
;

select stu.*
from student stu
join course b on b.c_id = a.c_id
join teacher c on c.t_name = '张三' and c.t_id =b.t_id 
left semi join score a on a.s_id = stu.s_id
;


-- 8、查询没学过"张三"老师授课的同学的信息:
select stu.*,cs.c_course,sc.s_score
from student stu
join teacher ter on ter.t_name = '张三'
join course cs on ter.t_id = cs.t_id 
left join score sc on sc.s_id = stu.s_id and sc.c_id = cs.c_id
where sc.s_score is null
;

select stu.s_id,stu.s_name
from student stu
join teacher c on c.t_name = '张三' 
join course b on c.t_id= b.t_id
left join score a on b.c_id = a.c_id and a.s_id = stu.s_id
group by stu.s_id,stu.s_name
having sum(case when a.s_score is null then 0 else 1 end ) = 0
;

select stu.*
from student stu
where not exists (select 1 from score a,course b,teacher c where c.t_name='张三' and  c.t_id = b.t_id and b.c_id = a.c_id and stu.s_id = a.s_id)
;


-- 9、查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息:
select stu.*
from student stu
join score a on a.s_id =stu.s_id and a.c_id = '01' 
where exists (select 1 from score b where b.c_id = '02' and stu.s_id = b.s_id)
;


select stu.*
from student stu,score a,score b 
where stu.s_id = a.s_id and stu.s_id = b.s_id and a.c_id = '01' and b.c_id = '02'
;

select stu.s_id,stu.s_name
from student stu
join score a on stu.s_id =a.s_id 
where a.c_id = '01' or a.c_id = '02'
group by stu.s_id,stu.s_name
having count(1) = 2
;

select stu.s_id,stu.s_name
from student stu
join score a on stu.s_id =a.s_id 
where a.c_id in (1,2)
group by stu.s_id,stu.s_name
having count(1) = 2
;

78、查询学过"张三"老师授课的所有课程的同学的信息:
select stu.s_id,stu.s_name
from student stu
join course a
join teacher c on c.t_name = '张三' and c.t_id = a.t_id 
left join score b on b.c_id = a.c_id and b.s_id = stu.s_id
group by stu.s_id,stu.s_name
having sum(case when b.s_score is null then 1 else 0 end) = 0
;

-- 10、查询学过编号为"01"但是没有学过编号为"02"的课程的同学的信息:
select stu.*
from student stu
join score a on a.s_id =stu.s_id and a.c_id = '01' 
where not exists (select 1 from score b where b.c_id = '02' and stu.s_id = b.s_id)
;

select stu.s_id,stu.s_name
from student stu
join score sc on sc.c_id= '01' and sc.s_id = stu.s_id
left join score sc1 on sc1.c_id= '02' and sc1.s_id = sc.s_id
where sc1.s_score is null
;

-- 11、查询没有学全所有课程的同学的信息:
select distinct stu.*
from student stu
join course a 
left join score b on b.s_id = stu.s_id and b.c_id = a.c_id 
where b.s_score is null
;

-- 12、查询至少有一门课与学号为"01"的同学所学相同的同学的信息:
select distinct stu.*
from student stu
join score a on a.s_id = stu.s_id
where stu.s_id <> '01' and a.c_id in (
select c_id from score where s_id = '01')
;

select distinct stu.*
from student stu
join score a on a.s_id = stu.s_id and a.s_id = '01'
join score b on b.c_id = a.c_id
where stu.s_id <> '01'
;


-- 13、查询和"01"号的同学学习的课程完全相同的其他同学的信息:
select stu.s_id,stu.s_name,stu.s_birth,stu.s_sex
from student stu
join 
(
select stu.s_id as stid,sc1.s_id as scid,case when stu.s_id is null then sc1.s_id else stu.s_id end as all_id
from student stu
join (
select sc.c_id
from score sc
where sc.s_id = '01' and sc.c_id <> '01'
) aa
full outer join score sc1 on sc1.c_id = aa.c_id and sc1.s_id = stu.s_id
) a on a.all_id = stu.s_id
group by stu.s_id,stu.s_name,stu.s_birth,stu.s_sex
having sum(case when stid is null or scid is null then 1 else 0 end) = 0
;

select student.*,tmp1.course_id 
from student
join (
select s_id ,concat_ws('|', collect_set(c_id)) course_id 
from score
where s_id <> '01'
group by s_id)tmp1
  on student.s_id = tmp1.s_id
join (
select concat_ws('|', collect_set(c_id)) course_id2
from score  
where s_id='01' and c_id <> '01')tmp2
on tmp1.course_id = tmp2.course_id2;


-- 14、查询没学过"张三"老师讲授的任一门课程的学生姓名:
select *
from student stu
where stu.s_id not in (
select c.s_id 
from course a,teacher b,score c 
where b.t_name = '张三' and a.t_id = b.t_id and c.s_id = stu.s_id and c.c_id = a.c_id
)
;

select stu.*
from student stu
join teacher a on a.t_name = '张三'
join course b on b.t_id = a.t_id
left join score c on c.c_id = b.c_id and c.s_id = stu.s_id
where c.s_score is null
;


-- 15、查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩:
select 
*
from student stu 
join score a on a.s_id = stu.s_id
where a.s_score < 60
;

select 
stu.s_id,
stu.s_name,round(avg(b.s_score),2) as avgscore
from student stu 
join score a on a.s_id = stu.s_id
join score b on b.s_id = stu.s_id
where a.s_score < 60
group by stu.s_id,stu.s_name
having count(1) >= 2
;

-- 16、检索"01"课程分数小于60，按分数降序排列的学生信息:
select *
from student stu
join score a on a.s_id = stu.s_id
where a.c_id = '01' and a.s_score < 60
order by a.s_score desc
;

-- 17、按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩:
select *
from score b
join 
(
select a.s_id,round(avg(a.s_score),2) as avgscore
from score a
group by a.s_id
order by avgscore desc
) d on d.s_id = b.s_id
;

select *,
round(avg(a.s_score) over(partition by a.s_id),2) as avgscore
from score a
order by avgscore desc,a.s_score desc
;


-- 18.查询各科成绩最高分、最低分和平均分：以如下形式显示：课程ID，课程name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率:
-- 及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90
select 
b.c_id,
b.c_course,
max(a.s_score) as maxscore,
min(a.s_score) as minscore,
round(avg(a.s_score),2) as avgscore,
round(sum(case when a.s_score >=60 then 1 else 0 end ) / count(1) * 100,2) as `及格率`,
round(sum(case when a.s_score between 70 and 79 then 1 else 0 end ) / count(1) * 100,2) as `中等率`,
round(sum(case when a.s_score between 80 and 89 then 1 else 0 end ) / count(1) * 100,2) as `优良率`,
round(sum(case when a.s_score >=90 then 1 else 0 end ) / count(1) * 100,2) as `优秀率`
from score a
join course b on b.c_id = a.c_id
group by b.c_id,b.c_course
;

-- 19、按各科成绩进行排序，并显示排名:– row_number() over()分组排序功能
select *,
row_number() over(partition by c_id sort by s_score desc)
from score
;

-- 20、查询学生的总成绩并进行排名:
select s_id,sum(s_score) as sumScores
from score
group by s_id
order by sumscores desc;

-- 21、查询不同老师所教不同课程平均分从高到低显示:
select t_id,a.c_id,round(avg(s_score),2) as avgscore
from score a
join course b on b.c_id = a.c_id
group by t_id,a.c_id
order by t_id,avgscore desc 
;

-- 22、查询所有课程的成绩第2名到第3名的学生信息及该课程成绩:
select * from 
(
select *,
row_number() over(partition by c_id sort by s_score desc) as rm
from score
) a
where a.rm between 2 and 3
;

-- 23、统计各科成绩各分数段人数：课程编号,课程名称,[100-85],[85-70],[70-60],[0-60]及所占百分比
select c_id,
sum(case when s_score >= 85 then 1 else 0 end) as 85score,
sum(case when s_score between 70 and 84 then 1 else 0 end) as 70score,
sum(case when s_score between 60 and 69 then 1 else 0 end) as 60score,
sum(case when s_score < 60 then 1 else 0 end) as 59score,
count(1) as totalstu
from score
group by c_id
;

-- 24、查询学生平均成绩及其名次:
select *,
row_number() over(sort by a.avgscore desc) as rm
from (
select 
s_id,
round(avg(s_score),2) as avgscore
from score
group by s_id ) a
;

-- 25、查询各科成绩前三名的记录三个语句
select * from 
(
select *,
row_number() over(partition by c_id sort by s_score desc) as rm,
rank() over(partition by c_id sort by s_score desc) as rk,
dense_rank() over(partition by c_id sort by s_score desc) as drk
from score
) a
where a.rm < 4
;

-- 26、查询每门课程被选修的学生数:
select c_id,count(1) as totalstu
from score
group by c_id
;

-- 27、查询出只有两门课程的全部学生的学号和姓名:
select stu.s_id,stu.s_name
from student stu
join score a on a.s_id = stu.s_id
group by  stu.s_id,stu.s_name
having count(1) = 2
;

-- 28、查询男生、女生人数:
select s_sex,count(1) as totalstu
from student
group by s_sex
;

-- 29、查询名字中含有"风"字的学生信息:
select * 
from student
where s_name like '%风%'
;

-- 30、查询同名同性学生名单，并统计同名人数:
select s_name,s_sex,count(1) as totalstu
from student
group by s_name,s_sex
having totalstu > 1
;

-- 31、查询1990年出生的学生名单:
select * 
from student 
where s_birth like '1990%'
; 

-- 32、查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列:
select c_id,round(avg(s_score),2) as avgscore
from score
group by c_id
order by avgscore desc,c_id asc
;

-- 33、查询平均成绩大于等于85的所有学生的学号、姓名和平均成绩:
select s_id,avg(s_score) as avgscore
from score
group by s_id
having avgscore >= 85
;

-- 34、查询课程名称为"数学"，且分数低于60的学生姓名和分数:
select stu.s_name,a.s_score
from score a
join course b on b.c_course = '数学' and b.c_id = a.c_id
join student stu on stu.s_id = a.s_id
where a.s_score < 60
;

-- 35、查询所有学生的课程及分数情况:
select *
from student stu
join course a
left join score b on b.s_id = stu.s_id and b.c_id = a.c_id
;

-- 36、查询任何一门课程成绩在70分以上的学生姓名、课程名称和分数:
select *
from student stu
join score a on a.s_id = stu.s_id
join course b on b.c_id = a.c_id
where a.s_score >=70
;

-- 37、查询课程不及格的学生:
select *
from student stu
join score a on a.s_id = stu.s_id
where a.s_score < 60
;

-- 38、查询课程编号为01且课程成绩在80分以上的学生的学号和姓名:
select *
from score
where c_id = '01' and s_score >= 80
;

-- 39、求每门课程的学生人数:
select c_id,count(1) as totalstu
from score
group by c_id
;

-- 40、查询选修"张三"老师所授课程的学生中，成绩最高的学生信息及其成绩:
select *
from (
select a.*,
dense_rank() over (partition by a.c_id sort by a.s_score desc) drk 
from score a
join course b on b.c_id =a.c_id
join teacher c on c.t_id = b.t_id
where c.t_name = '张三'
) aa
where aa.drk = 1;


-- 41、查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩:
SELECT distinct b.s_id,b.c_id,b.s_score 
FROM score a,score b 
WHERE a.c_id != b.c_id AND a.s_score = b.s_score and a.s_id = b.s_id
;

select * from 
score a
join (
select s_id,s_score
from score
group by s_id,s_score
having count(1) > 1
) b on b.s_id = a.s_id and b.s_score = a.s_score
;

-- 42、查询每门课程成绩最好的前三名:
select * 
from (
select *,
dense_rank() over(partition by c_id sort by s_score desc) drk
from score
) a 
where a.drk < 4
;

-- 43、统计每门课程的学生选修人数（超过5人的课程才统计）:
-- 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列
SELECT c_id,COUNT(*) AS total 
FROM score 
GROUP BY c_id 
HAVING total>5 
ORDER BY total desc,c_id ASC;

-- 44、检索至少选修两门课程的学生学号:
SELECT s_id,COUNT(*) AS sel 
FROM score 
GROUP BY s_id 
HAVING sel>=2;

-- 45、查询选修了全部课程的学生信息:
select stu.s_id,stu.s_name
from student stu
join course a
left join score b on b.c_id = a.c_id and b.s_id = stu.s_id
group by stu.s_id,stu.s_name
having sum(case when b.s_score is null then 1 else 0 end) = 0
;


-- 46、查询各学生的年龄(周岁):
-- 按照出生日期来算，当前月日 < 出生年月的月日则，年龄减一
SELECT s_birth,(year(current_date())-year(s_birth) - 
                (CASE 
	WHEN month(current_date())>month(s_birth) THEN 0 
	when month(current_date())= month(s_birth) and day(current_date())>=day(s_birth) then 0 ELSE 1 END)) AS age
        FROM student;
		

-- 47、查询本周过生日的学生:
SELECT * FROM student WHERE weekofyear(s_birth)=weekofyear(current_date());

SELECT weekofyear(current_date());

-- 48、查询下周过生日的学生:
SELECT * FROM student WHERE weekofyear(s_birth)=weekofyear(current_date()) + 1;

-- 49、查询本月过生日的学生:
SELECT * FROM student WHERE MONTH(current_date()) =MONTH(s_birth);

-- 50、查询12月份过生日的学生:
SELECT * FROM student WHERE 12=MONTH(s_birth);
```



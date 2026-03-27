# shell

## 内容

### 1. Shell编程【重点】

#### 1.1. Shell的概念介绍

##### 1.1.1. 命令解释器

Shell是命令解释器(command interpreter)，是Unix操作系统的用户接口，程序从用户接口得到输入信息，shell将用户程序及其输入翻译成操作系统内核（kernel）能够识别的指令，并且操作系统内核执行完将返回的输出通过shell再呈现给用户，下图所示用户、shell和操作系统的关系：

一个系统可以存在多个shell，可以通过cat /etc/shells命令查看系统中安装的shell。

```sh
[root@learning01 ~]# cat /etc/shells
 
 /bin/sh
 /bin/bash
 /usr/bin/sh
 /usr/bin/bash
```

操作系统内核（kernel）与shell是独立的套件，而且都可被替换；不同的操作系统使用不同的shell； 同一个kernel之上可以使用不同的shell。 也可以查看当前shell环境是哪种：

```sh
 [root@learning01 ~]# echo $SHELL
```

##### 1.1.2. Shell脚本

Shell也是一门编程语言，即shell脚本。在此脚本中，我们可以使用一些编程语法来进行一些任务操作。 如：变量、类型、分支结构、循环结构、数组、函数等语法。 在shell脚本里，必须指定一种shell命令解释器。

#### 1.2. Shell编程规范

##### 1.2.1. 脚本文件的结构

```
 1 文件的扩展名必须是.sh
 2 文件的首行必须使用#!       指定script的运行shell环境(即脚本解释器)
    如：#!/bin/bash
 3 脚本里的行注释符号为#
 4 指令、选项、参数之间即使有多个空格仍会被视为一个空格。
 5 tab键形成的空白也被视为一个空格键
 6 空白行会被忽略
```

##### 1.2.2. 脚本文件的执行

● 使用bash程序调用执行，只需要有读权限即可

```sh
[root@learning01 ~]# sh *.sh      
```

或者

```sh
[root@learning01 ~]# bash *.sh
```

● 直接写script，必须要有rx权限才行

```sh
[root@learning01 ~]# ./*.sh         
 绝对路径写法： /hadoop/*.sh
 相对路径写法： ./*.sh
```

● 借助变量PATH功能

```sh
将*.sh放入~/bin目录下，因为PATH里拼接了~/bin目录。
 注意：~/bin目录必须自行创建
```

#### 1.3. Shell的变量

##### 1.3.1. 变量的用法

```
1. 变量的命名规则   
   - 命名只能使用英文字母，数字和下划线。首个字符不能以数字开头。
   - 字母习惯使用大写。
   - 中间不能有空格。
   - 不能使用标点符号。
   - 不能使用bash里的关键字（可用help命令查看保留关键字）

2. 变量的使用规则
   - 直接定义变量名称，没有类型需要强调（类似于数学中:x=1,y=2,z=x+y）
   - 赋值时，"="前后不能有空格
   - 命令的执行结果赋值给变量时，使用反单引号      如：TIME=`date`
   - 调用变量时，必须使用$       格式： $变量名    或    ${变量名}
```

##### 1.3.2. 变量的分类

Linux Shell中的变量可以分为三种变量: 局部变量、环境变量、特殊变量。可以通过set命令查看系统中存在的所有变量

局部变量：也就是用户自定义的变量，在脚本中或命令中定义

环境变量：保存和系统操作环境相关的数据。$HOME、$PWD、$SHELL、$USER等等

特殊变量：<br>
    一种是位置参数变量：主要用来向脚本中传递参数或数据，变量名不能自定义，变量作用固定。<br>
    一种是预定义变量：是Bash中已经定义好的变量，变量名不能自定义，变量作用也是固定的。

##### 1.3.3. 局部变量

用户自定义的变量由字母或下划线开头，由字母，数字或下划线序列组成，并且大小写字母意义不同，变量名长度没有限制。

● 定义变量

习惯上用大写字母来命名变量。变量名以字母表示的字符开头，不能用数字。

● 调用变量

在使用变量时，要在变量名前加上前缀“$”.

使用echo 命令查看变量值

```sh
eg: [root@learning01 ~]# echo $A
```

● 变量赋值 <br>
  ○ 第一种: 定义时赋值 <br>
  ○ 第二种: 将一个命令的执行结果给变量赋值 <br>
  ○ 第三种: 将一个变量的值赋给另一个变量

```sh
[root@learning01 ~]# A=$STR
```

```sh
# 变量=值
# 注意: 在上述的定义方式中，等号的左右两侧不能有空格
# eg:
[root@learning01 ~]# STR="hello learning"
[root@learning01 ~]# A=9
[root@learning01 ~]# A=`ls -la` 反引号，运行里面的命令，并把结果返回给变量A
[root@learning01 ~]# A=$(ls -la) 等价于反引号
[root@learning01 ~]# AA=$((4+5))
[root@learning01 ~]# BB=`expr 4 + 5 `
```

● 变量叠加

```sh
# 变量叠加，就是将两个字符串变量的值叠加在一起，类似于Java中的字符串拼接操作。

[root@learning01 ~]# A=123
[root@learning01 ~]# C="$A"456
[root@learning01 ~]# D=${A}789

# 单引号和双引号的区别
# 现象：单引号里的内容会全部输出，而双引号里的内容会有变化
# 原因：单引号会将所有特殊字符脱意

[root@learning01 ~]# NUM=10    

[root@learning01 ~]# SUM="$NUM hehe"     
[root@learning01 ~]# echo $SUM     # 输出10 hehe

[root@learning01 ~]# SUM2='$NUM hehe'     
[root@learning01 ~]# echo $SUM2    # 输出$NUM hehe
```

● 删除变量

```sh
# 删除之前已经定义过的变量，之后就无法再使用这个变量了。

# 撤销变量 A
[root@learning01 ~]# unset A 
# 声明静态的变量 B=2 ，不能 unset
[root@learning01 ~]# readonly B=2 
# 报错: -bash: unset: B: cannot unset: readonly variable
[root@learning01 ~]# unset B
```

● 注意事项关于局部变量的作用域的问题: 用户自定义的局部变量，作用于仅为当前的Shell环境。仅在当前的Shell示例中有效，其他的Shell启动的程序不能访问局部变量。

```sh
[root@learning01 ~]# echo '#!/bin/bash' > test.sh
[root@learning01 ~]# A=22
[root@learning01 ~]# echo 'echo $A' >> test.sh
[root@learning01 ~]# echo $A   结果:22
[root@learning01 ~]# bash test.sh   结果:打印为空,因为bash会开启新的shell进程
```

##### 1.3.4. 环境变量

用户自定义的局部变量，只能在当前的Shell中生效，而环境变量会在当前Shell和其所有的子Shell中生效。如果把环境变量写入相应的配置文件，那么这个环境变量就会在所有的Shell中生效。

作用域: 当前的Shell以及所有的子Shell

声明变量: export 变量名=变量值

定义环境变量的常见配置文件:

● /etc/profile -> 针对系统所有的用户生效，此文件应用于所有用户每次登录系统时的环境变量定义。每次用户登录的时候，都会加载这个文件。

● $HOME/.bash_profile -> 针对特定用户生效，HOME/.bash_profile文件中的定义。

##### 1.3.5. 位置参数变量

|变量	|描述|
|---|---|
|`${}`|0表示命令本身，9表示第1到第9个参数，10以上的参数需要使用大括号包含，例如`${10}`|
|`$#`	|传递到脚本的参数个数|
|`$*`	|以一个单字符串显示所有向脚本传递的参数。如`"$*"`用`「"」`括起来的情况、以`"$1 $2 … $n"`的形式输出所有参数。|
|`$$`	|脚本运行的当前进程ID号|
|`$!`	|后台运行的最后一个进程的ID号|
|`$@`	|与$*相同，但是使用时加引号，并在引号中返回每个参数。如`"$@"`用`「"」`括起来的情况、以`"$1" "$2" … "$n"` 的形式输出所有参数。|
|`$-`	|显示Shell使用的当前选项，与set命令功能相同。|
|`$?`	|显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。|

`$*` 与 `$@` 区别：

相同点：都是引用所有参数。

不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 `1、2、3`，则 `" * "` 等价于 `"1 2 3"`（传递了一个参数），而 `"@"` 等价于 `"1" "2" "3"`（传递了三个参数）。

● Shell脚本执行测试

```sh
# 执行脚本 test1.sh 
#!/bin/bash
echo "test \$*"
for i in $*
do
    echo $i
done

echo "test \$@"
for i in $@
do
    echo $i
done

echo "test \"\$*\""
for i in "$*"
do
    echo $i
done

echo "test \"\$@\""
for i in "$@"
do
    echo $i
done


输出结果:
[root@learning01 ~]# sh test1.sh a b
test $*
a
b
test $@
a
b
test "$*"
a b
test "$@"
a
b
```

##### 1.3.6. 预定义变量

|变量	|描述|
|---|---|
|`$?`	|执行上一个命令的返回值。执行成功，返回0；执行失败，返回非0|
|`$$`	|当前进程的进程号(PID)，即当前脚本执行时生成的进程号|
|`$!`	|后台运行的最后一个进程的进程号(PID)，最近一个被放入后台执行的进程|

● 测试 `$?`

```sh
[root@learning01 ~]# ls ; echo $?
# 分析: 这里的意思是依次顺序执行两个命令
# 如果分号前的命令可以执行，$?会返回0; 否则会返回非0的一个数字
```

● 测试 `$$`

```sh
[root@learning01 ~]# pwd > /dev/null
[root@learning01 ~]# echo $$
```

● 测试 `$!`

```sh
[root@learning01 ~]# ls /etc > /dev/null &
[root@learning01 ~]# echo $!
```

#### 1.4. read命令

##### 1.4.1. 命令说明

```
read命令，可以从控制台读取用户输入的内容，并且给指定的变量进行赋值。
命令的基本格式为: read [option] variable
常见的option:
-p : 提示语句，在输入之前，给用户提示的信息
-n : 限制输入的字符数量，到达这个数量的字符的时候，会自动的停止输入
-t : 等待时间，单位为秒。当到达这个等待时间的时候，会自动的结束输入，并且不会读取任何输入的内容!
     即，输入操作且回车，必须在指定的时间内完成。
-s : 隐藏输入的内容。在控制台上不显示任何输入的内容，常见于密码的输入
```

##### 1.4.2. read的实例

```sh
[root@learning01 ~]# read -t 30 -p "please input your name:"  NAME

[root@learning01 ~]# echo $NAME

[root@learning01 ~]# read -s -p "please input your age :"  AGE

[root@learning01 ~]# echo $AGE  注意：如果隐藏输入，这里的结果是看不到的

[root@learning01 ~]# read -n 1 -p "please input your sex  [M/F]:"  GENDER

[root@learning01 ~]# echo $GENDER
```

##### 1.4.3. 注意事项

● 在输入的时候，如果输错了需要删除的时候，执行ctrl+delete

● 符号不要输入中文

● 变量与之前的内容需要保持有空格

#### 1.5. 运算

##### 1.5.1. expr

```sh
格式 :expr m + n 或$((m+n)) 注意expr与运算符和变量间要有空格  

sum=$((m+n))   中=与$之间没有空格

expr命令：对整数型变量进行算术运算

(注意：运算符前后必须要有空格)

[root@learning01 ~]# expr 3 + 5 

[root@learning01 ~]# expr 3 – 5

[root@learning01 ~]# echo `expr 10 / 3`     

10/3的结果为3，因为是取整

[root@learning01 ~]# expr  3  \* 10     

\ 是转义符
```

##### 1.5.2. 示例

计算（2 ＋3 ）×4 的值

1 .分步计算

```sh
[root@learning01 ~]# S=`expr 2 + 3`

[root@learning01 ~]# expr $S  \* 4
```

2.一步完成计算

```sh
[root@learning01 ~]# expr  `expr 2 + 3` \* 4
[root@learning01 ~]# S=`expr  \` expr 2 + 3  \`  \* 4`
[root@learning01 ~]# echo $S
       或
[root@learning01 ~]# echo $(((2 + 3) * 4))
```

##### 1.5.3. {}

```sh
$()与${}的区别

$( )的用途和反引号``一样，用来表示优先执行的命令

eg: [root@learning01 ~]# echo $(ls /root)

${ } 就是取变量了  

eg：[root@learning01 ~]# echo ${PATH}

$((运算内容)) 适用于数值运算

eg: [root@learning01 ~]# echo $((3+1*4))
```

#### 1.6. 字符串

##### 1.6.1. 字符串的脚本用法

```
- 字符串不能单独出现，必须要配合变量。
- 字符串可以使用单引号['  ']，也可以使用双引号[" "]，也可以不用引号
- 单引号内的任何字符没有任何意义，都会原样输出
- 单引号内使用变量是无效的，单引号内不能出现单引号
- 双引号内可以使用变量
- 双引号内可以使用转义字符
- 在字符串拼接操作时，我们可以进行无缝拼接，或者是在双引号里使用变量
```

##### 1.6.2. 字符串的长度

```sh
可以使用${#variable} 或者 expr length "${variable}"。因为expr是指令，所以别忘记使用反单引号``或者是$()

直接看案例：

[root@learning01 ~]# vim test3.sh

#!/bin/bash
var='welcome to china'
length1=${#var}
length2=$(expr length "${var}")  <==$()写法
length3=`expr length "$var"`     <==反单引号写法
```

#### 1.7. Shell数组

##### 1.7.1. 数组的使用规则

```
- 在/bin/bash这个shell中，只有一维数组的概念，并且不限定数组的长度。
- 数组的元素下标是从0开始的，
- 获取数组的元素要使用下标
- 下标使用不当，会报错
```

##### 1.7.2. 数组的定义

```sh
定义格式： variable=(值1  值2    …  值n)   
注意：元素之间除了使用空格作为分隔符，还可以使用换行符。

或者 

name[0]=值1     
name[1]=值2     
…     
name[n]=值n
```

#### 1.7.3. 读取数组

```sh
${variable[index]}： 读取index索引上的元素
${variable[*]}或者${variable[@]}：读取所有元素  
${#variable[*]}或者${#variable[@]} :  读取数组的长度  
[root@learning01 ~]# vim test3.sh

#!/bin/bash
citys=(cc sh bj sd hlj)
hobby[0]=book
hobby[1]=film
hobby[2]=music

echo ${citys[0]}      <==cc
echo ${hobby[*]}      <==book film music
echo ${#hobby[@]}     <==3
[root@learning01 ~]# bash test3.sh
```

#### 1.8. test测试命令

|操作符	|描述	|示例|
|---|---|---|
|`-e`	|文件是否存在	|`[ -e file.txt ]`|
|`-f`	|是普通文件	|`[ -f /path/to/file ]`|
|`-d`	|是目录	|`[ -d /path/to/dir ]`|
|`-r`	|可读	|`[ -r file.txt ]`|
|`-w`	|可写	|`[ -w file.txt ]`|
|`-x`	|可执行	|`[ -x script.sh ]`|
|`-s`	|文件大小 >0	|`[ -s logfile ]`|
|`-L`	|是符号链接	|`[ -L symlink ]`|
|`-z STRING`	|字符串为空	|`[ -z "$var" ]`|
|`-n STRING`	|字符串非空	|`[ -n "$var" ]`|
|`STRING1 = STRING2`	|字符串相等	|`[ "$var1" = "$var2" ]`|
|`STRING1 != STRING2`	|字符串不等	|`[ "$var1" != "$var2" ]`|
|`-eq`	|等于	|`[ "$a" -eq "$b" ]`|
|`-ne`	|不等于	|`[ "$a" -ne "$b" ]`|
|`-gt`	|大于	|`[ "$a" -gt "$b" ]`|
|`-ge`	|大于或等于	|`[ "$a" -ge "$b" ]`|
|`-lt`	|小于	|`[ "$a" -lt "$b" ]`|
|`-le`	|小于或等于	|`[ "$a" -le "$b" ]`|
|`!`	|逻辑非	|`[ ! -f "$file" ]`|
|`-a`	|逻辑与	|`[ "$a" -eq 1 -a "$b" -eq 2 ]`|
|`-o`	|逻辑或	|`[ "$a" -eq 1 -o "$b" -eq 2 ]`|

##### 高级用法：[[ ]] 和 (( ))

Bash 提供了更强大的测试语法：

1. 双括号 [[ ]]

支持模式匹配：[[ "$var" == *.txt ]]

支持正则表达式：[[ "$var" =~ ^[0-9]+$ ]]

更安全的字符串处理

2. 算术比较 (( ))

专为数值比较设计：(( a > b ))

支持更复杂的算术表达式

● 通常test命令不单独使用，而是与if语句连用，或是放在循环结构中

```sh
# && 表示测试通过的处理逻辑
# || 表示测试不通过的处理逻辑
[root@learning01 ~]# test -e file && echo "exists" || echo "not exists"
```

● 判断符号[]

除了好用的test之外，我们还可以使用中括号来进行检测条件是否成立

```sh
[root@learning01 ~]# [  -r  filename ]      检测filename是否有可读权限
[root@learning01 ~]# [  -f  filename -a  -r  filename ]     检测filename是不是普通文件并且有可读权限
```

常见错误与调试技巧

缺少空格：`[ "$a"="$b" ]` 是错误的，正确是 `[ "$a" = "$b" ]` <br>
未引用的变量：`[ -f $file ]` 应该为 `[ -f "$file" ]` <br>
混淆字符串和数值比较：使用 `=` 比较字符串，`-eq` 比较数值 <br>
调试技巧：在脚本开头添加 `set -x` 开启调试模式，或使用 `echo` 打印测试表达式

#### 1.9. 条件控制

##### 1.9.1. if条件语句-单分支

```sh
if-else语句，是非常简单，也是非常基础的条件语句。在Java中我们已经非常熟悉它的逻辑了，在这里，我们重点关注在Shell中的语法
if [ 条件判断 ]
then
    条件成立的执行逻辑
fi
或者
if [ 条件判断 ] ; then
    条件成立的执行逻辑
fi
案例:
#!/bin/bash

A=$1
if [ $A == "stop" ]
then
    systemctl stop firewalld
fi
```

注意事项:

1. if语句需要使用fi结尾，和一般语言使用大括号结尾不同。

2. [ 条件判断 ] 就是使用test命令判断，所以中括号和条件判断之间必须有空格

3. then后面跟符合条件之后执行的程序，可以放在[]之后，用;分隔，也可以换行写入，就不需要;了

4. if与中括号之间必须要有空格

##### 1.9.2. if条件语句-多分支

```sh
if [ 条件判断式1]
then
      当条件判断式1成立时，执行程序1
elif  [ 条件判断式2 ]  
then      
    当条件判断式2成立时，执行程序2
      ...省略更多条件
else
      当所有条件都不成立时，最后执行此程序
fi
```

案例1:

```sh
#!/bin/bash
read -p "please input your name:"  NAME
echo  $NAME
if [ $NAME == root ]
then
      echo "hello ${NAME},  welcome !"
elif [ $NAME == tom ]
then
    echo "hello ${NAME},  welcome !"
else
    echo "oh, get out here !"
fi
```

案例2:

```sh
编写一个坐车脚本，要求:
脚本名字: home.sh
逻辑: 从外面传入一个参数，根据参数判断: 1. 坐飞机，2. 坐火车，3. 坐火箭，4. 不回了
#!/bin/bash

CHOICE=$1
if [ $CHOICE == 1 ]
then
    echo "坐飞机"
elif [ $CHOICE == 2 ]
then
        echo "坐火车"
elif [ $CHOICE == 3 ]
then
    echo "坐火箭"
elif [ $CHOICE == 4 ]
then
    echo "不回了"
else
    echo "输入的参数有问题啊"
fi
```

##### 1.9.3. case

```sh
# 在Java中，我们学习过switch-case结构。这种结构，我们可以捕获一个变量的值，对这个变量取到的某些值进行不同的处理。在Shell中，也有类似的结构，就是case。
# case命令是一个多分支的if/else命令，case变量的值用来匹配value1、value2、value3等不同的值。
# 匹配到后，则执行跟在后面的命令，直到遇到双分号为止。
# 类似于if命令，case命令使用esac作为终止符。
# case行尾必须为单词in。
# 每个分支必须以右括号结束。
# 匹配模式中可使用方括号表示一个连续的范围，如[0-9]；使用竖杠符号“|”表示或。
# 最后的“\*）”表示默认模式，当使用前面的各种模式均无法匹配该变量时，将执行“*）”后的命令序列。

# case的格式

CMD=$1
case $CMD in							# case行尾必须为 变量 in，表示捕获这个变量的值
start)									# 需要匹配到的值，需要以右括号作为结尾
    echo "starting"						# 匹配到之后，执行的逻辑语句，即一个分支
    ;;									# 一个分支的逻辑，需要以;;作为结束，不会向下穿透
stop)
    echo "stopping"
    ;;
*)										# *表示以上分支都不满足的情况，类似于switch-case中的default
    echo "please using start|stop"
    ;;
esac									# case语句，需要以esac结束
```

#### 1.10. 循环

##### 1.10.1. for循环

for循环命令用来在一个列表条目中执行有限次数的命令。

比如，你可能会在一个姓名列表或文件列表中循环执行同个命令。

for命令后紧跟一个自定义变量、一个关键字in和一个字符串列表（可以是变量）。

第一次执行for循环时，字符串列表中的第一个字符串会赋值给自定义变量，然后执行循环命令，直到遇到done语句；

第二次执行for循环时，会右推字符串列表中的第二个字符串给自定义变量

依次类推，直到字符串列表遍历完。

方式一:

```sh
for N in 1 2 3 
do
      echo $N
done

或

for N in 1 2 3; do echo $N; done

或

for N in {1..3}; do echo $N; done

或

for N in {1,2,3}; do echo $N; done  

注意事项: {}中的数字之间不能有空格
```

方式二:

```sh
for ((i = 0; i <= 5; i++))
do
      echo "welcome $i times"
done
    
或

for ((i = 0; i <= 5; i++)); do echo "welcome $i times"; done
```

练习: 计算从1到100的和

```sh
#!/bin/bash

SUM=0
for((i=1;i<=100;i++))
do
    SUM=$(($SUM + $i))
done
echo $SUM
```

##### 1.10.2. while循环

while命令根据紧跟其后的命令(command)来判断是否执行while循环，当command执行后的返回值(exit status)为0时，则执行while循环语句块，直到遇到done语句，然后再返回到while命令，判断command的返回值，当得到返回值为非0时，则终止while循环。

● 第一种:

```sh
while [ expression ]
do
    command
done
```

● 第二种:

```sh
while  ((  expression  ))
do
command
…
done
```

#### 1.11. 函数

函数代表着一个或一组命令的集合，表示一个功能模块，常用于模块化编程。

以下是关于函数的一些重要说明： 

在shell中，函数必须先定义，再调用

使用return value来获取函数的返回值

函数在当前shell中执行，可以使用脚本中的变量。

函数的格式如下:

```sh
函数名()
{
    命令1…
    命令2…

    return 返回值变量
}

结构:

[ function ] funname [()]
{

    action;

    [return int;]
}

function start()  / function start  / start()
编写脚本
[root@learning01 ~]# bash function1.sh  

#!/bin/bash
function start() {
    echo "starting"
}
function stop {
    echo "stopping"
}
restart() {
    echo "restarting"
}
$1
```

注意事项:

- 如果函数名后没有（），在函数名和{ 之间，必须要有空格以示区分。
- 函数返回值，只能通过$? 系统变量获得，可以显示加：return 返回值
- 如果不加return，将以最后一条命令的运行结果，作为返回值。 
- return后的内容以字符串的形式写入，但是执行时会自动转成数值型，范围：数值n(0-255)

#### 1.12. 脚本调试

`-x`: 执行脚本，并显示所有变量的值

```sh
[root@learning01 ~]# vim test.sh

#!/bin/bash
a=$1
b=3
echo "b:"+$b
c=$a
echo $a

[root@learning01 ~]# bash -x test.sh

[root@learning01 ~]# vim test.sh

#!/bin/bash
a=$1
set -x      # 这里是添加的set -x
b=3
echo "b:"+$b
c=$a
echo $a

[root@learning01 ~]# bash test.sh 1
+ b=3
+ echo b:+3
b:+3
+ c=1
+ echo 1
1
# 这里是手动添加的set -x，只对set -x以下的部分进行调试
```

`-n`: 不执行脚本，只是检查语法。将返回所有语法错误，例如函数没有正确闭合等

```sh
[root@learning01 ~]# vim test1.sh

#!/bin/bash
for N in 1 2 3
do
    echo $N
# 这里忘记写done，因此for循环没有正确的闭合

function start() {
    echo "hahaha"
}
start

[root@learning01 ~]# bash -n test1.sh
test1.sh: line 20: syntax error: unexpected end of file
```

`-v`: 执行并显示脚本内容

### 2. awk【了解】

#### 2.1. cut命令

```sh
cut [选项] 文件名        默认分割符是制表符，一个制表符代表一列

选项：

-f  列号：    提取第几列

-d 分隔符：    按照指定分隔符分割列

eg:[root@learning01 ~]#   cut -f  2  aa.txt   提取第二列

eg:[root@learning01 ~]#   cut -d ":" -f 1,3 /etc/passwd  以:分割，提取第1和第3列

eg:[root@learning01 ~]#   cat /etc/passwd | grep /bin/bash | grep -v root | cut -d ":" -f 1    获取所有可登陆的普通用户用户名

cut的局限性    不能分割不定长度的空格   

比如:df -h  不能使用cut分割

[root@learning01 ~]#  df -h | grep sda1 | cut -f 5
```

#### 2.2. awk介绍

```
一个强大的文本分析工具

把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。

核心功能：基于列的文本分析工具，支持数学运算、逻辑判断、自定义函数，适合结构化数据处理（如日志分析、报表生成） 

语法：awk ‘条件1{动作1}条件2{动作2}...’文件名

工作流程：按行读取文本 → 分割字段（默认以空格为分隔符）→ 执行脚本逻辑 → 输出结果 


条件（Pattern）:

一般使用关系表达式作为条件： >   >=  <=等

动作（Action）：

格式化输出

流程控制语句

eg:[root@learning01 ~]#   df -h | awk '{print $1 "\t" $3}'      显示第一列和第三列
```

#### 2.3. FS内置变量

```sh
eg: 输出可登陆用户的用户名和UID

[root@learning01 ~]#  cat /etc/passwd | grep "/bin/bash" | awk 'BEGIN {FS=":"} {print $1 "\t" $3 }'    

这里使用FS内置变量指定分隔符为：,而且使用BEGIN保证第一行也操作，因为awk命令会在读取第一行后再执行条件

注意:指定分隔符用-F更简单

eg: [root@learning01 ~]#  cat /etc/passwd | grep "/bin/bash" | awk -F:  '{print \$1 "\t"\$3 }'   效果同上

eg: 判断一下根目录的使用情况

[root@learning01 ~]#  df -h |grep sda1 | awk '{print \$5}' | awk -F% '{print \$1} \$1<80{print "info"}$1>80{print "warning"}'

BEGIN  在所有数据读取之前执行

eg: [root@learning01 ~]#  awk 'BEGIN {printf "first Line \n"} {printf $2 }' aa.txt     在输出之前使用BEGIN输出内容

END 在所有数据执行之后执行

eg: [root@learning01 ~]#  awk 'END {printf "The End \n"} {print $2}' aa.txt   所有命令执行完后，输出一句"The End"

[root@learning01 ~]#  df -h | grep sda2 | awk '{print \$5}' | awk -F% '{print \$1}'

[root@learning01 ~]#  df -h | grep sda2 | awk '{print $5}' | cut -d"%" -f 1

eg: 获取所有用户信息里的用户名：

[root@learning01 ~]#  cat /etc/passwd | awk -F: '{print $1}'

[root@learning01 ~]#  awk -F: '{print $1}' /etc/passwd

eg: 获取当前机器的ip地址： ifconfig  eth0

[root@learning01 ~]#  ifconfig eth0 | grep 'inet addr' | awk -F: '{print \$2}' | awk '{print $1}'
```

### 3. sed【了解】

#### 3.1. sed命令介绍

```
sed: stream editor 
```

sed是一个非交互性文本流编辑器。它编辑文件或标准输入导出的文本拷贝。标准输入可能是来自键盘、文件重定向、字符串或变量，或者是一个管道的文本。

注意： sed并不与初始化文件打交道， 它操作的只是一个拷贝，然后所有的改动如果没有重定向到一个文件，将输出到屏幕。

语法：`sed [选项]’[动作]’ 文件名 `

● 核心功能：对文本进行逐行处理，支持查找、替换、删除、插入等操作，不直接修改原文件（需用 -i 选项），适合批量文本修改。

● 工作流程：读取一行到模式空间（Pattern Space）→ 执行命令 → 输出到屏幕 → 循环处理下一行 。

常用选项:

`-n` 仅显示处理后的行，默认会输出所有行。

`-e` 允许多点编辑。

`-i` 直接修改读取的档案内容，而不是由屏幕输出（危险动作，建议先备份文件）

|命令	|功能描述|
|---|---|
|a	|新增， a 的后面可以接字符串，在下一行出现 注意：最好动作使用单引号，可以自动换行|
|c	|替换|
|d	|删除|
|i	|插入， i 的后面可以接字符串|
|p	|打印|
|s	|查找并替换，例如 1,20s/old/new/g|

#### 3.2. sed命令的使用

```sh
eg: [root@learning01 ~]#  sed  '2p' sed.txt    显示第二行和所有数据

eg: [root@learning01 ~]#  sed -n '2,3p' sed.txt   只显示第二和第三行

eg: [root@learning01 ~]#  df -h | sed -n '1p'   接收命令结果数据

eg: [root@learning01 ~]#  sed  ‘2a bing’ sed.txt 在第二行后面添加数据

eg: [root@learning01 ~]#  sed  ‘4i fengjie \  chenchen’  sed.txt 在第4行之前添加两行数据

eg: [root@learning01 ~]#  sed  ‘2c this is replace’  sed.txt 替换第二行数据

eg: [root@learning01 ~]#  sed  ‘s/it/edu360/g’ sed.txt  把sed.txt文件中的it替换为edu360,并输出

eg: [root@learning01 ~]#  sed  -e  '1s/1/34/g;3s/yangmi//g'  sed.txt    同时进行多个替换

eg: [root@learning01 ~]#  sed  –i  ‘s/it/edu360/g’  sed.txt     要想真正替换，需要使用-i参数

案例代码演示:
[root@learning01 ~]# more sed.txt
sldx
it spark
hadoop edu
it hadoop
it scala

[root@learning01 ~]# sed -e 's/it/edu360/g' sed.txt
sldx
edu360 spark
hadoop edu
edu360 hadoop
edu360 scala
eg: 使用sed获取机器的ip地址
注意:在对文件进行匹配的时候,^是一个文件的开始 $是一个文件的结束 
^.*addr:意思是说从开始到addr全部的内容
centos6.9系统命令
[root@learning01 ~]#  ifconfig eth0 | grep 'inet addr'| sed 's/^.*addr://g' | sed 's/  Bcast.*$//g'
centos7.7系统命令
[root@learning01 ~]#  ip addr | grep "inet " | grep "eth0" | sed 's/^.*inet //g' | sed 's/\/24.*$//g'
```

## 实战应用

#### 加密解密

```sh
# 加密
echo "hello world" | openssl enc -aes-256-cbc -md sha512 -a -pbkdf2 -iter 100000 -salt -pass pass:"abc"

# 解密
echo "U2FsdGVkX197yS6VWVN7kr8lCqshkLRmnnTzYy8I3B4=" | openssl enc -d -aes-256-cbc -md sha512 -a -pbkdf2 -iter 100000 -pass pass:"abc"
```

#### 案例一 对文件进行切割

```sh
#!/bin/bash

# 文件名: qf-split.sh
# 编写脚本，实现对文件进行切割
# 可以设置默认的切割文件路径，已经新的文件存储的路径

# 输出帮助信息
help_info() {
    echo "脚本使用帮助:"
    echo "  -f: 切分的文件"
    echo "  -d: 新的文件存储的目录"
    echo "警告：如果没有设置，将采用默认的目录"
    echo "  默认的文件路径: /root/data.log"
    echo "  默认的存储目录: /root/split/"
    exit -1
}
# 设置默认值
default() {
    echo "正在使用默认的文件路径和默认的目录"
    echo "  默认的文件路径: /root/data.log"
    echo "  默认的存储目录: /root/split/"
    # 设置默认的路径
    log_file="/root/data.log"
    data_dir="/root/split/"
}

# 读取调用脚本时候的选项
while getopts 'f:d:h' OPT; do
    case $OPT in
        f) log_file="$OPTARG";;
        d) data_dir="$OPTARG";;
        h) help_info;;
        ?) help_info;;
        *) help_info;;
    esac
done

# 判断调用脚本的时候没有传入参数，使用默认的路径
if [ $# -eq 0 ]; then
    default
fi

# 判断是否必要参数有空值
if [ ! $log_file ] || [ ! $data_dir ]; then
    echo "必要参数有空值，请设置日志路径和存储目录！"
    exit -1
fi

# 切分文件之前，先判断日志文件中是否有数据，如果有再切分，如果没有就不切分，防止切分出来很多的空文件
# 方式一：通过最后一行内容判断
#last_line=`tail -n 1 ${log_file}`
#if [ ! "$last_line" ]; then
#    echo "需要切割的文件是空的，不需要进行切分"
#    exit 0
#fi

# 方式二：通过文件大小判断
file_size=`ls -l $log_file |awk '{print $5}'`
if [ $file_size -eq 0 ]; then
    echo "需要切割的文件是空的，不需要进行切分"
    exit 0
fi

# 判断目标存储目录是否存在，如果不存在，创建这个目录
if [ ! -d "$data_dir" ]; then
    mkdir -p $data_dir
fi

# 切分文件
# mv $log_file ${data_dir}/split-data.$(date +"%s").log

# 因为有下面的问题，权宜之计
cp $log_file ${data_dir}/split-data.$(date +"%s").log
:> $log_file


# 现有问题？？？
# 移动之后，新位置的文件，仍拥有原来的inode号
# 生成日志的过程中，最常见的方式就是使用>>符号
# 但是>>是追着inode号进行输出的
# 因此，移动日志文件到新的位置后，生成的新的日志仍然会写到切割后的新的文件中
# 并且，不会在原来路径上，创建一个新的日志文件
# 怎么解决这个问题？？？
#
# 思路1:
#   不使用mv移动文件，而是使用cat的方式，
#   将日志文件中的数据拷贝到新的文件中，并清空原来的数据
#   缺点：如果数据量过大的话，这个拷贝的过程可能需要花一点时间，而在这段时间内生成的新的日志，可能就被丢弃了
#
# 思路2:
#   找到一种方式，告诉>>，需要创建一个新的文件来存储新的日志数据
#
# 个人更加推荐使用思路2，但是问题在于如何实现？

echo "done!"
```

#### 案例二 服务启停

```sh
#!/bin/bash

# 文件名: qf-servicectl.sh
# 启停服务的脚本
# 使用方式: 使用[start|stop|restart|status]命令来[启动|停止|重启|查看]指定进程
# 例如: 
# qf-servicectl.sh start mysqld
# qf-servicectl.sh status mysqld network

# 检查用户输入的参数数量是否正确，如果不正确，直接异常结束
if [ $# -lt 2 ]; then
    echo "参数不足，请输入需要操作的服务名称"
    exit -1
fi

# 检查用户输入的第一个参数，是否为指定的[start|stop|restart|status]命令
op=$1
if [ $op != "start" -a $op != "stop" -a $op != "restart" -a $op != "status" ]; then
    echo "请输入争取的命令[start|stop|restart|status]"
    exit -1
fi

# 依次启停所有的用户传入的服务
# 这里是数组切片，格式为${数组名称:起始索引:长度}，可以获取数组中指定部分的元素
# 如果没有指定长度，则获取到的是从起始索引开始到数组中的最后一位元素
services=${@:2}

for s in ${services[@]}; do
    echo "==================== $s ===================="
    systemctl $op $s
    echo ""
done
```

#### 案例三 一键安装JDK

```sh
#!/bin/bash

# 一键安装JDK的脚本
# -f: 指定jdk安装包的路径
# -d: 指定安装到的目录，默认安装在/usr/local
# -r: 对目录进行重命名

help_info() {
    echo "这个脚本可以一键安装JDK，包括配置环境变量"
    echo "  选项-f: 指定jdk安装包的路径，必选"
    echo "  选项-d: 指定安装到的目录，默认值为/usr/local，可选"
    echo "  选项-r: 安装完成后，对文件夹重命名，可选"
    exit -1
}

# 设置默认的安装目录
install_path="/usr/local"

# 读取用户输入的选项
while getopts 'f:d:r:h' OPT; do
    case $OPT in
        f) install_file="$OPTARG" ;;
        d) install_path="$OPTARG" ;;
        r) install_rename="$OPTARG" ;;
        h) help_info ;;
        ?) help_info ;;
        *) help_info ;;
    esac
done

# 判断必要选项是否缺失
if [ ! $install_file ]; then
    echo "【错误】缺少必要选项-f，请使用-f指定安装包文件"
    exit -1
fi

# 解压到指定到路径下，将解压的过程输出到指定的位置，以便获取目录
tar -zxvf $install_file -C $install_path > ./.qf-install-jdk.log 2>&1
if [ $? -ne 0 ]; then
    echo "解压失败，请检查安装包是否正确"
    exit -1
fi

# 获取解压出的文件夹的名字
dirname=`head -1 ./.qf-install-jdk.log | awk -F "/" '{print $1}'`
# 获取目录之后，这个日志就没用了，删除即可
rm -f ./.qf-install-jdk.log

# 判断是否需要重命名
if [ $install_rename ]; then
    mv $install_path/$dirname $install_path/$install_rename
    dirname=$install_rename
fi

# 配置环境变量
echo "export JAVA_HOME=$install_path/$dirname" >> /etc/profile
echo 'export PATH=$PATH:$JAVA_HOME/bin' >> /etc/profile
```

#### 案例四 对MySQL的数据进行查询

```sh
#!/bin/bash

# 对数据库的数据进行查询操作
#
# 准备MySQL数据库的HOST
host="192.168.10.101"
# 准备MySQL数据库的用户名和密码
username="root"
password="123456"

# 准备需要查询的语句
query_sql="select * from mydb.emp"

# 执行查询命令
mysql -h $host -P 3306 -u$username -p$password -e "$query_sql"
#!/bin/bash

# 对数据库中订单表的数据进行查询
# 在查询的时候，可以限制需要查询的日期，可以指定日期来做查询
# 在实际生产环境中，我们往往需要将头一天产生的所有的数据进行处理，在这里只是来做一个查询的操作

# 准备需要查询的日期，这个日期可以是在调用脚本的时候，通过参数传递
# 如果调用脚本的时候，没有设置日期，则默认使用当前日期，即查询昨天的数据
exec_date=$1
if [  "${exec_date}" ] ;then
	exec_date=`date -d "${exec_date} 1 days ago" +%Y%m%d`
else 
	exec_date=`date -d "1 days ago" +%Y%m%d`
fi 

# 准备MySQL数据库的HOST
host="192.168.10.101"
port="3306"
# 准备MySQL数据库的用户名和密码
username="root"
password="123456"

# 准备需要查询的语句
query_sql="select * from mydb.order where order_date=$exec_date"

# 执行查询命令
mysql -h $host -P $port -u$username -p$password -e "$query_sql"
```

## 作业

1. 编写Shell脚本，模拟登录

```sh
请输入用户名: 【此处输入用户名】
请输入密码: 【此处输入密码，密文输入】
【如果用户名为root，密码为123456，则提示登录成功，否则登录失败】

#!/bin/bash

read -p "请输入用户名: " USERNAME
read -p -s "请输入密码: " PASSWORD

if [ $USERNAME == "root" -a $PASSWORD == "123456" ]
then
    echo "登录成功"
else 
    echo "登录失败"
fi
```

2. 编写Shell脚本，计算100以内的偶数和

```sh
#!/bin/bash

SUM=0
for NUM in {1..100}
do
    if [ $[NUM%2] == 0 ]
    then 
        SUM=$(( $SUM + $NUM ))
    fi
done

echo $SUM
#!/bin/bash

SUM=0
for ((NUM=0;NUM<=100;NUM+=2))
do
    SUM=$(( $SUM + $NUM ))
done

echo $SUM
#!/bin/bash

NUM=0
while [ $NUM -le 100 ] 
do
    SUM=$(($SUM + $NUM))
    $NUM=$(($NUM + 2))
done
```

3. 编写shell脚本，使用循环和read命令，给一个数组NAMES赋值10个元素。当输入10个名字的时候，不再输入；或者当输入的过程中，有exit的时候，也不再输入。最后将输入中所有的元素输出。

```sh
#!/bin/bash

for COUNT in {1..10}
do
    read NAME
    if [ $NAME == "exit" ]
    then
        break
    fi
    NAMES[$COUNT]=$NAME
done

echo ${NAMES[*]}
```

4. 定义一个cal函数，可以计算任意三个数字的乘积。

```sh
#!/bin/bash

function calcu {
    echo $(( $1 * $2 * $3 ))
}

calcu $1 $2 $3
```

5. 已知 bash mvfile.sh /root /root/gzs .gz可以把/root下所有的.gz文件移动到/root/gzs中，实现这个脚本

```sh
#!/bin/bash

`find $1 -name "*$3" -exec mv {} $2 \;`
```

## 解决方案

1. 用shell脚本怎么替换字符串

```sh
vi /home/test/rep.sh
#!/bin/bash

ori_str=$1
rep_str=$2
grep_word=$3
file_dir=$4
sed -i "s/${ori_str}/${rep_str}/g" `grep "$grep_word" -rl $4`  #数据源未目录或者文件即可

测试：
[root@hadoop01 test]# chmod a+x /home/test/rep.sh
[root@hadoop01 test]# ./rep.sh abc 123 abc /home/test/
```

2. shell脚本编程：将select max(id) from table的值赋值到一个变量中；

```sh
vi /home/test/my.sh
#!/bin/bash

mysql_var=`mysql --skip-column-names -uroot -proot -e "use test;select max(id) from stu"`
echo $mysql_var

测试:
chmod a+x /home/test/my.sh
/home/test/my.sh  运行脚本
```

3. shell脚本编程：将mysql数据库中五个库中的五张表合并到一张表中，表的结构都相同；

```sh
vi /home/test/mm.sh
#!/bin/bash

`mysql --skip-column-names -uroot -proot -e "insert into test.a1(id,name) select from ( select id,name from test1.a1 union all select id,name from test2.a1 union all select id,name from test3.a1 union all select id,name from test4.a1 union all select id,name from test5.a1)"`


测试:
chmod a+x /home/test/mm.sh
/home/test/mm.sh  运行脚本
```


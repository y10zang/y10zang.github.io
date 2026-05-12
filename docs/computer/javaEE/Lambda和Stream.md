# Effective Java》第9篇：Lambda和Stream的现代编程

link:  https://mp.weixin.qq.com/s/D5EkyQPsMssHLmoFOPleaw

Java 8引入的Lambda表达式和Stream API彻底改变了Java编程的方式。《Effective Java》第三版新增了相关建议，帮助开发者充分利用这些现代特性。今天，我们深入探讨Lambda和Stream的最佳实践。

### Lambda表达式：函数式编程的入口

《Effective Java》第42-44条建议专门讨论Lambda和函数式接口的使用。

#### Lambda表达式的核心价值

1. 简洁性：减少样板代码
2. 可读性：表达意图更清晰
3. 灵活性：支持行为参数化
4. 并行性：为并行计算奠定基础

#### 函数式接口：Lambda的类型

函数式接口是只有一个抽象方法的接口。Java 8提供了`java.util.function`包包含常用函数式接口：

四大核心函数式接口

+ `Function<T,R>`：接受`T`参数，返回`R`结果
+ `Consumer`：接受`T`参数，无返回值
+ `Supplier`：无参数，返回`T`结果
+ `Predicate`：接受`T`参数，返回`boolean`

特殊化的函数式接口

+ `IntFunction<R>`：接受`int`参数
+ `ToIntFunction<T>`：返回`int`结果
+ `BiFunction<T,U,R>`：接受两个参数
+ `UnaryOperator<T>`：`Function`的特化，参数和返回类型相同

#### Lambda使用最佳实践

1. 保持Lambda简洁

```java
// 简洁的Lambda
names.forEach(name -> System.out.println(name));

// 过于复杂的Lambda（应该提取为方法）
names.forEach(name -> {
    String processed = processName(name);
    if (isValid(processed)) {
        save(processed);
    }
});
```

2. 使用方法引用

当Lambda只是调用现有方法时，使用方法引用：

```java
// Lambda表达式
names.forEach(name -> System.out.println(name));

// 方法引用（更简洁）
names.forEach(System.out::println);
```

3. 避免修改外部变量

Lambda应尽可能纯净，避免副作用：

```java
// 错误：修改外部变量
List<String> result = new ArrayList<>();
names.forEach(name -> {
    if (name.startsWith("A")) {
        result.add(name);  // 修改外部变量
    }
});

// 正确：使用Stream API
List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))
    .collect(Collectors.toList());
```

### Stream API：声明式数据处理

《Effective Java》第45-48条建议讨论Stream的正确使用。

#### Stream的核心概念

1. 流与集合的区别

+ 集合：存储和访问元素的数据结构
+ 流：对数据的计算操作，不存储数据
+ 流是惰性的：只有终端操作时才会执行

2. 流操作分类

+ 中间操作：返回新流，如filter, map, sorted

+ 终端操作：产生结果或副作用，如forEach, collect, reduce

#### Stream使用模式

1. 过滤和映射

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// 过滤以A开头的名字，转换为大写
List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

2. 查找和匹配

```java
boolean anyStartsWithA = names.stream()
    .anyMatch(name -> name.startsWith("A"));

Optional<String> firstA = names.stream()
    .filter(name -> name.startsWith("A"))
    .findFirst();
```

3. 归约操作

```java
// 求和
int sum = numbers.stream()
    .reduce(0, Integer::sum);

// 连接字符串
String concatenated = names.stream()
    .reduce("", (a, b) -> a + ", " + b);
```

#### 并行流：谨慎使用

《Effective Java》第48条建议："谨慎使用并行流"。

并行流的适用场景

+ 数据量足够大
+ 操作是CPU密集型
+ 流源易于分割（如ArrayList）
+ 中间操作不影响并行性

并行流的陷阱

+ 性能可能更差：小数据量时开销大
+ 线程安全问题：非线程安全的操作
+ 顺序依赖：有状态的操作可能出错
+ 调试困难：非确定性行为

正确使用并行流

```java
// 适合并行：数据量大，无状态操作
long count = largeList.parallelStream()
    .filter(item -> item.isValid())
    .count();

// 不适合并行：有状态操作，顺序重要
List<Integer> sorted = list.parallelStream()
    .sorted()  // 排序需要全局状态
    .collect(Collectors.toList());
```

### 现代编程模式

#### 1. 函数式设计模式

策略模式（函数式版本）

```java
// 传统策略模式需要多个类
// 函数式版本：使用函数式接口
public class Validator {
    private final Predicate<String> strategy;
    
    public Validator(Predicate<String> strategy) {
        this.strategy = strategy;
    }
    
    public boolean validate(String input) {
        return strategy.test(input);
    }
}

// 使用
Validator numericValidator=new Validator(s -> s.matches("\\d+"));
Validator lowercaseValidator=new Validator(s -> s.matches("[a-z]+"));
```

模板方法模式（函数式版本）

```java
public classProcessor {
    publicvoidprocess(Supplier<Data> supplier,
                        Function<Data, Result> transformer,
                        Consumer<Result> consumer) {
        Datadata= supplier.get();
        Resultresult= transformer.apply(data);
        consumer.accept(result);
    }
}
```

#### 2. 惰性求值模式

```java
public class Lazy<T> {
    private Supplier<T> supplier;
    private T value;
    
    publicLazy(Supplier<T> supplier) {
        this.supplier = supplier;
    }
    
    public T get() {
        if (supplier != null) {
            value = supplier.get();
            supplier = null;
        }
        return value;
    }
}
```

### 性能优化技巧

#### 1. 避免装箱拆箱

```java
// 错误：频繁装箱拆箱
IntStream.range(0, 1000)
    .boxed()  // 装箱为Integer
    .map(i -> i * 2)  // 拆箱计算，再装箱
    .collect(Collectors.toList());

// 正确：使用原始类型流
IntStream.range(0, 1000)
    .map(i -> i * 2)
    .toArray();
```

#### 2. 短路操作优化

```java
// 使用短路操作提前终止
boolean hasMatch = largeList.stream()
    .filter(item -> expensiveCheck(item))
    .findAny()  // 找到第一个就返回
    .isPresent();
```

#### 3. 重用流

避免重复创建流：

```java
// 错误：重复创建流
long count1= list.stream().filter(predicate1).count();
long count2= list.stream().filter(predicate2).count();

// 正确：重用流
Stream<String> stream = list.stream();
long count1= stream.filter(predicate1).count();
// 注意：流只能使用一次，需要重新创建
stream = list.stream();
long count2= stream.filter(predicate2).count();
```

### 测试策略

#### 1. Lambda测试

+ 测试函数式接口的实现
+ 验证Lambda的行为
+ 测试边界条件

#### 2. Stream测试

+ 测试中间操作链
+ 验证终端操作结果
+ 测试并行流行为

#### 3. 性能测试

+ 比较Stream与传统循环性能
+ 测试并行流加速比
+ 监控内存使用

### 常见陷阱与解决方案

#### 陷阱1：异常处理

```java
// Lambda中异常处理困难
list.forEach(item -> {
    try {
        process(item);
    } catch (Exception e) {
        // 处理异常
    }
});
```

解决方案

```java
// 提取为方法
list.forEach(this::safeProcess);

private void safeProcess(Item item) {
    try {
        process(item);
    } catch (Exception e) {
        handleError(e);
    }
}
```

#### 陷阱2：状态修改

避免在Lambda中修改外部状态。

#### 陷阱3：无限流

注意无限流的终止条件。

### 结语

Lambda和Stream是Java现代化的重要里程碑。它们不仅提供了更简洁的语法，更重要的是引入了函数式编程的思想。

记住《Effective Java》的核心建议：

+ 优先使用函数式接口和Lambda
+ 合理使用Stream API
+ 谨慎使用并行流
+ 保持代码的简洁性和可读性

在实践中，要平衡函数式编程和命令式编程的优点。不是所有场景都适合使用Lambda和Stream，选择最适合的工具解决问题。

实践建议：

1. 逐步将旧代码重构为使用Lambda和Stream
2. 学习函数式编程思想
3. 性能敏感代码要进行基准测试
4. 在团队中建立使用规范

Lambda和Stream不是银弹，但正确使用它们可以显著提升代码质量和开发效率。






















































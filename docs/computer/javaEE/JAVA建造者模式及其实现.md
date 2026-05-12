# JAVA建造者模式及其实现

link: `https://blog.51cto.com/u_14987/14573089`

建造者模式（Builder Pattern）是一种创建型设计模式，它将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。其核心在于分步构建一个复杂对象，并允许通过相同的构建过程产生不同类型或配置的对象。

### 一、模式结构与核心角色

建造者模式通常包含以下四个核心角色，它们协同工作以完成对象的构造。

|角色|职责|说明|
|---|---|---|
|产品 (Product)|最终要构建的复杂对象。|包含多个部件，由建造者逐步装配而成。|
|抽象建造者 (Builder)|声明创建产品各个部件的抽象接口。|定义了构建产品所需的所有步骤，通常包含一个返回最终产品的方法(如 `getResult()`)|
|具体建造者 (Concrete Builder)|实现 `Builder` 接口，定义并追踪它所创建的产品表示。|提供各部件的具体构建和装配实现，并负责返回组装好的产品。|
|指挥者 (Director)|负责安排复杂对象的构建次序。|它隔离了客户与对象的生产过程。客户端通过指挥者，使用特定的建造者来构建产品。此角色有时可以省略，由客户端直接操作建造者。|

### 二、实现原理与典型用法

建造者模式的运作原理是：客户端不直接实例化复杂的产品对象，而是通过创建一个指挥者对象并配置一个具体建造者对象。指挥者指导建造者执行一系列构建步骤。建造者会逐步处理这些请求，并最终返回组装完成的产品。

在Java中，建造者模式有两种常见实现形式：

经典实现：严格遵循上述四个角色，适用于构建过程复杂且固定，产品种类多样的场景。

链式调用（变种）：通常省略`Director`角色，并将`Builder`作为产品类的静态内部类。通过链式方法调用（`return this`）来设置属性，最后调用`build()`方法返回产品。这种方式在构建具有多个可选参数的对象时非常流行，能有效避免构造方法参数过多（“伸缩构造器模式”的缺陷）和`JavaBean`模式的不一致状态问题。

### 三、完整代码示例：构建肯德基套餐

以下通过构建一个肯德基套餐的例子，展示经典实现和链式调用实现两种方式。

示例1：经典实现（包含指挥者）

```java
// 1. 产品类：套餐 (Product)
class MealCombo {
    private String mainFood; // 主食
    private String sideFood; // 小食
    private String drink;    // 饮料
    private String toy;      // 玩具

    public void setMainFood(String mainFood) { this.mainFood = mainFood; }
    public void setSideFood(String sideFood) { this.sideFood = sideFood; }
    public void setDrink(String drink) { this.drink = drink; }
    public void setToy(String toy) { this.toy = toy; }

    @Override
    public String toString() {
        return "套餐包含：【主食】" + mainFood + "，【小食】" + sideFood + "，【饮料】" + drink + "，【玩具】" + toy;
    }
}

// 2. 抽象建造者 (Builder)
interface MealBuilder {
    void buildMainFood();
    void buildSideFood();
    void buildDrink();
    void buildToy();
    MealCombo getMeal();
}

// 3. 具体建造者：儿童套餐建造者 (Concrete Builder)
class KidsMealBuilder implements MealBuilder {
    private MealCombo meal;

    public KidsMealBuilder() {
        this.meal = new MealCombo();
    }

    @Override
    public void buildMainFood() {
        meal.setMainFood("迷你汉堡");
    }
    @Override
    public void buildSideFood() {
        meal.setSideFood("小份薯条");
    }
    @Override
    public void buildDrink() {
        meal.setDrink("橙汁");
    }
    @Override
    public void buildToy() {
        meal.setToy("卡通玩具");
    }
    @Override
    public MealCombo getMeal() {
        return this.meal;
    }
}

// 4. 具体建造者：超值套餐建造者 (Concrete Builder)
class ValueMealBuilder implements MealBuilder {
    private MealCombo meal;
    public ValueMealBuilder() { this.meal = new MealCombo(); }
    @Override public void buildMainFood() { meal.setMainFood("劲脆鸡腿堡"); }
    @Override public void buildSideFood() { meal.setSideFood("大份薯条"); }
    @Override public void buildDrink() { meal.setDrink("可乐"); }
    @Override public void buildToy() { meal.setToy("无"); } // 超值套餐没有玩具
    @Override public MealCombo getMeal() { return this.meal; }
}

// 5. 指挥者 (Director)
class MealDirector {
    private MealBuilder builder;
    public void setBuilder(MealBuilder builder) {
        this.builder = builder;
    }
    // 指挥构建过程
    public MealCombo construct() {
        builder.buildMainFood();
        builder.buildSideFood();
        builder.buildDrink();
        builder.buildToy();
        return builder.getMeal();
    }
}

// 6. 客户端使用
public class BuilderPatternDemo {
    public static void main(String[] args) {
        MealDirector director = new MealDirector();

        // 构建儿童套餐
        MealBuilder kidsBuilder = new KidsMealBuilder();
        director.setBuilder(kidsBuilder);
        MealCombo kidsMeal = director.construct();
        System.out.println("儿童套餐：" + kidsMeal);

        // 构建超值套餐
        MealBuilder valueBuilder = new ValueMealBuilder();
        director.setBuilder(valueBuilder);
        MealCombo valueMeal = director.construct();
        System.out.println("超值套餐：" + valueMeal);
        // 输出：
        // 儿童套餐：套餐包含：【主食】迷你汉堡，【小食】小份薯条，【饮料】橙汁，【玩具】卡通玩具
        // 超值套餐：套餐包含：【主食】劲脆鸡腿堡，【小食】大份薯条，【饮料】可乐，【玩具】无
    }
}
```

示例2：链式调用实现（常用变种）

这种形式在Java开发中更为常见，尤其适用于配置对象。

```java
// 产品类
class Computer {
    private String cpu;
    private String gpu;
    private int ram; // GB
    private int ssd; // GB

    // 私有构造方法，只能通过Builder构建
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.gpu = builder.gpu;
        this.ram = builder.ram;
        this.ssd = builder.ssd;
    }

    @Override
    public String toString() {
        return "Computer [CPU=" + cpu + ", GPU=" + gpu + ", RAM=" + ram + "GB, SSD=" + ssd + "GB]";
    }

    // 静态内部类：建造者
    public static class Builder {
        // 必需参数（通常用final修饰，通过构造方法传入）
        private final String cpu;
        private final String gpu;
        // 可选参数（提供默认值）
        private int ram = 16;
        private int ssd = 512;

        // 建造者的构造方法，传入必需参数
        public Builder(String cpu, String gpu) {
            this.cpu = cpu;
            this.gpu = gpu;
        }

        // 设置可选参数的方法，返回Builder本身以实现链式调用
        public Builder ram(int ram) {
            this.ram = ram;
            return this;
        }
        public Builder ssd(int ssd) {
            this.ssd = ssd;
            return this;
        }

        // 最终的构建方法，返回产品对象
        public Computer build() {
            // 可以在此处添加参数校验逻辑
            if (ram &lt;= 0 || ssd &lt;= 0) {
                throw new IllegalArgumentException("RAM和SSD容量必须为正数");
            }
            return new Computer(this);
        }
    }
}

// 客户端使用
public class BuilderPatternChainDemo {
    public static void main(String[] args) {
        // 链式调用，清晰且灵活地构建对象
        Computer gamingPC = new Computer.Builder("Intel i7", "NVIDIA RTX 4070")
                .ram(32)    // 可选：设置RAM
                .ssd(1024)  // 可选：设置SSD
                .build();    // 最终构建

        Computer officePC = new Computer.Builder("Intel i5", "Integrated Graphics")
                // 使用默认的RAM(16)和SSD(512)
                .build();

        System.out.println("游戏电脑：" + gamingPC);
        System.out.println("办公电脑：" + officePC);
        // 输出：
        // 游戏电脑：Computer [CPU=Intel i7, GPU=NVIDIA RTX 4070, RAM=32GB, SSD=1024GB]
        // 办公电脑：Computer [CPU=Intel i5, GPU=Integrated Graphics, RAM=16GB, SSD=512GB]
    }
}
```

### 四、模式的优缺点与适用场景

优点：

良好的封装性：将复杂对象的构建过程封装在建造者和指挥者中，客户端无需知道内部细节。

构建过程易于控制：由于建造者是分步构建产品的，因此可以对构建过程进行更精细的控制。

解耦构建与表示：将对象的构建算法（指挥者）与部件的具体实现（具体建造者）分离，使得构建算法可以复用，且增加新的具体建造者很容易，符合开闭原则。

解决“重叠构造器”问题：链式调用变种能优雅地处理具有大量可选参数的对象的构造，代码可读性和易用性高。

可以构建不可变对象：通过建造者一次性设置所有属性，然后在`build()`方法中创建不可变对象，保证了对象状态的一致性。

缺点：

增加系统复杂度：引入了多个新的类，对于简单对象的创建，使用建造者模式会使系统变得复杂。

产品需要具有共性：如果产品之间的差异性很大，则不适合使用建造者模式。

适用场景：

|场景|说明|
|---|---|
|创建具有复杂内部结构的对象|对象包含多个成员变量，且这些变量本身也可能是复杂对象。|
|创建对象的算法应独立于该对象的组成部分|构建过程需要稳定，但组成的部件可以灵活变化。|
|构造过程必须允许被构造的对象有不同的表示|例如，同样的组装步骤（指挥者逻辑）可以构建出不同品牌或配置的电脑。|
|避免"重叠构造器"(Telescoping Constructor)|当一个类有大量可选参数时，使用建造者模式（尤其是链式变种）比编写多个构造方法更清晰。|

### 五、与工厂模式、抽象工厂模式的对比

建造者模式与工厂模式都属于创建型模式，但关注点不同。

|对比维度|建造者模式 (Builder)|工厂方法模式 (Factory Method)|抽象工厂模式 (Abstract Factory)|
|---|---|---|---|
|核心目的|分步构造一个复杂对象，控制其构建过程。|创建单一产品，将实例化延迟到子类。|创建一系列相关或依赖的产品（产品族）。|
|关注点|对象的构建过程和组成部分。|对象的创建时机和类型。|产品家族的创建和兼容性。|
|产品复杂度|构建的产品通常内部结构复杂，由多个部分组成。|构建的产品相对简单、独立。|构建的是一组产品，每个产品本身可能简单或复杂。|
构建方式|分步骤、渐进式地构建最终产品。|一步到位，直接返回完整产品。|一步到位，返回一个完整的产品族。|
|典型应用|创建配置对象（如AlertDialog.Builder）、复杂DTO、套餐组合。|连接池中的连接创建、日志记录器的创建。|跨平台UI组件库、数据库访问套件。|

在实际框架中，建造者模式应用广泛。例如，在 `MyBatis` 中，`SqlSessionFactoryBuilder` 就使用了建造者模式来构建复杂的 `SqlSessionFactory` 对象。Java标准库中的 `StringBuilder` 和 `StringBuffer` 虽然不是严格意义上的`Gof`建造者模式，但其渐进式构建的思想是相通的。而在Android开发中，`AlertDialog.Builder` 是链式调用建造者模式的经典范例。


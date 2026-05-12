# AQS 是什么？为什么 Java 并发大厦的地基是它？

### 问题（引发思考）

你用过 `ReentrantLock`、`CountDownLatch`、`Semaphore`、`CyclicBarrier`……但你有没有想过：这些看似功能迥异的工具，底层凭什么都能如此可靠地工作？

来看一个真实场景：

线上某个核心接口，高峰期并发量上千，使用 `synchronized` 加锁后 CPU 飙到 90%，改成 `ReentrantLock` 后稳定了——但你的 Leader 问你："为什么 `ReentrantLock` 比 `synchronized` 更适合高并发？底层原理是什么？"

你能答出来吗？

答案的关键词只有三个字母：AQS。

### 解答（核心内容）

#### 1. 原理解释：AQS 是什么？

AQS（AbstractQueuedSynchronizer） 是 `java.util.concurrent.locks` 包的核心基础类，由 Doug Lea 设计。它用一个 int 类型的 state 变量 + 一个 CLH 变体双向队列 实现了线程的阻塞与唤醒调度。

核心结构：

```
                  state (volatile int)
                           |
    ┌──────────────────────┴────────────────────────┐
    │   Node ←→ Node ←→ Node   ← CLH 等待队列
    │  (waitStatus, prev, next, thread)
    └───────────────────────────────────────────────┘
```

state 语义由子类定义：

- `ReentrantLock`：`0=`无锁，`1+=`重入次数
- `Semaphore`：剩余许可数
- `CountDownLatch`：剩余计数

#### 2. 加锁流程：以 `ReentrantLock` 为例

```java
ReentrantLock lock = new ReentrantLock();
lock.lock(); // 底层调用 AQS.acquire(1)
try {
    // 业务代码
} finally {
    lock.unlock(); // 底层调用 AQS.release(1)
}
```

acquire(1) 执行逻辑：

```java
public final void acquire(int arg) {
    if (!tryAcquire(arg) &&        // 尝试 CAS 设置 state，失败则入队
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg)) // 自旋/阻塞等待
        selfInterrupt();
}
```

关键步骤：

1. `tryAcquire`：CAS 尝试将 state 从 0 改为 1，成功即获锁
2. 失败则 `addWaiter`：将当前线程封装为 Node 加入队尾
3. `acquireQueued`：自旋检查前驱是否为 head，是则再次 tryAcquire，否则调用 `LockSupport.park()` 阻塞

唤醒时： `release` → `tryRelease` 将 state 减到 `0` → `unparkSuccessor` 唤醒队列 head 的后继节点。

#### 3. 示例说明：公平锁 vs 非公平锁

```java
// 非公平锁（默认）：新来的线程可以直接插队抢锁
ReentrantLock unfairLock = new ReentrantLock(false);

// 公平锁：严格按照队列顺序
ReentrantLock fairLock = new ReentrantLock(true);
```

非公平锁的 `tryAcquire`：直接 CAS 抢，不管队列。
公平锁的 `tryAcquire`：先 hasQueuedPredecessors() 检查队列，有等待者就乖乖排队。

业务场景建议： 绝大多数场景用非公平锁，因为线程上下文切换成本高，非公平锁减少了不必要的切换，吞吐量更高。

#### 4. 常见误区

❌ 误区1：AQS 就是自旋锁

不对。AQS 在自旋失败后会调用 `LockSupport.park()` 真正阻塞线程，而非无限自旋浪费 CPU。自旋只是入队前的短暂尝试。

❌ 误区2：公平锁一定比非公平锁好

恰恰相反。公平锁保证顺序，但吞吐量往往更低——频繁地唤醒-挂起线程开销极大。除非业务对顺序有强需求，否则别用公平锁。

❌ 误区3：`ReentrantLock` 一定比 `synchronized` 快

JDK 6+ 后 `synchronized` 有锁升级（偏向锁→轻量级锁→重量级锁），低竞争下性能差距很小。`ReentrantLock` 的优势在于：可中断、可超时、可实现公平锁、可绑定多个 Condition。

#### 5. 最佳实践

```java
// ✅ 正确写法：lock 放 try 外，unlock 放 finally
lock.lock();
try {
    doSomething();
} finally {
    lock.unlock(); // 必须在 finally，否则异常时永久死锁
}

// ✅ 可中断锁：避免永久阻塞
if (lock.tryLock(500, TimeUnit.MILLISECONDS)) {
    try { ... } finally { lock.unlock(); }
} else {
    // 降级处理或返回失败
}
```

### 延伸思考（加分项）

面试常见追问：

- "CLH 队列为什么用双向链表？"→ 释放锁时需要找后继节点，单向链表无法 O(1) 完成取消操作
- "Node 的 waitStatus 有哪些值？"→ CANCELLED(1)、SIGNAL(-1)、CONDITION(-2)、PROPAGATE(-3)
- "ReentrantReadWriteLock 如何用 AQS？"→ 高16位存读锁数量，低16位存写锁重入次数，一个 state 表达两种语义

如何在项目中落地：

- 对于高竞争读多写少场景，优先考虑 `ReentrantReadWriteLock` 或 `StampedLock`（乐观读性能更强）
- JDK 21 虚拟线程出现后，阻塞操作代价大幅降低，但 AQS 依然是理解 Java 并发的基础——虚拟线程本身的调度也借鉴了类似机制

一句话总结： `AQS = volatile state + CAS + CLH 队列 + LockSupport`，用最小的原语撑起了 Java 并发工具的半壁江山。搞懂它，再看 JUC 里任何锁，都会有"原来如此"的爽感。

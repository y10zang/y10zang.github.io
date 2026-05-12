# Kafka实战指南

link: `https://mp.weixin.qq.com/s/5hgJKKNMmHYj6XURs4eyeA?`

### 前言

Kafka是一个分布式流处理平台，以高吞吐量、可扩展性和持久化存储著称。它最初由LinkedIn开发，用于处理海量的用户行为数据和日志，现在已经成为大数据领域的事实标准。

与RabbitMQ相比，Kafka的设计理念完全不同。RabbitMQ追求功能的丰富性和灵活性，而Kafka追求极致的性能和可扩展性。如果说RabbitMQ是一个多功能的瑞士军刀，那么Kafka就是一把专门为高吞吐量场景打造的利剑。

本文将深入讲解Kafka的核心概念和实战应用。我们不仅会学习Kafka的架构原理，更会通过大量实战案例，让你真正掌握Kafka在生产环境中的使用。

### 一、Kafka核心概念

#### 1.1 基本组件

Kafka的架构设计非常精妙，它通过分区（Partition）和副本（Replica）机制，实现了高吞吐量和高可用性的完美结合。理解这些核心组件，是掌握Kafka的第一步。

核心角色:

• Producer(生产者):发送消息到Kafka的应用程序。生产者负责选择消息发送到哪个分区

• Consumer(消费者):从Kafka读取消息的应用程序。消费者可以订阅一个或多个Topic

• Broker(代理):Kafka服务器节点。一个Kafka集群由多个Broker组成，每个Broker可以存储多个Topic的分区

• Topic(主题):消息的分类，类似于数据库中的表。生产者发送消息到Topic，消费者从Topic读取消息

• Partition(分区):Topic的物理分组。一个Topic可以分为多个Partition，每个Partition是一个有序的消息队列。分区是Kafka实现高吞吐量的关键

• Consumer Group(消费者组):多个消费者组成的组。同一个消费者组内的消费者共同消费一个Topic，每条消息只会被组内的一个消费者消费

• Offset(偏移量):消息在分区中的位置，是一个递增的整数。通过Offset，消费者可以知道自己消费到了哪里

#### 1.2 消息流转过程

Kafka的消息流转过程与RabbitMQ有很大不同。Kafka没有Exchange的概念，消息的路由非常简单直接。

```
Producer → Topic(Partition 0, 1, 2) → Consumer Group
                                        ├─ Consumer 1
                                        ├─ Consumer 2
                                        └─ Consumer 3
```

详细流程:

1. Producer发送消息到Topic的某个Partition
2. 消息追加到Partition的末尾（顺序写入）
3. Consumer从Partition读取消息（顺序读取）
4. Consumer提交Offset记录消费位置
5. 消息不会被删除，会保留一段时间（根据配置）

这个设计有几个重要特点：

特点1：顺序写入

Kafka将消息顺序追加到Partition的末尾，这是一种非常高效的磁盘操作。现代操作系统对顺序写入做了大量优化，性能可以接近内存操作。这是Kafka能够实现高吞吐量的关键原因之一。

特点2：消息不删除

与RabbitMQ不同，Kafka的消息被消费后不会立即删除，而是会保留一段时间（比如7天）。这带来了两个好处：一是支持消息回溯，二是支持多个消费者组独立消费同一份数据。

特点3：消费者主动拉取

Kafka采用消费者主动拉取（Pull）的模式，而不是服务器推送（Push）。这样消费者可以根据自己的处理能力控制消费速度，避免被压垮。

#### 1.3 分区机制

分区是Kafka最重要的概念之一，理解分区机制对于用好Kafka至关重要。

为什么需要分区:

原因1：提高并行度

一个Topic可以有多个分区，每个分区可以被不同的消费者并行消费。假设一个Topic有10个分区，我们可以启动10个消费者并行处理，吞吐量提升10倍。

原因2：提高吞吐量

多个分区可以分布在不同的Broker上，这样读写操作可以分散到多台服务器，充分利用集群的资源。

原因3：实现负载均衡

通过合理的分区策略，我们可以将消息均匀分布到各个分区，避免某个分区成为瓶颈。

分区策略:

```
1. 轮询(Round-Robin):默认策略,均匀分配
   - 如果没有指定Key，Kafka会使用轮询策略
   - 消息会依次发送到Partition 0, 1, 2, 0, 1, 2...
   - 优点：负载均衡效果好
   - 缺点：无法保证消息顺序

2. 按Key分区:相同Key的消息发送到同一分区
   - 如果指定了Key，Kafka会对Key进行hash，然后对分区数取模
   - 相同Key的消息一定会发送到同一个分区
   - 优点：保证了相同Key的消息顺序
   - 缺点：如果Key分布不均匀，可能导致某些分区负载过高
   - 应用：订单消息使用orderId作为Key，保证同一订单的消息有序

3. 自定义分区:实现Partitioner接口
   - 可以根据业务需求实现自定义的分区逻辑
   - 比如：VIP用户的消息发送到特定分区，优先处理
   - 比如：根据地域分区，方便数据分析
```

选择合适的分区策略非常重要。如果你需要保证消息顺序，就必须使用按Key分区；如果只是追求高吞吐量，轮询策略就足够了。

### 二、Kafka架构原理

理解Kafka的架构原理，可以帮助你更好地使用Kafka，也能在出现问题时快速定位原因。

#### 2.1 集群架构

Kafka是一个分布式系统，它通过集群的方式提供高可用性和高吞吐量。一个典型的Kafka集群包含多个Broker，每个Broker存储部分数据。

```
┌─────────────────────────────────────────┐
│         Kafka Cluster                    │
├─────────────────────────────────────────┤
│  Broker 1    Broker 2    Broker 3       │
│  ┌──────┐   ┌──────┐   ┌──────┐        │
│  │Topic │   │Topic │   │Topic │        │
│  │ P0-L │   │ P1-L │   │ P2-L │        │
│  │ P1-F │   │ P2-F │   │ P0-F │        │
│  └──────┘   └──────┘   └──────┘        │
└─────────────────────────────────────────┘
         ↑
    ZooKeeper/KRaft
    (元数据管理)

P0-L = Partition 0 Leader（主副本）
P1-F = Partition 1 Follower（从副本）
```

这个架构图展示了Kafka集群的核心设计：

设计要点1：分区分布

一个Topic的多个分区会分布在不同的Broker上。比如Topic有3个分区，3个Broker，那么每个Broker存储一个分区。这样读写操作可以分散到多台服务器，充分利用集群资源。

设计要点2：副本机制

每个分区都有多个副本（Replica），分布在不同的Broker上。一个是Leader副本，负责处理读写请求；其他是Follower副本，负责同步Leader的数据。如果Leader所在的Broker宕机，Follower可以被选举为新的Leader，保证服务不中断。

设计要点3：元数据管理

Kafka使用ZooKeeper（或新版本的KRaft）来管理集群元数据，包括Broker列表、Topic配置、分区Leader信息等。这些元数据对于集群的正常运行至关重要。

#### 2.2 副本机制

副本机制是Kafka实现高可用的关键。理解副本机制，可以帮助你设计出更可靠的系统。

副本类型:

• Leader副本:处理所有的读写请求。每个分区只有一个Leader副本

• Follower副本:同步Leader的数据，作为备份。Follower不处理客户端请求，只负责数据同步

ISR(In-Sync Replicas)机制:

ISR是Kafka副本机制的核心概念，它表示"与Leader保持同步的副本集合"。

为什么需要ISR:

假设一个分区有3个副本，如果要求所有副本都同步完成才算写入成功，那么只要有一个副本出现问题（比如网络延迟），整个写入就会失败。这样可用性太差。

但如果只要Leader写入成功就算成功，那么如果Leader宕机，可能会丢失数据。

ISR机制在可用性和可靠性之间取得了平衡：只有ISR中的副本才被认为是"可靠的"，只有ISR中的副本才能被选举为Leader。

ISR的动态调整:

• 如果一个Follower落后太多（超过`replica.lag.time.max.ms`），会被踢出ISR

• 如果Follower追上了Leader，会被重新加入ISR

• 生产者可以配置`acks=all`，表示等待所有ISR中的副本都确认

#### 2.3 消费者组

消费者组是Kafka实现高吞吐量消费的关键机制。理解消费者组，可以帮助你设计出高效的消费架构。

核心特点:

• 同一消费者组内，每条消息只被一个消费者消费（负载均衡）

• 不同消费者组，每条消息都会被消费（广播）

• 分区数决定了消费者组内的最大并行度

工作原理:

```
Topic (3个分区)
├─ Partition 0 → Consumer 1 (Group A)
├─ Partition 1 → Consumer 2 (Group A)
└─ Partition 2 → Consumer 3 (Group A)

同一Topic
├─ Partition 0 → Consumer 1 (Group B)
├─ Partition 1 → Consumer 2 (Group B)
└─ Partition 2 → Consumer 3 (Group B)
```

### 三、Spring Boot集成Kafka

#### 3.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

#### 3.2 配置文件

```yml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    # 生产者配置
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      acks: all  # 所有副本确认
      retries: 3  # 重试次数
      batch-size: 16384  # 批量大小
      buffer-memory: 33554432  # 缓冲区大小
    # 消费者配置
    consumer:
      group-id: my-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      auto-offset-reset: earliest  # 从最早的消息开始消费
      enable-auto-commit: false  # 手动提交offset
      max-poll-records: 500  # 每次拉取最大记录数
      properties:
        spring.json.trusted.packages: "*"
    # 监听器配置
    listener:
      ack-mode: manual  # 手动确认
      concurrency: 3  # 并发数
```

#### 3.3 基本使用

```java
// 消息实体
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderMessage {
    private Long orderId;
    private String userId;
    private BigDecimal amount;
    private LocalDateTime createTime;
}
```

```java
// 生产者
@Service
@Slf4j
public class KafkaProducerService {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void sendMessage(String topic, Object message) {
        kafkaTemplate.send(topic, message)
            .addCallback(
                result -> log.info("消息发送成功:{}", result.getProducerRecord().value()),
                ex -> log.error("消息发送失败", ex)
            );
    }
    
    // 指定分区发送
    public void sendToPartition(String topic, int partition, String key, Object message) {
        kafkaTemplate.send(topic, partition, key, message);
    }
    
    // 同步发送
    public void sendSync(String topic, Object message) throws Exception {
        SendResult<String, Object> result = kafkaTemplate.send(topic, message).get();
        log.info("同步发送成功:{}", result.getRecordMetadata().offset());
    }
}
```

```java
// 消费者
@Component
@Slf4j
public class KafkaConsumerService {
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consumeOrder(OrderMessage message) {
        log.info("收到订单消息:{}", message);
        // 处理订单
    }
    
    // 手动提交offset
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consumeWithManualAck(
            ConsumerRecord<String, OrderMessage> record,
            Acknowledgment ack) {
        try {
            log.info("消费消息:partition={}, offset={}, value={}", 
                record.partition(), record.offset(), record.value());
            
            // 处理消息
            processMessage(record.value());
            
            // 手动提交offset
            ack.acknowledge();
            
        } catch (Exception e) {
            log.error("消息处理失败", e);
            // 不提交offset,下次重新消费
        }
    }
    
    // 批量消费
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consumeBatch(List<ConsumerRecord<String, OrderMessage>> records,
                            Acknowledgment ack) {
        log.info("批量消费消息数量:{}", records.size());
        
        for (ConsumerRecord<String, OrderMessage> record : records) {
            processMessage(record.value());
        }
        
        // 批量提交
        ack.acknowledge();
    }
    
    private void processMessage(OrderMessage message) {
        // 处理逻辑
    }
}
```

### 四、生产者最佳实践

#### 4.1 消息发送确认(acks)

```java
@Configuration
public class KafkaProducerConfig {
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        
        // acks配置
        // acks=0: 不等待确认,最快但可能丢失
        // acks=1: 等待Leader确认,平衡性能和可靠性
        // acks=all/-1: 等待所有ISR确认,最可靠但最慢
        config.put(ProducerConfig.ACKS_CONFIG, "all");
        
        // 重试配置
        config.put(ProducerConfig.RETRIES_CONFIG, 3);
        config.put(ProducerConfig.RETRY_BACKOFF_MS_CONFIG, 1000);
        
        // 幂等性配置
        config.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        
        return new DefaultKafkaProducerFactory<>(config);
    }
}
```

#### 4.2 分区策略

```java
// 自定义分区器
public class CustomPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, 
                        Object value, byte[] valueBytes, Cluster cluster) {
        List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);
        int numPartitions = partitions.size();
        
        if (key == null) {
            // 轮询
            return ThreadLocalRandom.current().nextInt(numPartitions);
        }
        
        // 按key的hash分区
        return Math.abs(key.hashCode()) % numPartitions;
    }
    
    @Override
    public void close() {}
    
    @Override
    public void configure(Map<String, ?> configs) {}
}

// 配置自定义分区器
@Configuration
public class PartitionerConfig {
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        // ... 其他配置
        config.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, CustomPartitioner.class);
        return new DefaultKafkaProducerFactory<>(config);
    }
}

// 使用示例
@Service
public class OrderProducer {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void sendOrder(OrderMessage order) {
        // 使用userId作为key,保证同一用户的订单发送到同一分区
        kafkaTemplate.send("order-topic", order.getUserId(), order);
    }
}
```

#### 4.3 批量发送优化

```java
@Configuration
public class BatchProducerConfig {
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        // ... 基础配置
        
        // 批量大小(字节)
        config.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
        
        // 等待时间(毫秒),达到时间或批量大小就发送
        config.put(ProducerConfig.LINGER_MS_CONFIG, 10);
        
        // 缓冲区大小
        config.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432);
        
        // 压缩类型
        config.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy");
        
        return new DefaultKafkaProducerFactory<>(config);
    }
}
```

### 五、消费者最佳实践

#### 5.1 消费者组配置

```java
@Configuration
public class KafkaConsumerConfig {
    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG, "my-group");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        
        // offset重置策略
        // earliest: 从最早的消息开始
        // latest: 从最新的消息开始
        // none: 如果没有offset则抛出异常
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        
        // 关闭自动提交
        config.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        
        // 每次拉取最大记录数
        config.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 500);
        
        // 两次poll的最大间隔
        config.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 300000);
        
        // 心跳间隔
        config.put(ConsumerConfig.HEARTBEAT_INTERVAL_MS_CONFIG, 3000);
        
        // 会话超时时间
        config.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, 10000);
        
        return new DefaultKafkaConsumerFactory<>(config);
    }
}
```

#### 5.2 并发消费

```java
// 配置并发数
@Configuration
public class ConcurrentConsumerConfig {
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> 
            kafkaListenerContainerFactory(ConsumerFactory<String, Object> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
            new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        
        // 并发数(消费者线程数)
        factory.setConcurrency(3);
        
        // 手动提交
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL);
        
        return factory;
    }
}

// 使用
@Component
public class ConcurrentConsumer {
    // concurrency会覆盖配置中的并发数
    @KafkaListener(topics = "order-topic", groupId = "order-group", concurrency = "5")
    public void consume(ConsumerRecord<String, OrderMessage> record, Acknowledgment ack) {
        log.info("线程:{}, 消费消息:{}", 
            Thread.currentThread().getName(), record.value());
        
        processMessage(record.value());
        ack.acknowledge();
    }
}
```

#### 5.3 异常处理

```java
@Configuration
public class ErrorHandlingConfig {
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> 
            kafkaListenerContainerFactory(ConsumerFactory<String, Object> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
            new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        
        // 设置错误处理器
        factory.setCommonErrorHandler(new DefaultErrorHandler(
            new FixedBackOff(1000L, 3L)  // 重试3次,间隔1秒
        ));
        
        return factory;
    }
}

// 自定义错误处理
@Component
@Slf4j
public class CustomErrorHandler implements ConsumerAwareListenerErrorHandler {
    @Override
    public Object handleError(Message<?> message, ListenerExecutionFailedException exception,
                             Consumer<?, ?> consumer) {
        log.error("消息处理失败:{}", message.getPayload(), exception);
        
        // 记录到数据库或发送告警
        saveErrorToDatabase(message, exception);
        
        // 返回null表示不重试
        return null;
    }
    
    private void saveErrorToDatabase(Message<?> message, Exception exception) {
        // 保存错误信息
    }
}

// 使用自定义错误处理器
@Component
public class OrderConsumer {
    @KafkaListener(topics = "order-topic", errorHandler = "customErrorHandler")
    public void consume(OrderMessage message) {
        // 处理消息
        if (message.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("订单金额必须大于0");
        }
        processOrder(message);
    }
}
```

### 六、消息顺序性保证

#### 6.1 单分区顺序

```java
// 发送到同一分区保证顺序
@Service
public class OrderProducer {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void sendOrderEvent(OrderEvent event) {
        // 使用orderId作为key,保证同一订单的事件发送到同一分区
        kafkaTemplate.send("order-event-topic", 
            event.getOrderId().toString(), 
            event);
    }
}

// 单线程消费保证顺序
@Component
public class OrderEventConsumer {
    @KafkaListener(
        topics = "order-event-topic",
        groupId = "order-event-group",
        concurrency = "1"  // 单线程消费
    )
    public void consume(ConsumerRecord<String, OrderEvent> record, Acknowledgment ack) {
        OrderEvent event = record.value();
        log.info("按顺序处理订单事件:{}", event);
        
        processOrderEvent(event);
        ack.acknowledge();
    }
}
```

#### 6.2 多分区顺序

```java
// 按业务key分区
@Service
public class UserEventProducer {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void sendUserEvent(UserEvent event) {
        // 使用userId作为key,同一用户的事件发送到同一分区
        kafkaTemplate.send("user-event-topic", 
            event.getUserId(), 
            event);
    }
}

// 多线程消费,每个线程处理不同分区
@Component
public class UserEventConsumer {
    @KafkaListener(
        topics = "user-event-topic",
        groupId = "user-event-group",
        concurrency = "3"  // 3个线程,每个处理一个分区
    )
    public void consume(ConsumerRecord<String, UserEvent> record, Acknowledgment ack) {
        // 同一分区的消息由同一线程处理,保证顺序
        UserEvent event = record.value();
        log.info("处理用户事件:{}", event);
        
        processUserEvent(event);
        ack.acknowledge();
    }
}
```

### 七、消息幂等性保证

#### 7.1 生产者幂等性

```java
@Configuration
public class IdempotentProducerConfig {
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        // ... 基础配置
        
        // 开启幂等性
        config.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        
        // 幂等性要求
        config.put(ProducerConfig.ACKS_CONFIG, "all");
        config.put(ProducerConfig.RETRIES_CONFIG, Integer.MAX_VALUE);
        config.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 5);
        
        return new DefaultKafkaProducerFactory<>(config);
    }
}
```

#### 7.2 消费者幂等性

```java
@Service
public class IdempotentConsumerService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consume(ConsumerRecord<String, OrderMessage> record, Acknowledgment ack) {
        OrderMessage message = record.value();
        String messageId = generateMessageId(record);
        
        // 检查是否已处理
        if (isProcessed(messageId)) {
            log.info("消息已处理,跳过:{}", messageId);
            ack.acknowledge();
            return;
        }
        
        try {
            // 处理消息
            processOrder(message);
            
            // 标记已处理
            markProcessed(messageId);
            
            // 提交offset
            ack.acknowledge();
            
        } catch (Exception e) {
            log.error("消息处理失败", e);
            // 不提交offset,下次重新消费
        }
    }
    
    private String generateMessageId(ConsumerRecord<String, OrderMessage> record) {
        // 使用topic+partition+offset作为唯一标识
        return String.format("%s-%d-%d", 
            record.topic(), record.partition(), record.offset());
    }
    
    private boolean isProcessed(String messageId) {
        String key = "kafka:processed:" + messageId;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
    
    private void markProcessed(String messageId) {
        String key = "kafka:processed:" + messageId;
        redisTemplate.opsForValue().set(key, "1", 7, TimeUnit.DAYS);
    }
}
```

### 八、性能优化

#### 8.1 生产者优化

```java
@Configuration
public class OptimizedProducerConfig {
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        // ... 基础配置
        
        // 1. 批量发送
        config.put(ProducerConfig.BATCH_SIZE_CONFIG, 32768);  // 32KB
        config.put(ProducerConfig.LINGER_MS_CONFIG, 10);  // 等待10ms
        
        // 2. 压缩
        config.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "lz4");  // lz4压缩
        
        // 3. 缓冲区
        config.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 67108864);  // 64MB
        
        // 4. 并发请求
        config.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 5);
        
        return new DefaultKafkaProducerFactory<>(config);
    }
}
```

#### 8.2 消费者优化

```java
@Configuration
public class OptimizedConsumerConfig {
    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        // ... 基础配置
        
        // 1. 批量拉取
        config.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 500);
        config.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 1024);  // 最小1KB
        config.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, 500);  // 最多等待500ms
        
        // 2. 增大接收缓冲区
        config.put(ConsumerConfig.RECEIVE_BUFFER_CONFIG, 65536);  // 64KB
        
        return new DefaultKafkaConsumerFactory<>(config);
    }
    
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> 
            kafkaListenerContainerFactory(ConsumerFactory<String, Object> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
            new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        
        // 3. 并发消费
        factory.setConcurrency(10);
        
        // 4. 批量监听
        factory.setBatchListener(true);
        
        return factory;
    }
}

// 批量消费
@Component
public class BatchConsumer {
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consumeBatch(List<ConsumerRecord<String, OrderMessage>> records,
                            Acknowledgment ack) {
        log.info("批量消费{}条消息", records.size());
        
        // 批量处理
        List<OrderMessage> orders = records.stream()
            .map(ConsumerRecord::value)
            .collect(Collectors.toList());
        
        batchProcessOrders(orders);
        
        // 批量提交
        ack.acknowledge();
    }
    
    private void batchProcessOrders(List<OrderMessage> orders) {
        // 批量处理逻辑
    }
}
```

### 九、实战案例

#### 9.1 日志收集系统

```java
// 日志消息
@Data
public class LogMessage {
    private String appName;
    private String level;
    private String message;
    private String traceId;
    private LocalDateTime timestamp;
}

// 日志生产者
@Service
@Slf4j
public class LogProducer {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void sendLog(LogMessage logMessage) {
        // 按应用名分区
        kafkaTemplate.send("app-logs", logMessage.getAppName(), logMessage);
    }
}

// 日志消费者
@Component
@Slf4j
public class LogConsumer {
    @Autowired
    private ElasticsearchService elasticsearchService;
    
    @KafkaListener(
        topics = "app-logs",
        groupId = "log-consumer-group",
        concurrency = "5"
    )
    public void consumeLogs(List<ConsumerRecord<String, LogMessage>> records,
                           Acknowledgment ack) {
        List<LogMessage> logs = records.stream()
            .map(ConsumerRecord::value)
            .collect(Collectors.toList());
        
        // 批量写入Elasticsearch
        elasticsearchService.bulkIndex(logs);
        
        ack.acknowledge();
        
        log.info("处理{}条日志", logs.size());
    }
}
```

#### 9.2 实时数据处理

```java
// 用户行为事件
@Data
public class UserBehaviorEvent {
    private String userId;
    private String eventType;  // click, view, purchase
    private String productId;
    private LocalDateTime timestamp;
}

// 事件生产者
@Service
public class BehaviorProducer {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void trackBehavior(UserBehaviorEvent event) {
        kafkaTemplate.send("user-behavior", event.getUserId(), event);
    }
}

// 实时统计消费者
@Component
@Slf4j
public class BehaviorStatisticsConsumer {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    @KafkaListener(
        topics = "user-behavior",
        groupId = "statistics-group",
        concurrency = "3"
    )
    public void consume(ConsumerRecord<String, UserBehaviorEvent> record,
                       Acknowledgment ack) {
        UserBehaviorEvent event = record.value();
        
        // 实时统计
        String dateKey = LocalDate.now().toString();
        
        // 统计PV
        String pvKey = "statistics:pv:" + dateKey;
        redisTemplate.opsForValue().increment(pvKey);
        
        // 统计UV
        String uvKey = "statistics:uv:" + dateKey;
        redisTemplate.opsForSet().add(uvKey, event.getUserId());
        
        // 统计商品点击
        if ("click".equals(event.getEventType())) {
            String productKey = "statistics:product:click:" + dateKey;
            redisTemplate.opsForZSet().incrementScore(productKey, event.getProductId(), 1);
        }
        
        ack.acknowledge();
    }
}

// 用户画像消费者
@Component
@Slf4j
public class UserProfileConsumer {
    @Autowired
    private UserProfileService userProfileService;
    
    @KafkaListener(
        topics = "user-behavior",
        groupId = "profile-group",
        concurrency = "5"
    )
    public void consume(ConsumerRecord<String, UserBehaviorEvent> record,
                       Acknowledgment ack) {
        UserBehaviorEvent event = record.value();
        
        // 更新用户画像
        userProfileService.updateProfile(event);
        
        ack.acknowledge();
    }
}
```

#### 9.3 订单状态同步

```java
// 订单状态变更事件
@Data
public class OrderStatusEvent {
    private Long orderId;
    private String oldStatus;
    private String newStatus;
    private LocalDateTime changeTime;
}

// 订单服务发送状态变更事件
@Service
@Slf4j
public class OrderService {
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    @Transactional
    public void updateOrderStatus(Long orderId, String newStatus) {
        // 1. 更新数据库
        Order order = orderRepository.findById(orderId).orElseThrow();
        String oldStatus = order.getStatus();
        order.setStatus(newStatus);
        orderRepository.save(order);
        
        // 2. 发送状态变更事件
        OrderStatusEvent event = new OrderStatusEvent();
        event.setOrderId(orderId);
        event.setOldStatus(oldStatus);
        event.setNewStatus(newStatus);
        event.setChangeTime(LocalDateTime.now());
        
        kafkaTemplate.send("order-status-change", orderId.toString(), event);
        
        log.info("订单状态变更:{} -> {}", oldStatus, newStatus);
    }
}

// 缓存同步消费者
@Component
@Slf4j
public class CacheSyncConsumer {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @KafkaListener(
        topics = "order-status-change",
        groupId = "cache-sync-group"
    )
    public void syncCache(ConsumerRecord<String, OrderStatusEvent> record,
                         Acknowledgment ack) {
        OrderStatusEvent event = record.value();
        
        // 更新Redis缓存
        String cacheKey = "order:" + event.getOrderId();
        redisTemplate.opsForHash().put(cacheKey, "status", event.getNewStatus());
        
        ack.acknowledge();
        
        log.info("缓存同步完成:orderId={}", event.getOrderId());
    }
}

// ES同步消费者
@Component
@Slf4j
public class EsSyncConsumer {
    @Autowired
    private ElasticsearchService elasticsearchService;
    
    @KafkaListener(
        topics = "order-status-change",
        groupId = "es-sync-group"
    )
    public void syncEs(ConsumerRecord<String, OrderStatusEvent> record,
                      Acknowledgment ack) {
        OrderStatusEvent event = record.value();
        
        // 更新Elasticsearch
        elasticsearchService.updateOrderStatus(event.getOrderId(), event.getNewStatus());
        
        ack.acknowledge();
        
        log.info("ES同步完成:orderId={}", event.getOrderId());
    }
}
```

### 十、监控和运维

#### 10.1 监控指标

```java
@Component
@Slf4j
public class KafkaMonitor {
    @Autowired
    private KafkaAdmin kafkaAdmin;
    
    @Scheduled(fixedRate = 60000)  // 每分钟检查一次
    public void monitorConsumerLag() {
        // 获取消费者组信息
        AdminClient adminClient = AdminClient.create(kafkaAdmin.getConfigurationProperties());
        
        try {
            // 获取所有消费者组
            ListConsumerGroupsResult groups = adminClient.listConsumerGroups();
            Collection<ConsumerGroupListing> groupListings = groups.all().get();
            
            for (ConsumerGroupListing group : groupListings) {
                String groupId = group.groupId();
                
                // 获取消费者组的offset信息
                ListConsumerGroupOffsetsResult offsets =
                    adminClient.listConsumerGroupOffsets(groupId);
                Map<TopicPartition, OffsetAndMetadata> offsetMap = offsets.partitionsToOffsetAndMetadata().get();
                
                // 计算lag
                for (Map.Entry<TopicPartition, OffsetAndMetadata> entry : offsetMap.entrySet()) {
                    TopicPartition partition = entry.getKey();
                    long currentOffset = entry.getValue().offset();
                    
                    // 获取分区的最新offset
                    long endOffset = getEndOffset(adminClient, partition);
                    long lag = endOffset - currentOffset;
                    
                    log.info("消费者组:{}, 主题:{}, 分区:{}, lag:{}", 
                        groupId, partition.topic(), partition.partition(), lag);
                    
                    // lag告警
                    if (lag > 10000) {
                        sendAlert(String.format("消费者组%s的lag超过10000", groupId));
                    }
                }
            }
        } catch (Exception e) {
            log.error("监控失败", e);
        } finally {
            adminClient.close();
        }
    }
    
    private long getEndOffset(AdminClient adminClient, TopicPartition partition) {
        // 获取分区的最新offset
        return 0L;  // 简化实现
    }
    
    private void sendAlert(String message) {
        // 发送告警
    }
}
```

#### 10.2 性能指标

```java
@Component
@Slf4j
public class KafkaMetrics {
    @Autowired
    private MeterRegistry meterRegistry;
    
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consume(ConsumerRecord<String, OrderMessage> record, Acknowledgment ack) {
        Timer.Sample sample = Timer.start(meterRegistry);
        
        try {
            // 处理消息
            processMessage(record.value());
            
            // 记录成功指标
            meterRegistry.counter("kafka.consumer.success", 
                "topic", record.topic()).increment();
            
            ack.acknowledge();
            
        } catch (Exception e) {
            // 记录失败指标
            meterRegistry.counter("kafka.consumer.error", 
                "topic", record.topic()).increment();
            
            log.error("消息处理失败", e);
            
        } finally {
            // 记录处理时间
            sample.stop(meterRegistry.timer("kafka.consumer.duration", 
                "topic", record.topic()));
        }
    }
}
```

### 十一、总结

Kafka核心要点:

1. 架构原理:分区、副本、消费者组
2. 生产者:acks配置、分区策略、批量发送
3. 消费者:offset管理、并发消费、异常处理
4. 可靠性:幂等性、顺序性、消息不丢失
5. 性能优化:批量处理、压缩、并发
6. 实战场景:日志收集、实时处理、数据同步


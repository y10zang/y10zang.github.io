# Spring Boot 项目入门

下面我将基于Spring Boot 3.2和Java 17，使用最新的技术栈和最佳实践，为你提供一个完整的Spring Boot项目实操教程。

### 一、引言

Spring Boot 3.2是目前最新的稳定版本，它基于Jakarta EE 10标准，提供了更强大的性能和更丰富的功能。本教程将使用Java 17 LTS作为开发语言，结合Spring Boot 3.2的新特性，构建一个现代化的Web应用。

### 二、开发环境准备

#### （一）工具安装

JDK 17：从Adoptium下载并安装Java 17 LTS版本。

Maven 3.9+：从Apache Maven官网下载并配置。

IDE：推荐使用IntelliJ IDEA 2023.2+或VS Code。

#### （二）IDE配置

在IntelliJ IDEA中安装以下插件：

```
Spring Boot Assistant
Lombok
Docker Integration
Kubernetes
```

### 三、创建Spring Boot 3.2项目

#### （一）使用Spring Initializr

访问Spring Initializr并配置：

```
Project：Maven Project
Language：Java
Spring Boot：3.2.0
Group：com.example
Artifact：spring-boot-tutorial
Dependencies：
  Spring Web
  Spring Data JPA
  PostgreSQL Driver
  Spring Security
  SpringDoc OpenAPI 3
  Spring Boot DevTools
  Lombok
  Docker Compose Support
```

点击"Generate"下载项目压缩包，解压后导入IDE。

#### （二）项目结构

```txt
spring-boot-tutorial/
├── mvnw
├── mvnw.cmd
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/tutorial/
│   │   │       ├── SpringBootTutorialApplication.java
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── entity/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── security/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       ├── templates/
│   │       └── docker-compose.yml
│   └── test/
│       └── java/
│           └── com/example/tutorial/
└── .gitignore
```

#### （三）配置文件

修改`src/main/resources/application.properties`：

```properties
# 应用配置
spring.application.name=spring-boot-tutorial
server.port=8080

# 数据库配置
spring.datasource.url=jdbc:postgresql://localhost:5432/tutorial_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA配置
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# 安全配置
spring.security.user.name=admin
spring.security.user.password=admin123

# OpenAPI配置
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/api-docs

# 日志配置
logging.level.root=INFO
logging.level.com.example.tutorial=DEBUG
```

### 四、实现数据模型和持久层

#### （一）创建实体类

创建`src/main/java/com/example/tutorial/entity`包，并添加以下实体类：

`User.java`

```java
package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

`Role.java`

```java
package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
}
```

`ERole.java`

```java
package com.example.tutorial.entity;

public enum ERole {
    ROLE_USER,
    ROLE_MODERATOR,
    ROLE_ADMIN
}
```

`Product.java`

```java
package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Boolean active;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

#### （二）创建Repository接口

创建`src/main/java/com/example/tutorial/repository`包，并添加以下接口：

`UserRepository.java`

```java
package com.example.tutorial.repository;

import com.example.tutorial.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
```

`RoleRepository.java`

```java
package com.example.tutorial.repository;

import com.example.tutorial.entity.ERole;
import com.example.tutorial.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
```

`ProductRepository.java`

```java
package com.example.tutorial.repository;

import com.example.tutorial.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();
    
    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> findByPriceGreaterThan(Double price);
}
```

### 五、配置Spring Security和JWT认证

#### （一）添加依赖

在`pom.xml`中添加JWT依赖：

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

#### （二）创建安全配置

创建`src/main/java/com/example/tutorial/security`包，并添加以下类：

`SecurityConfig.java`

```java
package com.example.tutorial.security;

import com.example.tutorial.security.jwt.AuthEntryPointJwt;
import com.example.tutorial.security.jwt.AuthTokenFilter;
import com.example.tutorial.security.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, AuthEntryPointJwt unauthorizedHandler) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder())
            .and()
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> 
                auth.requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/products/**").permitAll()
                    .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                    .anyRequest().authenticated()
            );

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

JWT相关类

创建JWT工具类和过滤器：

`JwtUtils.java`

```java
package com.example.tutorial.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${tutorial.app.jwtSecret}")
    private String jwtSecret;

    @Value("${tutorial.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
            .setSubject((userPrincipal.getUsername()))
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(key(), SignatureAlgorithm.HS256)
            .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
```

`AuthTokenFilter.java`

```java
package com.example.tutorial.security.jwt;

import com.example.tutorial.security.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }

        return null;
    }
}
```

`UserDetailsServiceImpl.java`

```java
package com.example.tutorial.security.service;

import com.example.tutorial.entity.User;
import com.example.tutorial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return buildUserDetails(user);
    }

    private UserDetails buildUserDetails(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities);
    }
}
```

`AuthEntryPointJwt.java`

```java
package com.example.tutorial.security.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        logger.error("Unauthorized error: {}", authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
    }
}
```

### 六、实现业务逻辑层

#### （一）创建DTO类

创建`src/main/java/com/example/tutorial/dto`包，并添加以下DTO类：

`LoginRequest.java`

```java
package com.example.tutorial.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
```

`SignupRequest.java`

```java
package com.example.tutorial.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
```

`JwtResponse.java`

```java
package com.example.tutorial.dto;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}
```

`ProductDTO.java`

```java
package com.example.tutorial.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    private String description;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull
    @Min(0)
    private Integer stock;

    private Boolean active;
}
```

#### （二）创建Service接口和实现

创建`src/main/java/com/example/tutorial/service`包，并添加以下类：

`UserService.java`

```java
package com.example.tutorial.service;

import com.example.tutorial.dto.SignupRequest;

public interface UserService {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    void registerUser(SignupRequest signUpRequest);
}
```

`UserServiceImpl.java`

```java
package com.example.tutorial.service;

import com.example.tutorial.dto.SignupRequest;
import com.example.tutorial.entity.ERole;
import com.example.tutorial.entity.Role;
import com.example.tutorial.entity.User;
import com.example.tutorial.repository.RoleRepository;
import com.example.tutorial.repository.UserRepository;
import com.example.tutorial.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void registerUser(SignupRequest signUpRequest) {
        User user = User.builder()
            .username(signUpRequest.getUsername())
            .email(signUpRequest.getEmail())
            .password(encoder.encode(signUpRequest.getPassword()))
            .build();

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
    }
}
```

`ProductService.java`

```java
package com.example.tutorial.service;

import com.example.tutorial.dto.ProductDTO;
import com.example.tutorial.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    List<Product> getActiveProducts();
    List<Product> getProductsByPriceGreaterThan(Double price);
    Optional<Product> getProductById(Long id);
    Product saveProduct(ProductDTO productDTO);
    void deleteProduct(Long id);
}
```

`ProductServiceImpl.java`

```java
package com.example.tutorial.service;

import com.example.tutorial.dto.ProductDTO;
import com.example.tutorial.entity.Product;
import com.example.tutorial.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getActiveProducts() {
        return productRepository.findByActiveTrue();
    }

    @Override
    public List<Product> getProductsByPriceGreaterThan(Double price) {
        return productRepository.findByPriceGreaterThan(price);
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
```

### 七、实现控制器层

创建`src/main/java/com/example/tutorial/controller`包，并添加以下控制器：

`AuthController.java`

```java
package com.example.tutorial.controller;

import com.example.tutorial.dto.JwtResponse;
import com.example.tutorial.dto.LoginRequest;
import com.example.tutorial.dto.SignupRequest;
import com.example.tutorial.security.jwt.JwtUtils;
import com.example.tutorial.security.service.UserDetailsImpl;
import com.example.tutorial.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        userService.registerUser(signUpRequest);

        return ResponseEntity.ok("User registered successfully!");
    }
}
```

`ProductController.java`

```java
package com.example.tutorial.controller;

import com.example.tutorial.dto.ProductDTO;
import com.example.tutorial.entity.Product;
import com.example.tutorial.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Product management APIs")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    @Operation(summary = "Get all products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/active")
    @Operation(summary = "Get all active products")
    public ResponseEntity<List<Product>> getActiveProducts() {
        List<Product> products = productService.getActiveProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/price/{price}")
    @Operation(summary = "Get products by price greater than")
    public ResponseEntity<List<Product>> getProductsByPriceGreaterThan(@PathVariable Double price) {
        List<Product> products = productService.getProductsByPriceGreaterThan(price);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        Product product = productService.saveProduct(productDTO);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO productDTO) {
        Optional<Product> existingProduct = productService.getProductById(id);
        if (existingProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productDTO.setId(id);
        Product updatedProduct = productService.saveProduct(productDTO);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

### 八、配置OpenAPI文档

添加OpenAPI配置类：

`OpenApiConfig.java`

```java
package com.example.tutorial.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(
                new Components()
                    .addSecuritySchemes(securitySchemeName,
                        new SecurityScheme()
                            .name(securitySchemeName)
                            .type(SecurityScheme.Type.HTTP)
                            .scheme("bearer")
                            .bearerFormat("JWT")
                    )
            )
            .info(new Info()
                .title("Spring Boot Tutorial API")
                .description("API documentation for Spring Boot Tutorial application")
                .version("1.0.0")
            );
    }
}
```

### 九、Docker配置

在`src/main/resources`目录下创建`docker-compose.yml`：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: tutorial-postgres
    restart: always
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: tutorial_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password

  pgadmin:
    image: dpage/pgadmin4:7
    container_name: tutorial-pgadmin
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    depends_on:
      - postgres

volumes:
  postgres-data:
```

### 十、应用启动与测试

#### （一）启动应用

启动Docker容器：

```bash
docker-compose up -d
```

运行Spring Boot应用：

```bash
mvn spring-boot:run
```

#### （二）测试API

访问Swagger UI：`http://localhost:8080/swagger-ui.html`

使用Postman或其他API测试工具测试以下端点：

##### 用户认证：

注册用户：`POST` `http://localhost:8080/api/auth/signup`

登录：`POST` `http://localhost:8080/api/auth/signin`

##### 产品管理：

获取所有产品：`GET` `http://localhost:8080/api/products`

创建产品（需要ADMIN角色）：`POST` `http://localhost:8080/api/products`

#### （三）API测试示例

##### 注册新用户：

```json
POST http://localhost:8080/api/auth/signup
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```

##### 登录获取JWT令牌：

```json
POST http://localhost:8080/api/auth/signin
{
  "username": "user1",
  "password": "password123"
}
```

##### 使用JWT令牌访问受保护的API：

```json
GET http://localhost:8080/api/products
Authorization: Bearer [JWT令牌]
```

### 十一、部署与监控

#### （一）构建Docker镜像

在项目根目录创建Dockerfile：

```dockerfile
# 使用官方OpenJDK基础镜像
FROM openjdk:17-jdk-slim

# 设置工作目录
WORKDIR /app

# 复制项目JAR文件到容器中
COPY target/*.jar app.jar

# 暴露应用端口
EXPOSE 8080

# 启动应用
CMD ["java", "-jar", "app.jar"]
```

构建镜像：

```bash
docker build -t spring-boot-tutorial .
```

#### （二）使用Docker Compose部署

更新`docker-compose.yml`，添加应用服务：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: tutorial-postgres
    restart: always
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: tutorial_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password

  pgadmin:
    image: dpage/pgadmin4:7
    container_name: tutorial-pgadmin
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    depends_on:
      - postgres

  spring-boot-app:
    image: spring-boot-tutorial
    container_name: tutorial-app
    restart: always
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/tutorial_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: password

volumes:
  postgres-data:
```

启动服务：

```bash
docker-compose up -d
```

#### （三）监控应用

可以使用`Spring Boot Actuator`和`Prometheus/Grafana`进行应用监控：

添加依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

配置Actuator：

```properties
# Actuator配置
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
```

访问监控端点：

```java
http://localhost:8080/actuator/health
http://localhost:8080/actuator/metrics
http://localhost:8080/actuator/prometheus
```

### 十二、总结

通过本教程，我们学习了如何使用Spring Boot 3.2和Java 17构建一个完整的Web应用。主要内容包括：

```
使用最新的Spring Boot 3.2特性
配置基于JWT的安全认证
使用Spring Data JPA进行数据持久化
构建RESTful API并使用OpenAPI生成文档
实现Docker容器化部署
应用监控与管理
```

这个示例应用涵盖了Spring Boot开发的核心知识点，包括项目结构、依赖管理、数据访问、安全认证、API设计和部署等方面。你可以在此基础上扩展更多功能，如添加缓存、消息队列、微服务等。

通过这些资源，你可以深入学习Spring Boot的更多高级特性和最佳实践。

这个教程采用了最新的Spring Boot 3.2和Java 17技术栈，整合了以下关键技术点：

1. Jakarta EE 10迁移：使用最新的Jakarta命名空间替换旧的javax包
2. Spring Security与JWT认证：实现无状态的身份验证机制
3. Spring Data JPA：利用最新的Repository方法和查询特性
4. OpenAPI 3文档：通过SpringDoc生成现代化的API文档
5. Docker容器化：使用Docker Compose进行服务编排
6. Actuator监控：整合最新的监控和管理端点

教程提供了完整的代码实现，包括实体类、DTO、Repository、Service和Controller层，以及安全配置和JWT工具类。通过这个示例，你可以学习如何构建一个安全、可扩展的现代Web应用，并掌握Spring Boot的核心概念和最佳实践。

如果你需要进一步扩展功能，可以考虑添加缓存、消息队列、分布式事务等高级特性，或者探索Spring Cloud生态系统构建微服务架构。

关键词：Spring Boot,Spring Boot 入门，Spring Boot 教程，Spring Boot 实战，Spring Boot 项目，Spring Boot 开发，Spring Boot 微服务，Spring Boot 配置，Spring Boot 集成，Spring Boot 部署，Spring Boot 安全，Spring Boot 性能优化，Spring Boot 面试，Spring Boot2,Spring Boot3

原创声明：本文系作者授权腾讯云开发者社区发表，未经许可，不得转载。

> link: `https://cloud.tencent.com/developer/article/2531515`


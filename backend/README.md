# IntelliTrack Backend Architecture

## Overview
IntelliTrack is a Spring Boot application that provides a RESTful API for managing capstone project submissions, tracking progress, and providing AI-powered insights.

## Technology Stack

- **Framework:** Spring Boot 3.2.1
- **Language:** Java 20
- **Database:** MySQL
- **Security:** Spring Security + JWT
- **ORM:** Hibernate/JPA
- **AI Integration:** Google Gemini API
- **Build Tool:** Maven

## Project Structure

```
backend/intellitrack/src/main/java/backend/intellitrack/
│
├── config/                     # Application configurations
│
├── controller/                 # REST Controllers (API Endpoints)
│   ├── AiController.java
│   ├── AuditLogController.java
│   ├── AuthController.java
│   ├── DashboardController.java
│   ├── DeadlineController.java
│   ├── DocumentVersionController.java
│   ├── FeedbackController.java
│   ├── InlineCommentController.java
│   ├── MilestoneController.java
│   ├── NotificationController.java
│   ├── ProfileController.java
│   ├── ProjectGroupController.java
│   ├── ReminderLogController.java
│   ├── RubricEvaluationController.java
│   ├── SubmissionController.java
│   ├── SubmissionVersionController.java
│   └── UserController.java
│
├── dto/                        # Data Transfer Objects
│   ├── LoginRequest.java
│   └── LoginResponse.java
│
├── exception/                  # Custom Exception Handlers
│
├── model/                      # JPA Entities
│   ├── AuditLog.java
│   ├── Deadline.java
│   ├── DocumentVersion.java   # NEW
│   ├── Feedback.java
│   ├── InlineComment.java
│   ├── Milestone.java
│   ├── Notification.java
│   ├── Profile.java
│   ├── Project.java
│   ├── ProjectGroup.java
│   ├── ReminderLog.java
│   ├── RiskLevel.java
│   ├── RubricEvaluation.java
│   ├── Submission.java
│   ├── SubmissionRisk.java
│   ├── SubmissionStatus.java
│   ├── SubmissionType.java
│   ├── SubmissionVersion.java
│   ├── User.java
│   └── UserRole.java
│
├── repository/                 # JPA Repositories (Data Access Layer)
│   ├── AuditLogRepository.java
│   ├── DeadlineRepository.java
│   ├── DocumentVersionRepository.java   # NEW
│   ├── FeedbackRepository.java
│   ├── InlineCommentRepository.java
│   ├── MilestoneRepository.java
│   ├── NotificationRepository.java
│   ├── ProfileRepository.java
│   ├── ProjectGroupRepository.java
│   ├── ProjectRepository.java
│   ├── ReminderLogRepository.java
│   ├── RubricEvaluationRepository.java
│   ├── SubmissionRepository.java
│   ├── SubmissionRiskRepository.java
│   ├── SubmissionVersionRepository.java
│   └── UserRepository.java
│
├── security/                   # Security Configuration
│   ├── JwtRequestFilter.java  # JWT Token Filter
│   ├── JwtUtil.java           # JWT Utility Methods
│   └── SecurityConfig.java    # Spring Security Config
│
├── seed/                       # Database Seeders
│
├── service/                    # Business Logic Layer
│   ├── ai/                    # AI-related services
│   │   ├── GeminiService.java
│   │   └── RiskEngineService.java
│   ├── analytics/             # Analytics services
│   │   └── AnalyticsService.java
│   ├── AuditLogService.java
│   ├── AuthService.java
│   ├── DeadlineService.java
│   ├── DocumentVersionService.java   # NEW
│   ├── FeedbackService.java
│   ├── InlineCommentService.java
│   ├── MilestoneService.java
│   ├── NotificationService.java
│   ├── ProfileService.java
│   ├── ProjectGroupService.java
│   ├── ProjectService.java
│   ├── ReminderLogService.java
│   ├── RubricEvaluationService.java
│   ├── SubmissionRiskService.java
│   ├── SubmissionService.java
│   ├── SubmissionVersionService.java
│   ├── UserDetailsServiceImpl.java
│   └── UserService.java
│
└── IntellitrackApplication.java  # Main Application Class
```

## Architecture Layers

### 1. Controller Layer (REST API)
- Handles HTTP requests and responses
- Maps endpoints to service methods
- Implements security annotations (`@PreAuthorize`)
- Returns appropriate HTTP status codes
- Handles request validation

**Example:**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    // CRUD endpoints
}
```

### 2. Service Layer (Business Logic)
- Contains business logic and rules
- Coordinates between controllers and repositories
- Handles transactions
- Implements complex operations

**Example:**
```java
@Service
@Transactional
public class UserService {
    // Business methods
}
```

### 3. Repository Layer (Data Access)
- JPA repositories for database operations
- Extends `JpaRepository` for CRUD operations
- Custom query methods using Spring Data JPA

**Example:**
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

### 4. Model Layer (Entities)
- JPA entities mapped to database tables
- Define relationships between entities
- Include validation constraints

**Example:**
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // fields, getters, setters
}
```

### 5. Security Layer
- JWT-based authentication
- Role-based access control (RBAC)
- CORS configuration
- Request filtering

## Security Implementation

### User Roles
- **ADMIN**: Full system access
- **COORDINATOR**: Manage teams and review submissions
- **STUDENT**: Submit and view own work
- **ADVISER**: (Similar to COORDINATOR)

### JWT Token Flow
1. User logs in with email/password
2. Server validates credentials
3. Server generates JWT token
4. Client stores token in localStorage
5. Client includes token in Authorization header for subsequent requests
6. Server validates token on each request

### Password Encryption
- Uses BCrypt password encoder
- Passwords are hashed before storing in database

## Database Schema

The application uses MySQL with Hibernate auto-generating schema based on entity definitions.

### Key Tables
- `users` - User accounts
- `submissions` - Project submissions
- `deadlines` - Submission deadlines
- `feedbacks` - Feedback on submissions
- `notifications` - System notifications
- `document_versions` - Document version tracking (NEW)
- `audit_logs` - System activity logs
- `rubric_evaluations` - Evaluation rubrics
- `milestones` - Project milestones
- `project_groups` - Student groups
- And more...

## API Design Principles

1. **RESTful Design**: Standard HTTP methods (GET, POST, PUT, DELETE)
2. **Consistent URL Structure**: `/api/{resource}` and `/api/{resource}/{id}`
3. **Proper Status Codes**: 
   - 200 OK
   - 201 Created
   - 404 Not Found
   - 401 Unauthorized
   - 403 Forbidden
4. **JSON Format**: All requests and responses use JSON
5. **Error Handling**: Consistent error response structure

## AI Integration

### Google Gemini API
- Used for generating recommendations
- Analyzes submission risks
- Provides intelligent insights

### Risk Analysis
- Automated risk assessment for submissions
- Calculates risk levels based on multiple factors
- Helps coordinators identify at-risk projects

## Configuration

### application.properties
Key configurations:
```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3307/intellitrackdb
spring.datasource.username=root
spring.datasource.password=***

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=***
jwt.expiration=86400000

# CORS
spring.web.cors.allowed-origins=http://localhost:5173

# AI API
gemini.api.key=***
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

## Running the Application

### Prerequisites
- Java 20 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Steps
1. Configure MySQL database
2. Update `application.properties` with database credentials
3. Run Maven build: `mvn clean install`
4. Start application: `mvn spring-boot:run`
5. API will be available at `http://localhost:8080/api`

## Testing

### Using the API
- Use Postman or similar tool
- First authenticate at `/api/auth/login`
- Copy the JWT token from response
- Include token in Authorization header: `Bearer {token}`
- Make requests to other endpoints

## Recent Changes

### What Was Added/Fixed
1. ✅ **DocumentVersion Feature**: Complete CRUD for document versioning
2. ✅ **AI Endpoints**: Fixed to match frontend expectations (GET for risk analysis)
3. ✅ **User Delete**: Added DELETE endpoint to UserController
4. ✅ **CORS Configuration**: Properly configured for frontend communication
5. ✅ **API Documentation**: Comprehensive endpoint documentation created

### API-Frontend Alignment
All backend endpoints now match the frontend API expectations defined in `frontend/my-react-app/src/services/api.js`.

## Future Enhancements

- Implement file upload for document submissions
- Add WebSocket support for real-time notifications
- Enhance AI recommendations with more context
- Add comprehensive unit and integration tests
- Implement API rate limiting
- Add API versioning
- Implement caching for frequently accessed data

## Development Best Practices

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Dependency Injection**: Using Spring's IoC container
3. **Transaction Management**: Using `@Transactional` for data consistency
4. **Security First**: All endpoints secured by default
5. **Consistent Naming**: Following Java naming conventions
6. **Error Handling**: Proper exception handling throughout

## Support & Documentation

- **API Documentation**: See `API_DOCUMENTATION.md`
- **Frontend Integration**: See `frontend/my-react-app/src/services/api.js`
- **Database Schema**: Auto-generated by Hibernate based on entity classes

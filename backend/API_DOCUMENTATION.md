# IntelliTrack Backend API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All endpoints (except `/api/auth/**`) require JWT authentication via Bearer token in the Authorization header.

---

## 1. Authentication Endpoints

### POST `/api/auth/login`
**Description:** Authenticate user and get JWT token  
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "id": "long",
  "email": "string",
  "role": "string",
  "token": "string"
}
```

### POST `/api/auth/logout`
**Description:** Logout current user  
**Response:** 200 OK

### GET `/api/auth/validate`
**Description:** Validate current JWT token  
**Response:** 200 OK with boolean

---

## 2. User Management Endpoints

### GET `/api/users`
**Description:** Get all users  
**Authorization:** ADMIN  
**Response:** Array of User objects

### GET `/api/users/{id}`
**Description:** Get user by ID  
**Authorization:** ADMIN  
**Response:** User object

### POST `/api/users`
**Description:** Create new user  
**Authorization:** ADMIN  
**Request Body:** User object  
**Response:** Created user object (201)

### PUT `/api/users/{id}`
**Description:** Update user  
**Authorization:** ADMIN  
**Request Body:** User object  
**Response:** Updated user object

### DELETE `/api/users/{id}`
**Description:** Delete user  
**Authorization:** ADMIN  
**Response:** Success message

### PUT `/api/users/{id}/deactivate`
**Description:** Deactivate user account  
**Authorization:** ADMIN  
**Response:** Success message

---

## 3. Submission Endpoints

### GET `/api/submissions`
**Description:** Get all submissions  
**Response:** Array of Submission objects

### GET `/api/submissions/{id}`
**Description:** Get submission by ID  
**Response:** Submission object

### POST `/api/submissions`
**Description:** Create new submission  
**Request Body:** Submission object  
**Response:** Created submission object (201)

### PUT `/api/submissions/{id}`
**Description:** Update submission  
**Request Body:** Submission object  
**Response:** Updated submission object

### DELETE `/api/submissions/{id}`
**Description:** Delete submission  
**Response:** Success message

### GET `/api/submissions/student/{studentId}`
**Description:** Get all submissions for a specific student  
**Response:** Array of Submission objects

---

## 4. Dashboard Endpoints

### GET `/api/dashboard/student/{studentId}`
**Description:** Get student dashboard data  
**Authorization:** STUDENT or ADMIN  
**Response:**
```json
{
  "totalSubmissions": "number",
  "pendingReviews": "number",
  "approved": "number",
  "revisionsNeeded": "number"
}
```

### GET `/api/dashboard/coordinator/{coordinatorId}`
**Description:** Get coordinator dashboard data  
**Authorization:** COORDINATOR or ADMIN  
**Response:**
```json
{
  "advisedTeams": "number",
  "pendingReviews": "number",
  "reviewedThisWeek": "number",
  "atRiskProjects": "number"
}
```

### GET `/api/dashboard/admin`
**Description:** Get admin dashboard data  
**Authorization:** ADMIN  
**Response:**
```json
{
  "totalStudents": "number",
  "totalAdvisers": "number",
  "activeProjects": "number",
  "pendingReviews": "number"
}
```

### GET `/api/dashboard/analytics`
**Description:** Get system analytics  
**Authorization:** ADMIN  
**Response:**
```json
{
  "totalUsers": "number",
  "totalSubmissions": "number",
  "completionRate": "number",
  "avgResponseTime": "number"
}
```

---

## 5. AI Endpoints

### GET `/api/ai/risk/{submissionId}`
**Description:** Analyze submission risk  
**Authorization:** COORDINATOR or ADMIN  
**Response:** SubmissionRisk object

### POST `/api/ai/recommendation`
**Description:** Generate AI recommendation  
**Authorization:** COORDINATOR or ADMIN  
**Request Body:**
```json
{
  "submissionId": "long (optional)",
  "context": "string (optional)"
}
```
**Response:** String (recommendation text)

---

## 6. Feedback Endpoints

### GET `/api/feedbacks`
**Description:** Get all feedbacks  
**Response:** Array of Feedback objects

### GET `/api/feedbacks/{id}`
**Description:** Get feedback by ID  
**Response:** Feedback object

### POST `/api/feedbacks`
**Description:** Create new feedback  
**Request Body:** Feedback object  
**Response:** Created feedback object (201)

### PUT `/api/feedbacks/{id}`
**Description:** Update feedback  
**Request Body:** Feedback object  
**Response:** Updated feedback object

### DELETE `/api/feedbacks/{id}`
**Description:** Delete feedback  
**Response:** Success message

---

## 7. Deadline Endpoints

### GET `/api/deadlines`
**Description:** Get all deadlines  
**Response:** Array of Deadline objects

### GET `/api/deadlines/{id}`
**Description:** Get deadline by ID  
**Response:** Deadline object

### POST `/api/deadlines`
**Description:** Create new deadline  
**Request Body:** Deadline object  
**Response:** Created deadline object (201)

### PUT `/api/deadlines/{id}`
**Description:** Update deadline  
**Request Body:** Deadline object  
**Response:** Updated deadline object

### DELETE `/api/deadlines/{id}`
**Description:** Delete deadline  
**Response:** Success message

---

## 8. Document Version Endpoints

### GET `/api/document-versions`
**Description:** Get all document versions  
**Authorization:** STUDENT, COORDINATOR, or ADMIN  
**Response:** Array of DocumentVersion objects

### GET `/api/document-versions/{id}`
**Description:** Get document version by ID  
**Authorization:** STUDENT, COORDINATOR, or ADMIN  
**Response:** DocumentVersion object

### POST `/api/document-versions`
**Description:** Create new document version  
**Authorization:** STUDENT, COORDINATOR, or ADMIN  
**Request Body:** DocumentVersion object  
**Response:** Created document version object (201)

### PUT `/api/document-versions/{id}`
**Description:** Update document version  
**Authorization:** STUDENT, COORDINATOR, or ADMIN  
**Request Body:** DocumentVersion object  
**Response:** Updated document version object

### DELETE `/api/document-versions/{id}`
**Description:** Delete document version  
**Authorization:** COORDINATOR or ADMIN  
**Response:** Success message

---

## 9. Inline Comment Endpoints

### GET `/api/inline-comments`
**Description:** Get all inline comments  
**Response:** Array of InlineComment objects

### GET `/api/inline-comments/{id}`
**Description:** Get inline comment by ID  
**Response:** InlineComment object

### POST `/api/inline-comments`
**Description:** Create new inline comment  
**Request Body:** InlineComment object  
**Response:** Created inline comment object (201)

### PUT `/api/inline-comments/{id}`
**Description:** Update inline comment  
**Request Body:** InlineComment object  
**Response:** Updated inline comment object

### DELETE `/api/inline-comments/{id}`
**Description:** Delete inline comment  
**Response:** Success message

---

## 10. Milestone Endpoints

### GET `/api/milestones`
**Description:** Get all milestones  
**Response:** Array of Milestone objects

### GET `/api/milestones/{id}`
**Description:** Get milestone by ID  
**Response:** Milestone object

### POST `/api/milestones`
**Description:** Create new milestone  
**Request Body:** Milestone object  
**Response:** Created milestone object (201)

### PUT `/api/milestones/{id}`
**Description:** Update milestone  
**Request Body:** Milestone object  
**Response:** Updated milestone object

### DELETE `/api/milestones/{id}`
**Description:** Delete milestone  
**Response:** Success message

---

## 11. Notification Endpoints

### GET `/api/notifications`
**Description:** Get all notifications  
**Response:** Array of Notification objects

### GET `/api/notifications/{id}`
**Description:** Get notification by ID  
**Response:** Notification object

### POST `/api/notifications`
**Description:** Create new notification  
**Request Body:** Notification object  
**Response:** Created notification object (201)

### PUT `/api/notifications/{id}`
**Description:** Update notification  
**Request Body:** Notification object  
**Response:** Updated notification object

### DELETE `/api/notifications/{id}`
**Description:** Delete notification  
**Response:** Success message

---

## 12. Profile Endpoints

### GET `/api/profiles`
**Description:** Get all profiles  
**Response:** Array of Profile objects

### GET `/api/profiles/{id}`
**Description:** Get profile by ID  
**Response:** Profile object

### POST `/api/profiles`
**Description:** Create new profile  
**Request Body:** Profile object  
**Response:** Created profile object (201)

### PUT `/api/profiles/{id}`
**Description:** Update profile  
**Request Body:** Profile object  
**Response:** Updated profile object

### DELETE `/api/profiles/{id}`
**Description:** Delete profile  
**Response:** Success message

---

## 13. Project Group Endpoints

### GET `/api/project-groups`
**Description:** Get all project groups  
**Response:** Array of ProjectGroup objects

### GET `/api/project-groups/{id}`
**Description:** Get project group by ID  
**Response:** ProjectGroup object

### POST `/api/project-groups`
**Description:** Create new project group  
**Request Body:** ProjectGroup object  
**Response:** Created project group object (201)

### PUT `/api/project-groups/{id}`
**Description:** Update project group  
**Request Body:** ProjectGroup object  
**Response:** Updated project group object

### DELETE `/api/project-groups/{id}`
**Description:** Delete project group  
**Response:** Success message

---

## 14. Rubric Evaluation Endpoints

### GET `/api/rubric-evaluations`
**Description:** Get all rubric evaluations  
**Response:** Array of RubricEvaluation objects

### GET `/api/rubric-evaluations/{id}`
**Description:** Get rubric evaluation by ID  
**Response:** RubricEvaluation object

### POST `/api/rubric-evaluations`
**Description:** Create new rubric evaluation  
**Request Body:** RubricEvaluation object  
**Response:** Created rubric evaluation object (201)

### PUT `/api/rubric-evaluations/{id}`
**Description:** Update rubric evaluation  
**Request Body:** RubricEvaluation object  
**Response:** Updated rubric evaluation object

### DELETE `/api/rubric-evaluations/{id}`
**Description:** Delete rubric evaluation  
**Response:** Success message

---

## 15. AI Reminder Log Endpoints

### GET `/api/ai-reminder-logs`
**Description:** Get all AI reminder logs  
**Response:** Array of ReminderLog objects

### GET `/api/ai-reminder-logs/{id}`
**Description:** Get AI reminder log by ID  
**Response:** ReminderLog object

### POST `/api/ai-reminder-logs`
**Description:** Create new AI reminder log  
**Request Body:** ReminderLog object  
**Response:** Created reminder log object (201)

### PUT `/api/ai-reminder-logs/{id}`
**Description:** Update AI reminder log  
**Request Body:** ReminderLog object  
**Response:** Updated reminder log object

### DELETE `/api/ai-reminder-logs/{id}`
**Description:** Delete AI reminder log  
**Response:** Success message

---

## 16. Audit Log Endpoints

### GET `/api/audit-logs`
**Description:** Get all audit logs  
**Response:** Array of AuditLog objects

### GET `/api/audit-logs/{id}`
**Description:** Get audit log by ID  
**Response:** AuditLog object

### POST `/api/audit-logs`
**Description:** Create new audit log  
**Request Body:** AuditLog object  
**Response:** Created audit log object (201)

### PUT `/api/audit-logs/{id}`
**Description:** Update audit log  
**Request Body:** AuditLog object  
**Response:** Updated audit log object

### DELETE `/api/audit-logs/{id}`
**Description:** Delete audit log  
**Response:** Success message

---

## Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## CORS Configuration

The backend is configured to accept requests from:
- http://localhost:5173 (Vite default)
- http://localhost:5174
- http://localhost:3000 (React default)

Allowed methods: GET, POST, PUT, DELETE, OPTIONS, PATCH  
Credentials: Allowed

---

## Database Configuration

The application uses MySQL database with the following configuration:
- **Database Name:** intellitrackdb
- **Port:** 3307
- **Hibernate DDL:** update (auto-creates/updates tables)

---

## JWT Configuration

- **Token Expiration:** 24 hours (86400000 ms)
- **Header:** Authorization: Bearer {token}

---

## Notes for Frontend Developers

1. All API endpoints require authentication except `/api/auth/**`
2. Store JWT token in localStorage after successful login
3. Include token in Authorization header: `Bearer {token}`
4. Token is automatically refreshed on each request
5. On 401 response, redirect to login page
6. Use proper error handling for all API calls

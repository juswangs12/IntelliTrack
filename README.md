# IntelliTrack - Capstone Deliverable System

A comprehensive capstone project management system with role-based authentication and dashboards.

## 🎯 Features

### Frontend (React + Vite)

#### Authentication

- **Login Page** with role-based authentication
- Fixed credentials for testing:
  - Student: `student@example.com` / `student123`
  - Coordinator: `coordinator@example.com` / `coordinator123`
  - Admin: `admin@example.com` / `admin123`

#### Role-Based Dashboards

**Student Dashboard**

- Home page with submissions overview and deadlines
- Submissions section with dropdown:
  - Project Proposal
  - SRS (Software Requirements Specification)
  - SDD (Software Design Document)
- Profile page
- Logout functionality

**Coordinator/Adviser Dashboard**

- Home page with pending reviews and advised teams
- Calendar for managing meetings and deadlines
- Profile page
- Logout functionality

**Admin Dashboard**

- Home page with system overview and statistics
- User Management (view, create, edit, delete users)
- System Configuration (academic year, grading rubrics, notifications)
- Deadline Management
- Analytics and Reports
- Logout functionality

### Backend (Spring Boot)

#### API Endpoints

**Authentication** (`/api/auth`)

- `POST /login` - User authentication
- `POST /logout` - User logout
- `GET /validate` - Token validation

**Users** (`/api/users`)

- `GET /` - Get all users
- `GET /{id}` - Get user by ID
- `POST /` - Create new user
- `PUT /{id}` - Update user
- `DELETE /{id}` - Delete user

**Submissions** (`/api/submissions`)

- `GET /` - Get all submissions
- `GET /{id}` - Get submission by ID
- `GET /student/{studentId}` - Get submissions by student
- `GET /status/{status}` - Get submissions by status
- `POST /` - Create new submission
- `PUT /{id}` - Update submission
- `DELETE /{id}` - Delete submission

**Dashboard** (`/api/dashboard`)

- `GET /student/{studentId}` - Student dashboard data
- `GET /coordinator/{coordinatorId}` - Coordinator dashboard data
- `GET /admin` - Admin dashboard data
- `GET /analytics` - System analytics

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Java 21+**
- **Maven**

### Initial Setup (First Time Only)

#### 1. Clone the Repository

```bash
git clone https://github.com/juswangs12/IntelliTrack.git
cd IntelliTrack
```

#### 2. Frontend Setup

```bash
cd frontend/my-react-app
npm install
```

**Important**: The `npm install` command will install all dependencies listed in `package.json`, including:
- React, React Router, Vite
- Tailwind CSS and PostCSS
- Radix UI components (@radix-ui/react-*)
- Utility libraries (clsx, class-variance-authority, tailwind-merge)
- Lucide React icons

#### 3. Backend Setup

```bash
cd backend/intellitrack
./mvnw clean install
```

### Running the Application

#### Start Frontend Development Server

```bash
cd frontend/my-react-app
npm run dev
```

Frontend will run on `http://localhost:5173`

#### Start Backend Server

```bash
cd backend/intellitrack
./mvnw spring-boot:run
```

Backend will run on `http://localhost:8080`

### 🔄 For Team Members (After Pulling Updates)

**Always run these commands after pulling from git:**

```bash
# In the frontend directory
cd frontend/my-react-app
npm install

# In the backend directory (if pom.xml changed)
cd backend/intellitrack
./mvnw clean install
```

**Why?** Git doesn't track `node_modules/` or `target/` folders. When someone adds new dependencies, you need to install them locally.

### 🛠️ Troubleshooting Common Issues

#### White Screen or "Module not found" errors
```bash
cd frontend/my-react-app
npm install
npm run dev
```

#### PostCSS or Tailwind errors
```bash
cd frontend/my-react-app
npm install -D @tailwindcss/postcss tailwindcss postcss autoprefixer
npm run dev
```

#### Backend build errors
```bash
cd backend/intellitrack
./mvnw clean install -U
```

#### Port already in use
- Frontend: Vite will auto-increment to 5174, 5175, etc.
- Backend: Change port in `application.properties`: `server.port=8081`

## 🎨 Design System

### Color Scheme

- **Primary (Maroon)**: `#800020`
- **Secondary (Gold)**: `#FFD700`
- **Success**: `#10b981`
- **Warning**: `#eab308`
- **Danger**: `#ef4444`
- **Info**: `#3b82f6`

### Key Design Principles

1. **Single CSS File**: All styles consolidated in `App.css`
2. **Reusable Components**: Navbar, Sidebar, and Layout components used across all dashboards
3. **Consistent Styling**: Unified color scheme and component design
4. **Responsive Design**: Mobile-friendly layouts

## 📝 Development Guidelines

### Frontend

- Use functional components with hooks
- Implement proper error handling
- Follow React Router best practices
- Keep components modular and reusable

### Backend

- Follow REST API conventions
- Use proper HTTP status codes
- Implement CORS for frontend communication
- Use DTOs for API responses

## 🔜 Next Steps

1. **Database Integration**: Replace in-memory storage with actual database (PostgreSQL/MySQL)
2. **File Upload**: Implement actual file upload for submissions
3. **Authentication**: Add JWT token-based authentication
4. **Email Notifications**: Integrate email service for notifications
5. **Advanced Analytics**: Add charts and visualizations
6. **Testing**: Add unit and integration tests

## 👥 User Roles

### Student

- Submit project deliverables
- View submission status and feedback
- Track deadlines
- Manage profile

### Coordinator/Adviser

- Review student submissions
- Provide feedback
- Manage advised teams
- Schedule meetings and defenses

### Admin

- Manage all users
- Configure system settings
- Set deadlines
- View analytics and reports
- # Monitor system health

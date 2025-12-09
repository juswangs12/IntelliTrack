# Capstone Project Management System - Architecture Migration

## Overview

Successfully migrated from generic placeholder dashboards to a Figma-designed UI using **component-based architecture** with **Tailwind CSS** and **shadcn/ui** components.

## Key Architectural Decisions

### 1. Component-Based Architecture ✅

- **Rule**: Prevent heavy files (many lines) by using reusable components
- **Benefit**: Each dashboard is now ~75-85 lines, composing pre-built widgets
- **Widget Components**: 8 reusable components averaging 25-130 lines each

### 2. Styling Approach ✅

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Accessible, unstyled Radix UI components with beautiful defaults
- **Coexistence**: Existing `App.css` preserved alongside Tailwind utilities
- **Color Scheme**: Maintained maroon (#800020) and gold (#FFD700) branding

## Technology Stack

### Frontend

- **Framework**: React 19.2.0 with Vite 7.2.6
- **Routing**: React Router DOM 7.10.1
- **Icons**: Lucide React 0.555.0
- **Styling**: Tailwind CSS 3.x with PostCSS and Autoprefixer
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Utilities**: class-variance-authority, clsx, tailwind-merge

### Backend (Unchanged)

- **Framework**: Spring Boot 4.0.0
- **Java**: Version 21
- **Build Tool**: Maven

## File Structure

```
src/
├── components/
│   ├── ui/                          # shadcn/ui base components (12 files)
│   │   ├── card.jsx                 # Container component
│   │   ├── button.jsx               # Interactive button (6 variants)
│   │   ├── badge.jsx                # Status badges
│   │   ├── input.jsx                # Form input fields
│   │   ├── label.jsx                # Form labels
│   │   ├── dialog.jsx               # Modal dialogs
│   │   ├── select.jsx               # Dropdown selects
│   │   ├── table.jsx                # Data tables
│   │   ├── avatar.jsx               # User avatars
│   │   ├── dropdown-menu.jsx        # Context menus
│   │   ├── sheet.jsx                # Side drawers
│   │   └── progress.jsx             # Progress bars
│   │
│   ├── dashboard-widgets/           # Reusable dashboard components (8 files)
│   │   ├── StatsCard.jsx            # ~25 lines - Metric display cards
│   │   ├── DeadlineCard.jsx         # ~60 lines - Upcoming deadlines
│   │   ├── SubmissionList.jsx       # ~85 lines - Submission tracking
│   │   ├── UserTable.jsx            # ~75 lines - User management
│   │   ├── DeadlineTable.jsx        # ~70 lines - Deadline management
│   │   ├── CalendarView.jsx         # ~130 lines - Interactive calendar
│   │   ├── SystemSettings.jsx       # ~70 lines - System configuration
│   │   └── ProjectProgress.jsx      # ~25 lines - Progress display
│   │
│   ├── DashboardLayout.jsx          # ~230 lines - Main app shell
│   ├── LoginPage.jsx                # ~100 lines - Authentication
│   ├── StudentDashboard.jsx         # ~75 lines - Student view
│   ├── AdviserDashboard.jsx         # ~85 lines - Adviser view
│   └── AdminDashboard.jsx           # ~80 lines - Admin view
│
├── lib/
│   └── utils.js                     # cn() utility for class merging
│
├── App.jsx                          # ~80 lines - Simplified routing
└── index.css                        # Tailwind directives + CSS variables
```

## Components Breakdown

### UI Base Components (src/components/ui/)

All components use:

- **Radix UI primitives** for accessibility
- **Tailwind classes** for styling
- **ForwardRef pattern** for ref forwarding
- **cn() utility** for conditional class merging

### Dashboard Widget Components (src/components/dashboard-widgets/)

#### StatsCard.jsx (~25 lines)

**Purpose**: Display key metrics with icons and trends  
**Props**: `title`, `value`, `icon`, `iconColor`, `borderColor`, `trend`  
**Usage**: Overview statistics (deadlines, approvals, users, etc.)

#### DeadlineCard.jsx (~60 lines)

**Purpose**: Show upcoming deadlines with visual urgency indicators  
**Props**: `deadlines` array with `id`, `title`, `description`, `dueDate`, `daysLeft`, `category`  
**Features**: Color-coded urgency (red ≤3 days, yellow ≤7 days, green >7 days), upload buttons

#### SubmissionList.jsx (~85 lines)

**Purpose**: Track submission status with feedback display  
**Props**: `submissions` array, `showActions` boolean  
**Features**: Status icons (approved/pending/rejected), feedback display, resubmit action

#### UserTable.jsx (~75 lines)

**Purpose**: Admin user management interface  
**Props**: `users` array, `onAdd`, `onEdit`, `onDelete` callbacks  
**Features**: Role badges, CRUD operations, group assignments

#### DeadlineTable.jsx (~70 lines)

**Purpose**: Admin deadline management interface  
**Props**: `deadlines` array, `onAdd`, `onEdit`, `onDelete` callbacks  
**Features**: Category badges, CRUD operations, date formatting

#### CalendarView.jsx (~130 lines)

**Purpose**: Interactive calendar with deadline highlighting  
**Props**: `deadlines` object keyed by date (YYYY-MM-DD format)  
**Features**: Month navigation, deadline indicators, current date highlighting

#### SystemSettings.jsx (~70 lines)

**Purpose**: Admin system configuration form  
**Props**: `settings` object, `onSave` callback  
**Features**: Academic year/semester selects, file size limits, reminder settings

#### ProjectProgress.jsx (~25 lines)

**Purpose**: Display project completion phases  
**Props**: `phases` array with `name` and `progress` (0-100)  
**Features**: Multiple progress bars with percentage display

### Main Layout Components

#### DashboardLayout.jsx (~230 lines)

**Purpose**: Main application shell with navigation  
**Features**:

- Sidebar navigation with role-based menu items
- Mobile-responsive Sheet drawer
- User dropdown with profile/settings/logout
- Notification bell with DropdownMenu
- Avatar with user initials
- Role badge display

#### LoginPage.jsx (~100 lines)

**Purpose**: Authentication entry point  
**Features**:

- Gradient background with branding colors
- Icon-prefixed input fields
- Demo credentials helper box
- Email-based role detection

### Dashboard Wrapper Components

#### StudentDashboard.jsx (~75 lines)

**Widgets Used**: StatsCard (4x), DeadlineCard, SubmissionList, ProjectProgress  
**Mock Data**: 4 deadlines, 4 submissions, 3 project phases

#### AdviserDashboard.jsx (~85 lines)

**Widgets Used**: StatsCard (4x), CalendarView, SubmissionList  
**Mock Data**: 5 groups, 5 submissions, deadline calendar

#### AdminDashboard.jsx (~80 lines)

**Widgets Used**: StatsCard (4x), UserTable, DeadlineTable, SystemSettings  
**Mock Data**: 5 users, 3 deadlines, system settings

## Configuration Files

### tailwind.config.js

- **Dark Mode**: Class-based dark mode support
- **Content Paths**: Configured for Vite (`./index.html`, `./src/**/*.{js,jsx}`)
- **Extended Theme**: Custom HSL color variables for shadcn/ui
- **Border Radius**: CSS variable-based border radius customization

### postcss.config.js

- **Plugins**: tailwindcss, autoprefixer

### src/index.css

- **Tailwind Directives**: `@tailwind base/components/utilities`
- **CSS Variables**: Light/dark mode color definitions
- **Base Styles**: Body font smoothing, universal box-sizing

## Authentication Flow

### Demo Credentials

- **Student**: student@university.edu
- **Adviser**: adviser@university.edu
- **Admin**: admin@university.edu
- **Password**: Any (demo mode)

### Role Detection

Email prefix determines role:

- `student@` → Student Dashboard
- `adviser@` → Adviser Dashboard
- `admin@` → Admin Dashboard

## Removed Files

The following old components were removed to reduce clutter:

- `StudentDashboard.jsx` (old version)
- `Layout.jsx`
- `Navbar.jsx`
- `Sidebar.jsx`
- `CoordinatorDashboard.jsx`
- `AdminDashboard.jsx` (old version)

## Testing

### Development Server

```powershell
cd frontend/my-react-app
npm run dev
```

Server runs on: http://localhost:5175/ (auto-incremented from 5173)

### Test Scenarios

1. **Login**: Test all three demo accounts
2. **Student Dashboard**: Verify deadlines, submissions, progress display
3. **Adviser Dashboard**: Check calendar navigation, group submissions
4. **Admin Dashboard**: Test user/deadline tables, system settings
5. **Mobile Responsiveness**: Verify Sheet drawer on mobile viewports
6. **Navigation**: Test sidebar links and user dropdown

## Benefits of New Architecture

### Before (Monolithic)

- ❌ Single dashboard files would be 1000+ lines
- ❌ Code duplication across dashboards
- ❌ Difficult to maintain and debug
- ❌ Hard to reuse components

### After (Component-Based)

- ✅ Dashboard files are ~75-85 lines
- ✅ Widget components are 25-130 lines
- ✅ Zero code duplication
- ✅ Easy to maintain and extend
- ✅ Components reusable across all dashboards
- ✅ Clear separation of concerns

## Next Steps

### Backend Integration

1. Replace mock data with API calls
2. Connect to Spring Boot REST endpoints
3. Implement authentication with JWT
4. Add loading states and error handling

### Feature Enhancements

1. File upload functionality for submissions
2. Real-time notifications
3. Advanced calendar features (drag-and-drop)
4. User profile editing
5. Advanced analytics/reporting

### UI Polish

1. Add loading skeletons
2. Toast notifications for actions
3. Confirmation dialogs for destructive actions
4. Form validation
5. Dark mode toggle

## Git Commit

```bash
git add .
git commit -m "feat: Migrate to component-based architecture with Tailwind CSS and shadcn/ui

- Install Tailwind CSS with PostCSS and Autoprefixer
- Add 12 shadcn/ui base components (Card, Button, Badge, Input, etc.)
- Create 8 reusable dashboard widget components
- Implement lightweight dashboard wrappers (~75-85 lines each)
- Replace monolithic dashboards with composable architecture
- Update routing for simplified navigation
- Maintain maroon/gold color scheme
- Support mobile responsiveness with Sheet drawer"
```

## Documentation

- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Radix UI**: https://www.radix-ui.com/
- **Lucide Icons**: https://lucide.dev/icons
- **React Router**: https://reactrouter.com/

---

**Created**: December 2025  
**Architecture**: Component-Based with Tailwind CSS  
**Status**: ✅ Ready for Development

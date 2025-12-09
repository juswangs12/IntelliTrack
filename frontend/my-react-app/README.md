# IntelliTrack Frontend

React + Vite application with Tailwind CSS and shadcn/ui components.

## 🚀 Quick Start

### First Time Setup

```bash
npm install
npm run dev
```

### After Pulling Updates

```bash
npm install
npm run dev
```

## 📦 Technology Stack

- **React 19.2.0** - UI framework
- **Vite 7.2.6** - Build tool and dev server
- **React Router DOM 7.10.1** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library built on Radix UI
- **Lucide React** - Icon library

## 🛠️ Key Dependencies

### UI Components
- `@radix-ui/react-avatar` - Avatar component
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-label` - Form labels
- `@radix-ui/react-select` - Select dropdowns
- `@radix-ui/react-slot` - Composition utility

### Styling & Utilities
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - PostCSS plugin for Tailwind v4
- `postcss` - CSS transformation
- `autoprefixer` - Automatic vendor prefixing
- `class-variance-authority` - Component variant system
- `clsx` - Conditional classnames
- `tailwind-merge` - Merge Tailwind classes

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                      # shadcn/ui base components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── badge.jsx
│   │   ├── dialog.jsx
│   │   ├── select.jsx
│   │   ├── table.jsx
│   │   ├── avatar.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── sheet.jsx
│   │   └── progress.jsx
│   ├── dashboard-widgets/       # Reusable dashboard components
│   │   ├── StatsCard.jsx
│   │   ├── DeadlineCard.jsx
│   │   ├── SubmissionList.jsx
│   │   ├── UserTable.jsx
│   │   ├── DeadlineTable.jsx
│   │   ├── CalendarView.jsx
│   │   ├── SystemSettings.jsx
│   │   └── ProjectProgress.jsx
│   ├── DashboardLayout.jsx      # Main app shell
│   ├── LoginPage.jsx            # Authentication
│   ├── StudentDashboard.jsx     # Student view
│   ├── AdviserDashboard.jsx     # Adviser view
│   └── AdminDashboard.jsx       # Admin view
├── lib/
│   └── utils.js                 # cn() utility for class merging
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Global styles + Tailwind

## 🎨 Styling Architecture

### Component-Based Design
- Each dashboard is ~75-85 lines, composed of reusable widgets
- Widget components are 25-130 lines each
- All UI components use Tailwind utility classes
- Custom CSS variables for theming (maroon #800020, gold #FFD700)

### Utility Function
The `cn()` function in `src/lib/utils.js` merges Tailwind classes intelligently:

```javascript
import { cn } from "../lib/utils";

// Usage
<div className={cn("base-class", condition && "conditional-class", className)} />
```

## 🔐 Authentication

Demo credentials for testing:
- **Student**: `student@university.edu` (any password)
- **Adviser**: `adviser@university.edu` (any password)
- **Admin**: `admin@university.edu` (any password)

Role detection is based on email prefix.

## 🐛 Common Issues & Solutions

### Issue: White screen or blank page
**Solution:**
```bash
npm install
npm run dev
```

### Issue: "Cannot find module '@tailwindcss/postcss'"
**Solution:**
```bash
npm install -D @tailwindcss/postcss
```

### Issue: "Failed to resolve import './utils'"
**Solution:** Check that `src/lib/utils.js` exists. UI components import from `../../lib/utils`.

### Issue: "The requested module does not provide an export named 'X'"
**Solution:** Check that UI component files in `src/components/ui/` are not empty and have proper exports.

### Issue: Duplicate import errors
**Solution:** Check for duplicate import statements in the problematic file.

## 📝 Development Guidelines

### Adding New UI Components
1. Create file in `src/components/ui/`
2. Use `cn()` utility for className merging
3. Import from `../../lib/utils`
4. Export all component variants

### Adding New Dashboard Widgets
1. Create file in `src/components/dashboard-widgets/`
2. Keep components focused and reusable
3. Accept data as props (no hardcoded data)
4. Use existing UI components from `ui/`

### Styling Best Practices
- Use Tailwind utility classes
- Use `cn()` for conditional classes
- Reference CSS variables for brand colors
- Follow mobile-first responsive design

## 🔧 Build & Deploy

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

Build output goes to `dist/` folder.

## 📚 Additional Resources

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

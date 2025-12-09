# Contributing to IntelliTrack

Thank you for your interest in contributing to IntelliTrack! This document provides guidelines and best practices for developers.

## 🚀 Getting Started

### 1. Set Up Your Development Environment

#### Prerequisites
- Node.js 18+ and npm
- Java 21+
- Maven
- Git

#### Initial Setup
```bash
# Clone the repository
git clone https://github.com/juswangs12/IntelliTrack.git
cd IntelliTrack

# Install frontend dependencies
cd frontend/my-react-app
npm install

# Install backend dependencies
cd ../../backend/intellitrack
./mvnw clean install
```

### 2. Create a Feature Branch

```bash
# Always work on a feature branch, never directly on main
git checkout -b feature/your-feature-name

# or for bug fixes
git checkout -b fix/bug-description
```

### 3. Keep Dependencies in Sync

**⚠️ IMPORTANT: After pulling from main, always run:**

```bash
# Frontend
cd frontend/my-react-app
npm install

# Backend (if pom.xml changed)
cd backend/intellitrack
./mvnw clean install
```

## 📋 Development Workflow

### Frontend Changes

1. **Start the dev server**
   ```bash
   cd frontend/my-react-app
   npm run dev
   ```

2. **Make your changes** in `src/` directory

3. **Test locally** at `http://localhost:5173`

4. **Check for errors**
   - Browser console for JavaScript errors
   - Terminal for build errors

### Backend Changes

1. **Start the backend**
   ```bash
   cd backend/intellitrack
   ./mvnw spring-boot:run
   ```

2. **Make your changes** in `src/main/java/`

3. **Test endpoints** at `http://localhost:8080`

4. **Check for errors** in terminal output

## 🎨 Code Style Guidelines

### Frontend (React/JavaScript)

```javascript
// ✅ Good
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function MyComponent({ className, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* component content */}
    </div>
  );
}

// ❌ Bad
import {useState} from "react"  // Inconsistent quotes

function MyComponent(props) {   // Not destructured
  var isOpen = false            // Use const/let, not var
  
  return <div className={props.className}>  // Not using cn()
    // content
  </div>
}
```

### Backend (Java/Spring Boot)

```java
// ✅ Good
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        // implementation
    }
}

// ❌ Bad
@RestController
public class UserController {  // Missing @RequestMapping
    
    @GetMapping("/api/users/{id}")  // Hardcoded path
    public User getUser(@PathVariable Long id) {  // Exposing entity
        // implementation
    }
}
```

## 🔍 Before Committing

### Frontend Checklist
- [ ] No console errors or warnings
- [ ] App runs without errors (`npm run dev`)
- [ ] Components are properly exported
- [ ] Imports use correct paths (`../../lib/utils`)
- [ ] Tailwind classes are used correctly
- [ ] No duplicate imports

### Backend Checklist
- [ ] Code compiles without errors (`./mvnw clean install`)
- [ ] API endpoints return correct status codes
- [ ] DTOs are used instead of entities in responses
- [ ] CORS is configured for frontend communication

### General Checklist
- [ ] Code follows project style guidelines
- [ ] No sensitive data (passwords, API keys) in code
- [ ] Comments explain "why", not "what"
- [ ] Meaningful commit messages

## 📝 Commit Message Format

Use descriptive commit messages:

```bash
# Good commit messages
git commit -m "feat: Add deadline calendar to adviser dashboard"
git commit -m "fix: Resolve duplicate GraduationCap import in LoginPage"
git commit -m "refactor: Extract stats card into reusable component"
git commit -m "docs: Update README with troubleshooting section"

# Bad commit messages
git commit -m "fix"
git commit -m "update stuff"
git commit -m "changes"
```

### Commit Types
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring (no functionality change)
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🔀 Pull Request Process

### 1. Update Your Branch
```bash
git checkout main
git pull origin main
git checkout your-feature-branch
git merge main
```

### 2. Resolve Conflicts (if any)
- Carefully review conflicting files
- Test thoroughly after resolving
- Commit the merge

### 3. Push Your Branch
```bash
git push origin your-feature-branch
```

### 4. Create Pull Request
- Go to GitHub repository
- Click "New Pull Request"
- Select your branch
- Fill in description:
  - What changes were made
  - Why they were needed
  - How to test them
  - Any breaking changes

### 5. Code Review
- Address reviewer feedback
- Make requested changes
- Push updates to same branch

## 🚨 Common Issues & Solutions

### Issue: "npm install" doesn't fix missing packages

**Cause:** `package.json` is missing dependencies  
**Solution:**
```bash
cd frontend/my-react-app
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-label class-variance-authority clsx tailwind-merge
```

### Issue: Merge conflicts in package-lock.json

**Solution:**
```bash
# Delete package-lock.json
rm package-lock.json

# Reinstall
npm install

# Commit the new package-lock.json
git add package-lock.json
git commit -m "fix: Regenerate package-lock.json"
```

### Issue: Empty UI component files after merge

**Cause:** Git merge conflict resolved incorrectly  
**Solution:** Check the component files in `src/components/ui/` and restore from the repository or recreate them.

## 📦 Adding New Dependencies

### Frontend
```bash
cd frontend/my-react-app

# For runtime dependencies
npm install package-name

# For dev dependencies (build tools, etc.)
npm install -D package-name

# Commit both package.json AND package-lock.json
git add package.json package-lock.json
git commit -m "feat: Add package-name for feature"
```

### Backend
```bash
cd backend/intellitrack

# Add dependency to pom.xml manually
# Then update
./mvnw clean install

# Commit pom.xml
git add pom.xml
git commit -m "feat: Add dependency for feature"
```

## 🧪 Testing Guidelines

### Frontend Testing
- Test all user flows (login → dashboard → features)
- Check responsive design (mobile, tablet, desktop)
- Test with all three roles (student, adviser, admin)
- Verify no console errors

### Backend Testing
- Test API endpoints with Postman or curl
- Verify HTTP status codes
- Check error handling
- Test with different user roles

## 🤝 Getting Help

- **Questions?** Open a GitHub issue with the `question` label
- **Bug found?** Open a GitHub issue with the `bug` label
- **Feature idea?** Open a GitHub issue with the `enhancement` label

## 📚 Additional Resources

- [Project README](./README.md)
- [Frontend README](./frontend/my-react-app/README.md)
- [Migration Summary](./MIGRATION_SUMMARY.md)

---

**Remember:** Always pull latest changes and run `npm install` before starting work! 🚀

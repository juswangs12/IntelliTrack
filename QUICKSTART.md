# ⚠️ IMPORTANT: Read This First!

## After Pulling Changes from Git

**ALWAYS run these commands after `git pull`:**

```bash
# Navigate to frontend directory
cd frontend/my-react-app

# Install/update dependencies
npm install

# Start dev server
npm run dev
```

## Why?

- Git doesn't track the `node_modules/` folder (it's in `.gitignore`)
- When someone adds new packages, you need to install them locally
- `package.json` and `package-lock.json` ARE tracked and tell npm what to install

## Quick Fixes for Common Errors

### 1. White Screen / Module Not Found
```bash
cd frontend/my-react-app
npm install
npm run dev
```

### 2. PostCSS / Tailwind Errors
```bash
cd frontend/my-react-app
npm install -D @tailwindcss/postcss tailwindcss postcss autoprefixer
npm run dev
```

### 3. Missing Radix UI Components
```bash
cd frontend/my-react-app
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-label class-variance-authority clsx tailwind-merge
npm run dev
```

### 4. Backend Build Errors
```bash
cd backend/intellitrack
./mvnw clean install -U
./mvnw spring-boot:run
```

## Development Workflow Checklist

### Starting Work
- [ ] `git pull origin main`
- [ ] `cd frontend/my-react-app && npm install`
- [ ] `npm run dev` (frontend on port 5173)
- [ ] `cd backend/intellitrack && ./mvnw spring-boot:run` (backend on port 8080)

### Before Committing
- [ ] No console errors in browser
- [ ] App runs without errors
- [ ] Meaningful commit message
- [ ] Test with all user roles if applicable

### Finishing Work
- [ ] `git add .`
- [ ] `git commit -m "type: description"`
- [ ] `git push origin your-branch`

## Need More Help?

- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
- Check [README.md](./README.md) for setup instructions
- Check [frontend/my-react-app/README.md](./frontend/my-react-app/README.md) for frontend details

## Test Credentials

- **Student**: student@university.edu (any password)
- **Adviser**: adviser@university.edu (any password)
- **Admin**: admin@university.edu (any password)

---

**Remember: When in doubt, run `npm install` first!** 🚀

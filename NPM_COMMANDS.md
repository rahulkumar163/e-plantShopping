# NPM Scripts & Commands Guide

## Available NPM Scripts

### Development

**Start Development Server:**
```bash
npm start
```
- Starts the React development server
- Opens app at http://localhost:3000
- Hot reloading enabled
- Shows compilation errors in browser

**Run Tests:**
```bash
npm test
```
- Runs test suite in interactive watch mode
- Press `q` to exit

### Production

**Build for Production:**
```bash
npm run build
```
- Creates optimized production build
- Output in `/build` folder
- Minifies JavaScript and CSS
- Ready for deployment

**Eject Configuration:**
```bash
npm run eject
```
⚠️ **Warning**: This is irreversible!
- Exposes webpack configuration
- Allows custom build setup
- Not recommended for most users

---

## Common Development Commands

### Install a New Package
```bash
npm install package-name
```

### Install Dev Dependency
```bash
npm install --save-dev package-name
```

### Uninstall Package
```bash
npm uninstall package-name
```

### Update All Dependencies
```bash
npm update
```

### Clean Install
```bash
npm ci
```

### List Installed Packages
```bash
npm list
```

---

## Troubleshooting

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall All Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check for Security Issues
```bash
npm audit
```

### Fix Security Issues
```bash
npm audit fix
```

---

## Project-Specific Information

### Dependencies Installed

```json
{
  "react": "^18.2.0",
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.1.1",
  "react-router-dom": "^6.14.0",
  "axios": "^1.4.0"
}
```

### Dev Dependencies

```json
{
  "react-scripts": "5.0.1"
}
```

---

## File Structure After Installation

```
paradise_nursery/
├── node_modules/          # All installed packages
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── data/
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Performance Tips

### Optimize Build Size
- Remove unused dependencies
- Lazy load components
- Code splitting with React.lazy()
- Tree shaking

### Speed Up Development
- Use React DevTools browser extension
- Enable Redux DevTools
- Use Fast Refresh
- Profile with Chrome DevTools

---

## Deployment Ready

The project is ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Heroku
- Firebase Hosting

**Build First:**
```bash
npm run build
```

**Then deploy the `/build` folder**

---

## Quick Start Checklist

- [ ] Install Node.js
- [ ] Clone/download project
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Browser opens at localhost:3000
- [ ] Test features
- [ ] Start developing!

---

For more information, see PROJECT_GUIDE.md

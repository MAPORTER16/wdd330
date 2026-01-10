# ⛺ SleepOutside E-Commerce Web Application

**BYU-Pathway Worldwide Online**
**WDD 330 - Web Frontend Development II**

An e-commerce web application for outdoor camping gear, featuring a product catalog, shopping cart functionality with localStorage persistence, and a checkout process.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Course Resources](#course-resources)

## About the Project

This repository contains the SleepOutside web application project for WDD 330. The project demonstrates:

- Dynamic product rendering from JSON data
- Shopping cart functionality with localStorage
- Responsive design for mobile and desktop
- Modern JavaScript (ES6+ modules)
- Build tooling with Vite
- Code quality tools (ESLint, Prettier)

The repository contains branches which serve as checkpoints for team and individual assignments throughout the course.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

**Need help installing Node.js?**
Follow the setup guide: [WDD 330 Environment Setup](https://byui-cse.github.io/wdd330-ww-course/intro/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wdd330
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - Vite (development server and build tool)
   - ESLint (code linting)
   - Prettier (code formatting)
   - Jest (testing framework)

3. **Verify installation**
   ```bash
   npm run lint
   ```

   If no errors appear, you're ready to go!

## Usage

### Starting the Development Server

```bash
npm start
```

This will:
- Start a local development server (usually at `http://localhost:5173`)
- Open your default browser automatically
- Watch for file changes and hot-reload the page

### Building for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

## Project Structure

```
wdd330/
├── src/
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript modules
│   │   ├── cart.js       # Shopping cart rendering
│   │   ├── product.js    # Product detail and cart logic
│   │   ├── utils.mjs     # Utility functions (localStorage, etc.)
│   │   └── ProductData.mjs
│   ├── json/             # Product data
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout page
│   ├── product_pages/    # Individual product pages
│   └── index.html        # Homepage
├── dist/                 # Production build output (generated)
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```

## Development Workflow

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Build production-ready files |
| `npm run lint` | Check code for errors with ESLint |
| `npm run format` | Auto-format code with Prettier |
| `npm test` | Run Jest tests |

### Recommended Development Process

1. **Before starting work:**
   ```bash
   git pull origin main
   npm install
   ```

2. **During development:**
   ```bash
   npm start          # Start dev server
   npm run lint       # Check for errors
   npm run format     # Format your code
   ```

3. **Before committing:**
   ```bash
   npm run lint       # Ensure no errors
   npm run format     # Ensure consistent formatting
   npm run build      # Test production build
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin your-branch-name
   ```

## Troubleshooting

### "eslint: command not found"

**Problem:** ESLint is not installed.

**Solution:**
```bash
npm install
```

### Port already in use

**Problem:** Another application is using port 5173.

**Solution:** Stop the other application or Vite will automatically use the next available port.

### Changes not appearing in browser

**Solution:**
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Restart the dev server

### LocalStorage not persisting

**Solution:**
1. Check DevTools → Application → Local Storage
2. Ensure browser isn't in private/incognito mode
3. Check that localStorage isn't disabled in browser settings

## Course Resources

- [Week 1 Team Activity](https://byui-cse.github.io/wdd330-ww-course/week01/team.html)
- [Course Website](https://byui-cse.github.io/wdd330-ww-course/)
- [WDD 330 GitHub Repository](https://github.com/byui-cse/wdd330-ww-course)

---

_BYU-Pathway Worldwide improves lives through access to spiritually based, online affordable higher education. Its mission is to develop disciples of Jesus Christ who are leaders in their homes, the Church, and their communities._




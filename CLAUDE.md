# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Quick Start

```bash
npm install              # Install dependencies
npm run dev             # Start development server (port 3000)
npm run build           # Build for production
```

## 📋 Development Commands

### Core Development

- **`npm run dev`** - Start development server with hot reload (localhost:3000)
- **`npm run build`** - Production build with optimization and minification
- **`npm run preview`** - Preview production build locally

### Code Quality & Testing

- **`npm run type-check`** - TypeScript type checking (no emit)
- **`npm run lint`** - ESLint code quality check (zero warnings policy)
- **`npm run lint:fix`** - Auto-fix ESLint issues where possible
- **`npm run format`** - Format all code with Prettier
- **`npm run format:check`** - Check if code is properly formatted

### Build Analysis & Maintenance

- **`npm run build:analyze`** - Build with bundle size analysis
- **`npm run clean`** - Clean build directory
- **`npm install`** - Install/update dependencies

## 🔧 Environment Setup

### Required Environment Variables

- **`GEMINI_API_KEY`** - Set in `.env.local` for local development
- **Development**: Create `.env.local` in project root

### Supported Node.js Versions

- **Recommended**: Node.js 18+ with npm 9+
- **TypeScript**: Version 5.5.4 (ESLint compatible)

## 🏗 Architecture Overview

### Technology Stack

- **Frontend**: React 19 + TypeScript 5.5
- **Build Tool**: Vite 6 with optimized configuration
- **Routing**: React Router v7 (HashRouter for GitHub Pages)
- **Styling**: Tailwind CSS with dark mode support
- **Animation**: Framer Motion for smooth transitions
- **Development**: ESLint + Prettier + Husky pre-commit hooks

### Core Architectural Patterns

#### 🔄 **Routing & Navigation**

- **HashRouter**: Client-side routing with GitHub Pages compatibility
- **Lazy Loading**: All pages code-split with React.lazy()
- **Dynamic Routes**: Product pages support nested parameters (`/products/:slug/:item`)
- **Mega Menu**: Sophisticated hierarchical navigation with categories

#### ⚡ **Performance Optimizations**

- **Code Splitting**: Automatic route-based splitting
- **Memoization**: Strategic use of React.memo(), useMemo(), useCallback()
- **Bundle Optimization**: Manual vendor chunks (React, Router, Framer Motion)
- **Terser Minification**: Production builds stripped and optimized
- **Chunk Size Monitoring**: 1MB warning threshold with analysis

#### 🛡 **Error Handling & Resilience**

- **Error Boundaries**: App-level and route-level error catching
- **Graceful Fallbacks**: User-friendly error UI with recovery options
- **Loading States**: Consistent loading experience with spinners
- **TypeScript Strict Mode**: Compile-time error prevention

#### 🎨 **Theme System**

- **Multi-mode Support**: Light, dark, and system preference detection
- **localStorage Persistence**: Theme preferences saved across sessions
- **CSS Variables**: Tailwind dark mode with automatic class switching
- **FOUC Prevention**: Theme applied before React hydration

## 📁 Project Structure

### Source Organization

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx    # Polymorphic button component
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx    # Main navigation with mega menu
│   │   ├── MegaMenu.tsx  # Complex dropdown navigation
│   │   ├── SEO.tsx       # Dynamic meta tag management
│   │   └── ...
│   ├── icons/            # SVG icon components
│   └── ServiceCard.tsx   # Specialized components
├── pages/                # Route components (lazy-loaded)
├── contexts/             # React context providers
├── hooks/                # Custom React hooks
│   ├── useMenuState.ts   # Menu management logic
│   ├── useBodyScrollLock.ts
│   └── useTheme.ts
├── constants/            # Static data and configuration
│   ├── index.ts          # Business data (nav, services, etc.)
│   └── styles.ts         # Design system constants
├── types.ts              # TypeScript definitions
└── utils/                # Utility functions
```

### Key Design Patterns

#### 🧩 **Component Architecture**

- **Composition over Inheritance**: Flexible, reusable components
- **Polymorphic Components**: Button supports both `<button>` and `<Link>`
- **Custom Hooks**: Business logic extracted from components
- **Consistent Props**: Standardized prop patterns across components

#### 📊 **State Management**

- **Context API**: Theme and global state management
- **Local State**: Component-specific state with useState
- **Custom Hooks**: Reusable stateful logic (menu, scroll lock)
- **No External Store**: Lightweight approach for current needs

#### 🎯 **Type Safety**

- **Strict TypeScript**: Comprehensive type coverage
- **Readonly Interfaces**: Immutable data structures
- **Const Assertions**: Better type inference for constants
- **Utility Types**: Custom types for common patterns

## 🔍 SEO & Accessibility

### Search Engine Optimization

- **Dynamic Meta Tags**: Per-page title, description, keywords
- **Open Graph**: Facebook and social media optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Canonical URLs**: Automatic canonical link management
- **Structured HTML**: Semantic markup with proper heading hierarchy

### Accessibility Features

- **Skip Links**: Keyboard navigation shortcuts
- **ARIA Labels**: Screen reader support throughout
- **Semantic HTML**: Proper roles and landmarks
- **Color Contrast**: Dark/light theme compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling in modals/menus

## 🔄 Code Quality & Standards

### Automated Quality Assurance

- **Pre-commit Hooks**: Husky + lint-staged integration
- **ESLint Rules**: React, TypeScript, and accessibility rules
- **Prettier**: Consistent code formatting (100-char line length)
- **TypeScript**: Strict mode with comprehensive type checking

### ESLint Configuration

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ]
}
```

### Development Workflow

1. **Write Code**: TypeScript with strict type checking
2. **Save File**: Prettier auto-formats on save (if configured)
3. **Commit**: Pre-commit hooks run lint + format automatically
4. **Build**: Production build validates everything works

## 🏭 Build & Deployment

### Production Build Features

- **Terser Minification**: JavaScript compression and optimization
- **CSS Code Splitting**: Separate CSS bundles for better caching
- **Source Maps**: Development-only for debugging
- **Console Stripping**: Production builds remove console.log
- **Asset Optimization**: Images and static assets optimized

### Bundle Analysis

```bash
npm run build:analyze    # Generates bundle size report
```

### Deployment Targets

- **GitHub Pages**: HashRouter ensures compatibility
- **Static Hosting**: Netlify, Vercel, AWS S3, etc.
- **CDN Ready**: Optimized assets for global distribution

## 🚨 Common Development Tasks

### Adding New Pages

1. Create component in `src/pages/`
2. Add lazy import to `src/App.tsx`
3. Add route to React Router configuration
4. Add SEO component with appropriate meta tags

### Adding New Components

1. Follow existing patterns in `src/components/common/`
2. Use TypeScript interfaces for props
3. Include accessibility attributes (ARIA labels)
4. Test with both light and dark themes

### Updating Navigation

1. Modify `NAV_LINKS` in `src/constants/index.ts`
2. For mega menu items, update `PRODUCTS_MENU_CONTENT`
3. Test mobile and desktop navigation

### Performance Monitoring

- **Bundle Size**: Monitor chunk sizes in build output
- **Type Check**: Run `npm run type-check` regularly
- **Lighthouse**: Test SEO and accessibility scores

## 🐛 Troubleshooting

### Common Issues

- **TypeScript Errors**: Run `npm run type-check` to identify issues
- **ESLint Warnings**: Run `npm run lint` to see code quality issues
- **Build Failures**: Check for missing dependencies or type errors
- **Theme Not Applied**: Verify ThemeProvider wraps the app

### Performance Issues

- **Large Bundle Size**: Check manual chunks in `vite.config.ts`
- **Slow Development**: Ensure proper memoization in components
- **Memory Leaks**: Check for missing cleanup in useEffect hooks

## 📚 Additional Resources

### Key Dependencies

- **React 19**: Latest React with concurrent features
- **TypeScript 5.5**: Type-safe JavaScript development
- **Vite 6**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **React Router 7**: Client-side routing solution

### Code Style Guidelines

- **Naming**: Use descriptive, consistent naming conventions
- **File Organization**: Group related functionality together
- **Import Order**: External libraries, then relative imports
- **Component Size**: Keep components focused and under 200 lines
- **Type Annotations**: Explicit types for component props and complex functions

This codebase follows modern React best practices and is optimized for maintainability, performance, and developer experience.

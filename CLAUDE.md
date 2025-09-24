# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on port 3000)
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Install dependencies**: `npm install`

## Environment Setup

This project requires a `GEMINI_API_KEY` environment variable. Set it in a `.env.local` file for local development.

## Architecture Overview

This is a React + TypeScript website built with Vite, using React Router for navigation and a custom theme system.

### Key Architectural Patterns

- **Routing**: Uses HashRouter for client-side routing with dynamic route parameters for products (`/products/:slug/:item`)
- **Theme System**: Custom ThemeContext supports light/dark/system themes with localStorage persistence and system preference detection
- **Component Structure**: Organized into `common/` shared components, page-specific components, and specialized components
- **Type Safety**: Comprehensive TypeScript interfaces defined in `types.ts` and `src/types.ts` for products, navigation, services, etc.

### Directory Structure

- `src/components/common/` - Shared components (Header, Footer, MegaMenu, ThemeToggle, etc.)
- `src/components/icons/` - Icon components
- `src/pages/` - Page components for each route
- `src/contexts/` - React context providers (ThemeContext)
- `src/hooks/` - Custom React hooks (useTheme)
- `src/constants/` - Static data and configuration
- `src/utils/` - Utility functions and components

### Navigation & Mega Menu

- Navigation structure is defined in `constants/index.ts` as `NAV_LINKS`
- Products section uses a sophisticated mega menu with categories and nested items
- Dynamic routing supports product categories and individual product pages

### Styling & Theming

- Uses Tailwind CSS with dark mode support via CSS classes
- Theme system automatically applies `dark` class to `document.documentElement`
- Supports system preference detection and manual theme switching

### Data Management

- Static data for products, services, team members, etc. is centralized in `constants/index.ts`
- Uses TypeScript interfaces for type safety across components
- Products are organized in hierarchical categories with descriptions and paths

## Important Notes

- This is a static website without backend API integration
- Uses HashRouter for GitHub Pages compatibility
- All styling uses Tailwind CSS utility classes
- Component props are strongly typed using TypeScript interfaces
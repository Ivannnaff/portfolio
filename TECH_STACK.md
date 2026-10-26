# TECH_STACK.md: Technology Stack & Architecture

## 1. Core Framework & Build
- **Astro**: Static site generator (SSG) with `output: 'static'`. Eliminates serverless runtime errors and guarantees instant Vercel deployments without `vercel.json` rewrite issues.
- **Vite**: Ultra-fast bundler integrated with Astro.

## 2. UI & Styling
- **React**: Component-driven architecture (`client:load` for interactive elements where needed).
- **Tailwind CSS v3**: Utility-first styling with custom theme tokens for dark/light mode and typography.
- **Lucide React**: Minimalist, consistent icon set.

## 3. Data & Utilities
- **JSON / Flat Config**: Multilingual text translations (`en.json`, `id.json`), project lists, and 'now' items stored as static JSON.
- **Last.fm API (Optional)**: Client-side fetch for the footer currently playing music indicator.

## 4. Deployment & Hosting
- **Vercel**: Static hosting deployment mapped directly to the `dist/` build folder.

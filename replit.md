# LeatherLens AI

## Overview
AI-powered exotic leather texture classification app. Users can capture or upload photos of leather textures and get instant AI classification identifying types like Crocodile, Python, Ostrich, Kangaroo, and more. Results are stored locally for offline access.

## Current State
- Frontend-only React application (migrated from Lovable)
- PWA-enabled with offline support
- Uses local storage for history persistence
- No backend server required

## Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 + shadcn/ui components
- **Routing**: react-router-dom v6
- **State Management**: @tanstack/react-query
- **PWA**: vite-plugin-pwa with Workbox
- **Animations**: framer-motion

## Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui primitives
│   ├── BottomNav.tsx  # Bottom navigation bar
│   ├── NavLink.tsx    # Navigation link component
│   └── ResultCard.tsx # Classification result display
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and classifiers
│   ├── classifier.ts  # AI classification logic
│   ├── storage.ts     # Local storage management
│   └── utils.ts       # General utilities
├── pages/            # Page components
│   ├── HomePage.tsx   # Landing page
│   ├── UploadPage.tsx # Photo upload/capture page
│   ├── HistoryPage.tsx# Classification history
│   └── NotFound.tsx   # 404 page
├── App.tsx           # Root component with routing
├── main.tsx          # Entry point
└── index.css         # Global styles and CSS variables
```

## Development
- Dev server: `npx vite --host 0.0.0.0 --port 5000`
- Build: `npm run build`
- Deployment: Static site (dist/ directory)

## Recent Changes
- 2026-02-20: Migrated from Lovable to Replit environment
  - Updated Vite config: port 8080 -> 5000, host :: -> 0.0.0.0, added allowedHosts
  - Removed lovable-tagger dependency from vite config
  - Configured static deployment (dist/ directory)

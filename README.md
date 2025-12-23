# Gemini Aviation Academy Website

A modern Next.js application for the Gemini Aviation Academy featuring responsive design and smooth animations.

## Architecture

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS with shadcn/ui components
- **Carousel**: Embla Carousel with auto-scroll
- **Icons**: Lucide React

## Prerequisites

- **Node.js/NPM**: Ensure Node.js and NPM are installed.

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

No environment variables required for basic functionality.

## Development

```bash
npm run dev
```
Runs on `http://localhost:3000`

## Production Build

```bash
npm run build
npm start
```

## v0 Deployment

If v0 prompts for environment variables during transfer, use these **safe dummy values** (your app doesn't use them):

```bash
# Server config (ignored in v0)
PORT=3000
HOST=0.0.0.0

# Firebase (not implemented)
NEXT_PUBLIC_FIREBASE_API_KEY=dummy-key-not-used
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dummy.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dummy-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dummy.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:dummy

# Next.js internals (auto-generated, leave blank)
__NEXT_BUILD_ID=
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=
__NEXT_DIST_DIR=
NEXT_OTEL_FETCH_DISABLED=false
NEXT_OTEL_VERBOSE=false
NEXT_OTEL_PERFORMANCE_PREFIX=
```

**Note:** Your site is 100% client-side—these values satisfy v0's validation but have zero runtime effect.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Error Handling

The application includes comprehensive error boundaries:

- **Error Boundaries** (`src/app/error.tsx`): Handles runtime errors within route segments
- **Not Found Page** (`src/app/not-found.tsx`): Custom 404 page for missing routes
- **Global Error** (`src/app/global-error.tsx`): Catches errors in root layout

In development, error pages show detailed error information. In production, they show user-friendly messages while logging errors for debugging.

## Directory Structure

- `src/app`: Next.js pages and layouts
  - `error.tsx`: Error boundary for route segments
  - `not-found.tsx`: Custom 404 page
  - `global-error.tsx`: Global error boundary
- `src/components`: UI components
- `src/lib`: Utilities and configuration files

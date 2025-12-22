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

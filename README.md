# Gemini Aviation Academy Website

A Next.js application for the Gemini Aviation Academy, featuring a custom server for Socket.IO integration.

## Architecture

- **Frontend**: Next.js (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Custom Node.js server with Socket.IO (Real-time updates)
- **Runtime**: Node.js (via NPM)

## Prerequisites

- **Node.js/NPM**: Ensure Node.js and NPM are installed.

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Copy the example environment file to a local environment file:
    ```bash
    cp .env.example .env.local
    ```
    Then, open `.env.local` and configure your server settings:
    ```env
    # Server Configuration
    PORT=3000
    HOST=0.0.0.0
    
    # Node Environment
    NODE_ENV=development
    ```

## Development Workflow

### ⚠️ Important: Development Server Configuration

This project uses a custom Socket.IO server (`server.ts`) for real-time features. **Never run `next dev` and `tsx server.ts` concurrently** as this will cause conflicts, blank pages, and refresh loops.

### Starting Development

Use the custom server for development (recommended):
```bash
npm run dev
```

This starts the Next.js application with Socket.IO support on `http://localhost:3000`.

### Alternative Development Options

If you need to run without Socket.IO (for testing or specific scenarios):
```bash
npm run dev:next
```

**⚠️ Warning**: Use `dev:next` only when you explicitly need to run without Socket.IO. Do not use this concurrently with the custom server.

### Troubleshooting Development Issues

If you encounter blank pages or refresh loops:

1. **Stop all running processes**:
   ```bash
   # Find and kill any existing Node/Next processes
   ps aux | grep -E "(node|next|tsx)" | grep -v grep
   # Kill any processes found using their PIDs
   ```

2. **Clean up corrupted build artifacts**:
   ```bash
   rm -rf .next
   ```

3. **Free up the port if needed**:
   ```bash
   npx kill-port 3000
   ```

4. **Reinstall dependencies if needed**:
   ```bash
   npm install
   ```

5. **Start fresh with the custom server**:
   ```bash
   npm run dev
   ```

### Custom Server Configuration

The custom server supports environment configuration:

- `PORT`: Server port (default: 3000)
- `HOST`: Server host (default: 0.0.0.0)
- `NODE_ENV`: Environment mode (development/production)

Example with custom port:
```bash
PORT=3001 npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with Socket.IO (recommended)
- `npm run dev:next` - Start development server without Socket.IO (use with caution)
- `npm run build` - Build for production
- `npm start` - Start production server with Socket.IO
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
- `server.ts`: Custom server entry point for Socket.IO support
- `.env.example`: Environment variable template

## Development Guidelines

### Do's
- ✅ Use `npm run dev` for standard development
- ✅ Stop all processes before switching between dev modes
- ✅ Check port availability if getting startup errors
- ✅ Clean `.next` directory if experiencing build issues

### Don'ts
- ❌ Never run `npm run dev` and `npm run dev:next` simultaneously
- ❌ Never run `next dev` manually while `tsx server.ts` is running
- ❌ Never run `npm run build` while development server is active
- ❌ Don't ignore EADDRINUSE (port in use) errors

### CI/CD Considerations
- Use `tsx server.ts` for production deployments requiring Socket.IO
- Use `next build && next start` for static deployments without Socket.IO
- Ensure only one server style is used per deployment environment
- Set appropriate environment variables (PORT, HOST, NODE_ENV)

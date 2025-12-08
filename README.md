# Gemini Aviation Academy Website

A Next.js application for the Gemini Aviation Academy, featuring a custom server for Socket.IO integration and Firebase for backend services.

## Architecture

- **Frontend**: Next.js (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Auth, Firestore), Socket.IO (Real-time updates)
- **Runtime**: Node.js (via NPM)

## Prerequisites

- **Node.js/NPM**: Ensure Node.js and NPM are installed.
- **Firebase Project**: A Firebase project with Auth and Firestore enabled.

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
    Then, open `.env.local` and fill in your real Firebase configuration values from the Firebase console.
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    The application will run on `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Directory Structure

- `src/app`: Next.js pages and layouts
- `src/components`: UI components
- `src/lib`: Utilities and Firebase configuration
- `server.ts`: Custom server entry point for Socket.IO support

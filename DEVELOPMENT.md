# Development Guide

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and fill in real values, or ask the team for keys.
    Required variables:
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - ... (see README.md)

## Running Locally

```bash
npm run dev
```
Runs the custom server (Next.js + Socket.IO) on `http://localhost:3000`.

## Building

```bash
npm run build
npm run start
```

## Architecture Notes

- **Next.js**: Handle routing and UI.
- **Custom Server (`server.ts`)**: Initializes Socket.IO and delegates HTTP requests to Next.js.
- **Firebase**: Used for Auth and Firestore. Initialize in `src/lib/firebase.ts`.

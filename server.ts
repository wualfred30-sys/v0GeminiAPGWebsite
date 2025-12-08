// server.ts - Next.js Standalone + Socket.IO
import { setupSocket } from '@/lib/socket';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';

// Environment-driven configuration with safe fallbacks
let currentPort = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOST || '0.0.0.0';

// Validate port number
if (isNaN(currentPort) || currentPort < 1 || currentPort > 65535) {
  console.error(`Invalid PORT value: ${process.env.PORT}. Using default port 3000.`);
  process.env.PORT = '3000';
  currentPort = 3000; // Update currentPort to match the corrected environment variable
}

// Custom server with Socket.IO integration
async function createCustomServer() {
  try {
    console.log(`Starting server on ${hostname}:${currentPort} in ${dev ? 'development' : 'production'} mode...`);

    // Create Next.js app
    const nextApp = next({ 
      dev,
      dir: process.cwd(),
      // In production, use the current directory where .next is located
      conf: dev ? undefined : { distDir: './.next' }
    });

    await nextApp.prepare();
    const handle = nextApp.getRequestHandler();

    // Create HTTP server that will handle both Next.js and Socket.IO
    const server = createServer((req, res) => {
      handle(req, res);
    });

    // Setup Socket.IO
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    setupSocket(io);

    // Start the server
    server.listen(currentPort, hostname, () => {
      console.log(`> Ready on http://${hostname}:${currentPort}`);
      console.log(`> Socket.IO server running at ws://${hostname}:${currentPort}/api/socketio`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (err: any) {
    // Enhanced error logging with detailed diagnostics
    const errorCode = err.code || 'UNKNOWN';
    const errorMessage = err.message || 'Unknown error occurred';
    
    console.error(`\n=== SERVER STARTUP ERROR ===`);
    console.error(`Error Code: ${errorCode}`);
    console.error(`Target: ${hostname}:${currentPort}`);
    console.error(`Message: ${errorMessage}`);
    
    if (err.stack) {
      console.error(`Stack Trace:\n${err.stack}`);
    }
    
    // Provide specific hints based on error type
    if (errorCode === 'EADDRINUSE') {
      console.error(`\n=== RESOLUTION HINT ===`);
      console.error(`Port ${currentPort} is already in use.`);
      console.error(`To resolve this issue:`);
      console.error(`1. Stop any existing processes using port ${currentPort}:`);
      console.error(`   - npx kill-port ${currentPort}`);
      console.error(`   - Or manually find and kill the process`);
      console.error(`2. Or use a different port:`);
      console.error(`   - PORT=3001 npm run dev`);
      console.error(`   - Or set PORT in your .env.local file`);
    } else if (errorCode === 'EACCES') {
      console.error(`\n=== RESOLUTION HINT ===`);
      console.error(`Permission denied for port ${currentPort}.`);
      console.error(`Try using a port above 1024 or run with appropriate permissions.`);
    } else if (errorCode === 'ENOENT') {
      console.error(`\n=== RESOLUTION HINT ===`);
      console.error(`File or directory not found. Check your project structure.`);
      console.error(`Ensure you're running from the correct directory.`);
    } else {
      console.error(`\n=== RESOLUTION HINT ===`);
      console.error(`Check your environment configuration and dependencies.`);
      console.error(`Try running 'npm install' to ensure all dependencies are installed.`);
    }
    
    console.error(`========================\n`);
    process.exit(1);
  }
}

// Start the server
createCustomServer();

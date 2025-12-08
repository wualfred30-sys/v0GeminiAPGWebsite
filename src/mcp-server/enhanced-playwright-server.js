/**
 * Enhanced Playwright MCP Server
 * 
 * This server implements a robust MCP server with proper transport layer separation,
 * session management, and tool execution for both HTTP and WebSocket transports.
 */

const { HybridTransport } = require('./enhanced-transport-layer');
const path = require('path');
const fs = require('fs');

class EnhancedPlaywrightMCPServer {
    constructor(options = {}) {
        this.options = {
            httpPort: options.httpPort || 8932,
            wsPort: options.wsPort || 8933,
            browser: options.browser || 'chromium',
            headless: options.headless !== false,
            sandbox: options.sandbox !== false,
            logLevel: options.logLevel || 'info',
            ...options
        };
        
        this.transport = new HybridTransport(this.options);
        this.isRunning = false;
        this.startTime = null;
        this.logFile = null;
    }

    /**
     * Initialize the server
     */
    async initialize() {
        this.setupLogging();
        this.log('info', 'Initializing Enhanced Playwright MCP Server');
        
        try {
            // Initialize transport layer
            await this.transport.initialize();
            
            // Set up event handlers
            this.setupEventHandlers();
            
            // Set up graceful shutdown
            this.setupGracefulShutdown();
            
            this.log('info', 'Server initialization completed');
        } catch (error) {
            this.log('error', `Server initialization failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Start the server
     */
    async start() {
        if (this.isRunning) {
            this.log('warn', 'Server is already running');
            return;
        }

        try {
            await this.initialize();
            
            // Start transport layer
            await this.transport.start(this.options.httpPort, this.options.wsPort);
            
            this.isRunning = true;
            this.startTime = new Date();
            
            this.log('info', `Server started successfully`);
            this.log('info', `HTTP transport listening on port ${this.options.httpPort}`);
            this.log('info', `WebSocket transport listening on port ${this.options.wsPort}`);
            this.log('info', `Browser: ${this.options.browser}`);
            this.log('info', `Headless: ${this.options.headless}`);
            this.log('info', `Sandbox: ${this.options.sandbox}`);
            
            // Write PID file for process management
            this.writePidFile();
            
        } catch (error) {
            this.log('error', `Failed to start server: ${error.message}`);
            throw error;
        }
    }

    /**
     * Stop the server
     */
    async stop() {
        if (!this.isRunning) {
            this.log('warn', 'Server is not running');
            return;
        }

        try {
            this.log('info', 'Stopping server');
            
            // Stop transport layer
            await this.transport.stop();
            
            this.isRunning = false;
            
            // Remove PID file
            this.removePidFile();
            
            this.log('info', 'Server stopped successfully');
        } catch (error) {
            this.log('error', `Failed to stop server: ${error.message}`);
            throw error;
        }
    }

    /**
     * Set up logging
     */
    setupLogging() {
        const logDir = path.join(process.cwd(), 'logs');
        
        // Create log directory if it doesn't exist
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        // Create log file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        this.logFile = path.join(logDir, `mcp-server-${timestamp}.log`);
        
        // Write initial log entry
        fs.writeFileSync(this.logFile, `=== Enhanced Playwright MCP Server Log ===\n`);
        fs.appendFileSync(this.logFile, `Started at: ${new Date().toISOString()}\n`);
    }

    /**
     * Log message
     */
    log(level, message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
        
        // Write to log file
        if (this.logFile) {
            fs.appendFileSync(this.logFile, logEntry);
        }
        
        // Output to console based on log level
        const shouldLog = 
            this.options.logLevel === 'debug' ||
            (this.options.logLevel === 'info' && ['info', 'warn', 'error'].includes(level)) ||
            (this.options.logLevel === 'warn' && ['warn', 'error'].includes(level)) ||
            (this.options.logLevel === 'error' && level === 'error');
        
        if (shouldLog) {
            console.log(`[${level.toUpperCase()}] ${message}`);
        }
    }

    /**
     * Set up event handlers
     */
    setupEventHandlers() {
        this.transport.on('initialized', () => {
            this.log('info', 'Transport layer initialized');
        });
        
        // Add more event handlers as needed
    }

    /**
     * Set up graceful shutdown
     */
    setupGracefulShutdown() {
        const shutdown = async (signal) => {
            this.log('info', `Received ${signal}, shutting down gracefully`);
            try {
                await this.stop();
                process.exit(0);
            } catch (error) {
                this.log('error', `Error during shutdown: ${error.message}`);
                process.exit(1);
            }
        };
        
        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGHUP', () => shutdown('SIGHUP'));
        
        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            this.log('error', `Uncaught exception: ${error.message}`);
            this.log('error', error.stack);
            shutdown('uncaughtException');
        });
        
        process.on('unhandledRejection', (reason, promise) => {
            this.log('error', `Unhandled rejection at: ${promise}, reason: ${reason}`);
            shutdown('unhandledRejection');
        });
    }

    /**
     * Write PID file
     */
    writePidFile() {
        const pidFile = path.join(process.cwd(), 'mcp-server.pid');
        fs.writeFileSync(pidFile, process.pid.toString());
    }

    /**
     * Remove PID file
     */
    removePidFile() {
        const pidFile = path.join(process.cwd(), 'mcp-server.pid');
        if (fs.existsSync(pidFile)) {
            fs.unlinkSync(pidFile);
        }
    }

    /**
     * Get server status
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            startTime: this.startTime,
            uptime: this.isRunning ? Date.now() - this.startTime : 0,
            options: this.options,
            transport: {
                httpPort: this.options.httpPort,
                wsPort: this.options.wsPort
            }
        };
    }

    /**
     * Get server health
     */
    async getHealth() {
        const status = this.getStatus();
        
        // Check if server is running
        if (!status.isRunning) {
            return {
                status: 'unhealthy',
                reason: 'Server is not running'
            };
        }
        
        // Check transport layer health
        try {
            // This would include more detailed health checks
            // For now, just check if the server is running
            return {
                status: 'healthy',
                uptime: status.uptime,
                transports: {
                    http: `http://localhost:${this.options.httpPort}`,
                    websocket: `ws://localhost:${this.options.wsPort}`
                }
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                reason: error.message
            };
        }
    }
}

/**
 * Command line interface
 */
async function main() {
    const args = process.argv.slice(2);
    const options = {};
    
    // Parse command line arguments
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        switch (arg) {
            case '--http-port':
                options.httpPort = parseInt(args[++i]);
                break;
            case '--ws-port':
                options.wsPort = parseInt(args[++i]);
                break;
            case '--browser':
                options.browser = args[++i];
                break;
            case '--headless':
                options.headless = true;
                break;
            case '--no-headless':
                options.headless = false;
                break;
            case '--sandbox':
                options.sandbox = true;
                break;
            case '--no-sandbox':
                options.sandbox = false;
                break;
            case '--log-level':
                options.logLevel = args[++i];
                break;
            case '--help':
                console.log(`
Enhanced Playwright MCP Server

Usage: node enhanced-playwright-server.js [options]

Options:
  --http-port <port>     HTTP transport port (default: 8932)
  --ws-port <port>       WebSocket transport port (default: 8933)
  --browser <browser>    Browser to use (chromium, firefox, webkit) (default: chromium)
  --headless             Run browser in headless mode (default: true)
  --no-headless          Run browser in headed mode
  --sandbox              Run browser with sandbox (default: true)
  --no-sandbox           Run browser without sandbox
  --log-level <level>    Log level (debug, info, warn, error) (default: info)
  --help                 Show this help message

Examples:
  node enhanced-playwright-server.js
  node enhanced-playwright-server.js --http-port 8932 --ws-port 8933
  node enhanced-playwright-server.js --browser firefox --no-headless
                `);
                process.exit(0);
                break;
        }
    }
    
    // Create and start server
    const server = new EnhancedPlaywrightMCPServer(options);
    
    try {
        await server.start();
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

// Run server if this file is executed directly
if (require.main === module) {
    main().catch(error => {
        console.error('Server startup failed:', error);
        process.exit(1);
    });
}

module.exports = EnhancedPlaywrightMCPServer;
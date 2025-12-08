/**
 * Enhanced Transport Layer for Playwright MCP Server
 * 
 * This module provides a robust transport layer implementation that properly handles
 * session persistence, JSON-RPC 2.0 compliance, and tool execution for both HTTP and WebSocket transports.
 */

const { v4: uuidv4 } = require('uuid');
const EventEmitter = require('events');

/**
 * Base Transport Layer Interface
 */
class BaseTransport extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = options;
        this.sessions = new Map();
        this.tools = new Map();
        this.requestId = 1;
        this.isInitialized = false;
    }

    /**
     * Initialize the transport layer
     */
    async initialize() {
        if (this.isInitialized) {
            return;
        }

        // Register tools
        await this.registerTools();
        
        // Set up session cleanup
        this.setupSessionCleanup();
        
        this.isInitialized = true;
        this.emit('initialized');
    }

    /**
     * Register available tools
     */
    async registerTools() {
        // Browser navigation tools
        this.tools.set('browser_navigate', {
            name: 'browser_navigate',
            description: 'Navigate to a URL',
            inputSchema: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        description: 'The URL to navigate to'
                    }
                },
                required: ['url']
            },
            handler: this.handleBrowserNavigate.bind(this)
        });

        // Browser interaction tools
        this.tools.set('browser_click', {
            name: 'browser_click',
            description: 'Perform click on a web page',
            inputSchema: {
                type: 'object',
                properties: {
                    element: {
                        type: 'string',
                        description: 'Human-readable element description'
                    },
                    ref: {
                        type: 'string',
                        description: 'Exact target element reference'
                    }
                },
                required: ['element', 'ref']
            },
            handler: this.handleBrowserClick.bind(this)
        });

        // Browser content tools
        this.tools.set('browser_snapshot', {
            name: 'browser_snapshot',
            description: 'Capture accessibility snapshot of the current page',
            inputSchema: {
                type: 'object',
                properties: {}
            },
            handler: this.handleBrowserSnapshot.bind(this)
        });

        // Browser screenshot tools
        this.tools.set('browser_take_screenshot', {
            name: 'browser_take_screenshot',
            description: 'Take a screenshot of the current page',
            inputSchema: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['png', 'jpeg'],
                        default: 'png'
                    },
                    fullPage: {
                        type: 'boolean',
                        default: false
                    }
                }
            },
            handler: this.handleBrowserScreenshot.bind(this)
        });

        // Add more tools as needed...
    }

    /**
     * Create a new session
     */
    createSession() {
        const sessionId = uuidv4();
        const session = {
            id: sessionId,
            createdAt: new Date(),
            lastAccessed: new Date(),
            browser: null,
            context: null,
            page: null,
            data: {}
        };
        
        this.sessions.set(sessionId, session);
        return sessionId;
    }

    /**
     * Get session by ID
     */
    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.lastAccessed = new Date();
        }
        return session;
    }

    /**
     * Remove session
     */
    removeSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            // Clean up browser resources
            if (session.browser) {
                session.browser.close();
            }
            this.sessions.delete(sessionId);
        }
    }

    /**
     * Set up session cleanup
     */
    setupSessionCleanup() {
        // Clean up expired sessions every 5 minutes
        setInterval(() => {
            const now = new Date();
            const expiredSessions = [];
            
            for (const [sessionId, session] of this.sessions) {
                // Expire sessions after 30 minutes of inactivity
                if (now - session.lastAccessed > 30 * 60 * 1000) {
                    expiredSessions.push(sessionId);
                }
            }
            
            expiredSessions.forEach(sessionId => {
                this.removeSession(sessionId);
            });
        }, 5 * 60 * 1000);
    }

    /**
     * Handle JSON-RPC request
     */
    async handleRequest(request, sessionId = null) {
        try {
            // Validate JSON-RPC request
            if (!request.jsonrpc || request.jsonrpc !== '2.0') {
                return this.createErrorResponse(null, -32600, 'Invalid Request');
            }

            const { method, params, id } = request;

            // Handle initialization
            if (method === 'initialize') {
                return await this.handleInitialize(params, id, sessionId);
            }

            // Validate session
            if (!sessionId) {
                return this.createErrorResponse(id, -32000, 'Server not initialized');
            }

            const session = this.getSession(sessionId);
            if (!session) {
                return this.createErrorResponse(id, -32001, 'Session not found');
            }

            // Handle tool list
            if (method === 'tools/list') {
                return await this.handleToolsList(id, session);
            }

            // Handle tool execution
            if (method.startsWith('browser_')) {
                return await this.handleToolExecution(method, params, id, session);
            }

            // Unknown method
            return this.createErrorResponse(id, -32601, 'Method not found');
        } catch (error) {
            console.error('Request handling error:', error);
            return this.createErrorResponse(request.id, -32603, 'Internal error', error.message);
        }
    }

    /**
     * Handle initialization
     */
    async handleInitialize(params, requestId, sessionId) {
        // Create new session if not provided
        if (!sessionId) {
            sessionId = this.createSession();
        }

        const session = this.getSession(sessionId);
        
        // Initialize browser if needed
        if (!session.browser) {
            await this.initializeBrowser(session, params);
        }

        return this.createSuccessResponse(requestId, {
            protocolVersion: '2024-11-05',
            capabilities: {
                tools: {}
            },
            serverInfo: {
                name: 'Enhanced Playwright MCP',
                version: '1.0.0'
            }
        }, { sessionId });
    }

    /**
     * Handle tools list
     */
    async handleToolsList(requestId, session) {
        const tools = Array.from(this.tools.values()).map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema
        }));

        return this.createSuccessResponse(requestId, { tools });
    }

    /**
     * Handle tool execution
     */
    async handleToolExecution(method, params, requestId, session) {
        const tool = this.tools.get(method);
        if (!tool) {
            return this.createErrorResponse(requestId, -32601, 'Method not found');
        }

        try {
            // Validate parameters
            const validationResult = this.validateParameters(tool.inputSchema, params);
            if (!validationResult.valid) {
                return this.createErrorResponse(requestId, -32602, 'Invalid params', validationResult.error);
            }

            // Execute tool
            const result = await tool.handler(params, session);
            
            return this.createSuccessResponse(requestId, result);
        } catch (error) {
            console.error(`Tool execution error for ${method}:`, error);
            return this.createErrorResponse(requestId, -32603, 'Internal error', error.message);
        }
    }

    /**
     * Validate parameters against schema
     */
    validateParameters(schema, params) {
        // Simple validation - in production, use a proper JSON schema validator
        if (schema.required) {
            for (const requiredParam of schema.required) {
                if (!(requiredParam in params)) {
                    return {
                        valid: false,
                        error: `Missing required parameter: ${requiredParam}`
                    };
                }
            }
        }

        return { valid: true };
    }

    /**
     * Create success response
     */
    createSuccessResponse(id, result, metadata = {}) {
        const response = {
            jsonrpc: '2.0',
            id,
            result
        };

        // Add metadata if provided
        if (Object.keys(metadata).length > 0) {
            response._metadata = metadata;
        }

        return response;
    }

    /**
     * Create error response
     */
    createErrorResponse(id, code, message, data = null) {
        const response = {
            jsonrpc: '2.0',
            id,
            error: {
                code,
                message
            }
        };

        if (data) {
            response.error.data = data;
        }

        return response;
    }

    /**
     * Initialize browser for session
     */
    async initializeBrowser(session, params) {
        // This would be implemented with actual Playwright browser initialization
        // For now, we'll create a mock browser object
        session.browser = {
            closed: false,
            close: () => { session.browser.closed = true; }
        };
        
        session.context = {
            pages: []
        };
        
        session.page = {
            url: 'about:blank',
            title: '',
            content: '',
            screenshot: null
        };
        
        session.context.pages.push(session.page);
    }

    /**
     * Tool handlers - these would be implemented with actual Playwright operations
     */
    async handleBrowserNavigate(params, session) {
        if (!session.page) {
            throw new Error('Browser page not initialized');
        }

        // Mock navigation
        session.page.url = params.url;
        session.page.title = `Example Domain`;
        session.page.content = `<html><head><title>Example Domain</title></head><body><h1>Example Domain</h1><p>This domain is for use in illustrative examples.</p></body></html>`;

        return {
            success: true,
            url: params.url,
            title: session.page.title
        };
    }

    async handleBrowserClick(params, session) {
        if (!session.page) {
            throw new Error('Browser page not initialized');
        }

        // Mock click
        return {
            success: true,
            element: params.element,
            ref: params.ref
        };
    }

    async handleBrowserSnapshot(params, session) {
        if (!session.page) {
            throw new Error('Browser page not initialized');
        }

        // Mock snapshot
        return {
            snapshot: {
                title: session.page.title,
                url: session.page.url,
                content: session.page.content
            }
        };
    }

    async handleBrowserScreenshot(params, session) {
        if (!session.page) {
            throw new Error('Browser page not initialized');
        }

        // Mock screenshot - in production, this would return actual screenshot data
        const screenshotData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
        
        return {
            data: screenshotData,
            type: params.type || 'png',
            fullPage: params.fullPage || false
        };
    }
}

/**
 * HTTP Transport Implementation
 */
class HTTPTransport extends BaseTransport {
    constructor(options = {}) {
        super(options);
        this.server = null;
    }

    /**
     * Start HTTP server
     */
    async start(port = 8932) {
        const http = require('http');
        
        this.server = http.createServer(async (req, res) => {
            try {
                // Handle CORS
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id');

                if (req.method === 'OPTIONS') {
                    res.writeHead(200);
                    res.end();
                    return;
                }

                if (req.method !== 'POST') {
                    res.writeHead(405, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Method not allowed' }));
                    return;
                }

                // Parse request body
                const body = await this.parseRequestBody(req);
                
                // Get session ID from headers
                const sessionId = req.headers['mcp-session-id'];
                
                // Handle request
                const response = await this.handleRequest(body, sessionId);
                
                // Set session ID header if creating new session
                if (response._metadata && response._metadata.sessionId) {
                    res.setHeader('mcp-session-id', response._metadata.sessionId);
                }
                
                // Send response
                if (response.result) {
                    // Use Server-Sent Events format for successful responses
                    res.writeHead(200, { 'Content-Type': 'text/event-stream' });
                    res.write(`event: message\ndata: ${JSON.stringify(response)}\n\n`);
                } else {
                    // Use JSON format for error responses
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(response));
                }
                
                res.end();
            } catch (error) {
                console.error('HTTP request error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
            }
        });

        return new Promise((resolve, reject) => {
            this.server.listen(port, (error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`HTTP transport server listening on port ${port}`);
                    resolve();
                }
            });
        });
    }

    /**
     * Parse request body
     */
    async parseRequestBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve(parsed);
                } catch (error) {
                    reject(error);
                }
            });
            req.on('error', reject);
        });
    }

    /**
     * Stop HTTP server
     */
    async stop() {
        if (this.server) {
            return new Promise((resolve) => {
                this.server.close(() => {
                    console.log('HTTP transport server stopped');
                    resolve();
                });
            });
        }
    }
}

/**
 * WebSocket Transport Implementation
 */
class WebSocketTransport extends BaseTransport {
    constructor(options = {}) {
        super(options);
        this.wsServer = null;
        this.clients = new Map();
    }

    /**
     * Start WebSocket server
     */
    async start(port = 8932) {
        const WebSocket = require('ws');
        
        this.wsServer = new WebSocket.Server({ 
            port,
            verifyClient: (info) => {
                // Accept all connections
                return true;
            }
        });

        this.wsServer.on('connection', (ws, req) => {
            const clientId = uuidv4();
            const client = {
                id: clientId,
                ws,
                sessionId: null,
                lastPing: new Date(),
                isAlive: true
            };
            
            this.clients.set(clientId, client);
            
            // Handle client messages
            ws.on('message', async (data) => {
                try {
                    const request = JSON.parse(data);
                    const response = await this.handleRequest(request, client.sessionId);
                    
                    // Update session ID if creating new session
                    if (response._metadata && response._metadata.sessionId) {
                        client.sessionId = response._metadata.sessionId;
                    }
                    
                    // Send response
                    ws.send(JSON.stringify(response));
                } catch (error) {
                    console.error('WebSocket message error:', error);
                    ws.send(JSON.stringify({
                        jsonrpc: '2.0',
                        id: null,
                        error: {
                            code: -32700,
                            message: 'Parse error'
                        }
                    }));
                }
            });

            // Handle client disconnect
            ws.on('close', () => {
                this.clients.delete(clientId);
            });

            // Handle client errors
            ws.on('error', (error) => {
                console.error('WebSocket client error:', error);
                this.clients.delete(clientId);
            });

            // Set up ping/pong for connection health
            ws.on('pong', () => {
                client.isAlive = true;
                client.lastPing = new Date();
            });

            // Send welcome message
            ws.send(JSON.stringify({
                jsonrpc: '2.0',
                id: null,
                result: {
                    type: 'connection',
                    message: 'Connected to Enhanced Playwright MCP Server',
                    clientId
                }
            }));
        });

        // Set up connection health check
        this.setupHealthCheck();

        console.log(`WebSocket transport server listening on port ${port}`);
    }

    /**
     * Set up connection health check
     */
    setupHealthCheck() {
        setInterval(() => {
            this.clients.forEach((client, clientId) => {
                if (!client.isAlive) {
                    client.ws.terminate();
                    this.clients.delete(clientId);
                    return;
                }
                
                client.isAlive = false;
                client.ws.ping();
            });
        }, 30000); // Check every 30 seconds
    }

    /**
     * Stop WebSocket server
     */
    async stop() {
        if (this.wsServer) {
            // Close all client connections
            this.clients.forEach((client) => {
                client.ws.close();
            });
            
            return new Promise((resolve) => {
                this.wsServer.close(() => {
                    console.log('WebSocket transport server stopped');
                    resolve();
                });
            });
        }
    }
}

/**
 * Hybrid Transport Implementation
 * 
 * Supports both HTTP and WebSocket transports simultaneously
 */
class HybridTransport extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = options;
        this.httpTransport = new HTTPTransport(options);
        this.wsTransport = new WebSocketTransport(options);
        this.isInitialized = false;
    }

    /**
     * Initialize hybrid transport
     */
    async initialize() {
        if (this.isInitialized) {
            return;
        }

        // Initialize both transports
        await this.httpTransport.initialize();
        await this.wsTransport.initialize();
        
        this.isInitialized = true;
        this.emit('initialized');
    }

    /**
     * Start both transports
     */
    async start(httpPort = 8932, wsPort = 8933) {
        await this.initialize();
        
        // Start HTTP transport
        await this.httpTransport.start(httpPort);
        
        // Start WebSocket transport
        await this.wsTransport.start(wsPort);
        
        console.log(`Hybrid transport server started`);
        console.log(`HTTP transport listening on port ${httpPort}`);
        console.log(`WebSocket transport listening on port ${wsPort}`);
    }

    /**
     * Stop both transports
     */
    async stop() {
        await this.httpTransport.stop();
        await this.wsTransport.stop();
        console.log('Hybrid transport server stopped');
    }
}

module.exports = {
    BaseTransport,
    HTTPTransport,
    WebSocketTransport,
    HybridTransport
};
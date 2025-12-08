
/**
 * Comprehensive Test Suite for Enhanced MCP Server
 * 
 * This test suite validates both HTTP and WebSocket transport modes,
 * session management, tool execution, and error handling.
 */

const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

class EnhancedMCPTestSuite {
    constructor(options = {}) {
        this.options = {
            httpPort: options.httpPort || 8932,
            wsPort: options.wsPort || 8933,
            testTimeout: options.testTimeout || 30000,
            ...options
        };
        
        this.testResults = [];
        this.testStartTime = new Date();
        this.httpSessionId = null;
        this.wsClient = null;
        this.wsSessionId = null;
    }

    /**
     * Run the complete test suite
     */
    async runTestSuite() {
        console.log('🚀 Starting Enhanced MCP Test Suite');
        console.log('=====================================');
        console.log(`HTTP Port: ${this.options.httpPort}`);
        console.log(`WebSocket Port: ${this.options.wsPort}`);
        console.log(`Test Timeout: ${this.options.testTimeout}ms`);
        
        try {
            // Wait for server to be ready
            await this.waitForServer();
            
            // Run HTTP transport tests
            await this.runHTTPTransportTests();
            
            // Run WebSocket transport tests
            await this.runWebSocketTransportTests();
            
            // Run cross-transport tests
            await this.runCrossTransportTests();
            
            // Run performance tests
            await this.runPerformanceTests();
            
            // Run error handling tests
            await this.runErrorHandlingTests();
            
        } catch (error) {
            console.error('Test suite execution error:', error);
            this.addTestResult('Test Suite Execution', 'FAIL', 
                'Test suite execution failed', error);
        }
        
        // Generate and display results
        const report = this.generateTestReport();
        this.displayResults(report);
        
        return report;
    }

    /**
     * Wait for server to be ready
     */
    async waitForServer() {
        console.log('\n=== Waiting for Server ===');
        
        const maxAttempts = 30;
        const attemptDelay = 1000;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Check HTTP endpoint
                await this.makeHTTPRequest('initialize', {
                    protocolVersion: '2024-11-05',
                    capabilities: { roots: { listChanged: true }, sampling: {} },
                    clientInfo: { name: 'test-suite', version: '1.0.0' }
                });
                
                console.log('✅ Server is ready');
                return;
            } catch (error) {
                if (attempt === maxAttempts) {
                    throw new Error('Server not ready after maximum attempts');
                }
                
                console.log(`Attempt ${attempt}/${maxAttempts}: Server not ready, retrying...`);
                await new Promise(resolve => setTimeout(resolve, attemptDelay));
            }
        }
    }

    /**
     * Run HTTP transport tests
     */
    async runHTTPTransportTests() {
        console.log('\n=== HTTP Transport Tests ===');
        
        // Test server initialization
        await this.testHTTPServerInitialization();
        
        // Test tools discovery
        await this.testHTTPToolsDiscovery();
        
        // Test tool execution
        await this.testHTTPToolExecution();
        
        // Test session management
        await this.testHTTPSessionManagement();
    }

    /**
     * Test HTTP server initialization
     */
    async testHTTPServerInitialization() {
        console.log('\n--- HTTP Server Initialization ---');
        
        try {
            const response = await this.makeHTTPRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: { roots: { listChanged: true }, sampling: {} },
                clientInfo: { name: 'http-test', version: '1.0.0' }
            });

            if (response.result && response.result.protocolVersion) {
                this.httpSessionId = response._metadata?.sessionId;
                this.addTestResult('HTTP Server Initialization', 'PASS', 
                    `Server initialized with session ID: ${this.httpSessionId}`);
                return true;
            } else {
                this.addTestResult('HTTP Server Initialization', 'FAIL', 
                    'Failed to initialize server',
                    new Error('Missing protocol version in response'));
                return false;
            }
        } catch (error) {
            this.addTestResult('HTTP Server Initialization', 'FAIL', 
                'Failed to initialize server', error);
            return false;
        }
    }

    /**
     * Test HTTP tools discovery
     */
    async testHTTPToolsDiscovery() {
        console.log('\n--- HTTP Tools Discovery ---');
        
        try {
            const response = await this.makeHTTPRequest('tools/list', {}, this.httpSessionId);

            if (response.result && response.result.tools) {
                const tools = response.result.tools;
                const toolNames = tools.map(tool => tool.name).join(', ');
                
                this.addTestResult('HTTP Tools Discovery', 'PASS', 
                    `Found ${tools.length} tools: ${toolNames}`);
                
                // Check for essential tools
                const essentialTools = ['browser_navigate', 'browser_click', 'browser_snapshot'];
                const missingTools = essentialTools.filter(tool => 
                    !tools.some(t => t.name === tool));
                
                if (missingTools.length > 0) {
                    this.addTestResult('HTTP Essential Tools Check', 'FAIL', 
                        `Missing essential tools: ${missingTools.join(', ')}`);
                } else {
                    this.addTestResult('HTTP Essential Tools Check', 'PASS', 
                        'All essential tools are available');
                }
                
                return tools;
            } else {
                this.addTestResult('HTTP Tools Discovery', 'FAIL', 
                    'No tools found in response',
                    new Error('Missing tools array in response'));
                return null;
            }
        } catch (error) {
            this.addTestResult('HTTP Tools Discovery', 'FAIL', 
                'Failed to discover tools', error);
            return null;
        }
    }

    /**
     * Test HTTP tool execution
     */
    async testHTTPToolExecution() {
        console.log('\n--- HTTP Tool Execution ---');
        
        try {
            // Test browser navigation
            const navResponse = await this.makeHTTPRequest('browser_navigate', {
                url: 'https://example.com'
            }, this.httpSessionId);

            if (navResponse.result && navResponse.result.success) {
                this.addTestResult('HTTP Browser Navigation', 'PASS', 
                    'Successfully navigated to test page');
            } else {
                this.addTestResult('HTTP Browser Navigation', 'FAIL', 
                    'Failed to navigate to test page',
                    new Error(`Navigation response: ${JSON.stringify(navResponse)}`));
                return false;
            }

            // Test page snapshot
            const snapshotResponse = await this.makeHTTPRequest('browser_snapshot', {}, this.httpSessionId);

            if (snapshotResponse.result && snapshotResponse.result.snapshot) {
                this.addTestResult('HTTP Page Snapshot', 'PASS', 
                    'Successfully captured page snapshot');
            } else {
                this.addTestResult('HTTP Page Snapshot', 'FAIL', 
                    'Failed to capture page snapshot',
                    new Error(`Snapshot response: ${JSON.stringify(snapshotResponse)}`));
                return false;
            }

            // Test screenshot capture
            const screenshotResponse = await this.makeHTTPRequest('browser_take_screenshot', {}, this.httpSessionId);

            if (screenshotResponse.result && screenshotResponse.result.data) {
                this.addTestResult('HTTP Screenshot Capture', 'PASS', 
                    'Successfully captured screenshot');
            } else {
                this.addTestResult('HTTP Screenshot Capture', 'FAIL', 
                    'Failed to capture screenshot',
                    new Error(`Screenshot response: ${JSON.stringify(screenshotResponse)}`));
                return false;
            }

            return true;
        } catch (error) {
            this.addTestResult('HTTP Tool Execution', 'FAIL', 
                'Failed to execute tools', error);
            return false;
        }
    }

    /**
     * Test HTTP session management
     */
    async testHTTPSessionManagement() {
        console.log('\n--- HTTP Session Management ---');
        
        try {
            // Test session persistence
            const response1 = await this.makeHTTPRequest('tools/list', {}, this.httpSessionId);
            const response2 = await this.makeHTTPRequest('tools/list', {}, this.httpSessionId);
            
            if (response1.result && response2.result && 
                response1.result.tools.length === response2.result.tools.length) {
                this.addTestResult('HTTP Session Persistence', 'PASS', 
                    'Session correctly maintained across requests');
            } else {
                this.addTestResult('HTTP Session Persistence', 'FAIL', 
                    'Session not properly maintained');
                return false;
            }

            // Test invalid session
            try {
                await this.makeHTTPRequest('tools/list', {}, 'invalid-session-id');
                this.addTestResult('HTTP Invalid Session Handling', 'FAIL', 
                    'Invalid session should have been rejected');
                return false;
            } catch (error) {
                this.addTestResult('HTTP Invalid Session Handling', 'PASS', 
                    'Invalid session correctly rejected');
            }

            return true;
        } catch (error) {
            this.addTestResult('HTTP Session Management', 'FAIL', 
                'Failed to test session management', error);
            return false;
        }
    }

    /**
     * Run WebSocket transport tests
     */
    async runWebSocketTransportTests() {
        console.log('\n=== WebSocket Transport Tests ===');
        
        // Test WebSocket connection
        await this.testWebSocketConnection();
        
        // Test WebSocket tools discovery
        await this.testWebSocketToolsDiscovery();
        
        // Test WebSocket tool execution
        await this.testWebSocketToolExecution();
        
        // Test WebSocket session management
        await this.testWebSocketSessionManagement();
    }

    /**
     * Test WebSocket connection
     */
    async testWebSocketConnection() {
        console.log('\n--- WebSocket Connection ---');
        
        try {
            this.wsClient = await this.createWebSocketClient();
            
            this.addTestResult('WebSocket Connection', 'PASS', 
                'Successfully connected to WebSocket server');
            return true;
        } catch (error) {
            this.addTestResult('WebSocket Connection', 'FAIL', 
                'Failed to connect to WebSocket server', error);
            return false;
        }
    }

    /**
     * Create WebSocket client
     */
    async createWebSocketClient() {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(`ws://localhost:${this.options.wsPort}`);
            
            ws.on('open', () => {
                resolve(ws);
            });
            
            ws.on('error', (error) => {
                reject(error);
            });
            
            // Set timeout
            setTimeout(() => {
                reject(new Error('WebSocket connection timeout'));
            }, 5000);
        });
    }

    /**
     * Test WebSocket tools discovery
     */
    async testWebSocketToolsDiscovery() {
        console.log('\n--- WebSocket Tools Discovery ---');
        
        try {
            // Initialize session
            const initResponse = await this.makeWebSocketRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: { roots: { listChanged: true }, sampling: {} },
                clientInfo: { name: 'ws-test', version: '1.0.0' }
            });

            if (initResponse.result && initResponse.result.protocolVersion) {
                this.wsSessionId = initResponse._metadata?.sessionId;
                this.addTestResult('WebSocket Server Initialization', 'PASS', 
                    `Server initialized with session ID: ${this.wsSessionId}`);
            } else {
                this.addTestResult('WebSocket Server Initialization', 'FAIL', 
                    'Failed to initialize server');
                return false;
            }

            // Discover tools
            const toolsResponse = await this.makeWebSocketRequest('tools/list', {});

            if (toolsResponse.result && toolsResponse.result.tools) {
                const tools = toolsResponse.result.tools;
                const toolNames = tools.map(tool => tool.name).join(', ');
                
                this.addTestResult('WebSocket Tools Discovery', 'PASS', 
                    `Found ${tools.length} tools: ${toolNames}`);
                
                // Check for essential tools
                const essentialTools = ['browser_navigate', 'browser_click', 'browser_snapshot'];
                const missingTools = essentialTools.filter(tool => 
                    !tools.some(t => t.name === tool));
                
                if (missingTools.length > 0) {
                    this.addTestResult('WebSocket Essential Tools Check', 'FAIL', 
                        `Missing essential tools: ${missingTools.join(', ')}`);
                } else {
                    this.addTestResult('WebSocket Essential Tools Check', 'PASS', 
                        'All essential tools are available');
                }
                
                return tools;
            } else {
                this.addTestResult('WebSocket Tools Discovery', 'FAIL', 
                    'No tools found in response');
                return null;
            }
        } catch (error) {
            this.addTestResult('WebSocket Tools Discovery', 'FAIL', 
                'Failed to discover tools', error);
            return null;
        }
    }

    /**
     * Test WebSocket tool execution
     */
    async testWebSocketToolExecution() {
        console.log('\n--- WebSocket Tool Execution ---');
        
        try {
            // Test browser navigation
            const navResponse = await this.makeWebSocketRequest('browser_navigate', {
                url: 'https://example.com'
            });

            if (navResponse.result && navResponse.result.success) {
                this.addTestResult('WebSocket Browser Navigation', 'PASS', 
                    'Successfully navigated to test page');
            } else {
                this.addTestResult('WebSocket Browser Navigation', 'FAIL', 
                    'Failed to navigate to test page');
                return false;
            }

            // Test page snapshot
            const snapshotResponse = await this.makeWebSocketRequest('browser_snapshot', {});

            if (snapshotResponse.result && snapshotResponse.result.snapshot) {
                this.addTestResult('WebSocket Page Snapshot', 'PASS', 
                    'Successfully captured page snapshot');
            } else {
                this.addTestResult('WebSocket Page Snapshot', 'FAIL', 
                    'Failed to capture page snapshot');
                return false;
            }

            // Test screenshot capture
            const screenshotResponse = await this.makeWebSocketRequest('browser_take_screenshot', {});

            if (screenshotResponse.result && screenshotResponse.result.data) {
                this.addTestResult('WebSocket Screenshot Capture', 'PASS', 
                    'Successfully captured screenshot');
            } else {
                this.addTestResult('WebSocket Screenshot Capture', 'FAIL', 
                    'Failed to capture screenshot');
                return false;
            }

            return true;
        } catch (error) {
            this.addTestResult('WebSocket Tool Execution', 'FAIL', 
                'Failed to execute tools', error);
            return false;
        }
    }

    /**
     * Test WebSocket session management
     */
    async testWebSocketSessionManagement() {
        console.log('\n--- WebSocket Session Management ---');
        
        try {
            // Test session persistence
            const response1 = await this.makeWebSocketRequest('tools/list', {});
            const response2 = await this.makeWebSocketRequest('tools/list', {});
            
            if (response1.result && response2.result && 
                response1.result.tools.length === response2.result.tools.length) {
                this.addTestResult('WebSocket Session Persistence', 'PASS', 
                    'Session correctly maintained across requests');
            } else {
                this.addTestResult('WebSocket Session Persistence', 'FAIL', 
                    'Session not properly maintained');
                return false;
            }

            return true;
        } catch (error) {
            this.addTestResult('WebSocket Session Management', 'FAIL', 
                'Failed to test session management', error);
            return false;
        }
    }

    /**
     * Run cross-transport tests
     */
    async runCrossTransportTests() {
        console.log('\n=== Cross-Transport Tests ===');
        
        // Test session isolation
        await this.testSessionIsolation();
        
        // Test concurrent operations
        await this.testConcurrentOperations();
    }

    /**
     * Test session isolation
     */
    async testSessionIsolation() {
        console.log('\n--- Session Isolation ---');
        
        try {
            // Create separate sessions
            const httpInit = await this.makeHTTPRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: { roots: { listChanged: true }, sampling: {} },
                clientInfo: { name: 'http-isolation-test', version: '1.0.0' }
            });

            const wsInit = await this.makeWebSocketRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: { roots: { listChanged: true }, sampling: {} },
                clientInfo: { name: 'ws-isolation-test', version: '1.0.0' }
            });

            const httpSessionId = httpInit._metadata?.sessionId;
            const wsSessionId = wsInit._metadata?.sessionId;

            // Test that sessions are isolated
            const httpResponse = await this.makeHTTPRequest('browser_navigate', {
                url: 'https://example.com'
            }, httpSessionId);

            const wsResponse = await this.makeWebSocketRequest('browser_navigate', {
                url: 'https://example.org'
            });

            if (httpResponse.result && wsResponse.result) {
                this.addTestResult('Session Isolation', 'PASS', 
                    'HTTP and WebSocket sessions are properly isolated');
                return true;
            } else {
                this.addTestResult('Session Isolation', 'FAIL', 
                    'Session isolation test failed');
                return false;
            }
        } catch (error) {
            this.addTestResult('Session Isolation', 'FAIL', 
                'Failed to test session isolation', error);
            return false;
        }
    }

    /**
     * Test concurrent operations
     */
    async testConcurrentOperations() {
        console.log('\n--- Concurrent Operations ---');
        
        try {
            // Make concurrent HTTP requests
            const httpPromises = Array(5).fill().map(() => 
                this.makeHTTPRequest('tools/list', {}, this.httpSessionId)
            );

            const httpResults = await Promise.all(httpPromises);
            
            // Make concurrent WebSocket requests
            const wsPromises = Array(5).fill().map(() => 
                this.makeWebSocketRequest('tools/list', {})
            );

            const wsResults = await Promise.all(wsPromises);

            // Check results
            const httpSuccess = httpResults.every(result => result.result && result.result.tools);
            const wsSuccess = wsResults.every(result => result.result && result.result.tools);

            if (httpSuccess && wsSuccess) {
                this.addTestResult('Concurrent Operations', 'PASS', 
                    'Successfully handled concurrent operations');
                return true;
            } else {
                this.addTestResult('Concurrent Operations', 'FAIL', 
                    'Failed to handle concurrent operations');
                return false;
            }
        } catch (error) {
            this.addTestResult('Concurrent Operations', 'FAIL', 
                'Failed to test concurrent operations', error);
            return false;
        }
    }

    /**
     * Run performance tests
     */
    async runPerformanceTests() {
        console.log('\n=== Performance Tests ===');
        
        // Test HTTP performance
        await this.testHTTPPerformance();
        
        // Test WebSocket performance
        await this.testWebSocketPerformance();
    }

    /**
     * Test HTTP performance
     */
    async testHTTPPerformance() {
        console.log('\n--- HTTP Performance ---');
        
        try {
            const requestCount = 20;
            const startTime = Date.now();
            
            const promises = Array(requestCount).fill().map(() => 
                this.makeHTTPRequest('tools/list', {}, this.httpSessionId)
            );

            const results = await Promise.all(promises);
            const endTime = Date.now();
            const duration = endTime - startTime;
            const avgTime = duration / requestCount;
            
            const successCount = results.filter(result => result.result && result.result.tools).length;
            
            if (successCount === requestCount && avgTime < 100) {
                this.addTestResult('HTTP Performance', 'PASS', 
                    `Average response time: ${avgTime.toFixed(2)}ms`);
                return true;
            } else {
                this.addTestResult('HTTP Performance', 'FAIL', 
                    `Performance test failed: ${successCount}/${requestCount} successful, avg time: ${avgTime.toFixed(2)}ms`);
                return false;
            }
        } catch (error) {
            this.addTestResult('HTTP Performance', 'FAIL', 
                'Failed to test HTTP performance', error);
            return false;
        }
    }

    /**
     * Test WebSocket performance
     */
    async testWebSocketPerformance() {
        console.log('\n--- WebSocket Performance ---');
        
        try {
            const requestCount = 20;
            const startTime = Date.now();
            
            const promises = Array(requestCount).fill().map(() => 
                this.makeWebSocketRequest('tools/list', {})
            );

            const results = await Promise.all(promises);
            const endTime = Date.now();
            const duration = endTime - startTime;
            const avgTime = duration / requestCount;
            
            const successCount = results.filter(result => result.result && result.result.tools).length;
            
            if (successCount === requestCount && avgTime < 100) {
                this.addTestResult('WebSocket Performance', 'PASS', 
                    `Average response time: ${avgTime.toFixed(2)}ms`);
                return true;
            } else {
                this.addTestResult('WebSocket Performance', 'FAIL', 
                    `Performance test failed: ${successCount}/${requestCount} successful, avg time: ${avgTime.toFixed(2)}ms`);
                return false;
            }
        } catch (error) {
            this.addTestResult('WebSocket Performance', 'FAIL', 
                'Failed to test WebSocket performance', error);
            return false;
        }
    }

    /**
     * Run error handling tests
     */
    async runErrorHandlingTests() {
        console.log('\n=== Error Handling Tests ===');
        
        // Test invalid JSON-RPC requests
        await this.testInvalidJSONRPC();
        
        // Test invalid parameters
        await this.testInvalidParameters();
        
        // Test unknown methods
        await this.testUnknownMethods();
    }

    /**
     * Test invalid JSON-RPC requests
     */
    async testInvalidJSONRPC() {
        console.log('\n--- Invalid JSON-RPC ---');
        
        try {
            // Test missing jsonrpc version
            const response1 = await this.makeHTTPRequest('tools/list', {}, this.httpSessionId, {
                omitJsonRpc: true
            });

            if (response1.error && response1.error.code === -32600) {
                this.addTestResult('Invalid JSON-RPC (Missing Version)', 'PASS', 
                    'Correctly rejected invalid JSON-RPC request');
            } else {
                this.addTestResult('Invalid JSON-RPC (Missing Version)', 'FAIL', 
                    'Should have rejected invalid JSON-RPC request');
                return false;
            }

            return true;
        } catch (error) {
            this.addTestResult('Invalid JSON-RPC', 'FAIL', 
                'Failed to test invalid JSON-RPC', error);
            return false;
        }
    }

    /**
     * Test invalid parameters
     */
    async testInvalidParameters() {
        console.log('\n--- Invalid Parameters ---');
        
        try {
            // Test missing required parameter
            const response1 = await this.makeHTTPRequest('browser_navigate', {}, this.httpSessionId);

            if (response1.error && response1.error.code === -32602) {
                this.addTestResult('Invalid Parameters (Missing Required)', 'PASS', 
                    'Correctly rejected request with missing required parameter');
            } else {
                this.addTestResult('Invalid Parameters (Missing Required)', 'FAIL', 
                    'Should have rejected request with missing required parameter');
                return false;
            }

            return true;
        } catch (error) {
            this.addTestResult('Invalid Parameters', 'FAIL', 
                'Failed to test invalid parameters', error);
            return false;
        }
    }

    /**
     * Test unknown methods
     */
    async testUnknownMethods() {
        console.log('\n--- Unknown Methods ---');
        
        try {
            // Test unknown method
            const response1 = await this.makeHTTPRequest('unknown_method', {}, this.httpSessionId);

            if (response1.error && response1.error.code === -32601) {
                this.addTestResult('Unknown Methods', 'PASS', 
                    'Correctly rejected request with unknown method');
            } else {
                this.addTestResult('Unknown Methods', 'FAIL', 
                    'Should have rejected request with unknown method');
                return false;
            }

            return true;
        } catch (error) {
            this.addTestResult('Unknown Methods', 'FAIL', 
                'Failed to test unknown methods', error);
            return false;
        }
    }

    /**
     * Make HTTP request
     */
    async makeHTTPRequest(method, params = {}, sessionId = null, options = {}) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                jsonrpc: options.omitJsonRpc ? undefined : '2.0',
                id: Date.now(),
                method,
                params
            });

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/event-stream',
                'Content-Length': data.length
            };

            // Add session ID if provided
            if (sessionId) {
                headers['mcp-session-id'] = sessionId;
            }

            const requestOptions = {
                hostname: 'localhost',
                port: this.options.httpPort,
                path: '/mcp',
                method: 'POST',
                headers
            };


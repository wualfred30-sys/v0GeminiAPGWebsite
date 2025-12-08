#!/usr/bin/env node

/**
 * Extended Playwright MCP Debug Test
 * 
 * Investigates additional potential issues beyond session management
 */

const http = require('http');

class ExtendedPlaywrightMCPDebug {
    constructor() {
        this.serverUrl = 'http://localhost:8932/mcp';
        this.requestId = 1;
    }

    /**
     * Execute JSON-RPC request with detailed logging
     */
    async makeRequest(method, params = {}, sessionId = null) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                jsonrpc: '2.0',
                id: this.requestId++,
                method,
                params
            });

            console.log(`\n=== REQUEST ===`);
            console.log(`Method: ${method}`);
            console.log(`Params: ${JSON.stringify(params, null, 2)}`);
            console.log(`Session ID: ${sessionId || 'None'}`);
            console.log(`Data: ${data}`);

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/event-stream',
                'Content-Length': data.length
            };

            // Add session ID if provided
            if (sessionId) {
                headers['mcp-session-id'] = sessionId;
            }

            const options = {
                hostname: 'localhost',
                port: 8932,
                path: '/mcp',
                method: 'POST',
                headers
            };

            const req = http.request(options, (res) => {
                console.log(`\n=== RESPONSE HEADERS ===`);
                console.log(`Status: ${res.statusCode}`);
                console.log(`Headers:`, res.headers);

                let responseData = '';
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                res.on('end', () => {
                    console.log(`\n=== RESPONSE BODY ===`);
                    console.log(`Raw: ${responseData}`);
                    
                    try {
                        let response;
                        if (responseData.startsWith('event: message\ndata: ')) {
                            response = JSON.parse(responseData.split('data: ')[1]);
                            console.log(`Parsed (SSE): ${JSON.stringify(response, null, 2)}`);
                        } else {
                            response = JSON.parse(responseData);
                            console.log(`Parsed (JSON): ${JSON.stringify(response, null, 2)}`);
                        }
                        
                        // Include response headers in the result
                        response.responseHeaders = res.headers;
                        resolve(response);
                    } catch (error) {
                        console.log(`Parse Error: ${error.message}`);
                        reject(new Error(`Failed to parse response: ${error.message}. Raw response: ${responseData}`));
                    }
                });
            });

            req.on('error', (error) => {
                console.log(`\n=== REQUEST ERROR ===`);
                console.log(`Error: ${error.message}`);
                reject(error);
            });

            req.write(data);
            req.end();
        });
    }

    /**
     * Test 1: Session persistence with session ID
     */
    async testSessionPersistence() {
        console.log('\n🔍 TEST 1: Session Persistence with Session ID');
        
        try {
            // Step 1: Initialize and capture session ID
            console.log('\n--- Step 1: Initialize ---');
            const initResponse = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'session-test',
                    version: '1.0.0'
                }
            });

            if (!initResponse.result) {
                console.log('❌ Session Persistence Test Failed at Initialization');
                return null;
            }

            // Extract session ID from response headers
            const sessionId = initResponse.responseHeaders['mcp-session-id'];
            console.log(`\n--- Extracted Session ID: ${sessionId} ---`);

            // Step 2: Use session ID for tools discovery
            console.log('\n--- Step 2: Tools Discovery with Session ID ---');
            const toolsResponse = await this.makeRequest('tools/list', {}, sessionId);
            
            console.log(`\n✅ Session Persistence Result: ${toolsResponse.result ? 'SUCCESS' : 'FAILED'}`);
            return { initResponse, toolsResponse, sessionId };
        } catch (error) {
            console.log(`\n❌ Session Persistence Test Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 2: Server behavior with invalid session ID
     */
    async testInvalidSession() {
        console.log('\n🔍 TEST 2: Invalid Session ID');
        
        try {
            // Try with a fake session ID
            const response = await this.makeRequest('tools/list', {}, 'fake-session-id');
            
            console.log(`\n✅ Invalid Session Result: ${response.error ? 'EXPECTED FAILURE' : 'UNEXPECTED SUCCESS'}`);
            return response;
        } catch (error) {
            console.log(`\n❌ Invalid Session Test Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 3: Multiple initializations with same session
     */
    async testMultipleInitializations() {
        console.log('\n🔍 TEST 3: Multiple Initializations');
        
        try {
            // First initialization
            console.log('\n--- First Initialization ---');
            const init1 = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'multi-init-test-1',
                    version: '1.0.0'
                }
            });

            const sessionId1 = init1.responseHeaders['mcp-session-id'];
            console.log(`First Session ID: ${sessionId1}`);

            // Second initialization with same session
            console.log('\n--- Second Initialization with Same Session ---');
            const init2 = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'multi-init-test-2',
                    version: '1.0.0'
                }
            }, sessionId1);

            const sessionId2 = init2.responseHeaders ? init2.responseHeaders['mcp-session-id'] : 'None';
            console.log(`Second Session ID: ${sessionId2}`);
            
            // Tools discovery with first session
            console.log('\n--- Tools Discovery with First Session ---');
            const tools1 = await this.makeRequest('tools/list', {}, sessionId1);
            
            console.log(`\n✅ Multiple Initializations Result: ${tools1.result ? 'SUCCESS' : 'FAILED'}`);
            return { init1, init2, tools1 };
        } catch (error) {
            console.log(`\n❌ Multiple Initializations Test Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 4: Browser-specific initialization
     */
    async testBrowserInitialization() {
        console.log('\n🔍 TEST 4: Browser-Specific Initialization');
        
        try {
            // Initialize with browser-specific capabilities
            console.log('\n--- Browser-Specific Initialization ---');
            const response = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {},
                    browser: {
                        chromium: true
                    }
                },
                clientInfo: {
                    name: 'browser-test',
                    version: '1.0.0'
                }
            });

            const sessionId = response.responseHeaders['mcp-session-id'];
            console.log(`Browser Session ID: ${sessionId}`);

            // Try browser-specific operations
            console.log('\n--- Browser Operations ---');
            const navResponse = await this.makeRequest('browser_navigate', {
                url: 'https://example.com'
            }, sessionId);
            
            console.log(`\n✅ Browser Initialization Result: ${navResponse.result ? 'SUCCESS' : 'FAILED'}`);
            return { response, navResponse };
        } catch (error) {
            console.log(`\n❌ Browser Initialization Test Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 5: Check server capabilities in detail
     */
    async testServerCapabilitiesDetailed() {
        console.log('\n🔍 TEST 5: Detailed Server Capabilities');
        
        try {
            const response = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {},
                    experimental: {}
                },
                clientInfo: {
                    name: 'caps-test',
                    version: '1.0.0'
                }
            });

            if (response.result && response.result.capabilities) {
                console.log(`\n✅ Server Capabilities:`);
                console.log(JSON.stringify(response.result.capabilities, null, 2));
                
                // Check if tools capability exists but is empty
                if (response.result.capabilities.tools) {
                    console.log(`\n🔍 Tools Capability Analysis:`);
                    console.log(`Type: ${typeof response.result.capabilities.tools}`);
                    console.log(`Value: ${JSON.stringify(response.result.capabilities.tools)}`);
                    
                    if (Object.keys(response.result.capabilities.tools).length === 0) {
                        console.log(`⚠️ Tools capability exists but is empty - this might indicate no tools are available`);
                    }
                }
            }
            
            return response;
        } catch (error) {
            console.log(`\n❌ Server Capabilities Test Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Run all extended diagnostic tests
     */
    async runExtendedDiagnostics() {
        console.log('🚀 Starting Extended Playwright MCP Diagnostic Tests');
        console.log('====================================================');
        
        // Test 1: Session persistence
        await this.testSessionPersistence();
        
        // Test 2: Invalid session
        await this.testInvalidSession();
        
        // Test 3: Multiple initializations
        await this.testMultipleInitializations();
        
        // Test 4: Browser-specific initialization
        await this.testBrowserInitialization();
        
        // Test 5: Detailed capabilities
        await this.testServerCapabilitiesDetailed();
        
        console.log('\n====================================================');
        console.log('🏁 Extended Diagnostic Tests Complete');
        console.log('====================================================');
    }
}

// Run the extended diagnostic test if this file is executed directly
if (require.main === module) {
    const extendedDebug = new ExtendedPlaywrightMCPDebug();
    extendedDebug.runExtendedDiagnostics()
        .catch(error => {
            console.error('Extended diagnostic test failed to run:', error);
            process.exit(1);
        });
}

module.exports = ExtendedPlaywrightMCPDebug;
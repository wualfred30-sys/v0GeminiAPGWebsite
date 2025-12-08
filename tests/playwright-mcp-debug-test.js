#!/usr/bin/env node

/**
 * Playwright MCP Debug Test
 * 
 * Focused diagnostic test to identify the root cause of HTTP transport issues
 */

const http = require('http');

class PlaywrightMCPDebugTest {
    constructor() {
        this.serverUrl = 'http://localhost:8932/mcp';
        this.requestId = 1;
    }

    /**
     * Execute JSON-RPC request with detailed logging
     */
    async makeRequest(method, params = {}) {
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
            console.log(`Data: ${data}`);

            const options = {
                hostname: 'localhost',
                port: 8932,
                path: '/mcp',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/event-stream',
                    'Content-Length': data.length
                }
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
     * Test 1: Basic initialization
     */
    async testInitialization() {
        console.log('\n🔍 TEST 1: Basic Initialization');
        
        try {
            const response = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'debug-test',
                    version: '1.0.0'
                }
            });

            console.log(`\n✅ Initialization Result: ${response.result ? 'SUCCESS' : 'FAILED'}`);
            return response;
        } catch (error) {
            console.log(`\n❌ Initialization Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 2: Tools discovery immediately after initialization
     */
    async testToolsDiscovery() {
        console.log('\n🔍 TEST 2: Tools Discovery');
        
        try {
            const response = await this.makeRequest('tools/list');
            
            console.log(`\n✅ Tools Discovery Result: ${response.result ? 'SUCCESS' : 'FAILED'}`);
            if (response.result && response.result.tools) {
                console.log(`Found ${response.result.tools.length} tools`);
                response.result.tools.forEach(tool => {
                    console.log(`  - ${tool.name}: ${tool.description || 'No description'}`);
                });
            }
            
            return response;
        } catch (error) {
            console.log(`\n❌ Tools Discovery Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 3: Combined initialization and tools discovery
     */
    async testCombinedFlow() {
        console.log('\n🔍 TEST 3: Combined Flow');
        
        try {
            // Step 1: Initialize
            console.log('\n--- Step 1: Initialize ---');
            const initResponse = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'debug-test-combined',
                    version: '1.0.0'
                }
            });

            if (!initResponse.result) {
                console.log('❌ Combined Flow Failed at Initialization');
                return null;
            }

            // Step 2: List tools
            console.log('\n--- Step 2: List Tools ---');
            const toolsResponse = await this.makeRequest('tools/list');
            
            console.log(`\n✅ Combined Flow Result: ${toolsResponse.result ? 'SUCCESS' : 'FAILED'}`);
            return toolsResponse;
        } catch (error) {
            console.log(`\n❌ Combined Flow Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Test 4: Server capabilities check
     */
    async testServerCapabilities() {
        console.log('\n🔍 TEST 4: Server Capabilities');
        
        try {
            const response = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'debug-test-caps',
                    version: '1.0.0'
                }
            });

            if (response.result && response.result.capabilities) {
                console.log(`\n✅ Server Capabilities:`);
                console.log(JSON.stringify(response.result.capabilities, null, 2));
            } else {
                console.log(`\n❌ No Capabilities Found`);
            }
            
            return response;
        } catch (error) {
            console.log(`\n❌ Server Capabilities Test Failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Run all diagnostic tests
     */
    async runDiagnostics() {
        console.log('🚀 Starting Playwright MCP Diagnostic Tests');
        console.log('=============================================');
        
        // Test 1: Basic initialization
        await this.testInitialization();
        
        // Test 2: Tools discovery (should fail)
        await this.testToolsDiscovery();
        
        // Test 3: Combined flow
        await this.testCombinedFlow();
        
        // Test 4: Server capabilities
        await this.testServerCapabilities();
        
        console.log('\n=============================================');
        console.log('🏁 Diagnostic Tests Complete');
        console.log('=============================================');
    }
}

// Run the diagnostic test if this file is executed directly
if (require.main === module) {
    const debugTest = new PlaywrightMCPDebugTest();
    debugTest.runDiagnostics()
        .catch(error => {
            console.error('Diagnostic test failed to run:', error);
            process.exit(1);
        });
}

module.exports = PlaywrightMCPDebugTest;
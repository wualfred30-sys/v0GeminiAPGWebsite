#!/usr/bin/env node

/**
 * WebSocket-based Playwright MCP Test Suite
 * 
 * Implements a WebSocket client to test the full capabilities of the Playwright MCP server,
 * bypassing the HTTP transport limitations.
 */

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

class WebSocketPlaywrightMCPTest {
    constructor() {
        this.serverUrl = 'ws://localhost:8932';
        this.ws = null;
        this.requestId = 1;
        this.pendingRequests = new Map();
        this.testResults = [];
        this.testStartTime = new Date();
        this.isConnected = false;
    }

    /**
     * Connect to the WebSocket server
     */
    async connect() {
        return new Promise((resolve, reject) => {
            console.log(`\n=== WebSocket Connection ===`);
            console.log(`Connecting to ${this.serverUrl}`);
            
            this.ws = new WebSocket(this.serverUrl);
            
            this.ws.on('open', () => {
                console.log('WebSocket connected successfully');
                this.isConnected = true;
                resolve();
            });
            
            this.ws.on('message', (data) => {
                try {
                    const response = JSON.parse(data.toString());
                    console.log(`\n=== WebSocket Response ===`);
                    console.log(JSON.stringify(response, null, 2));
                    
                    const { id } = response;
                    if (id && this.pendingRequests.has(id)) {
                        const { resolve, reject } = this.pendingRequests.get(id);
                        this.pendingRequests.delete(id);
                        resolve(response);
                    }
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            });
            
            this.ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.isConnected = false;
                reject(error);
            });
            
            this.ws.on('close', () => {
                console.log('WebSocket connection closed');
                this.isConnected = false;
            });
        });
    }

    /**
     * Execute JSON-RPC request via WebSocket
     */
    async makeRequest(method, params = {}) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected || this.ws.readyState !== WebSocket.OPEN) {
                reject(new Error('WebSocket is not connected'));
                return;
            }

            const id = this.requestId++;
            const request = {
                jsonrpc: '2.0',
                id,
                method,
                params
            };
            
            console.log(`\n=== WebSocket Request ===`);
            console.log(`Method: ${method}`);
            console.log(`Params: ${JSON.stringify(params, null, 2)}`);
            console.log(`Request: ${JSON.stringify(request, null, 2)}`);
            
            this.pendingRequests.set(id, { resolve, reject });
            
            try {
                this.ws.send(JSON.stringify(request));
            } catch (error) {
                this.pendingRequests.delete(id);
                reject(error);
            }
        });
    }

    /**
     * Initialize the server
     */
    async initializeServer() {
        console.log('\n=== Server Initialization ===');
        
        try {
            const response = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'websocket-test',
                    version: '1.0.0'
                }
            });

            if (response.result && response.result.protocolVersion) {
                this.addTestResult('Server Initialization', 'PASS', 
                    `Server initialized with protocol version: ${response.result.protocolVersion}`);
                return true;
            } else {
                this.addTestResult('Server Initialization', 'FAIL', 
                    'Failed to initialize server',
                    new Error('Missing protocol version in response'));
                return false;
            }
        } catch (error) {
            this.addTestResult('Server Initialization', 'FAIL', 
                'Failed to initialize server', error);
            return false;
        }
    }

    /**
     * Test tools discovery
     */
    async testToolsDiscovery() {
        console.log('\n=== Tools Discovery ===');
        
        try {
            const response = await this.makeRequest('tools/list');

            if (response.result && response.result.tools) {
                const tools = response.result.tools;
                const toolNames = tools.map(tool => tool.name).join(', ');
                
                this.addTestResult('Tools Discovery', 'PASS', 
                    `Found ${tools.length} tools: ${toolNames}`);
                
                // Check for essential tools
                const essentialTools = ['browser_navigate', 'browser_click', 'browser_type'];
                const missingTools = essentialTools.filter(tool => 
                    !tools.some(t => t.name === tool));
                
                if (missingTools.length > 0) {
                    this.addTestResult('Essential Tools Check', 'FAIL', 
                        `Missing essential tools: ${missingTools.join(', ')}`);
                } else {
                    this.addTestResult('Essential Tools Check', 'PASS', 
                        'All essential tools are available');
                }
                
                return tools;
            } else {
                this.addTestResult('Tools Discovery', 'FAIL', 
                    'No tools found in response',
                    new Error('Missing tools array in response'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Tools Discovery', 'FAIL', 
                'Failed to discover tools', error);
            return null;
        }
    }

    /**
     * Test page navigation
     */
    async testPageNavigation() {
        console.log('\n=== Page Navigation ===');
        
        try {
            const testUrl = 'https://example.com';
            const response = await this.makeRequest('browser_navigate', {
                url: testUrl
            });

            if (response.result && response.result.success) {
                this.addTestResult('Page Navigation', 'PASS', 
                    `Successfully navigated to ${testUrl}`);
                return response.result;
            } else {
                this.addTestResult('Page Navigation', 'FAIL', 
                    'Failed to navigate to test page',
                    new Error(`Navigation response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Page Navigation', 'FAIL', 
                'Failed to navigate to test page', error);
            return null;
        }
    }

    /**
     * Test page content analysis
     */
    async testPageContentAnalysis() {
        console.log('\n=== Page Content Analysis ===');
        
        try {
            const response = await this.makeRequest('browser_snapshot');

            if (response.result && response.result.snapshot) {
                const snapshot = response.result.snapshot;
                const title = snapshot.title || 'No title';
                const hasContent = snapshot.content && snapshot.content.length > 0;
                
                this.addTestResult('Page Content Analysis', 'PASS', 
                    `Page title: "${title}", Has content: ${hasContent}`);
                return snapshot;
            } else {
                this.addTestResult('Page Content Analysis', 'FAIL', 
                    'Failed to get page snapshot',
                    new Error(`Snapshot response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Page Content Analysis', 'FAIL', 
                'Failed to analyze page content', error);
            return null;
        }
    }

    /**
     * Test screenshot capture
     */
    async testScreenshotCapture() {
        console.log('\n=== Screenshot Capture ===');
        
        try {
            const response = await this.makeRequest('browser_take_screenshot');

            if (response.result && response.result.data) {
                // Save screenshot to file
                const screenshotPath = path.join(__dirname, '../test-results/websocket-screenshot.png');
                const screenshotData = Buffer.from(response.result.data, 'base64');
                
                // Ensure directory exists
                const screenshotDir = path.dirname(screenshotPath);
                if (!fs.existsSync(screenshotDir)) {
                    fs.mkdirSync(screenshotDir, { recursive: true });
                }
                
                fs.writeFileSync(screenshotPath, screenshotData);
                
                this.addTestResult('Screenshot Capture', 'PASS', 
                    `Screenshot saved to ${screenshotPath}`);
                return response.result;
            } else {
                this.addTestResult('Screenshot Capture', 'FAIL', 
                    'Failed to capture screenshot',
                    new Error(`Screenshot response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Screenshot Capture', 'FAIL', 
                'Failed to capture screenshot', error);
            return null;
        }
    }

    /**
     * Test element interaction
     */
    async testElementInteraction() {
        console.log('\n=== Element Interaction ===');
        
        try {
            const response = await this.makeRequest('browser_click', {
                element: 'Example heading',
                ref: 'h1'
            });

            if (response.result && response.result.success) {
                this.addTestResult('Element Interaction', 'PASS', 
                    'Successfully interacted with h1 element');
                return response.result;
            } else {
                this.addTestResult('Element Interaction', 'FAIL', 
                    'Failed to interact with element',
                    new Error(`Element interaction response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Element Interaction', 'FAIL', 
                'Failed to interact with element', error);
            return null;
        }
    }

    /**
     * Test network interception
     */
    async testNetworkInterception() {
        console.log('\n=== Network Interception ===');
        
        try {
            const response = await this.makeRequest('browser_network_requests');

            if (response.result && Array.isArray(response.result.requests)) {
                const requests = response.result.requests;
                this.addTestResult('Network Interception', 'PASS', 
                    `Network requests captured: ${requests.length}`);
                return requests;
            } else {
                this.addTestResult('Network Interception', 'FAIL', 
                    'Failed to get network requests',
                    new Error(`Network requests response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Network Interception', 'FAIL', 
                'Failed to intercept network requests', error);
            return null;
        }
    }

    /**
     * Test browser resizing
     */
    async testBrowserResize() {
        console.log('\n=== Browser Resize ===');
        
        try {
            const response = await this.makeRequest('browser_resize', {
                width: 1200,
                height: 800
            });

            if (response.result && response.result.success) {
                this.addTestResult('Browser Resize', 'PASS', 
                    'Successfully resized browser to 1200x800');
                return response.result;
            } else {
                this.addTestResult('Browser Resize', 'FAIL', 
                    'Failed to resize browser',
                    new Error(`Browser resize response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Browser Resize', 'FAIL', 
                'Failed to resize browser', error);
            return null;
        }
    }

    /**
     * Test browser closing
     */
    async testBrowserClose() {
        console.log('\n=== Browser Close ===');
        
        try {
            const response = await this.makeRequest('browser_close');

            if (response.result && response.result.success) {
                this.addTestResult('Browser Close', 'PASS', 
                    'Successfully closed browser');
                return response.result;
            } else {
                this.addTestResult('Browser Close', 'FAIL', 
                    'Failed to close browser',
                    new Error(`Browser close response: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Browser Close', 'FAIL', 
                'Failed to close browser', error);
            return null;
        }
    }

    /**
     * Add test result
     */
    addTestResult(testName, status, details = '', error = null) {
        const result = {
            testName,
            status, // 'PASS', 'FAIL', 'SKIP'
            details,
            error: error ? error.message : null,
            timestamp: new Date().toISOString()
        };
        this.testResults.push(result);
        console.log(`\n[${status}] ${testName}${details ? ': ' + details : ''}`);
        if (error) {
            console.log(`    Error: ${error.message}`);
        }
    }

    /**
     * Generate comprehensive test report
     */
    generateTestReport() {
        const endTime = new Date();
        const duration = endTime - this.testStartTime;
        
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.status === 'PASS').length;
        const failedTests = this.testResults.filter(r => r.status === 'FAIL').length;
        const skippedTests = this.testResults.filter(r => r.status === 'SKIP').length;
        
        const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : '0.0';
        
        const report = {
            summary: {
                startTime: this.testStartTime.toISOString(),
                endTime: endTime.toISOString(),
                duration: `${duration}ms`,
                totalTests,
                passedTests,
                failedTests,
                skippedTests,
                passRate: `${passRate}%`,
                transport: 'WebSocket'
            },
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };
        
        // Save report to file
        const reportPath = path.join(__dirname, '../test-results/websocket-test-report.json');
        const reportDir = path.dirname(reportPath);
        
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        return report;
    }

    /**
     * Generate recommendations based on test results
     */
    generateRecommendations() {
        const recommendations = [];
        const failedTests = this.testResults.filter(r => r.status === 'FAIL');
        
        if (failedTests.length === 0) {
            recommendations.push('✅ All tests passed! The WebSocket-based Playwright MCP client is functioning correctly.');
            recommendations.push('🔌 WebSocket transport provides full access to all Playwright MCP server capabilities.');
        } else {
            recommendations.push(`❌ ${failedTests.length} test(s) failed. Review the detailed results below.`);
            
            // Analyze common failure patterns
            const failurePatterns = failedTests.reduce((patterns, test) => {
                const pattern = test.error && test.error.message ? test.error.message.split(':')[0] : 'Unknown';
                patterns[pattern] = (patterns[pattern] || 0) + 1;
                return patterns;
            }, {});
            
            Object.entries(failurePatterns).forEach(([pattern, count]) => {
                recommendations.push(`🔍 Pattern detected: ${pattern} (${count} occurrences)`);
            });
        }
        
        // Transport-specific recommendations
        recommendations.push('🌐 WebSocket transport is recommended for full browser automation capabilities.');
        recommendations.push('⚡ WebSocket provides real-time bidirectional communication with the MCP server.');
        
        return recommendations;
    }

    /**
     * Disconnect from WebSocket server
     */
    async disconnect() {
        if (this.ws && this.isConnected) {
            console.log('\n=== WebSocket Disconnection ===');
            this.ws.close();
            this.isConnected = false;
        }
    }

    /**
     * Run the complete WebSocket test suite
     */
    async runWebSocketTestSuite() {
        console.log('🚀 Starting WebSocket-based Playwright MCP Test Suite');
        console.log('====================================================');
        
        try {
            // Connect to WebSocket server
            await this.connect();
            
            // Initialize server
            const initialized = await this.initializeServer();
            
            if (initialized) {
                // Run core functionality tests
                await this.testToolsDiscovery();
                await this.testPageNavigation();
                await this.testPageContentAnalysis();
                await this.testScreenshotCapture();
                await this.testElementInteraction();
                await this.testNetworkInterception();
                await this.testBrowserResize();
                
                // Clean up
                await this.testBrowserClose();
            }
            
        } catch (error) {
            console.error('Test suite execution error:', error);
            this.addTestResult('Test Suite Execution', 'FAIL', 
                'Test suite execution failed', error);
        } finally {
            // Disconnect from server
            await this.disconnect();
        }
        
        // Generate and display results
        const report = this.generateTestReport();
        
        console.log('\n====================================================');
        console.log('📊 WebSocket Test Suite Summary');
        console.log('====================================================');
        console.log(`Total Tests: ${report.summary.totalTests}`);
        console.log(`Passed: ${report.summary.passedTests}`);
        console.log(`Failed: ${report.summary.failedTests}`);
        console.log(`Skipped: ${report.summary.skippedTests}`);
        console.log(`Pass Rate: ${report.summary.passRate}`);
        console.log(`Duration: ${report.summary.duration}`);
        console.log(`Transport: ${report.summary.transport}`);
        
        console.log('\n📝 Recommendations:');
        report.recommendations.forEach(rec => console.log(`  ${rec}`));
        
        console.log(`\n📄 Detailed report saved to: test-results/websocket-test-report.json`);
        
        return report;
    }
}

// Run the WebSocket test suite if this file is executed directly
if (require.main === module) {
    const wsTest = new WebSocketPlaywrightMCPTest();
    wsTest.runWebSocketTestSuite()
        .then(report => {
            process.exit(report.summary.failedTests > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('WebSocket test suite failed to run:', error);
            process.exit(1);
        });
}

module.exports = WebSocketPlaywrightMCPTest;
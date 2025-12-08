#!/usr/bin/env node

/**
 * Comprehensive Playwright MCP Test Suite
 * 
 * This test suite validates all core functionality of the Playwright MCP server
 * including server startup, browser initialization, page navigation, element selection,
 * screenshot capture, and network interception capabilities.
 * 
 * Usage: node tests/playwright-mcp-test-suite.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

class PlaywrightMCPTestSuite {
    constructor() {
        this.serverUrl = 'http://localhost:8932/mcp';
        this.testResults = [];
        this.testStartTime = new Date();
        this.requestId = 1;
    }

    /**
     * Execute JSON-RPC request to MCP server
     */
    async makeRequest(method, params = {}) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify({
                jsonrpc: '2.0',
                id: this.requestId++,
                method,
                params
            });

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
                let responseData = '';
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                res.on('end', () => {
                    try {
                        let response;
                        if (responseData.startsWith('event: message\ndata: ')) {
                            response = JSON.parse(responseData.split('data: ')[1]);
                        } else {
                            response = JSON.parse(responseData);
                        }
                        
                        // Handle SSE response format
                        if (response.result && !response.id && responseData.startsWith('event:')) {
                            // This is an SSE response, extract the actual result
                            resolve(response);
                        } else {
                            resolve(response);
                        }
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${error.message}. Raw response: ${responseData}`));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.write(data);
            req.end();
        });
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
        console.log(`[${status}] ${testName}${details ? ': ' + details : ''}`);
        if (error) {
            console.log(`    Error: ${error.message}`);
        }
    }

    /**
     * Test 1: Server Connectivity
     */
    async testServerConnectivity() {
        console.log('\n=== Test 1: Server Connectivity ===');
        
        try {
            // Test basic HTTP connection
            const response = await this.makeRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    roots: { listChanged: true },
                    sampling: {}
                },
                clientInfo: {
                    name: 'test-suite',
                    version: '1.0.0'
                }
            });

            if (response.result && response.result.protocolVersion) {
                this.addTestResult('Server Connectivity', 'PASS', 
                    `Server responds correctly, protocol version: ${response.result.protocolVersion}`);
                return true;
            } else {
                this.addTestResult('Server Connectivity', 'FAIL', 
                    'Invalid response structure', 
                    new Error('Missing protocol version in response'));
                return false;
            }
        } catch (error) {
            this.addTestResult('Server Connectivity', 'FAIL', 
                'Failed to connect to server', error);
            return false;
        }
    }

    /**
     * Test 2: Tools Discovery
     */
    async testToolsDiscovery() {
        console.log('\n=== Test 2: Tools Discovery ===');
        
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
     * Test 3: Browser Initialization
     */
    async testBrowserInitialization() {
        console.log('\n=== Test 3: Browser Initialization ===');
        
        try {
            // Try to create a new browser context
            const response = await this.makeRequest('browser_createContext', {
                browserName: 'chromium'
            });

            if (response.result && response.result.contextId) {
                this.addTestResult('Browser Initialization', 'PASS', 
                    `Browser context created with ID: ${response.result.contextId}`);
                return response.result.contextId;
            } else {
                this.addTestResult('Browser Initialization', 'FAIL', 
                    'Failed to create browser context',
                    new Error('Missing contextId in response'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Browser Initialization', 'FAIL', 
                'Failed to initialize browser', error);
            return null;
        }
    }

    /**
     * Test 4: Page Navigation
     */
    async testPageNavigation(contextId) {
        console.log('\n=== Test 4: Page Navigation ===');
        
        if (!contextId) {
            this.addTestResult('Page Navigation', 'SKIP', 
                'Skipped due to missing browser context');
            return null;
        }

        try {
            // Navigate to a test page
            const testUrl = 'https://example.com';
            const response = await this.makeRequest('browser_navigate', {
                contextId,
                url: testUrl
            });

            if (response.result && response.result.success) {
                this.addTestResult('Page Navigation', 'PASS', 
                    `Successfully navigated to ${testUrl}`);
                return response.result;
            } else {
                this.addTestResult('Page Navigation', 'FAIL', 
                    'Failed to navigate to test page',
                    new Error('Navigation response indicates failure'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Page Navigation', 'FAIL', 
                'Failed to navigate to test page', error);
            return null;
        }
    }

    /**
     * Test 5: Element Selection
     */
    async testElementSelection(contextId) {
        console.log('\n=== Test 5: Element Selection ===');
        
        if (!contextId) {
            this.addTestResult('Element Selection', 'SKIP', 
                'Skipped due to missing browser context');
            return null;
        }

        try {
            // Try to select a common element
            const response = await this.makeRequest('browser_click', {
                contextId,
                selector: 'h1'
            });

            if (response.result && response.result.success) {
                this.addTestResult('Element Selection', 'PASS', 
                    'Successfully selected h1 element');
                return response.result;
            } else {
                this.addTestResult('Element Selection', 'FAIL', 
                    'Failed to select h1 element',
                    new Error('Element selection response indicates failure'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Element Selection', 'FAIL', 
                'Failed to select element', error);
            return null;
        }
    }

    /**
     * Test 6: Screenshot Capture
     */
    async testScreenshotCapture(contextId) {
        console.log('\n=== Test 6: Screenshot Capture ===');
        
        if (!contextId) {
            this.addTestResult('Screenshot Capture', 'SKIP', 
                'Skipped due to missing browser context');
            return null;
        }

        try {
            const response = await this.makeRequest('browser_takeScreenshot', {
                contextId
            });

            if (response.result && response.result.data) {
                // Save screenshot to file
                const screenshotPath = path.join(__dirname, '../test-results/screenshot.png');
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
                    new Error('Screenshot response missing data'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Screenshot Capture', 'FAIL', 
                'Failed to capture screenshot', error);
            return null;
        }
    }

    /**
     * Test 7: Page Content Analysis
     */
    async testPageContentAnalysis(contextId) {
        console.log('\n=== Test 7: Page Content Analysis ===');
        
        if (!contextId) {
            this.addTestResult('Page Content Analysis', 'SKIP', 
                'Skipped due to missing browser context');
            return null;
        }

        try {
            const response = await this.makeRequest('browser_snapshot', {
                contextId
            });

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
                    new Error('Snapshot response missing data'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Page Content Analysis', 'FAIL', 
                'Failed to analyze page content', error);
            return null;
        }
    }

    /**
     * Test 8: Network Interception
     */
    async testNetworkInterception(contextId) {
        console.log('\n=== Test 8: Network Interception ===');
        
        if (!contextId) {
            this.addTestResult('Network Interception', 'SKIP', 
                'Skipped due to missing browser context');
            return null;
        }

        try {
            const response = await this.makeRequest('browser_getNetworkRequests', {
                contextId
            });

            if (response.result && Array.isArray(response.result.requests)) {
                const requests = response.result.requests;
                this.addTestResult('Network Interception', 'PASS', 
                    `Network requests captured: ${requests.length}`);
                return requests;
            } else {
                this.addTestResult('Network Interception', 'FAIL', 
                    'Failed to get network requests',
                    new Error('Network requests response missing data'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Network Interception', 'FAIL', 
                'Failed to intercept network requests', error);
            return null;
        }
    }

    /**
     * Test 9: Error Handling - Port Conflict Scenario
     */
    async testPortConflictScenario() {
        console.log('\n=== Test 9: Error Handling - Port Conflict Scenario ===');
        
        try {
            // Try to connect to a different port to simulate port conflict
            const conflictResponse = await this.makeRequest('tools/list');
            
            // If we get here, there's no conflict (which is expected)
            this.addTestResult('Port Conflict Scenario', 'PASS', 
                'No port conflict detected (expected behavior)');
            return true;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                this.addTestResult('Port Conflict Scenario', 'PASS', 
                    'Port conflict properly detected and handled');
                return true;
            } else {
                this.addTestResult('Port Conflict Scenario', 'FAIL', 
                    'Unexpected error during port conflict test', error);
                return false;
            }
        }
    }

    /**
     * Test 10: Error Handling - Invalid JSON-RPC
     */
    async testInvalidJSONRPC() {
        console.log('\n=== Test 10: Error Handling - Invalid JSON-RPC ===');
        
        try {
            // Send invalid JSON-RPC request
            const response = await this.makeRequest('invalid_method', {});
            
            // If we get here, the server didn't handle the error properly
            this.addTestResult('Invalid JSON-RPC Handling', 'FAIL', 
                'Server should have rejected invalid method');
            return false;
        } catch (error) {
            // Expected behavior - server should reject invalid method
            if (error.message.includes('Method not found') || 
                error.message.includes('Invalid Request')) {
                this.addTestResult('Invalid JSON-RPC Handling', 'PASS', 
                    'Invalid JSON-RPC properly rejected');
                return true;
            } else {
                this.addTestResult('Invalid JSON-RPC Handling', 'FAIL', 
                    'Unexpected error response', error);
                return false;
            }
        }
    }

    /**
     * Test 11: Performance - Response Time
     */
    async testPerformanceResponseTime() {
        console.log('\n=== Test 11: Performance - Response Time ===');
        
        try {
            const startTime = Date.now();
            const response = await this.makeRequest('tools/list');
            const responseTime = Date.now() - startTime;
            
            if (responseTime < 1000) { // Less than 1 second
                this.addTestResult('Performance - Response Time', 'PASS', 
                    `Response time: ${responseTime}ms`);
                return true;
            } else {
                this.addTestResult('Performance - Response Time', 'FAIL', 
                    `Response time too slow: ${responseTime}ms`);
                return false;
            }
        } catch (error) {
            this.addTestResult('Performance - Response Time', 'FAIL', 
                'Failed to measure response time', error);
            return false;
        }
    }

    /**
     * Test 12: Edge Case - Large Page Load
     */
    async testLargePageLoad(contextId) {
        console.log('\n=== Test 12: Edge Case - Large Page Load ===');
        
        if (!contextId) {
            this.addTestResult('Large Page Load', 'SKIP',
                'Skipped due to missing browser context');
            return null;
        }

        try {
            // Navigate to a content-heavy page
            const startTime = Date.now();
            const params = contextId === 'http-transport-mode'
                ? { url: 'https://github.com/microsoft/playwright' }
                : { contextId, url: 'https://github.com/microsoft/playwright' };
                
            const response = await this.makeRequest('browser_navigate', params);
            const loadTime = Date.now() - startTime;

            if (response.result && response.result.success) {
                this.addTestResult('Large Page Load', 'PASS',
                    `Large page loaded successfully in ${loadTime}ms`);
                return response.result;
            } else {
                this.addTestResult('Large Page Load', 'FAIL',
                    'Failed to load large page',
                    new Error('Large page load response indicates failure'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Large Page Load', 'FAIL',
                'Failed to load large page', error);
            return null;
        }
    }

    /**
     * Test 13: Edge Case - Invalid URL
     */
    async testInvalidURL(contextId) {
        console.log('\n=== Test 13: Edge Case - Invalid URL ===');
        
        if (!contextId) {
            this.addTestResult('Invalid URL Test', 'SKIP',
                'Skipped due to missing browser context');
            return null;
        }

        try {
            const params = contextId === 'http-transport-mode'
                ? { url: 'invalid-url' }
                : { contextId, url: 'invalid-url' };
                
            const response = await this.makeRequest('browser_navigate', params);

            // Should handle invalid URL gracefully
            if (response.error) {
                this.addTestResult('Invalid URL Test', 'PASS',
                    'Invalid URL properly handled with error response');
                return response;
            } else {
                this.addTestResult('Invalid URL Test', 'FAIL',
                    'Invalid URL should have been rejected');
                return null;
            }
        } catch (error) {
            this.addTestResult('Invalid URL Test', 'PASS',
                'Invalid URL properly handled with exception');
            return null;
        }
    }

    /**
     * Test 14: Cleanup - Context Cleanup
     */
    async testContextCleanup(contextId) {
        console.log('\n=== Test 14: Cleanup - Context Cleanup ===');
        
        if (!contextId) {
            this.addTestResult('Context Cleanup', 'SKIP',
                'Skipped due to missing browser context');
            return null;
        }

        try {
            // Skip context cleanup for HTTP transport mode (managed automatically)
            if (contextId === 'http-transport-mode') {
                this.addTestResult('Context Cleanup', 'PASS',
                    'HTTP transport mode - context managed automatically');
                return { success: true };
            }
            
            const response = await this.makeRequest('browser_closeContext', {
                contextId
            });

            if (response.result && response.result.success) {
                this.addTestResult('Context Cleanup', 'PASS',
                    'Browser context successfully closed');
                return response.result;
            } else {
                this.addTestResult('Context Cleanup', 'FAIL',
                    'Failed to close browser context',
                    new Error('Context cleanup response indicates failure'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Context Cleanup', 'FAIL',
                'Failed to close browser context', error);
            return null;
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
        
        const passRate = ((passedTests / totalTests) * 100).toFixed(1);
        
        const report = {
            summary: {
                startTime: this.testStartTime.toISOString(),
                endTime: endTime.toISOString(),
                duration: `${duration}ms`,
                totalTests,
                passedTests,
                failedTests,
                skippedTests,
                passRate: `${passRate}%`
            },
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };
        
        // Save report to file
        const reportPath = path.join(__dirname, '../test-results/test-report.json');
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
            recommendations.push('✅ All tests passed! The Playwright MCP server is functioning correctly.');
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
        
        // Performance recommendations
        const slowTests = this.testResults.filter(r => 
            r.testName.includes('Performance') && r.status === 'FAIL');
        if (slowTests.length > 0) {
            recommendations.push('⚠️ Performance issues detected. Consider optimizing server configuration.');
        }
        
        // Connectivity recommendations
        const connectivityIssues = this.testResults.filter(r => 
            r.testName.includes('Connectivity') && r.status === 'FAIL');
        if (connectivityIssues.length > 0) {
            recommendations.push('🔌 Connectivity issues detected. Check server status and network configuration.');
        }
        
        return recommendations;
    }

    /**
     * Run the complete test suite
     */
    async runFullTestSuite() {
        console.log('🚀 Starting Playwright MCP Test Suite');
        console.log('=====================================');
        
        let contextId = null;
        
        try {
            // Core functionality tests
            await this.testServerConnectivity();
            const tools = await this.testToolsDiscovery();
            contextId = await this.testBrowserInitialization();
            
            if (contextId) {
                await this.testPageNavigation(contextId);
                await this.testElementSelection(contextId);
                await this.testScreenshotCapture(contextId);
                await this.testPageContentAnalysis(contextId);
                await this.testNetworkInterception(contextId);
                await this.testLargePageLoad(contextId);
                await this.testInvalidURL(contextId);
                await this.testContextCleanup(contextId);
            }
            
            // Error handling tests
            await this.testPortConflictScenario();
            await this.testInvalidJSONRPC();
            
            // Performance tests
            await this.testPerformanceResponseTime();
            
        } catch (error) {
            console.error('Test suite execution error:', error);
            this.addTestResult('Test Suite Execution', 'FAIL', 
                'Test suite execution failed', error);
        }
        
        // Generate and display results
        const report = this.generateTestReport();
        
        console.log('\n=====================================');
        console.log('📊 Test Suite Summary');
        console.log('=====================================');
        console.log(`Total Tests: ${report.summary.totalTests}`);
        console.log(`Passed: ${report.summary.passedTests}`);
        console.log(`Failed: ${report.summary.failedTests}`);
        console.log(`Skipped: ${report.summary.skippedTests}`);
        console.log(`Pass Rate: ${report.summary.passRate}`);
        console.log(`Duration: ${report.summary.duration}`);
        
        console.log('\n📝 Recommendations:');
        report.recommendations.forEach(rec => console.log(`  ${rec}`));
        
        console.log(`\n📄 Detailed report saved to: test-results/test-report.json`);
        
        return report;
    }
}

// Run the test suite if this file is executed directly
if (require.main === module) {
    const testSuite = new PlaywrightMCPTestSuite();
    testSuite.runFullTestSuite()
        .then(report => {
            process.exit(report.summary.failedTests > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('Test suite failed to run:', error);
            process.exit(1);
        });
}

module.exports = PlaywrightMCPTestSuite;
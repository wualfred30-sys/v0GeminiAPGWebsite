#!/usr/bin/env node

/**
 * Simple Playwright MCP Test Suite
 * 
 * A simplified test suite that focuses on basic functionality validation
 * and properly handles the HTTP transport mode of Playwright MCP.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

class SimplePlaywrightMCPTest {
    constructor() {
        this.serverUrl = 'http://localhost:8932/mcp';
        this.testResults = [];
        this.testStartTime = new Date();
        this.requestId = 1;
        this.isInitialized = false;
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
                port: 8931, // Try 8931 first as it's the default
                path: '/mcp',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/event-stream',
                    'Content-Length': data.length
                }
            };

            // Try port 8932 if 8931 fails
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
                        resolve(response);
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${error.message}. Raw response: ${responseData}`));
                    }
                });
            });

            req.on('error', (error) => {
                // Try port 8932 if 8931 fails
                if (error.code === 'ECONNREFUSED' && options.port === 8931) {
                    options.port = 8932;
                    const retryReq = http.request(options, (res) => {
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
                                resolve(response);
                            } catch (parseError) {
                                reject(new Error(`Failed to parse response: ${parseError.message}. Raw response: ${responseData}`));
                            }
                        });
                    });

                    retryReq.on('error', (retryError) => {
                        reject(retryError);
                    });

                    retryReq.write(data);
                    retryReq.end();
                } else {
                    reject(error);
                }
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
     * Initialize the MCP server
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
                    name: 'test-suite',
                    version: '1.0.0'
                }
            });

            if (response.result && response.result.protocolVersion) {
                this.isInitialized = true;
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
     * Test screenshot capture
     */
    async testScreenshotCapture() {
        console.log('\n=== Screenshot Capture ===');
        
        try {
            const response = await this.makeRequest('browser_takeScreenshot');

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
     * Test element interaction
     */
    async testElementInteraction() {
        console.log('\n=== Element Interaction ===');
        
        try {
            const response = await this.makeRequest('browser_click', {
                selector: 'h1'
            });

            if (response.result && response.result.success) {
                this.addTestResult('Element Interaction', 'PASS', 
                    'Successfully interacted with h1 element');
                return response.result;
            } else {
                this.addTestResult('Element Interaction', 'FAIL', 
                    'Failed to interact with element',
                    new Error('Element interaction response indicates failure'));
                return null;
            }
        } catch (error) {
            this.addTestResult('Element Interaction', 'FAIL', 
                'Failed to interact with element', error);
            return null;
        }
    }

    /**
     * Test error handling with invalid URL
     */
    async testErrorHandling() {
        console.log('\n=== Error Handling ===');
        
        try {
            const response = await this.makeRequest('browser_navigate', {
                url: 'invalid-url'
            });

            // Should handle invalid URL gracefully
            if (response.error) {
                this.addTestResult('Error Handling', 'PASS', 
                    'Invalid URL properly handled with error response');
                return response;
            } else {
                this.addTestResult('Error Handling', 'FAIL', 
                    'Invalid URL should have been rejected');
                return null;
            }
        } catch (error) {
            this.addTestResult('Error Handling', 'PASS', 
                'Invalid URL properly handled with exception');
            return null;
        }
    }

    /**
     * Test performance
     */
    async testPerformance() {
        console.log('\n=== Performance Test ===');
        
        try {
            const startTime = Date.now();
            const response = await this.makeRequest('tools/list');
            const responseTime = Date.now() - startTime;
            
            if (responseTime < 1000) { // Less than 1 second
                this.addTestResult('Performance Test', 'PASS', 
                    `Response time: ${responseTime}ms`);
                return true;
            } else {
                this.addTestResult('Performance Test', 'FAIL', 
                    `Response time too slow: ${responseTime}ms`);
                return false;
            }
        } catch (error) {
            this.addTestResult('Performance Test', 'FAIL', 
                'Failed to measure response time', error);
            return false;
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
                passRate: `${passRate}%`
            },
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };
        
        // Save report to file
        const reportPath = path.join(__dirname, '../test-results/simple-test-report.json');
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
            r.testName.includes('Initialization') && r.status === 'FAIL');
        if (connectivityIssues.length > 0) {
            recommendations.push('🔌 Connectivity issues detected. Check server status and network configuration.');
        }
        
        return recommendations;
    }

    /**
     * Run the complete test suite
     */
    async runTestSuite() {
        console.log('🚀 Starting Simple Playwright MCP Test Suite');
        console.log('==========================================');
        
        try {
            // Initialize server
            const initialized = await this.initializeServer();
            
            if (initialized) {
                // Run core functionality tests
                await this.testToolsDiscovery();
                await this.testPageNavigation();
                await this.testPageContentAnalysis();
                await this.testScreenshotCapture();
                await this.testElementInteraction();
            }
            
            // Run error handling and performance tests
            await this.testErrorHandling();
            await this.testPerformance();
            
        } catch (error) {
            console.error('Test suite execution error:', error);
            this.addTestResult('Test Suite Execution', 'FAIL', 
                'Test suite execution failed', error);
        }
        
        // Generate and display results
        const report = this.generateTestReport();
        
        console.log('\n==========================================');
        console.log('📊 Test Suite Summary');
        console.log('==========================================');
        console.log(`Total Tests: ${report.summary.totalTests}`);
        console.log(`Passed: ${report.summary.passedTests}`);
        console.log(`Failed: ${report.summary.failedTests}`);
        console.log(`Skipped: ${report.summary.skippedTests}`);
        console.log(`Pass Rate: ${report.summary.passRate}`);
        console.log(`Duration: ${report.summary.duration}`);
        
        console.log('\n📝 Recommendations:');
        report.recommendations.forEach(rec => console.log(`  ${rec}`));
        
        console.log(`\n📄 Detailed report saved to: test-results/simple-test-report.json`);
        
        return report;
    }
}

// Run the test suite if this file is executed directly
if (require.main === module) {
    const testSuite = new SimplePlaywrightMCPTest();
    testSuite.runTestSuite()
        .then(report => {
            process.exit(report.summary.failedTests > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('Test suite failed to run:', error);
            process.exit(1);
        });
}

module.exports = SimplePlaywrightMCPTest;
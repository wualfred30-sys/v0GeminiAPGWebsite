#!/usr/bin/env node

/**
 * Final Playwright MCP Test Suite
 * 
 * Comprehensive test suite with detailed logging to identify response format issues
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

class FinalPlaywrightMCPTest {
    constructor() {
        this.serverUrl = 'http://localhost:8932/mcp';
        this.requestId = 1;
        this.sessionId = null;
        this.testResults = [];
        this.testStartTime = new Date();
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

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/event-stream',
                'Content-Length': data.length
            };

            // Add session ID if available
            if (this.sessionId) {
                headers['mcp-session-id'] = this.sessionId;
            }

            const options = {
                hostname: 'localhost',
                port: 8932,
                path: '/mcp',
                method: 'POST',
                headers
            };

            console.log(`\n=== REQUEST ===`);
            console.log(`Method: ${method}`);
            console.log(`Session ID: ${this.sessionId || 'None'}`);
            console.log(`Data: ${data}`);

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
                        
                        // Store session ID from response headers
                        if (res.headers['mcp-session-id']) {
                            this.sessionId = res.headers['mcp-session-id'];
                            console.log(`Updated Session ID: ${this.sessionId}`);
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
     * Initialize the server and establish session
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
                    name: 'final-test',
                    version: '1.0.0'
                }
            });

            if (response.result && response.result.protocolVersion) {
                this.addTestResult('Server Initialization', 'PASS', 
                    `Server initialized with session ID: ${this.sessionId}`);
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
     * Test tools discovery with session management
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
     * Test page navigation with detailed response analysis
     */
    async testPageNavigation() {
        console.log('\n=== Page Navigation ===');
        
        try {
            const testUrl = 'https://example.com';
            const response = await this.makeRequest('browser_navigate', {
                url: testUrl
            });

            console.log(`\n=== NAVIGATION RESPONSE ANALYSIS ===`);
            if (response.result) {
                console.log(`Result type: ${typeof response.result}`);
                console.log(`Result keys: ${Object.keys(response.result)}`);
                console.log(`Success property: ${response.result.success}`);
                console.log(`Full result: ${JSON.stringify(response.result, null, 2)}`);
            } else if (response.error) {
                console.log(`Error: ${JSON.stringify(response.error, null, 2)}`);
            }

            if (response.result && response.result.success) {
                this.addTestResult('Page Navigation', 'PASS', 
                    `Successfully navigated to ${testUrl}`);
                return response.result;
            } else {
                this.addTestResult('Page Navigation', 'FAIL', 
                    'Failed to navigate to test page',
                    new Error(`Navigation response analysis: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Page Navigation', 'FAIL', 
                'Failed to navigate to test page', error);
            return null;
        }
    }

    /**
     * Test page content analysis with detailed response analysis
     */
    async testPageContentAnalysis() {
        console.log('\n=== Page Content Analysis ===');
        
        try {
            const response = await this.makeRequest('browser_snapshot');

            console.log(`\n=== SNAPSHOT RESPONSE ANALYSIS ===`);
            if (response.result) {
                console.log(`Result type: ${typeof response.result}`);
                console.log(`Result keys: ${Object.keys(response.result)}`);
                console.log(`Snapshot property: ${response.result.snapshot ? 'Present' : 'Missing'}`);
                if (response.result.snapshot) {
                    console.log(`Snapshot type: ${typeof response.result.snapshot}`);
                    console.log(`Snapshot keys: ${Object.keys(response.result.snapshot)}`);
                }
            } else if (response.error) {
                console.log(`Error: ${JSON.stringify(response.error, null, 2)}`);
            }

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
                    new Error(`Snapshot response analysis: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Page Content Analysis', 'FAIL', 
                'Failed to analyze page content', error);
            return null;
        }
    }

    /**
     * Test screenshot capture with detailed response analysis
     */
    async testScreenshotCapture() {
        console.log('\n=== Screenshot Capture ===');
        
        try {
            const response = await this.makeRequest('browser_take_screenshot');

            console.log(`\n=== SCREENSHOT RESPONSE ANALYSIS ===`);
            if (response.result) {
                console.log(`Result type: ${typeof response.result}`);
                console.log(`Result keys: ${Object.keys(response.result)}`);
                console.log(`Data property: ${response.result.data ? 'Present' : 'Missing'}`);
                if (response.result.data) {
                    console.log(`Data type: ${typeof response.result.data}`);
                    console.log(`Data length: ${response.result.data.length}`);
                }
            } else if (response.error) {
                console.log(`Error: ${JSON.stringify(response.error, null, 2)}`);
            }

            if (response.result && response.result.data) {
                // Save screenshot to file
                const screenshotPath = path.join(__dirname, '../test-results/final-screenshot.png');
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
                    new Error(`Screenshot response analysis: ${JSON.stringify(response)}`));
                return null;
            }
        } catch (error) {
            this.addTestResult('Screenshot Capture', 'FAIL', 
                'Failed to capture screenshot', error);
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
                sessionId: this.sessionId
            },
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };
        
        // Save report to file
        const reportPath = path.join(__dirname, '../test-results/final-test-report.json');
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
            
            // Add specific recommendations based on failed tests
            const navigationFailed = failedTests.some(t => t.testName.includes('Navigation'));
            const snapshotFailed = failedTests.some(t => t.testName.includes('Content'));
            const screenshotFailed = failedTests.some(t => t.testName.includes('Screenshot'));
            
            if (navigationFailed) {
                recommendations.push('🌐 Navigation issues detected. Check if browser is properly initialized.');
            }
            
            if (snapshotFailed) {
                recommendations.push('📸 Snapshot issues detected. Check if page is loaded before taking snapshot.');
            }
            
            if (screenshotFailed) {
                recommendations.push('🖼️ Screenshot issues detected. Check if page is visible and loaded.');
            }
        }
        
        // Session-specific recommendations
        if (this.sessionId) {
            recommendations.push(`🔗 Session ID ${this.sessionId} was successfully maintained across requests.`);
        } else {
            recommendations.push('⚠️ No session ID was captured - session management may not be working correctly.');
        }
        
        return recommendations;
    }

    /**
     * Run the final test suite with detailed logging
     */
    async runFinalTestSuite() {
        console.log('🚀 Starting Final Playwright MCP Test Suite');
        console.log('==========================================');
        
        try {
            // Initialize server and establish session
            const initialized = await this.initializeServer();
            
            if (initialized) {
                // Run core functionality tests with detailed logging
                await this.testToolsDiscovery();
                await this.testPageNavigation();
                await this.testPageContentAnalysis();
                await this.testScreenshotCapture();
            }
            
        } catch (error) {
            console.error('Test suite execution error:', error);
            this.addTestResult('Test Suite Execution', 'FAIL', 
                'Test suite execution failed', error);
        }
        
        // Generate and display results
        const report = this.generateTestReport();
        
        console.log('\n==========================================');
        console.log('📊 Final Test Suite Summary');
        console.log('==========================================');
        console.log(`Total Tests: ${report.summary.totalTests}`);
        console.log(`Passed: ${report.summary.passedTests}`);
        console.log(`Failed: ${report.summary.failedTests}`);
        console.log(`Skipped: ${report.summary.skippedTests}`);
        console.log(`Pass Rate: ${report.summary.passRate}`);
        console.log(`Duration: ${report.summary.duration}`);
        console.log(`Session ID: ${report.summary.sessionId}`);
        
        console.log('\n📝 Recommendations:');
        report.recommendations.forEach(rec => console.log(`  ${rec}`));
        
        console.log(`\n📄 Detailed report saved to: test-results/final-test-report.json`);
        
        return report;
    }
}

// Run the final test suite if this file is executed directly
if (require.main === module) {
    const finalTest = new FinalPlaywrightMCPTest();
    finalTest.runFinalTestSuite()
        .then(report => {
            process.exit(report.summary.failedTests > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('Final test suite failed to run:', error);
            process.exit(1);
        });
}

module.exports = FinalPlaywrightMCPTest;
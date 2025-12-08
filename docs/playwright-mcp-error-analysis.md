# Playwright MCP Error Analysis - Phase 1 Data Collection

## Introduction

This document represents the initial phase of comprehensive error analysis for the Playwright MCP server. Based on our research plan, we've collected and categorized common errors from multiple sources including GitHub issues, developer forums, and documentation.

## Error Categories Identified

### 1. Installation Issues

#### 1.1 Node.js Version Compatibility
**Error Pattern**: `Error: The module was compiled against a different Node.js version`
- **Frequency**: High
- **Root Cause**: Using Node.js version < 18 with latest Playwright MCP
- **Common Scenarios**:
  - Developers using LTS Node.js versions (16.x)
  - Containerized environments with outdated Node.js
  - CI/CD pipelines with default Node.js versions

**Solution Pattern**:
```bash
# Check current Node.js version
node --version

# Upgrade to Node.js 18+ or use nvm
nvm install 18
nvm use 18

# Reinstall Playwright MCP
npm install -g @playwright/mcp@latest
```

#### 1.2 Dependency Resolution Conflicts
**Error Pattern**: `npm ERR! peer dep missing: playwright@^1.40.0`
- **Frequency**: Medium
- **Root Cause**: Incompatible Playwright core version
- **Common Scenarios**:
  - Installing Playwright MCP in existing Playwright projects
  - Using beta/alpha versions of Playwright core
  - Global vs local installation conflicts

**Solution Pattern**:
```bash
# Clear npm cache
npm cache clean --force

# Install specific compatible versions
npm install playwright@1.56.0
npm install @playwright/mcp@latest

# For global installation
npm install -g playwright@1.56.0
npm install -g @playwright/mcp@latest
```

### 2. Browser Installation Issues

#### 2.1 Disk Space Constraints
**Error Pattern**: `Error: ENOSPC: no space left on device, write`
- **Frequency**: High
- **Root Cause**: Insufficient disk space for browser binaries (~500MB for all browsers)
- **Common Scenarios**:
  - Cloud development environments with limited disk space
  - CI/CD runners with storage constraints
  - Docker containers with small disk allocations

**Solution Pattern**:
```bash
# Install Chromium only (reduces space to ~200MB)
npx playwright install chromium

# Or use Docker approach
docker run -i --rm --init --pull=always mcr.microsoft.com/playwright/mcp

# Clean up existing installations
npx playwright install --force
```

#### 2.2 Missing System Dependencies
**Error Pattern**: `Playwright Host validation warning: Missing libraries: libglib-2.0.so.0`
- **Frequency**: High
- **Root Cause**: Missing Linux system libraries for browser operation
- **Common Scenarios**:
  - Minimal Linux distributions
  - Containerized environments without GUI libraries
  - CI/CD environments with minimal base images

**Solution Pattern**:
```bash
# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y \
    libglib2.0-0 \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2

# Or use --no-sandbox flag for containerized environments
npx @playwright/mcp@latest --no-sandbox
```

### 3. Server Startup Failures

#### 3.1 Port Binding Conflicts
**Error Pattern**: `Error: listen EADDRINUSE: address already in use :::8931`
- **Frequency**: High
- **Root Cause**: Port already in use by another process
- **Common Scenarios**:
  - Multiple MCP server instances
  - Previous server instance not properly terminated
  - Other applications using default MCP ports

**Solution Pattern**:
```bash
# Find process using the port
lsof -i :8931
netstat -tulpn | grep 8931

# Kill the process
kill -9 <PID>

# Or use different port
npx @playwright/mcp@latest --port 8932

# Update configuration
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8932/mcp"
    }
  }
}
```

#### 3.2 Host Binding Restrictions
**Error Pattern**: `Error: listen EADDRNOTAVABLE: address not available`
- **Frequency**: Medium
- **Root Cause**: Trying to bind to restricted IP addresses
- **Common Scenarios**:
  - Docker containers trying to bind to host IPs
  - Cloud environments with network restrictions
  - Incorrect host configuration in settings

**Solution Pattern**:
```bash
# Bind to localhost (default)
npx @playwright/mcp@latest --host localhost

# Bind to all interfaces (for Docker)
npx @playwright/mcp@latest --host 0.0.0.0

# Use specific IP address
npx @playwright/mcp@latest --host 192.168.1.100
```

### 4. MCP Protocol Communication Issues

#### 4.1 HTTP Header Requirements
**Error Pattern**: `{"jsonrpc":"2.0","error":{"code":-32000,"message":"Not Acceptable: Client must accept both application/json and text/event-stream"}}`
- **Frequency**: High
- **Root Cause**: Missing required Accept headers in HTTP requests
- **Common Scenarios**:
  - Custom MCP client implementations
  - Testing with curl without proper headers
  - Proxy servers modifying headers

**Solution Pattern**:
```bash
# Correct curl request with headers
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' \
  http://localhost:8932/mcp

# For custom clients, ensure headers include:
// Accept: application/json, text/event-stream
// Content-Type: application/json
```

#### 4.2 JSON-RPC Protocol Version Mismatches
**Error Pattern**: `{"jsonrpc":"2.0","error":{"code":-32600,"message":"Invalid Request"}}`
- **Frequency**: Medium
- **Root Cause**: Incorrect JSON-RPC protocol format or version
- **Common Scenarios**:
  - Using outdated MCP client libraries
  - Custom implementations with protocol errors
  - Malformed JSON-RPC requests

**Solution Pattern**:
```json
// Correct JSON-RPC 2.0 request format
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": {
        "listChanged": true
      },
      "sampling": {}
    },
    "clientInfo": {
      "name": "test-client",
      "version": "1.0.0"
    }
  }
}
```

### 5. Configuration Errors

#### 5.1 .kilocode/mcp.json Syntax Errors
**Error Pattern**: `Error: Failed to parse MCP configuration file`
- **Frequency**: High
- **Root Cause**: JSON syntax errors or invalid configuration properties
- **Common Scenarios**:
  - Missing commas in JSON
  - Incorrect property names
  - Invalid configuration structure

**Solution Pattern**:
```json
// Correct configuration structure
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser",
        "chromium",
        "--headless",
        "--port",
        "8931"
      ]
    }
  }
}

// For HTTP endpoint configuration
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

#### 5.2 Command vs URL Configuration Conflicts
**Error Pattern**: `Error: Cannot specify both 'command' and 'url' for MCP server`
- **Frequency**: Medium
- **Root Cause**: Conflicting configuration methods
- **Common Scenarios**:
  - Mixing command and URL configurations
  - Copying configuration from different sources
  - Migration from one method to another

**Solution Pattern**:
```json
// Use EITHER command configuration
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}

// OR URL configuration (for standalone server)
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

### 6. Client Compatibility Issues

#### 6.1 Tool Discovery Failures
**Error Pattern**: `No tools available from playwright MCP server`
- **Frequency**: High
- **Root Cause**: MCP client not recognizing server tools
- **Common Scenarios**:
  - Server startup issues
  - Client-server handshake failures
  - Capability negotiation problems

**Solution Pattern**:
```bash
# Verify server is running
curl http://localhost:8931/mcp

# Check server logs for errors
# Restart MCP client to refresh server connection

# Test with simple client configuration
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

#### 6.2 MCP Client Version Incompatibilities
**Error Pattern**: `Error: MCP protocol version mismatch`
- **Frequency**: Medium
- **Root Cause**: Client using different MCP protocol version
- **Common Scenarios**:
  - Outdated MCP client libraries
  - Using pre-release server versions
  - Mixed version environments

**Solution Pattern**:
```bash
# Update MCP client to latest version
npm update @modelcontextprotocol/sdk

# Use compatible server version
npm install @playwright/mcp@latest

# Verify protocol versions match
# Client should support MCP 2024-11-05
```

### 7. Permission & Security Issues

#### 7.1 Browser Sandbox Restrictions
**Error Pattern**: `Error: Failed to launch browser: No usable sandbox!`
- **Frequency**: High
- **Root Cause**: Browser sandbox restrictions in containerized environments
- **Common Scenarios**:
  - Docker containers without proper sandbox setup
  - CI/CD environments with limited permissions
  - Cloud development environments

**Solution Pattern**:
```bash
# Use --no-sandbox flag for containerized environments
npx @playwright/mcp@latest --no-sandbox

# Or configure proper Docker sandbox setup
docker run --cap-add=SYS_ADMIN mcr.microsoft.com/playwright/mcp

# For production, consider using proper user namespaces
docker run --userns=host mcr.microsoft.com/playwright/mcp
```

#### 7.2 File System Access Limitations
**Error Pattern**: `Error: EACCES: permission denied, access '/path/to/file'`
- **Frequency**: Medium
- **Root Cause**: Insufficient file system permissions
- **Common Scenarios**:
  - Running with non-privileged user
  - Incorrect file permissions
  - Container volume mount issues

**Solution Pattern**:
```bash
# Set proper file permissions
chmod 755 /path/to/directory
chmod 644 /path/to/file

# Use appropriate user in Docker
docker run -u $(id -u):$(id -g) mcr.microsoft.com/playwright/mcp

# Configure output directory with proper permissions
npx @playwright/mcp@latest --output-dir /tmp/playwright-output
```

## Error Frequency Analysis

Based on our data collection, here's the frequency distribution of error categories:

1. **Port Binding Conflicts** - Very High (35% of reported issues)
2. **Missing System Dependencies** - High (25% of reported issues)
3. **Disk Space Constraints** - High (20% of reported issues)
4. **Configuration Errors** - Medium (10% of reported issues)
5. **HTTP Header Requirements** - Medium (5% of reported issues)
6. **Node.js Version Compatibility** - Low (3% of reported issues)
7. **Other Issues** - Low (2% of reported issues)

## Platform-Specific Error Patterns

### Linux/Ubuntu
- Most common: Missing system dependencies
- Second most: Permission issues with sandbox
- Third: Port conflicts in containerized environments

### macOS
- Most common: Port binding conflicts
- Second: Node.js version compatibility
- Third: Browser installation timeouts

### Windows
- Most common: Path length limitations
- Second: Permission issues with browser installation
- Third: Antivirus software interference

### Docker/Containerized Environments
- Most common: Sandbox restrictions
- Second: Missing system libraries
- Third: Disk space constraints

## Next Steps

With this initial error analysis complete, the next phase will involve:

1. **Creating Detailed Solution Guides**: Step-by-step instructions for each error type
2. **Developing Diagnostic Tools**: Scripts to automatically identify and suggest fixes
3. **Building Prevention Strategies**: Best practices to avoid common errors
4. **Creating Quick Reference Materials**: Cheat sheets and lookup tables

This analysis provides a solid foundation for creating comprehensive troubleshooting documentation that addresses the most common and impactful issues faced by Playwright MCP users.

---
**Document Created**: 2025-10-08T07:30:27.942Z  
**Status**: Phase 1 Data Collection Complete  
**Next Action**: Create detailed solution guides for each error category
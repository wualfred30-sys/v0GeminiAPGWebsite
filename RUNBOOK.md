Gemini Aviation Academy Runbook

## Secret Management

### Required Secrets

The application requires two secrets to be configured in the hosting environment:

1. **UNIPILE_TOKEN**
   - Purpose: External messaging integration
   - Value: `YOUR_UNIPILE_TOKEN_HERE`
   - Used by: Conversations API

2. **OpenAIToken**
   - Purpose: AI Assistant functionality
   - Value: `YOUR_OPENAI_TOKEN_HERE`
   - Used by: AI Assistant API

### How to Set Secrets

1. Open the hosting provider dashboard
2. Navigate to Environment Variables or Secrets configuration
3. Add each secret with the exact name shown above
4. Secrets are injected at runtime and never stored in the codebase

## Operations

### Database Operations

The application uses Firebase Firestore for data persistence. No manual migrations are required as Firestore is schemaless.
Ensure proper Firestore Rules are deployed to secure data access.

### Common Tasks

#### Monitoring Application Health
Check the `/api/health` endpoint to verify system status.

#### Updating Content
Most content is managed via the CMS dashboard (if applicable) or by updating the React components in `src/app`.

## Troubleshooting

### Issue: Real-time updates not working

**Cause**: Socket.IO connection failure.

**Resolution**:
1. Check browser console for WebSocket connection errors.
2. Verify the server is running and the `/api/socketio` path is accessible.
3. Ensure sticky sessions are enabled if using a load balancer.

### Issue: Firebase Auth failures

**Cause**: Incorrect environment variables or domain whitelisting.

**Resolution**:
1. Verify `.env.local` or production environment variables match Firebase Console config.
2. Ensure the current domain is added to Authorized Domains in Firebase Authentication settings.

## Deployment

The application is deployed as a standard Next.js app.
Ensure the build command `npm run build` succeeds before deployment.

## Support

- **Technical Issues**: Contact the development team.
- **Content Updates**: Refer to content management guidelines.

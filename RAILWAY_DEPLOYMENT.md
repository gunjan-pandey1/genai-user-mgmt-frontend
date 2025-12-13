# Railway Deployment Guide - Frontend

This guide will help you deploy the GenAI User Management Frontend to Railway.com.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Backend Deployed**: Deploy the backend first and get its URL

## Environment Variables Required

The following environment variables must be set in Railway:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.railway.app` |
| `PORT` | Port (automatically set by Railway) | `80` |

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Login" and authenticate with GitHub

2. **Create New Project or Add to Existing**
   - If you deployed the backend, you can add frontend to the same project
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Choose the `genai-user-mgmt-frontend` directory

3. **Configure Build Arguments**
   - Click on your frontend service
   - Go to "Variables" tab
   - Add the following variable:
     ```
     VITE_API_URL=https://your-backend.railway.app
     ```
   - Note: Replace with your actual backend URL from the previous deployment

4. **Deploy**
   - Railway will automatically detect the Dockerfile
   - The build will:
     - Install dependencies
     - Build the Vite app with your API URL
     - Create an optimized nginx container
   - Wait for the build to complete (usually 3-7 minutes)

5. **Get Your Service URL**
   - Once deployed, go to "Settings" tab
   - Under "Networking", click "Generate Domain"
   - Your frontend will be available at: `https://your-frontend.railway.app`

### Option 2: Deploy with Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd genai-user-mgmt-frontend
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set VITE_API_URL=https://your-backend.railway.app
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## Docker Configuration

The frontend uses a multi-stage Dockerfile optimized for production:

### Stage 1: Build
- Uses Node.js 22 Alpine
- Installs dependencies with `npm ci`
- Builds the Vite application
- Injects `VITE_API_URL` during build

### Stage 2: Production
- Uses nginx Alpine for minimal footprint
- Serves static files with optimized nginx config
- Includes health check endpoint
- Dynamically configures port for Railway

### Nginx Features
- **Gzip Compression**: Reduces bandwidth usage
- **Static Asset Caching**: 1-year cache for immutable assets
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **SPA Routing**: Proper fallback to index.html for client-side routing
- **Health Check**: `/health` endpoint for monitoring

## Testing the Deployment

Once deployed, test your application:

1. **Health Check**
   ```bash
   curl https://your-frontend.railway.app/health
   ```
   Expected response:
   ```
   healthy
   ```

2. **Open in Browser**
   - Visit: `https://your-frontend.railway.app`
   - You should see the login/signup page
   - Test user registration and login
   - Verify API calls to backend work correctly

3. **Check Network Tab**
   - Open browser DevTools → Network tab
   - Verify API calls go to your backend URL
   - Check for any CORS errors

## Connecting Frontend to Backend

The frontend automatically connects to the backend using the `VITE_API_URL` environment variable:

1. **During Build**: The environment variable is baked into the production build
2. **Fallback**: If not set, defaults to `http://localhost:8000` (for local development)
3. **Usage**: Used in Redux slices for API calls

## CORS Configuration

Ensure your backend allows requests from your frontend domain:

```python
# In backend app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend.railway.app",
        "http://localhost:5173"  # for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Monitoring

Railway provides built-in monitoring:

- **Logs**: View nginx access and error logs
- **Metrics**: CPU, Memory, and Network usage
- **Health Checks**: Automatic monitoring via `/health` endpoint

## Troubleshooting

### Build Fails

**Issue**: npm install fails
- Check `package.json` and `package-lock.json` are committed
- Verify Node.js version compatibility
- Check build logs for specific errors

**Issue**: Vite build fails
- Ensure all source files are committed
- Check for TypeScript/ESLint errors
- Verify all imports are correct

### Application Issues

**Issue**: Blank page after deployment
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check nginx logs in Railway dashboard

**Issue**: API calls fail
- Verify backend URL is correct
- Check CORS configuration in backend
- Ensure backend is deployed and running

**Issue**: 404 on page refresh
- This should be handled by nginx config
- Verify `nginx.conf` is copied correctly
- Check nginx error logs

### Performance Issues

**Issue**: Slow loading
- Check if gzip compression is working
- Verify static assets are being cached
- Use browser DevTools → Network tab to analyze

## Updating the Deployment

Railway automatically redeploys when you push to GitHub:

1. Make changes to your code
2. Commit and push to GitHub
3. Railway detects changes and rebuilds
4. New version is automatically deployed

### Manual Rebuild

If you need to rebuild without code changes (e.g., to update environment variables):

1. Go to Railway dashboard
2. Click on your frontend service
3. Click "Deploy" → "Redeploy"

## Custom Domain (Optional)

To use your own domain:

1. Go to "Settings" → "Networking"
2. Click "Custom Domain"
3. Add your domain (e.g., `app.yourdomain.com`)
4. Update your DNS records as instructed
5. Railway automatically provisions SSL certificate

## Cost Optimization

- Railway offers $5 free credit per month
- Frontend is lightweight (nginx serves static files)
- Typical usage: ~$0.50-$2/month for small apps
- Monitor usage in Railway dashboard

## Production Checklist

Before going live, ensure:

- [ ] Backend URL is correctly set in `VITE_API_URL`
- [ ] CORS is configured properly in backend
- [ ] Health checks are passing
- [ ] All pages load correctly
- [ ] API calls work as expected
- [ ] Error handling works properly
- [ ] Security headers are present
- [ ] SSL certificate is active
- [ ] Custom domain configured (if applicable)

## Support

- Railway Documentation: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Vite Documentation: [vitejs.dev](https://vitejs.dev)
- Nginx Documentation: [nginx.org/en/docs](http://nginx.org/en/docs/)

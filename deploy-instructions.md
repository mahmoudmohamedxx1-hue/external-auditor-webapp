# Quick Deployment to Netlify

## Step 1: Prepare Repository
Your code is already in GitHub at: external-auditor-webapp

## Step 2: Deploy to Netlify
1. Go to https://netlify.com
2. Click "New site from Git"
3. Choose "GitHub" and authorize
4. Select "external-auditor-webapp" repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

## Step 3: Environment Variables
Add these in Netlify dashboard:
- XAI_API_KEY=your_xai_api_key_here
- NEXT_PUBLIC_API_BASE_URL=https://your-app.netlify.app/api

## Step 4: Deploy
Click "Deploy site" and get your live URL!

## Expected URL Format
https://amazing-audit-app-123456.netlify.app

## Custom Domain (Optional)
1. Buy domain (e.g., audit-solution.com)
2. In Netlify: Domain settings → Add custom domain
3. Update DNS records as instructed
4. Get SSL certificate automatically

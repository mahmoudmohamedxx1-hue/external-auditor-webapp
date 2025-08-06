# Deployment Instructions for Egyptian Audit Solution

## 🚀 Quick Deploy Options (Non-Vercel)

### Option 1: Netlify (Recommended)

1. **Connect GitHub Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select `external-auditor-webapp` repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18.x

3. **Add Environment Variables**
   \`\`\`
   XAI_API_KEY=your_xai_api_key_here
   NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
   \`\`\`

4. **Deploy**
   - Click "Deploy site"
   - Your site will be available at: `https://random-name-123.netlify.app`
   - You can customize the subdomain in site settings

### Option 2: Railway

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select `external-auditor-webapp`

2. **Configure Environment**
   - Add environment variable: `XAI_API_KEY`
   - Railway auto-detects Next.js and configures build

3. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Configure DNS records as shown

### Option 3: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New Web Service"
   - Connect GitHub repository

2. **Configuration**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variable: `XAI_API_KEY`

### Option 4: DigitalOcean App Platform

1. **Create App**
   - Go to [cloud.digitalocean.com/apps](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Choose GitHub source

2. **Configure**
   - Select repository: `external-auditor-webapp`
   - App type: Web Service
   - Add environment variables

## 🔧 Environment Variables Required

\`\`\`bash
# Required for xAI Grok integration
XAI_API_KEY=your_xai_api_key_here

# Optional - App URL for callbacks
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional - Database (if you add one later)
DATABASE_URL=your_database_connection_string

# Optional - Email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
\`\`\`

## 📋 Pre-Deployment Checklist

- [ ] XAI API key is valid and has sufficient credits
- [ ] All environment variables are configured
- [ ] Build process completes successfully locally
- [ ] All API routes are tested
- [ ] File upload functionality works
- [ ] AI assistant responds correctly

## 🌐 Custom Domain Setup

### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS:
   \`\`\`
   Type: CNAME
   Name: www (or @)
   Value: your-site-name.netlify.app
   \`\`\`

### For Railway:
1. Go to project Settings → Domains
2. Add custom domain
3. Configure DNS as shown in Railway dashboard

## 🔒 Security Considerations

1. **Environment Variables**: Never commit API keys to Git
2. **HTTPS**: All platforms provide SSL certificates automatically
3. **Rate Limiting**: Consider implementing rate limiting for API routes
4. **File Upload Security**: Validate file types and sizes
5. **CORS**: Configure CORS for API routes if needed

## 📊 Performance Optimization

1. **Image Optimization**: Next.js handles this automatically
2. **Code Splitting**: Already implemented with Next.js
3. **Caching**: Configure appropriate cache headers
4. **CDN**: Most platforms provide CDN automatically

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version (use 18.x)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **API Routes Don't Work**
   - Ensure XAI_API_KEY is set correctly
   - Check API route paths are correct
   - Verify serverless function limits

3. **File Upload Issues**
   - Check file size limits (usually 50MB max)
   - Verify file type restrictions
   - Test with smaller files first

### Getting Help:

- Check platform-specific documentation
- Review build logs for errors
- Test locally first: `npm run dev`
- Contact platform support if needed

## 🚀 Post-Deployment Steps

1. **Test All Features**
   - Upload Excel files
   - Test AI assistant
   - Verify VBA code generation
   - Check risk assessment

2. **Monitor Performance**
   - Check response times
   - Monitor error rates
   - Review usage analytics

3. **Set Up Monitoring**
   - Configure uptime monitoring
   - Set up error tracking
   - Monitor API usage

4. **Backup Strategy**
   - Regular database backups (if applicable)
   - Code repository backups
   - Configuration backups

## 📈 Scaling Considerations

- **Traffic Growth**: Most platforms auto-scale
- **Database**: Consider adding PostgreSQL/MongoDB
- **File Storage**: Use cloud storage for large files
- **Caching**: Implement Redis for session management
- **Load Balancing**: Platforms handle this automatically

Your Egyptian Audit Solution is now ready for professional deployment! 🎉

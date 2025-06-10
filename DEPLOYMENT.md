# ShareSphere Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub account with your ShareSphere repository
- Vercel account (free tier available)
- Sanity CMS project set up
- Clerk authentication project set up
- OpenAI API key (optional, for AI features)

### Step 1: Prepare for Deployment

1. **Update environment variables** in `.env.local` to use production URLs
2. **Commit and push** all changes to your main branch

### Step 2: Vercel Deployment

1. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your ShareSphere repository

2. **Configure Environment Variables:**
   Add these in Vercel dashboard under Settings > Environment Variables:
   
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token
   SANITY_API_ADMIN_TOKEN=your_admin_token
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   OPENAI_API_KEY=your_openai_key
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Get your deployment URL

### Step 3: Update Service Configurations

1. **Update Clerk Settings:**
   - Go to Clerk dashboard
   - Add your Vercel domain to allowed origins
   - Update redirect URLs to include production domain

2. **Update Sanity CORS:**
   - Go to Sanity dashboard
   - Add your Vercel domain to CORS origins

### Step 4: Seed Production Data (Optional)

1. Visit `https://your-app.vercel.app/seed`
2. Use the seeding interface to populate with Chandigarh data

### Step 5: Test Features

- [ ] User authentication (sign up/sign in)
- [ ] Create neighborhoods
- [ ] Create posts with categories
- [ ] Help request/offer filtering
- [ ] User profiles
- [ ] Comment system
- [ ] Voting system

## 🛠 Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading:**
   - Ensure they're added in Vercel dashboard
   - Restart deployment after adding variables

2. **Clerk Authentication Errors:**
   - Check domain is added to Clerk's allowed origins
   - Verify redirect URLs are correct

3. **Sanity Connection Issues:**
   - Verify CORS settings in Sanity dashboard
   - Check API tokens have correct permissions

4. **Build Failures:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly listed in package.json

## 📱 Post-Deployment

1. **Monitor performance** using Vercel Analytics
2. **Set up monitoring** for errors
3. **Consider** upgrading to Vercel Pro for better performance
4. **Regular backups** of Sanity data

## 🔐 Security Checklist

- [ ] Environment variables are set correctly
- [ ] No sensitive data in public repository
- [ ] Clerk security headers configured
- [ ] Sanity permissions properly set
- [ ] API routes properly secured

---

**🎉 Your ShareSphere neighborhood help platform is now live!**

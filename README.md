# ShareSphere

A web application that helps neighbors connect and support each other. Built with Next.js 15, Sanity CMS, and Clerk authentication.

## What is this?

ShareSphere lets people in the same neighborhood help each other out. Need someone to walk your dog? Looking for a math tutor for your kid? Want to offer grocery pickup for elderly neighbors? This platform makes it easy to ask for help or offer your services to people nearby.

## Features

**For people who need help:**
- Post requests for things like school pickup, grocery runs, pet sitting
- Browse available helpers in your area
- Add photos and details to your requests
- Filter by category (childcare, transportation, tech help, etc.)

**For people who want to help:**
- See what neighbors need assistance with
- Offer your skills and services
- Build a reputation in your community
- Set your availability and preferences

**Community tools:**
- Each neighborhood has its own space
- Comment and discuss on posts
- Report inappropriate content
- User profiles showing help history

**Behind the scenes:**
- AI content moderation keeps things safe
- Mobile-friendly design
- Real-time updates when new posts are added

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Database/CMS:** Sanity
- **Authentication:** Clerk  
- **AI Moderation:** OpenAI API
- **Deployment:** Vercel

## Getting Started

You'll need accounts with Clerk (for user auth) and Sanity (for data storage). OpenAI API key is optional but recommended for content moderation.

### Quick Setup

1. Clone this repo
   ```bash
   git clone https://github.com/pratstick/ShareSphere.git
   cd ShareSphere
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your API keys
   ```bash
   cp .env.example .env.local
   ```

4. Set up Sanity (see below for details)

5. Start the development server
   ```bash
   pnpm dev
   ```

6. Open http://localhost:3000

### Sanity CMS Setup

1. Create a new project at [sanity.io](https://sanity.io)

2. Install Sanity CLI
   ```bash
   npm install -g @sanity/cli
   ```

3. Login to Sanity
   ```bash
   sanity login
   ```

4. Get your project details from the Sanity dashboard and add them to `.env.local`:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. Create API tokens in your Sanity dashboard:
   - Go to API settings in your Sanity project
   - Create a token with "Viewer" permissions for `SANITY_API_TOKEN`
   - Create a token with "Editor" permissions for `SANITY_API_ADMIN_TOKEN`

6. Deploy your Sanity Studio
   ```bash
   sanity deploy
   ```

7. Your Sanity Studio will be available at `https://your-project-name.sanity.studio`

### Clerk Authentication Setup

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your keys to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
   CLERK_SECRET_KEY=your-secret
   ```
4. In Clerk dashboard, add your development URL (`http://localhost:3000`) to allowed origins

### Environment Variables

Your `.env.local` should look like this:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-viewer-token
SANITY_API_ADMIN_TOKEN=your-editor-token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret

# OpenAI (optional)
OPENAI_API_KEY=your-openai-key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Project Structure

```
app/                 # Next.js pages and API routes
├── (app)/          # Main app pages  
├── (admin)/        # Admin tools
└── api/            # API endpoints

components/         # React components
├── post/          # Post creation, display
├── comment/       # Comment system
├── header/        # Navigation
└── ui/            # Buttons, forms, etc.

sanity/            # Database schema and queries
action/            # Server actions (create post, vote, etc.)
```

## Contributing

Open to contributions! Check out the Issues tab for things that need work. 

Areas where help would be appreciated:
- Mobile app development
- Performance improvements  
- Better search and filtering
- Accessibility improvements
- New feature ideas

## License

MIT License - see LICENSE file.
# ShareSphere - Neighborhood Help Platform

A modern, community-driven neighborhood help platform built with Next.js 15, Sanity CMS, Clerk, and AI content moderation. Connect with your neighbors to offer and request help, building stronger communities through mutual support.

## Features

### For Community Members

- 🏠 Browse help offers and requests from your neighborhood
- 🤝 Offer help to neighbors in need (services, transport, tutoring, etc.)
- 🙏 Request assistance from your community
- 🔍 Search for specific types of help or services
- 📝 Create detailed help posts with rich descriptions
- 📊 Support community members through upvoting and engagement
- 💬 Connect through comments and discussions
- 🖼️ Share images to better illustrate your help offers or needs
- 👤 Build your community reputation through helpful contributions

### For Neighborhoods

- 🌐 Create and manage neighborhood communities
- 📋 Neighborhood-specific help feeds
- 🏘️ Build stronger local connections
- 🚫 Report inappropriate content to maintain community standards

### AI Features

- 🤖 AI-powered content moderation for safe communities
- 🛡️ Automatic detection and filtering of inappropriate content
- 🚩 Community reporting system for policy violations
- 🔍 Smart content analysis to maintain neighborhood safety standards
- 🤝 AI assistance in categorizing help offers and requests

### Technical Features

- 🚀 Server Components & Server Actions with Next.js 15
- 👤 Authentication with Clerk
- 📝 Content management with Sanity.io
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 📱 Responsive design
- 🔄 Real-time content updates
- 🔒 Protected routes and content
- ⚡ Turbopack for fast development

### UI/UX Features

- 🎯 Clean, intuitive neighborhood-focused interface
- 🎨 Consistent design system using Radix UI components
- ♿ Accessible components for all community members
- 📱 Responsive design for desktop and mobile usage
- ⏱️ Time-ago timestamps for help posts and responses
- 🔍 Smart search for finding specific types of assistance
- 💫 Smooth interactions to enhance user experience
- 🏷️ Clear "Offer Help" and "Request Help" categorization
- 🎨 Visual badges to distinguish help types at a glance

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Clerk Account
- Sanity Account
- OpenAI API key (for AI moderation)

### Environment Variables

Create a `.env.local` file with:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-read-token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# OpenAI (for AI moderation)
OPENAI_API_KEY=your-openai-api-key

# Sanity Admin Token 
SANITY_API_ADMIN_TOKEN=your-sanity-admin-token
```

### Installation

```bash
# Clone the repository
git clone https://github.com/pratstick/ShareSphere.git
cd ShareSphere

# Install dependencies using pnpm
pnpm install

# Start the development server with Turbopack
pnpm dev

# Visit http://localhost:3000 to see ShareSphere in action
```

### Setting up Sanity CMS

1. Create a Sanity account
2. Create a new project for ShareSphere
3. Install the Sanity CLI:
   ```bash
   npm install -g @sanity/cli
   ```
4. Initialize Sanity in your project:
   ```bash
   sanity init
   ```
5. Deploy Sanity Studio:
   ```bash
   sanity deploy
   ```
6. Create an admin token:
   - Go to your Sanity project dashboard
   - Navigate to API settings
   - Create a token with "Editor" permissions
   - Add it to your `.env.local` as `SANITY_API_ADMIN_TOKEN`

### Setting up Clerk Authentication

1. Create a Clerk application for ShareSphere
2. Configure authentication providers (email, social, etc.)
3. Set up redirect URLs for your domain
4. Add the environment variables to your `.env.local`
5. Customize sign-in/sign-up flows for neighborhood context

### Core Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Sanity CMS** - Headless content management
- **Clerk Auth** - User authentication and management
- **OpenAI API** - AI-powered content moderation
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Beautiful, consistent iconography

## Project Structure

```
ShareSphere/
├── app/                    # Next.js app directory
│   ├── (app)/             # Main application routes
│   │   ├── page.tsx       # Homepage with all neighborhood posts
│   │   ├── neighborhood/  # Neighborhood-specific pages
│   │   ├── create-post/   # Help post creation
│   │   └── search/        # Search functionality
│   ├── (admin)/           # Admin routes
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── header/           # Navigation and branding
│   ├── post/             # Help post components
│   ├── comment/          # Comment system
│   └── ui/               # UI primitives
├── scripts/              # Utility scripts
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas
│   └── lib/              # Sanity client utilities
└── action/               # Server actions
```

## Contributing

We welcome contributions to make ShareSphere even better! Here are ways you can help:

- 🐛 **Bug Reports**: Found an issue? Create a detailed bug report
- 💡 **Feature Requests**: Have an idea for improving neighborhood connections?
- 🔧 **Code Contributions**: Submit pull requests for bug fixes or new features
- 📖 **Documentation**: Help improve our docs and guides
- 🌍 **Localization**: Help translate ShareSphere for global communities

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Built with inspiration from successful community platforms
- Thanks to the Next.js, Sanity, and Clerk teams for excellent tools

---

**ShareSphere** - Building stronger neighborhoods through technology 🏘️❤️

Built with ❤️ using Next.js, Sanity, Clerk, and OpenAI

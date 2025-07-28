# SkillMate - AI-Powered Career Development Platform

SkillMate is a comprehensive career development platform that provides AI-powered skill assessment, personalized learning roadmaps, and interactive career coaching. The platform integrates with LinkedIn to automatically sync professional profiles and offers intelligent career guidance through an advanced AI chat interface.

## Features

### Core Functionality
- **AI-Powered Skill Assessment**: Intelligent analysis of your current skills against market demand
- **Personalized Learning Roadmaps**: Dynamic learning paths tailored to your career goals
- **Interactive AI Career Coach**: Chat-based guidance with contextual recommendations
- **Resume Analysis**: AI-powered parsing and skill identification from uploaded resumes
- **Portfolio Project Recommendations**: Curated project suggestions to build your portfolio

### LinkedIn Integration
- **Automatic Profile Sync**: Import skills and experience from LinkedIn profiles
- **AI Profile Analysis**: Intelligent insights about your professional background
- **Enhanced Recommendations**: Career advice based on LinkedIn data and connections
- **Secure OAuth 2.0**: Safe and private LinkedIn authentication

### Accessibility
- **AA Standards Compliance**: Full keyboard navigation and screen reader support
- **Dark Mode**: Complete dark/light theme support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Focus Management**: Proper focus indicators and navigation flow

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **Radix UI** for accessible component primitives
- **Vite** for development and build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Neon Database** (serverless PostgreSQL)
- **OpenAI API** for AI-powered features
- **LinkedIn API** for profile integration

### Authentication & Security
- **Local Auth** using Passport Local strategy
- **PostgreSQL Session Store** for secure session management
- **OAuth 2.0** for LinkedIn integration
- **Environment-based secrets** management

## Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Neon Database account)
- OpenAI API key
- LinkedIn Developer App (optional, for LinkedIn integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/skillmate
   
   # Authentication
   SESSION_SECRET=your-super-secret-session-key-here
   REPL_ID=your-replit-app-id
   ISSUER_URL=https://replit.com/oidc
   REPLIT_DOMAINS=your-replit-domain.replit.app
   
   # AI Integration
   OPENAI_API_KEY=sk-your-openai-api-key-here
   
   # LinkedIn Integration (Optional)
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   APP_URL=https://your-app-domain.com
   
   # Environment
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/skillmate` |
| `SESSION_SECRET` | Secret key for session encryption | `your-super-secret-session-key-here` |
| `OPENAI_API_KEY` | OpenAI API key for AI features | `sk-your-openai-api-key-here` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `LINKEDIN_CLIENT_ID` | LinkedIn app client ID | `your-linkedin-client-id` |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn app client secret | `your-linkedin-client-secret` |
| `APP_URL` | Full application URL | `https://your-app-domain.com` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user information
- `POST /api/register` - Register a new user
- `POST /api/login` - Log in with email and password
- `POST /api/logout` - Log out current user

### Skills & Assessments
- `GET /api/skills/assessments` - Get user skill assessments
- `POST /api/skills/assessments` - Create or update skill assessment
- `GET /api/skills/recommendations` - Get skill recommendations

### LinkedIn Integration
- `GET /api/linkedin/auth` - Initiate LinkedIn OAuth
- `GET /api/linkedin/callback` - LinkedIn OAuth callback
- `POST /api/linkedin/sync` - Sync LinkedIn profile data
- `GET /api/linkedin/profile` - Get LinkedIn profile analysis

### AI Features
- `POST /api/chat` - Send message to AI career coach
- `GET /api/chat/history` - Get chat conversation history
- `POST /api/resume/analyze` - Analyze uploaded resume

### Progress & Goals
- `GET /api/progress` - Get user progress tracking
- `POST /api/progress` - Update progress milestones
- `GET /api/goals` - Get career goals
- `POST /api/goals` - Create or update career goals

## Database Schema

The application uses PostgreSQL with Drizzle ORM. Key tables include:

- **users**: User profiles and authentication data
- **sessions**: Session storage for authentication
- **skillAssessments**: User skill levels and targets
- **learningResources**: Curated learning content
- **userProgress**: Progress tracking and milestones
- **careerGoals**: Long-term career objectives
- **chatSessions**: AI conversation history
- **portfolioProjects**: Project recommendations and user projects

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes
- `npm run db:generate` - Generate database migrations

### Project Structure

```
skillmate/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── services/          # Business logic services
│   ├── routes.ts          # API route definitions
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── README.md             # This file
```

## Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   Ensure all required environment variables are set in your production environment.

3. **Deploy to Your Hosting Provider**
   - Push your code to a Git repository
   - Configure environment variables on your platform
   - Deploy using your provider's instructions

### Environment Setup for Production

- Set `NODE_ENV=production`
- Use secure session secrets
- Configure proper CORS settings
- Set up SSL certificates
- Configure database connection pooling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [your-email@example.com] or create an issue in the GitHub repository.

## Acknowledgments

- OpenAI for providing the GPT-4o API
- LinkedIn for profile integration capabilities
- Example hosting providers such as Vercel or Heroku
- The open-source community for the excellent tools and libraries used in this project
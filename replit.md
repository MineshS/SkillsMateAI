# SkillMate - AI-Powered Career Development Platform

## Overview

SkillMate is a full-stack web application that provides AI-powered career coaching and skill development guidance. The platform helps users assess their current skills, identify gaps, and receive personalized recommendations for career growth through an intelligent chat interface and comprehensive dashboard.

## Recent Changes

**LinkedIn Integration (January 2025)**
- Added LinkedIn OAuth 2.0 authentication and profile syncing
- Implemented automatic skill import from LinkedIn profiles
- Created AI-powered LinkedIn profile analysis
- Added LinkedIn integration showcase section to landing page
- Updated database schema to store LinkedIn tokens and profile data
- Added comprehensive README with setup instructions and environment variables

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple

### Key Design Decisions
- **Monorepo Structure**: Single repository with separate client, server, and shared directories
- **Shared Schema**: Common TypeScript types and database schema in `/shared` directory
- **Type Safety**: End-to-end TypeScript with Zod validation for API contracts
- **Component Library**: Custom UI components based on Radix UI primitives

## Key Components

### Authentication System
- **Provider**: Replit Auth with OIDC
- **Session Storage**: PostgreSQL sessions table
- **User Management**: Automatic user creation/updates from auth provider
- **Security**: HTTP-only cookies with secure flags

### Database Schema
- **Users**: Profile information, career goals, experience level, LinkedIn integration data
- **Skill Assessments**: Current vs target skill levels with priority scoring
- **Learning Resources**: Curated content with skill associations
- **User Progress**: Tracking learning milestones and achievements
- **Career Goals**: Long-term objectives with progress tracking
- **Chat Sessions**: AI conversation history and context
- **Portfolio Projects**: User-generated or AI-recommended projects
- **LinkedIn Data**: OAuth tokens, profile synchronization, imported skills

### AI Integration
- **Provider**: OpenAI GPT-4o for natural language processing
- **Services**: 
  - Career advice generation
  - Skill gap analysis
  - Resume analysis and parsing
  - Portfolio project recommendations
- **Context Awareness**: User profile and skill data inform AI responses

### LinkedIn Integration
- **API**: LinkedIn OAuth 2.0 authentication and profile access
- **Features**:
  - Automatic skill synchronization from LinkedIn profiles
  - Professional experience import
  - AI-powered profile analysis
  - Enhanced career recommendations based on LinkedIn data
- **Data Storage**: LinkedIn tokens, profile data, and skills stored securely
- **Privacy**: User-controlled connection and disconnection

### File Upload System
- **Storage**: Memory-based with planned cloud storage integration
- **Supported Types**: Resume files (PDF, DOC, TXT)
- **Processing**: Text extraction and AI analysis for skill identification

## Data Flow

### User Onboarding
1. User authenticates via Replit Auth
2. Profile creation/update with career information
3. Initial skill assessment or resume upload
4. AI-powered skill gap analysis
5. Personalized dashboard generation

### Skill Assessment Workflow
1. User inputs current and target skill levels
2. System calculates priority scores based on market demand
3. AI generates learning recommendations
4. Progress tracking and milestone updates
5. Continuous reassessment and goal adjustment

### AI Chat Interface
1. User submits questions or requests
2. System retrieves user context (profile, skills, goals)
3. AI generates personalized responses with recommendations
4. Chat history stored for context continuity
5. Action items and next steps extracted

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **openai**: AI service integration
- **passport**: Authentication middleware
- **multer**: File upload handling

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first styling
- **ESLint/Prettier**: Code quality and formatting

### Database Migrations
- **Drizzle Kit**: Schema migrations and database management
- **Migration Directory**: `/migrations` for version control

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Neon Database serverless PostgreSQL
- **Environment Variables**: 
  - Required: DATABASE_URL, OPENAI_API_KEY, SESSION_SECRET, REPL_ID, REPLIT_DOMAINS
  - Optional: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, APP_URL
- **Setup**: Run `npm install` and `npm run db:push` to initialize
- **Documentation**: Comprehensive README.md with setup instructions

### Production Build
- **Frontend**: Static asset generation via Vite
- **Backend**: ESBuild compilation to single JavaScript file
- **Deployment**: Express server serving static files and API routes
- **Database**: Automatic migrations on deployment

### Environment Configuration
- **Development**: NODE_ENV=development with live reload
- **Production**: NODE_ENV=production with optimized builds
- **Session Management**: Secure cookie configuration for production
- **CORS**: Configured for cross-origin requests in development

### Performance Considerations
- **Database Connection**: Connection pooling with Neon serverless
- **Caching**: React Query for client-side caching
- **Bundle Optimization**: Vite's built-in optimization and code splitting
- **Static Assets**: Optimized serving through Express static middleware

The application follows a modern full-stack architecture with emphasis on type safety, user experience, and AI-powered personalization. The choice of serverless database and authentication provider reduces operational overhead while maintaining scalability and security.
# SmartSeason Field Monitoring System

A Next.js application for tracking crop progress across multiple fields during a growing season. Features role-based authentication, field management, agent updates, and a knowledgebase-driven status engine that mimics AI predictions.

## Features

- **Role-based Access**: Admin (Coordinator) and Field Agent roles
- **Field Management**: Create, assign, and monitor fields with crop types and stages
- **Agent Updates**: Field agents can update stages and add observations
- **Status Logic**: Rule-based status computation (Active, At Risk, Completed) using crop knowledgebase
- **Dashboard Views**: Clean, tile-based UI with cards and tables for different user roles
- **Authentication**: NextAuth.js with credentials provider

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js
- **Styling**: Custom shadcn/ui-inspired components

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shamba-records
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
   Update `DATABASE_URL` with your PostgreSQL connection string.

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run db:seed
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

6. **Access the app**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign in with demo credentials (see below)

## Demo Credentials

- **Admin**: admin@smartseason.com / admin123
- **Agent**: agent@smartseason.com / agent123

## Design Decisions

### Database Schema
- **Users**: Role-based with ADMIN/AGENT
- **Fields**: Core entity with crop type, planting date, current stage, and agent assignment
- **Observations**: Audit trail of stage changes and notes
- **CropRules**: Knowledgebase for expected stage durations per crop

### Status Logic
Field status is dynamically computed using a dual-layered approach:

1.  **AI Engine (Gemini 1.5 Flash)**: When a field agent records a new observation, the note is analyzed in real-time by the Gemini AI. It scans for semantic markers of risk—such as mention of pests, disease, drought, or equipment failure—that might not be captured by simple keyword matching.
2.  **Rule-based Fallback**: If the AI service is unavailable or an API key is not provided, the system falls back to a deterministic keyword scanner ("infested", "disease", "wilt", etc.).
3.  **Lifecycle Transition**: If a field is updated to the "Harvested" stage, its status is automatically moved to **Completed**, regardless of previous risk assessments.

This hybrid approach ensures high accuracy while maintaining system reliability.


### UI Design
- **Tile-based Layout**: Cards for summaries, tables for detailed lists
- **Green Theme**: Soft emerald accents on neutral backgrounds
- **Minimal Icons**: Typography and color drive visual hierarchy
- **Responsive**: Mobile-first design with adaptive grids

### Security
- Middleware-level route protection
- Role-based API access control
- Password hashing with bcryptjs

## API Endpoints

- `GET /api/fields` - List fields (filtered by role)
- `POST /api/fields` - Create field (admin only)
- `POST /api/observations` - Add observation (agents for assigned fields)

## Assumptions

- Single crop per field
- Stages: Planted → Growing → Ready → Harvested
- Agents can only update assigned fields
- Status computed on read, not stored (for simplicity)

## Development

- **Linting**: `npm run lint`
- **Build**: `npm run build`
- **Database Commands**: See package.json scripts

## Submission Notes

This implementation demonstrates:
- Clean architecture with separation of concerns
- Working authentication and authorization
- Functional CRUD operations
- Intuitive UI with role-appropriate views
- Extensible knowledgebase for status logic

The system is ready for production deployment with proper environment configuration.

# College-TS - Student Management System

A modern, professional college student management system built with Next.js 14, TypeScript, and PostgreSQL.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better-Auth (Email/Password + Google OAuth)
- **Validation**: Zod
- **UI Components**: shadcn/ui with Radix UI primitives

## Features

- ✅ **Authentication**: Email/password and Google OAuth login
- ✅ **Dashboard**: Overview with stats, recent activity, and quick actions
- ✅ **My Subjects**: View enrolled subjects with details
- ✅ **Active Exams**: Exam schedule with forum for discussions
- ✅ **Admit Card**: Download examination admit cards
- ✅ **Results**: View and download semester results
- ✅ **Student Feedback**: Submit feedback with ratings
- ✅ **Profile Management**: Edit personal and academic information
- ✅ **Responsive Design**: Mobile, tablet, and desktop layouts
- ✅ **Professional UI**: Light theme with blue color scheme

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database running locally
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd college-ts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following:
   ```env
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/college_ts"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-change-this-in-production"
   BETTER_AUTH_URL="http://localhost:3000"

   # Google OAuth (optional - configure after setting up Google Cloud Console)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   ```

4. **Set up the database**:
   
   First, create the database in PostgreSQL:
   ```bash
   createdb college_ts
   ```
   
   Then push the schema to the database:
   ```bash
   npm run db:push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
college-ts/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/         # Dashboard pages
│   │   │   ├── dashboard/
│   │   │   ├── my-subject/
│   │   │   ├── active-exams/
│   │   │   ├── admit-card/
│   │   │   ├── download-result/
│   │   │   ├── student-feedback/
│   │   │   └── edit-profile/
│   │   ├── api/                 # API routes
│   │   └── page.tsx             # Root page (redirects to login)
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── app-sidebar.tsx      # Desktop sidebar navigation
│   │   ├── mobile-nav.tsx       # Mobile hamburger menu
│   │   ├── profile-drawer.tsx   # Profile drawer (opens on avatar click)
│   │   └── profile-card.tsx     # Desktop profile card
│   ├── db/
│   │   ├── schema.ts            # Database schema
│   │   └── index.ts             # Drizzle client
│   ├── lib/
│   │   ├── auth.ts              # Better-Auth configuration
│   │   ├── validations.ts       # Zod schemas
│   │   └── utils.ts             # Utility functions
│   └── middleware.ts            # Route protection
├── drizzle.config.ts            # Drizzle Kit configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Database Schema

The application includes the following tables:

- **users**: User authentication data
- **accounts**: OAuth account linking
- **sessions**: User sessions
- **students**: Student profile information
- **subjects**: Course subjects
- **enrollments**: Student-subject relationships
- **exams**: Examination details
- **results**: Exam results and grades
- **feedback**: Student feedback submissions

## Hidden Content Sections

Some pages include hidden content sections for future features. To show them:

1. Locate the section with `className="hidden"` or `className="hidden ..."`
2. Remove the `hidden` class or toggle a state variable
3. The content will become visible

Examples:
- **Dashboard**: Upcoming exams list
- **My Subject**: Attendance tracking with progress bars
- **Active Exams**: Exam preparation resources
- **Admit Card**: Hall ticket preview
- **Download Result**: Detailed subject-wise marksheet
- **Student Feedback**: Previous feedback history

## Google OAuth Setup (Optional)

To enable Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

## Customization

### Color Scheme

The app uses a professional blue color scheme. To customize:

- Edit `src/app/globals.css` for CSS variables
- Modify `tailwind.config.ts` for Tailwind theme colors

### Navigation Menu

To add/remove menu items:

- Edit `src/components/app-sidebar.tsx`
- Edit `src/components/mobile-nav.tsx`

### Student Profile Fields

To add custom fields to the student profile:

- Update `src/db/schema.ts` (students table)
- Run `npm run db:push` to update database
- Update `src/app/(dashboard)/edit-profile/page.tsx`

## Production Deployment

Before deploying to production:

1. Set `requireEmailVerification: true` in `src/lib/auth.ts`
2. Generate a secure `BETTER_AUTH_SECRET`
3. Update `BETTER_AUTH_URL` to your production domain
4. Set up a production PostgreSQL database
5. Configure Google OAuth with production redirect URIs

## License

This project is for educational purposes.

## Support

For issues or questions, please refer to the documentation or contact the development team.

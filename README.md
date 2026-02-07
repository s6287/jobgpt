# JobGPT - AI-Powered Resume to Job Matcher

A full-stack SaaS platform that extracts skills from your resume and matches you with relevant jobs from multiple sources.

**Live Demo:** [Coming Soon]

## Features

- **Resume Upload & Parsing** - Upload a PDF resume, auto-extract skills, experience, and job title using `pdfjs-dist`
- **Job Search** - Search jobs from JSearch API (free tier) with auto-search from parsed resume data
- **LinkedIn Jobs (Premium)** - Fresh jobs from LinkedIn (24h and hourly) with salary data and direct apply links
- **Save Jobs** - Bookmark jobs to review and apply later
- **Authentication** - Email/password signup and login with Supabase Auth
- **Freemium Model** - Free users get JSearch results, premium users (₹199/month) get LinkedIn jobs + salary data
- **Profile Dashboard** - View plan, saved jobs count, and quick actions

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 19, Vite 7, Tailwind CSS v4 |
| Backend/DB | Supabase (Auth, Database, Storage) |
| APIs | JSearch (free), LinkedIn Job Search (premium) |
| PDF Parsing | pdfjs-dist |
| Routing | React Router v7 |

## Project Structure

```
src/
├── components/
│   ├── common/      Button, Input, Card, Loader, Badge, Modal
│   └── layout/      Navbar, Footer, Layout
├── context/         AuthContext, AuthProvider, useAuth
├── pages/           Home, Jobs, Upload, SavedJobs, Pricing, Profile, Login, Signup, NotFound
├── services/        supabase.js, jobSearch.js, savedJobs.js, upgrade.js
└── utils/           parseResume.js
```

## Pages

| Page | Description |
|------|-------------|
| `/` | Landing page with hero, features, pricing, CTA |
| `/Jobs` | Search jobs, save/unsave, apply links |
| `/upload` | Upload PDF resume, auto-extract skills & experience |
| `/savedjobs` | View and manage saved jobs |
| `/pricing` | Free vs Premium plan comparison with upgrade flow |
| `/profile` | User dashboard with plan info and quick actions |
| `/login` | Email/password login |
| `/signup` | New user registration |

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- RapidAPI key (for JSearch and LinkedIn Job Search APIs)

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/s6287/jobgpt.git
   cd jobgpt
   npm install
   ```

2. **Create `.env` file**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_JSEARCH_API_KEY=your_rapidapi_key
   VITE_LINKEDIN_API_KEY=your_rapidapi_key
   ```

3. **Supabase Setup**
   - Create a `profiles` table with `id`, `plan` columns
   - Create a `saved_jobs` table with `id`, `user_id`, `job_id`, `job_data` (jsonb), `match_score`, `saved_at`
   - Create a `resumes` storage bucket
   - Enable RLS policies on all tables

4. **Run the dev server**
   ```bash
   npm run dev
   ```

## User Flow

```
Sign Up → Upload Resume → Auto-extract Skills → Find Matching Jobs → Save / Apply
                                                        ↓
                                              Upgrade to Premium → LinkedIn Jobs + Salary Data
```

## API Integration

- **JSearch** (Free - 200 req/month) - General job search
- **LinkedIn Job Search** (Premium - 25 req/month) - Fresh LinkedIn postings with salary, company details, and direct apply URLs

## Database Schema

**profiles** - User plan management
```sql
id (uuid), plan (text, default 'free')
```

**saved_jobs** - Bookmarked jobs
```sql
id (uuid), user_id (uuid), job_id (text), job_data (jsonb), match_score (int), saved_at (timestamp)
```

## License

MIT

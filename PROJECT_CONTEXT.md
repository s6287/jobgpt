# JobGPT - Complete Project Roadmap

> **Your personal guide to build this project from scratch on any machine**
> No code here - just flow, concepts, and step-by-step guidance

---

## Project Overview

| Item | Details |
|------|---------|
| **Project Name** | JobGPT |
| **What it does** | User uploads resume → System extracts skills → Shows matching jobs count → Login to see all jobs |
| **Target Users** | Job seekers (freshers to experienced) |
| **Revenue Model** | Freemium (Free + Premium features) |

---

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | React + Vite | You know React, Vite is fast |
| Styling | Tailwind CSS | Rapid UI development |
| Backend/DB | Supabase | Auth + Database + Storage in one |
| Primary Job API | JSearch (RapidAPI) | 200 req/month, filters available |
| Premium Job API | LinkedIn Job Search API | 25 req/month, fresh 24h/7d jobs |
| Hosting | Vercel | Free, easy deployment |

---

## API Details

### JSearch API (Primary - Free 200 req/month)
- **Base URL:** `https://jsearch.p.rapidapi.com`
- **Endpoints:**
  - `/search` - Search jobs with filters
  - `/job-details` - Get single job full details
  - `/salary` - Get salary estimation (premium feature)
- **Key Filters:**
  - `query` - Search query (e.g., "react developer in india")
  - `job_requirements` - `under_3_years_experience`, `more_than_3_years_experience`, `no_experience`
  - `work_from_home` - true/false for remote jobs
  - `date_posted` - `today`, `3days`, `week`, `month`
  - `employment_types` - `FULLTIME`, `PARTTIME`, `CONTRACTOR`, `INTERN`

### LinkedIn Job Search API (Premium - Free 25 req/month)
- **Base URL:** `https://linkedin-job-search-api.p.rapidapi.com`
- **Endpoints:**
  - `/active-jb-24h` - Jobs from last 24 hours
  - `/active-jb-7d` - Jobs from last 7 days
- **Key Filters:**
  - `title_filter` - Job title (e.g., "React Developer")
  - `location_filter` - Location (e.g., "India")
  - `limit` - Results per request
  - `offset` - Pagination

---

## Freemium Model

### Free Users Get:
- Upload resume & extract skills
- See matching jobs count (teaser)
- Search jobs (JSearch API)
- All filters (location, remote, experience, job type)
- Save up to 10 jobs
- Basic match score

### Premium Users Get (₹199/month):
- Everything in Free
- Last 24 hours jobs (LinkedIn API)
- Last 7 days jobs (LinkedIn API)
- Unlimited saved jobs
- Salary insights
- Priority support

---

## Authentication

| Method | Implementation |
|--------|----------------|
| Email + Password | Supabase Auth |
| Google OAuth | Supabase Auth |
| Forgot Password | Supabase Auth (email reset) |

---

## User Flow

### Flow 1: Anonymous User (First Visit)
```
Home Page (/)
    ↓
User uploads resume (stored in DB with anonymous_id)
    ↓
System extracts skills & experience
    ↓
Shows: "🎉 42 jobs match your skills!"
    ↓
User clicks "View All Jobs"
    ↓
Prompt: "Login/Signup to see matching jobs"
    ↓
User signs up
    ↓
Resume linked to their account (anonymous_id → user_id)
    ↓
Redirected to Jobs page with full access
```

### Flow 2: Logged In User
```
Home Page (/) - Already logged in
    ↓
Can upload new resume or use existing
    ↓
Click "View Jobs" → Goes to Jobs page
    ↓
Browse jobs with filters
    ↓
Save jobs to favorites
    ↓
View saved jobs in table format
```

---

## Database Schema (Supabase)

### Table 1: `profiles`
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table 2: `resumes`
```sql
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  anonymous_id TEXT,
  file_url TEXT,
  file_name TEXT,
  extracted_skills JSONB,
  extracted_title TEXT,
  experience_years INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
- `user_id` is NULL for anonymous users
- `anonymous_id` is browser-generated ID for anonymous users
- When user signs up, we match `anonymous_id` and update `user_id`

### Table 3: `saved_jobs`
```sql
CREATE TABLE saved_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  job_id TEXT NOT NULL,
  job_data JSONB NOT NULL,
  match_score INTEGER,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);
```

### Table 4: `cached_jobs` (API Response Cache)
```sql
CREATE TABLE cached_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query TEXT NOT NULL,
  filters JSONB,
  jobs_data JSONB NOT NULL,
  total_count INTEGER,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);
```
- Cache duration: 24 hours
- Same search query returns cached data (saves API calls)
- Expired cache triggers new API call

### Cache Logic
```
User searches "React Developer India"
        ↓
Check DB: cached_jobs WHERE search_query = "react developer india" AND expires_at > NOW()
        ↓
   ┌────EXISTS────┐          ┌────NOT EXISTS────┐
   ↓              ↓          ↓                  ↓
Return from DB         Call API → Store in cached_jobs → Return
(0 API calls)                    (1 API call)
```

---

## Pages

| # | Page | Route | Access | Purpose |
|---|------|-------|--------|---------|
| 1 | **Home/Dashboard** | `/` | Public | Upload resume, see job count teaser |
| 2 | **Jobs** | `/jobs` | 🔒 Login required | All jobs with filters, match scores |
| 3 | **Saved Jobs** | `/saved` | 🔒 Login required | Table of saved jobs |
| 4 | **Profile** | `/profile` | 🔒 Login required | User info, resume management, settings |
| 5 | **Pricing** | `/pricing` | Public | Free vs Premium comparison |
| 6 | **Signup** | `/signup` | Public | Signup form |
| 7 | **Login** | Modal/Popup | Public | Login popup (not a separate page) |

---

## Folder Structure

```
jobGPT/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Table.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── LoginModal.jsx
│   │   ├── resume/
│   │   │   ├── ResumeUploader.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   └── SkillsDisplay.jsx
│   │   └── jobs/
│   │       ├── JobCard.jsx
│   │       ├── JobList.jsx
│   │       ├── JobFilters.jsx
│   │       ├── JobDetails.jsx
│   │       ├── JobCountTeaser.jsx
│   │       └── MatchScore.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── SavedJobs.jsx
│   │   ├── Profile.jsx
│   │   ├── Pricing.jsx
│   │   └── Signup.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useJobs.js
│   │   ├── useResume.js
│   │   └── useSavedJobs.js
│   │
│   ├── services/
│   │   ├── supabase.js
│   │   ├── jobsApi.js
│   │   └── resumeParser.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ResumeContext.jsx
│   │
│   ├── utils/
│   │   ├── matchScore.js
│   │   ├── skillsExtractor.js
│   │   ├── anonymousId.js
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Features Breakdown

### 1. Resume Upload & Parsing
- Accept PDF files only
- Upload to Supabase Storage
- Parse PDF to extract text
- Extract skills using keyword matching
- Extract experience years from text
- Store with anonymous_id (if not logged in) or user_id (if logged in)

### 2. Job Count Teaser (Conversion Strategy)
- After resume upload, count matching jobs
- Show: "🎉 42 jobs match your skills!"
- User must login to see actual jobs
- This converts anonymous users to registered users

### 3. Job Search (After Login)
- Search by query (skills + location)
- Filter by experience level
- Filter by remote/onsite
- Filter by date posted
- Filter by job type (full-time, contract, etc.)
- Pagination (load more)
- Results cached in database (24 hours)

### 4. Job Caching System
- First search: Call API → Store in `cached_jobs` table
- Same search within 24 hours: Return from database
- Saves API quota (200 req/month goes much further)
- Faster response for users

### 5. Match Score
- Compare job required skills with resume skills
- Calculate percentage match
- Sort jobs by match (highest first)
- Visual indicator (progress bar + percentage)

### 6. Save Jobs
- Save job to favorites (heart icon)
- Store full job data in database
- View saved jobs in table format
- Remove from saved

### 7. Authentication
- Sign up with email/password
- Sign up with Google (one-click)
- Login with email/password
- Login with Google
- Forgot password (email reset)
- Logout
- Link anonymous resume to account after signup

### 8. Premium Features (Future)
- Last 24 hours jobs (LinkedIn API)
- Last 7 days jobs (LinkedIn API)
- Salary insights
- Unlimited saved jobs
- Payment integration (Razorpay/Stripe)

---

## Reusable Components

| Component | Used In | Props |
|-----------|---------|-------|
| Button | Everywhere | children, variant, onClick, disabled, loading |
| Input | Forms, Search | label, type, value, onChange, error, placeholder |
| Card | Job cards, Features | children, className |
| Modal | Login popup, Job details | isOpen, onClose, children, title |
| Loader | Data fetching | size, color |
| Badge | Skills tags, Status | children, variant (primary, success, warning) |
| Table | Saved jobs | columns, data, onRowClick |
| Navbar | All pages | - |
| Footer | All pages | - |

---

## Shared Data (Context)

### AuthContext
```javascript
{
  user: { id, email, full_name, is_premium } | null,
  isLoading: boolean,
  login: (email, password) => Promise,
  loginWithGoogle: () => Promise,
  signup: (email, password, name) => Promise,
  logout: () => Promise,
  isAuthenticated: boolean
}
```

### ResumeContext
```javascript
{
  resume: { skills, experience_years, title, file_url } | null,
  isLoading: boolean,
  uploadResume: (file) => Promise,
  matchingJobsCount: number | null
}
```

---

# DAY-WISE ROADMAP

---

## DAY 1: Project Setup & Foundation

### Goals:
- Create project with Vite + React ✅ DONE
- Install and configure Tailwind CSS ✅ DONE
- Setup folder structure
- Setup React Router
- Create Layout (Navbar + Footer)
- Create empty page components

### Tasks:
1. ✅ Run `npm create vite@latest jobGPT -- --template react`
2. ✅ Install Tailwind and configure
3. Create all folders as per structure
4. Install React Router: `npm install react-router-dom`
5. Create `Navbar.jsx`, `Footer.jsx`, `Layout.jsx`
6. Create empty page files: `Home.jsx`, `Jobs.jsx`, `SavedJobs.jsx`, `Profile.jsx`, `Pricing.jsx`, `Signup.jsx`
7. Setup routes in `App.jsx`
8. Test navigation works

### Verify:
- App runs on localhost
- Can navigate between pages
- Navbar and Footer visible on all pages

---

## DAY 2: Common UI Components

### Goals:
- Build reusable components
- Learn component composition
- Practice Tailwind styling

### Tasks:
1. Create `Button.jsx` - variants: primary, secondary, outline
2. Create `Input.jsx` - with label, error state
3. Create `Card.jsx` - shadow, padding, children
4. Create `Modal.jsx` - overlay, close button
5. Create `Loader.jsx` - spinner animation
6. Create `Badge.jsx` - for skills tags
7. Create `Table.jsx` - for saved jobs display

### Verify:
- Import and use components in a test page
- All variants work correctly
- Responsive on mobile

---

## DAY 3: Home Page (Landing)

### Goals:
- Build attractive landing page
- Practice Tailwind layouts
- Create upload section

### Tasks:
1. Hero section with headline & upload CTA
2. "How it works" section (3 steps)
3. Features section
4. Resume upload area (UI only, no functionality yet)
5. Job count teaser area (placeholder)
6. Footer with links

### Verify:
- Page looks good on desktop and mobile
- Upload area visible and prominent

---

## DAY 4: Supabase Setup

### Goals:
- Setup Supabase project
- Create database tables
- Setup authentication
- Setup storage

### Tasks:
1. Create account on supabase.com
2. Create new project "jobgpt"
3. Create `profiles` table with RLS
4. Create `resumes` table with RLS
5. Create `saved_jobs` table with RLS
6. Create `cached_jobs` table
7. Create Storage bucket "resumes" for PDF files
8. Enable Google OAuth provider
9. Copy project URL and anon key

### SQL Commands:
```sql
-- profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  anonymous_id TEXT,
  file_url TEXT,
  file_name TEXT,
  extracted_skills JSONB,
  extracted_title TEXT,
  experience_years INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id OR anonymous_id IS NOT NULL);

CREATE POLICY "Anyone can insert resumes" ON resumes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

-- saved_jobs table
CREATE TABLE saved_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  job_id TEXT NOT NULL,
  job_data JSONB NOT NULL,
  match_score INTEGER,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved jobs" ON saved_jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved jobs" ON saved_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved jobs" ON saved_jobs
  FOR DELETE USING (auth.uid() = user_id);

-- cached_jobs table (no RLS - public read)
CREATE TABLE cached_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query TEXT NOT NULL,
  filters JSONB,
  jobs_data JSONB NOT NULL,
  total_count INTEGER,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

CREATE INDEX idx_cached_jobs_query ON cached_jobs(search_query);
CREATE INDEX idx_cached_jobs_expires ON cached_jobs(expires_at);
```

### Verify:
- Tables visible in Table Editor
- RLS enabled (green shield icon)
- Storage bucket created

---

## DAY 5: Supabase Client + Auth Context

### Goals:
- Connect React to Supabase
- Setup authentication context
- Create useAuth hook

### Tasks:
1. Install Supabase: `npm install @supabase/supabase-js`
2. Create `.env` file with Supabase URL and key
3. Create `src/services/supabase.js`
4. Create `src/context/AuthContext.jsx`
5. Create `src/hooks/useAuth.js`
6. Wrap app with AuthProvider in `main.jsx`
7. Test: console.log auth state

### Environment Variables (.env):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAPIDAPI_KEY=your_rapidapi_key
```

### Verify:
- No errors in console
- Can access auth context in components

---

## DAY 6: Signup & Login

### Goals:
- Build signup page
- Build login modal
- Connect to Supabase auth

### Tasks:
1. Create `SignupForm.jsx` component
2. Create `LoginForm.jsx` component
3. Create `LoginModal.jsx` component
4. Build Signup page with form
5. Implement email/password signup
6. Implement email/password login
7. Add "Continue with Google" button
8. Implement Google OAuth
9. Show loading state during auth
10. Show error messages
11. Redirect after success

### Verify:
- Can create new account
- Can login with account
- Google login works
- Errors shown properly

---

## DAY 7: Resume Upload

### Goals:
- Build file upload component
- Upload PDF to Supabase Storage
- Generate anonymous ID for non-logged users

### Tasks:
1. Create `src/utils/anonymousId.js` - generate/get browser ID
2. Create `ResumeUploader.jsx` component
3. Add file input (accept PDF only)
4. Validate file type and size (max 5MB)
5. Upload to Supabase Storage
6. Save record to `resumes` table
7. If logged in: use user_id
8. If anonymous: use anonymous_id
9. Show progress/loading state

### Verify:
- Can select PDF file
- File uploads to Supabase Storage
- Record created in resumes table

---

## DAY 8: Resume Parsing & Skill Extraction

### Goals:
- Parse PDF to text
- Extract skills from text
- Show job count teaser

### Tasks:
1. Install PDF parser: `npm install pdfjs-dist`
2. Create `src/services/resumeParser.js`
3. Parse PDF and extract text
4. Create `src/utils/skillsExtractor.js`
5. Define skills list (React, JavaScript, Node, Python, etc.)
6. Match skills in resume text
7. Extract years of experience using regex
8. Update resume record with extracted data
9. Create `ResumeContext`
10. Create `JobCountTeaser.jsx` component

### Verify:
- Upload PDF, skills extracted correctly
- Job count shows (mock number for now)

---

## DAY 9: Jobs API Service + Caching

### Goals:
- Setup JSearch API integration
- Implement caching system
- Create jobs service

### Tasks:
1. Create `src/services/jobsApi.js`
2. Create function: `searchJobs(query, filters)`
3. Before API call, check `cached_jobs` table
4. If cache exists & not expired: return cached data
5. If no cache: call API, store in `cached_jobs`, return data
6. Create function: `getJobDetails(jobId)`
7. Handle API errors
8. Test caching works

### Verify:
- First search calls API
- Same search returns cached data
- Cache expires after 24 hours

---

## DAY 10: Jobs Page - Basic Listing

### Goals:
- Display jobs on page
- Create JobCard component
- Add protected route

### Tasks:
1. Create protected route wrapper (redirect if not logged in)
2. Create `src/hooks/useJobs.js`
3. Create `JobCard.jsx` - title, company, location, logo, match score
4. Create `JobList.jsx` - maps over jobs
5. Build Jobs page layout
6. Fetch jobs based on user's skills
7. Show loading state
8. Show empty state (no jobs found)

### Verify:
- Jobs page requires login
- Jobs display after login
- Loading spinner shows

---

## DAY 11: Job Filters

### Goals:
- Build filter UI
- Connect filters to API/cache

### Tasks:
1. Create `JobFilters.jsx` component
2. Add location input
3. Add remote toggle
4. Add experience dropdown (maps to `job_requirements`)
5. Add date posted dropdown
6. Add job type dropdown
7. Store filter state
8. Re-fetch/re-filter jobs when filters change

### Verify:
- Each filter works
- Jobs update when filter changes

---

## DAY 12: Match Score

### Goals:
- Calculate job-resume match
- Display match percentage

### Tasks:
1. Create `src/utils/matchScore.js`
2. Algorithm: compare job skills with resume skills
3. Calculate percentage match
4. Create `MatchScore.jsx` component (progress bar)
5. Add to JobCard
6. Sort jobs by match (highest first)

### Verify:
- Match % shows on each card
- Higher matches at top

---

## DAY 13: Save Jobs Feature

### Goals:
- Save job to database
- Show saved state
- Build Saved Jobs page (table)

### Tasks:
1. Create `src/hooks/useSavedJobs.js`
2. Add Save button (heart icon) to JobCard
3. Save job to `saved_jobs` table
4. Toggle saved state on click
5. Build SavedJobs page with Table component
6. Columns: Job Title, Company, Location, Match Score, Saved Date, Actions
7. Remove from saved functionality

### Verify:
- Can save job
- Saved jobs page shows table
- Can remove saved job

---

## DAY 14: Job Details

### Goals:
- Show full job details in modal
- Display qualifications & company info

### Tasks:
1. Create `JobDetails.jsx` component
2. Fetch job details from API (or cached)
3. Display full description
4. Display qualifications list
5. Display company info & rating
6. Apply button (external link)
7. Show as modal on JobCard click

### Verify:
- Click job opens details modal
- All info displayed
- Apply link works

---

## DAY 15: Profile Page

### Goals:
- User profile display
- Resume management

### Tasks:
1. Build Profile page layout
2. Show user info (name, email)
3. Show current resume & extracted skills
4. Allow re-upload resume
5. Show account type (Free/Premium)
6. Logout button

### Verify:
- Profile info shows
- Can re-upload resume
- Logout works

---

## DAY 16: Pricing Page

### Goals:
- Build pricing comparison page
- Show Free vs Premium features

### Tasks:
1. Build Pricing page layout
2. Two cards: Free & Premium
3. Feature comparison list
4. Premium CTA button (placeholder for now)
5. FAQ section (optional)

### Verify:
- Pricing page looks good
- Clear feature comparison

---

## DAY 17: Link Anonymous Resume on Signup

### Goals:
- When anonymous user signs up, link their resume

### Tasks:
1. On signup success, get anonymous_id from localStorage
2. Query `resumes` table for that anonymous_id
3. Update resume record: set user_id, clear anonymous_id
4. Clear anonymous_id from localStorage
5. Test full flow: upload as anonymous → signup → resume linked

### Verify:
- Anonymous resume appears in user's profile after signup

---

## DAY 18: Premium Features (LinkedIn API)

### Goals:
- Add LinkedIn API for premium users
- Gate features based on is_premium

### Tasks:
1. Add LinkedIn API functions to `jobsApi.js`
2. Add "Last 24 hours" filter option (premium only)
3. Add "Last 7 days" filter option (premium only)
4. Check `is_premium` before calling LinkedIn API
5. Show upgrade prompt for free users
6. Create upgrade modal

### Verify:
- Premium filters visible but gated
- Free users see upgrade prompt

---

## DAY 19: Polish & Error Handling

### Goals:
- Add loading states everywhere
- Add error handling
- Responsive fixes

### Tasks:
1. Review all pages for loading states
2. Add error messages for failed operations
3. Add empty states (no results, no saved jobs)
4. Test on mobile
5. Fix responsive issues
6. Add toast notifications for actions

### Verify:
- No broken states
- Looks good on mobile
- Errors handled gracefully

---

## DAY 20: Deployment

### Goals:
- Deploy to Vercel
- Test production

### Tasks:
1. Create Vercel account
2. Push code to GitHub
3. Connect GitHub repo to Vercel
4. Add environment variables in Vercel
5. Deploy
6. Test all features on production
7. Fix any production bugs

### Verify:
- Site loads on Vercel URL
- All features work
- No console errors

---

# Quick Reference

## Commands

```bash
# Navigate to project
cd d:\resume2job\jobGPT

# Install dependencies
npm install

# Run dev server
npm run dev

# Install packages we'll need
npm install react-router-dom
npm install @supabase/supabase-js
npm install axios
npm install pdfjs-dist
```

## Environment Variables (.env)

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAPIDAPI_KEY=your_rapidapi_key
```

---

# Progress Checklist

## Phase 1: Setup
- [x] Vite + React project created
- [x] Tailwind CSS configured
- [ ] Folder structure created
- [ ] React Router setup
- [ ] Layout component (Navbar + Footer)
- [ ] All empty pages created
- [ ] Navigation working

## Phase 2: UI Components
- [ ] Button component
- [ ] Input component
- [ ] Card component
- [ ] Modal component
- [ ] Loader component
- [ ] Badge component
- [ ] Table component

## Phase 3: Home Page
- [ ] Hero section
- [ ] How it works section
- [ ] Upload area
- [ ] Job count teaser
- [ ] Responsive design

## Phase 4: Supabase
- [ ] Project created
- [ ] profiles table
- [ ] resumes table
- [ ] saved_jobs table
- [ ] cached_jobs table
- [ ] RLS policies
- [ ] Storage bucket
- [ ] Google OAuth enabled

## Phase 5: Auth
- [ ] AuthContext
- [ ] useAuth hook
- [ ] Signup page
- [ ] Login modal
- [ ] Google OAuth
- [ ] Logout
- [ ] Protected routes

## Phase 6: Resume
- [ ] Anonymous ID utility
- [ ] ResumeUploader
- [ ] PDF upload to storage
- [ ] PDF parsing
- [ ] Skills extraction
- [ ] ResumeContext
- [ ] Job count teaser

## Phase 7: Jobs API + Caching
- [ ] jobsApi service
- [ ] Cache check logic
- [ ] Store in cached_jobs
- [ ] Return cached data

## Phase 8: Jobs Page
- [ ] Protected route
- [ ] useJobs hook
- [ ] JobCard component
- [ ] JobList component
- [ ] Jobs page working

## Phase 9: Filters
- [ ] JobFilters component
- [ ] Location filter
- [ ] Remote filter
- [ ] Experience filter
- [ ] Date filter
- [ ] Job type filter

## Phase 10: Match Score
- [ ] matchScore utility
- [ ] MatchScore component
- [ ] Sorting by match

## Phase 11: Save Jobs
- [ ] useSavedJobs hook
- [ ] Save button
- [ ] SavedJobs page (table)

## Phase 12: Job Details
- [ ] JobDetails modal
- [ ] Full info display

## Phase 13: Profile
- [ ] Profile page
- [ ] Resume management

## Phase 14: Pricing
- [ ] Pricing page

## Phase 15: Anonymous → User Flow
- [ ] Link resume on signup

## Phase 16: Premium Features
- [ ] LinkedIn API integration
- [ ] Feature gating

## Phase 17: Polish
- [ ] Loading states
- [ ] Error handling
- [ ] Responsive fixes

## Phase 18: Deploy
- [ ] Vercel deployment
- [ ] Production testing
- [ ] Live! 🚀

---

# Tips for Learning

1. **Don't copy-paste blindly** - Type the code yourself
2. **Read errors carefully** - They tell you what's wrong
3. **Use console.log** - Debug step by step
4. **Google is your friend** - Search error messages
5. **Take breaks** - Fresh mind solves problems faster
6. **Commit often** - Save progress with git
7. **Ask for help** - When stuck for >30 minutes

---

**Created:** January 2026
**Project:** JobGPT
**Duration:** ~20 days
**Stack:** React + Vite + Tailwind + Supabase

Good luck! You've got this! 🚀

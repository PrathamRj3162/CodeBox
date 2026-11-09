# CodeBox

An interactive web-based coding platform designed for hands-on learning. Learners enroll in structured courses, solve challenges inside an in-browser code editor with instant live preview, pass automated test verification, and earn XP.

**Live Demo:** [codebox-rajpratham927-4392s-projects.vercel.app](https://codebox-rajpratham927-4392s-projects.vercel.app)

---

## Highlights

- **In-Browser Sandbox:** Embedded live code editor and real-time execution preview powered by Sandpack.
- **Automated Code Verification:** When a learner marks an exercise complete, the server inspects the code against pattern rules before granting completion and XP.
- **Complete 8-Chapter Curriculum:** 48 comprehensive exercises covering Hooks, State Management, Context, Performance Optimization, Side Effects, Refs, Routing, and Scalable Architecture.
- **Smart Hints with Gemini:** Integrated Google Gemini API delivers progressive hints based on the learner's current editor code without revealing full solutions.
- **Anti-Cheat & Data Integrity:** XP rewards, progression locks, and chapter access are validated server-side in Postgres. Duplicate completion attempts and client-side score manipulations are rejected.
- **Auth & Membership:** User authentication and Pro membership gating via Clerk, enforced at both the UI and API endpoints.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack) & React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui
- **Auth & Billing:** Clerk
- **Database & ORM:** Neon Serverless PostgreSQL & Drizzle ORM
- **Editor Runtime:** CodeSandbox Sandpack
- **Smart Hints:** Google Gemini API (`gemini-3.5-flash-lite`)
- **Testing & Quality:** Vitest (109 unit and route tests), PGlite, GitHub Actions CI

---

## Architecture

```
User (Browser)  ──►  Next.js App & API Routes  ──►  Neon PostgreSQL
      │                         │
      │                         ├── Clerk: Identity & Pro status
      │                         └── Google Gemini API: Hints engine
      │
      └── Sandpack sandbox runs learner code in an isolated iframe
```

### Core API Endpoints

| Route | Method | Purpose | Server-Side Safeguards |
|---|---|---|---|
| `/api/user` | `POST` | Syncs user profile on sign-in | Idempotent upsert, authenticated session |
| `/api/enroll-course` | `POST` | Enrolls user in a course | Prevents duplicate enrollments |
| `/api/exercise` | `POST` | Loads exercise content & starter code | Enforces enrollment, paywall checks, hides solution patterns |
| `/api/exercise/complete` | `POST` | Validates code, awards XP | Validates code pattern, enforces one-time XP award via database constraints |
| `/api/exercise/hint` | `POST` | Returns contextual hint | Rate-limited per user per day, validates session & enrollment |

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) account
- A Google Gemini API Key (free from Google Developer Console)

### 1. Clone & Install

```bash
git clone https://github.com/PrathamRj3162/CodeBox.git
cd CodeBox
npm ci
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Neon Postgres connection string
DATABASE_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Google Gemini Hints Engine
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Seed Course Content

Populate all 8 chapters and 48 exercises into your database:

```bash
npm run seed
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Next.js local development server |
| `npm run build` | Compiles the production build |
| `npm start` | Starts the production server |
| `npm run typecheck` | Checks TypeScript types with `tsc --noEmit` |
| `npm test` | Runs the full Vitest suite (109 unit & route tests) |
| `npm run seed` | Seeds courses, chapters, and exercises idempotently |

---

## Testing & Quality Control

The project includes an automated test suite powered by Vitest and PGlite (embedded PostgreSQL):

- **Route Tests:** Test real Next.js API route handlers against a mock database instance with true Postgres constraint checks.
- **Verification Tests:** Test code validation logic, anti-cheat XP safeguards, and hint rate limits.
- **Continuous Integration:** GitHub Actions (`.github/workflows/ci.yml`) runs dependency checks, type checking, the full 109-test suite, and Next.js production build on every push and pull request to `main`.

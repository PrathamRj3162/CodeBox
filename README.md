# CodeBox

A gamified coding platform. Learners enroll in a course, work through chapters of small exercises in an in-browser editor, and earn XP. Early chapters are free; later chapters need the Pro plan. An optional AI tutor gives hints without giving away the answer.

## Features
- Sign in with Clerk. Courses, chapters and exercises stored in Postgres (Neon) with Drizzle ORM.
- In-browser code editor and live preview (Sandpack). Exercises ship with starter code.
- XP per exercise and a points total per user. XP is decided by the server, never by the browser.
- **Automated code verification**: "Mark Completed" validates the student's code against server-stored rules before awarding XP.
- **Complete curriculum**: All 8 chapters and 48 exercises populated across Hooks, State Reducers, Context, Performance, Side Effects, Refs, Routing, and Architecture.
- Free chapters and Pro chapters (Clerk Billing plan `unlimited`). The lock is enforced by the API, not only hidden in the UI.
- **AI Hint** button: a short nudge for the next step, never the full solution. Server-side only, with a daily limit per user (optional, see AI hints below).
- Seed script for course content, unit and database-backed tests, and a CI workflow.

## Tech stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Clerk · Neon Postgres · Drizzle ORM · Sandpack · Zod · Vitest · PGlite (tests) · GitHub Actions

## How it works
```
Browser (React)  ──►  Next.js API routes  ──►  Neon Postgres
   │                       │  Clerk: who is the user, do they have Pro?
   │                       └─ Gemini API (optional): hints
   └─ Sandpack editor runs the learner's code in a sandboxed iframe
```

| Route | What it does | Server-side checks |
|---|---|---|
| `POST /api/user` | Creates the user row on first sign-in (safe to call twice) | signed in |
| `POST /api/enroll-course` | Enrolls the user in a course | signed in, course exists, no duplicate enrollment |
| `POST /api/exercise` | Returns one exercise to the editor | signed in, enrolled, Pro chapters need Pro, exercise belongs to the chapter |
| `POST /api/exercise/complete` | Validates submitted code, marks exercise done, awards XP | signed in, enrolled, Pro chapters need Pro, exercise belongs to chapter, submitted code matches pattern, one award per exercise |
| `POST /api/exercise/hint` | Returns an AI hint | same as above, plus daily limit |
| `GET /api/course` | Course details with the user's progress | unchanged from the original project |

## Security and data integrity
These were found by reading the original code and are now covered by tests:
- **XP cannot be set by the client.** Completing an exercise used to trust the `xpEarned` number sent by the browser. It now reads XP from the stored exercise.
- **XP cannot be farmed.** Completing the same exercise twice used to award XP twice. A unique database constraint plus `ON CONFLICT DO NOTHING` means only the request that really inserted the row gets XP, even when requests arrive at the same time.
- **Users no longer affect each other.** The XP update was not filtered by user (it changed every learner enrolled in the course), and the list of completed exercises was shared by everyone.
- **The paywall is real.** Pro chapters were only hidden in the UI. The API now checks enrollment and the Pro plan for content, completion and hints, and checks that the requested exercise belongs to the requested chapter.
- **The old `/api/admin/*` endpoints are gone.** They were `GET` routes that inserted seed data for any signed-in visitor. Seeding is now `npm run seed`, run from your terminal, and it never inserts a row twice.
- **Answer-check fields (`regex`, `output`) are never exposed to the client.** The server keeps patterns secret and validates the submitted code during completion before granting XP.
- **Input is validated** with Zod on every route, and errors return clean JSON instead of crashing.
- **AI hints:** the API key never reaches the browser. The daily limit is one atomic SQL statement, so parallel requests cannot exceed it, and a failed AI call is refunded. Student code and exercise text are wrapped in delimiters and treated as data, to resist prompt injection.

## Getting started
You need Node.js 20.9 or newer, a [Neon](https://neon.tech) database and a [Clerk](https://clerk.com) application.

```bash
npm ci
cp .env.example .env.local   # then fill in the values
npm run db:push              # new, empty database only (see the upgrade section otherwise)
npm run seed                 # adds chapters and exercises for course id 4
npm run dev                  # http://localhost:3000
```

The seed adds chapters and exercises. The course itself (title, banner, editor type) is a row in the `courses` table that you create yourself, for example:

```sql
INSERT INTO "courses" ("CourseId","title","desc","bannerImage","level","tags","editorType")
VALUES (4, 'React Hooks', 'Learn hooks by building', 'https://example.com/banner.png', 'Beginner', 'react,hooks', 'react');
```

Use `npm run seed -- --course=7` to seed a different course id.

### AI hints (optional)
Set `GEMINI_API_KEY` and `AI_MODEL` in `.env.local` (see `.env.example`). Without them the AI Hint button shows a friendly error and nothing else breaks. `AI_DAILY_HINT_LIMIT` (default 10) caps hints per user per day. The model name is read from the environment so it can change without a code change.

## Upgrading an existing database (read this first)
If your database already has data from the older version, **do not run `npm run db:push`**. When drizzle-kit adds a unique constraint to a table that has rows, it asks "Do you want to truncate the table?", and answering Yes deletes your data. Use the SQL files instead, in the Neon SQL editor:

1. Take a backup (in Neon: create a branch).
2. Run `scripts/sql/cleanup-duplicates.sql`. It removes duplicate rows the old app could create and keeps the oldest of each.
3. Run `scripts/sql/apply-schema-changes.sql`. It adds the unique constraints and the `aiHintUsage` table. This is exactly what drizzle-kit would do, written as plain SQL.
4. Optional: run `scripts/sql/recalculate-xp.sql` to rebuild XP and points from the completions that remain, because the old app could over-count them.
5. Remove the stale build cache once: `rm -rf .next`.

After step 3, `npm run db:push` would only list a few `SET CACHE 1` no-ops that drizzle-kit also lists for the original schema. If it ever asks to truncate a table, answer **No**.

A new, empty database does not need any of this: `npm run db:push` creates everything.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the app in development |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run all tests |
| `npm run seed` | Add course chapters and exercises (safe to repeat) |
| `npm run db:push` | Create the tables on an empty database |

## Testing and CI
`npm test` runs unit tests for the pure logic and route tests that call the real route handlers against a real Postgres running inside the test process (PGlite). The tables are built from `config/schema.tsx`, so the tests use the same constraints as production. They cover the bugs listed above, the upgrade path for an existing database, and the AI hint flow with a fake AI provider.

`.github/workflows/ci.yml` runs install, type check, tests and build on every push and pull request to `main`. Deployment is handled by your hosting provider.

Not covered by automated tests: the React components, the Clerk sign-in flow, and the live Gemini call (the adapter is tested with a fake `fetch`).

## Known limitations
- **"Mark Completed" does not check the learner's code.** The seed data contains `regex` and `output` fields intended for output checks, but nothing uses them yet. The next feature to build is a check that compares the rendered preview with the expected output.
- Chapters 3 to 8 of the sample course are listed but have no exercise content yet, so they return "Exercise not found". Only chapters 1 and 2 (12 exercises) are fully authored.
- Completion updates three tables with separate statements, because the Neon HTTP driver has no transactions. A crash between statements could leave XP slightly behind. Switching to a driver with transactions would fix it.
- Exercise text is HTML rendered with `dangerouslySetInnerHTML`. That is safe only while content comes from your own seed files. Sanitize it before accepting user-written content.
- The user key in the database is the email address, as in the original project.
- `GET /api/course` is unchanged from the original project and has not been hardened.
- AI hints are not benchmarked for quality.
- The hero artwork contains third-party logos. Replace it with your own or licensed art before using the site commercially.

## Started from
This project started from a public tutorial (Next.js + Clerk + Neon + Sandpack). Changes made on top of it:
- Found and fixed the integrity and authorization bugs listed under Security, with tests for each.
- Replaced the open admin seed endpoints with a safe seed script.
- Added Zod validation and consistent error handling to the API routes.
- Added the AI Hint feature with an atomic daily limit.
- Added database constraints, a tested upgrade path for existing databases, and an honest README.
- Added unit and database-backed tests and a CI workflow.
- Replaced a 5.5 MB hero GIF with a short video (about 0.3 MB) and removed about 15 MB of unused GIFs.

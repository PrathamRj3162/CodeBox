# CodeBox — Interactive Coding Platform & LMS

> An interactive coding learning management system built with Next.js 16, React 19, Clerk Auth, Drizzle ORM, Neon PostgreSQL, Sandpack, and Tailwind CSS.

---

## ✨ Features

- 💻 **In-Browser Interactive Code Editor** — Powered by `@codesandbox/sandpack-react` for live JavaScript, TypeScript, and React code execution.
- 📚 **Structured Course Curriculum** — Multi-chapter courses with bite-sized interactive exercises and progress tracking.
- 🎮 **Gamified Learning** — Earn XP, track completed exercises, and view streaks on your personal dashboard.
- 🔐 **Authentication & User Management** — Secure authentication and user profiles powered by Clerk.
- 🗄️ **Serverless PostgreSQL Database** — High-performance database layer with Drizzle ORM and Neon serverless driver.
- 🌙 **Modern Dark-Mode UI** — Built with Tailwind CSS, Radix UI primitives, Lucide icons, and Sonner notifications.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Library** | React 19, Radix UI, Tailwind CSS |
| **Code Execution** | Sandpack (`@codesandbox/sandpack-react`) |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **Database & ORM** | Drizzle ORM, Neon PostgreSQL (`@neondatabase/serverless`) |
| **Icons & Notifications** | Lucide React, Sonner |

---

## 🏃 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### 1. Clone the repository

```bash
git clone https://github.com/PrathamRj3162/CodeBox.git
cd CodeBox
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 4. Push Database Schema

```bash
npx drizzle-kit push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
CodeBox/
├── app/
│   ├── (auth)/          # Clerk sign-in and sign-up routes
│   ├── (routes)/
│   │   ├── courses/     # Course browser, details & exercise editor
│   │   ├── dashboard/   # User dashboard with progress cards
│   │   └── pricing/     # Pro subscription tiers
│   ├── api/             # API routes (courses, exercises, enrollment)
│   ├── globals.css      # Tailwind styling
│   └── layout.tsx       # Root layout with ClerkProvider & theme
├── components/
│   └── ui/              # Radix UI + shadcn components
├── config/
│   ├── db.tsx           # Drizzle database client
│   └── schema.tsx       # Database schema (courses, users, exercises)
├── public/              # Static assets, banners, and logos
└── drizzle.config.ts    # Drizzle ORM configuration
```

---

## 📄 License

MIT © [Pratham Raj](https://github.com/PrathamRj3162)

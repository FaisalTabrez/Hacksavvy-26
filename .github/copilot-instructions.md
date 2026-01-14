# Copilot Instructions for Hacksavvy-26

You are an expert developer working on **Hacksavvy-26**, a Next.js 16 (App Router) project using TypeScript, Tailwind CSS, and Supabase.

## Project Architecture

- **Framework**: Next.js 16.1.1 with App Router strategy.
- **Language**: TypeScript (`.ts`, `.tsx`).
- **Styling**: Tailwind CSS v4, `tailwind-merge`, `clsx`, `framer-motion`, `gsap`.
- **Backend/Database**: Supabase (PostgreSQL, Auth) via `@supabase/ssr`.
- **Forms**: React Server Actions, `react-hook-form`, `zod`.

## Core Conventions

### 1. Data Access & Supabase
- **ALWAYS** use the provided helper utilities to instantiate Supabase clients.
- **Server Components & Actions**:
  ```typescript
  import { createClient } from '@/utils/supabase/server'
  
  export async function myAction() {
    const supabase = await createClient() // Await is required
    // ...
  }
  ```
- **Client Components**:
  ```typescript
  import { createClient } from '@/utils/supabase/client'
  
  export default function MyComponent() {
    const supabase = createClient() // Synchronous
    // ...
  }
  ```
- **RLS**: Respect Row Level Security policies defined in `supabase/migrations`.

### 2. Styling Patterns
- Use **Tailwind CSS** for all styling.
- Use the `cn()` utility for conditional class merging:
  ```typescript
  import { cn } from '@/utils/cn'
  
  <div className={cn("bg-white p-4", className)}>
  ```
- Avoid CSS files/modules unless implementing global animations in `globals.css`.

### 3. Server Actions & Mutations
- Use **Server Actions** (`'use server'`) for form submissions and data mutations.
- Place shared actions in `actions/` or co-located `actions.ts`.
- Prefer native `<form action={serverAction}>` when possible.

### 4. Component Structure
- **Client Components**: Add `'use client'` at the top only when utilizing hooks (`useState`, `useEffect`) or event listeners.
- **Server Components**: Default behavior (no directive needed). Fetch data directly here.

### 5. Routing
- Use `next/link` for internal navigation.
- Use `next/navigation` (`redirect`, `useRouter`) for programmatic navigation.
- Auth callback route handles session exchange: `app/auth/callback/route.ts`.

## Tech Stack Specifics
- **Animations**: Prefer `framer-motion` for complex component transitions.
- **Icons**: Use `react-icons` (e.g., `FaReact`, `FiUser`).
- **Emails**: Use `nodemailer` via `utils/mail.ts` for transactional emails.

## Common Workflows
- **Running Dev Server**: `npm run dev`
- **Linting**: `npm run lint`

## Important Paths
- `utils/supabase/`: Client factory functions.
- `app/`: App Router pages and layouts.
- `components/`: Reusable UI components.
- `supabase/migrations/`: Database schema and RLS policies.

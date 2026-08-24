# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # React Vite Master Starter

  Production-ready React starter built for serious web products. This is an opinionated, reusable foundation you can clone and start shipping from immediately.

  ## Purpose

  - Scalable architecture for long-lived React applications
  - Feature-first organization with clean shared boundaries
  - Type-safe data, forms, and API integration patterns
  - Modern UI baseline with theme support and accessibility
  - Great developer experience with testing, linting, formatting, and strict TypeScript

  ## Tech Stack

  - React + TypeScript + Vite
  - Tailwind CSS v4
  - shadcn/ui (Base UI flavor) + Radix-inspired primitives
  - Lucide icons
  - React Router (nested, protected, lazy routes)
  - TanStack Query (server state)
  - Zustand (client UI state)
  - React Hook Form + Zod
  - Axios API client layer with interceptors and normalized errors
  - Sonner toasts
  - Recharts dashboard chart example
  - TanStack Table reusable table abstraction
  - Vitest + React Testing Library
  - ESLint + Prettier

  ## Quick Start

  ```bash
  npm install
  npm run dev
````

Open the app at http://localhost:5173.

## Scripts

```bash
npm run dev
npm run build
npm run preview

npm run lint
npm run lint:fix

npm run format
npm run format:check

npm run typecheck

npm run test
npm run test:watch
npm run test:coverage
```

## Environment Variables

Copy `.env.example` to `.env` and adjust values.

```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=React Vite Master Starter
VITE_APP_ENV=development
```

Typed and validated environment access lives in `src/lib/env.ts`.

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   └── assets/
├── src/
│   ├── app/
│   │   ├── app.tsx
│   │   ├── providers/
│   │   └── router/
│   ├── components/
│   │   ├── common/
│   │   ├── data-display/
│   │   ├── feedback/
│   │   ├── layout/
│   │   └── ui/
│   ├── config/
│   ├── features/
│   │   └── example/
│   ├── hooks/
│   ├── lib/
│   │   └── api/
│   ├── pages/
│   ├── stores/
│   ├── styles/
│   └── types/
├── tests/
│   ├── setup.ts
│   └── utils/
├── components.json
├── eslint.config.js
├── prettier.config.js
├── vite.config.ts
└── package.json
```

## Architecture Rules

- Reusable UI goes in `src/components/*`
- Feature-specific code goes in `src/features/<feature>/*`
- Server state belongs to TanStack Query
- Global client UI state belongs to Zustand
- Form state belongs to React Hook Form
- Validation schemas belong to Zod
- API calls should live in services/lib, not random components

## Routing

Routing is defined in `src/app/router/routes.tsx` with:

- Public routes
- Protected routes
- Nested route layouts
- Lazy-loaded pages
- Route-level fallback loading state
- Route error element
- 404 page

## API Layer

Core API files:

- `src/lib/api/client.ts` - Axios instance, timeout, base URL
- `src/lib/api/interceptors.ts` - auth token + normalized errors
- `src/lib/api/index.ts` - generic wrappers (`get`, `post`, `put`, `patch`, `delete`)

Use in features/services:

```ts
import { api } from "@/lib/api"

const users = await api.get<User[]>("/users")
```

## State Management

### TanStack Query

Configured in `src/app/providers/query-provider.tsx` with sensible defaults:

- `staleTime`
- `retry`
- `refetchOnWindowFocus`
- global query/mutation error toast behavior

Example query + mutation + invalidate flow is in `src/features/example/hooks/use-dashboard.ts`.

### Zustand

`src/stores/app.store.ts` manages persisted UI state:

- sidebar collapsed state
- mobile sidebar state
- theme preference

`src/stores/auth.store.ts` demonstrates basic auth gate state.

## Forms and Validation

Form example in `src/features/example/components/profile-form.tsx` includes:

- input
- select
- radio group
- textarea
- checkbox
- submit/loading/success states
- schema-driven validation errors

Schema is in `src/features/example/schemas/profile.schema.ts`.

## UI System

The starter uses shadcn/ui components from `src/components/ui` plus reusable wrappers in:

- `src/components/common`
- `src/components/data-display`
- `src/components/feedback`
- `src/components/layout`

Included examples:

- command menu
- theme toggle
- copy button
- confirm dialog
- date picker
- combobox
- reusable data table
- loading, empty, error, success states

## Dashboard Demo

`src/pages/dashboard/dashboard.page.tsx` is the starter showcase screen:

- responsive shell with sidebar + header
- KPI cards
- chart
- table with sorting/filtering/pagination/column visibility/row selection
- activity list
- form panel
- toast and dialog demos

## Adding a New Route

1. Create page component under `src/pages/...`.
2. Add lazy import and route entry in `src/app/router/routes.tsx`.
3. Place under appropriate layout and protection boundary.

## Adding a New Feature

1. Create `src/features/<feature>/`.
2. Add `components`, `hooks`, `services`, `schemas`, and `types` as needed.
3. Export from `src/features/<feature>/index.ts`.
4. Consume feature hooks/components in routes/pages.

## Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

Generated files are placed in `src/components/ui` and can be wrapped by reusable project-specific components.

## Testing

Current test examples include:

- component test: `src/components/feedback/empty-state.test.tsx`
- store/hook behavior test: `src/stores/app.store.test.ts`
- utility test: `src/lib/format.test.ts`

## Deployment

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to your hosting provider (Vercel, Netlify, Cloudflare Pages, Nginx, etc.).

## Starter Notes

- This project is intentionally opinionated, but not rigid.
- Replace demo data/services in `src/features/example` when starting a new product.
- Keep boundaries clear as your app grows to maintain long-term velocity.

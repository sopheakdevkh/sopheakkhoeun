# Sopheak Portfolio

Next.js portfolio with Tailwind CSS, Prisma ORM, and Neon PostgreSQL.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Prisma 7** + `@prisma/adapter-neon`
- **Neon** serverless Postgres

## Setup

1. Copy env and add your Neon URLs:

```bash
cp .env.example .env
```

- `DATABASE_URL` — pooled connection (`-pooler` host) for the app
- `DIRECT_URL` — direct connection (no pooler) for Prisma CLI

2. Install and sync the database:

```bash
npm install
npm run db:push
npm run db:seed
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks (before push / deploy)

| Script | What it runs |
| --- | --- |
| `npm run lint` | ESLint + Next.js Core Web Vitals rules |
| `npm run typecheck` | Prisma generate + TypeScript |
| `npm run check` | Lint + typecheck (fast gate) |
| `npm run check:full` | Lint + typecheck + production build |

**Local:** a Husky **pre-push** hook runs `npm run check` automatically. Fix issues before the push goes through.

**CI:** every push/PR to `main` runs lint, typecheck, and `next build` via GitHub Actions (`.github/workflows/ci.yml`). Prefer green CI before deploying (Vercel / your host).

```bash
# Before you push
npm run check

# Before you deploy (includes production build)
npm run check:full
```

## Push to GitHub

```bash
git remote add origin git@github.com:sopheakdevkh/sopheakkhoeun.git
git branch -M main
git push -u origin main
```

(Skip `remote add` if `origin` already exists.)

## Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to Neon |
| `npm run db:seed` | Seed profile, skills, projects |
| `npm run db:studio` | Open Prisma Studio |

## API

Public:
- `GET /api/content` — profile, services, skills, projects, testimonials
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/services`
- `GET /api/testimonials`
- `POST /api/contact`

Admin (cookie auth):
- `POST /api/admin/login` — `{ "password": "..." }`
- `GET /api/admin/content` — full CMS payload
- CRUD via `/api/projects`, `/api/skills`, `/api/services`, `/api/testimonials`, `/api/messages`, `/api/journey`

## Admin dashboard

1. Set `ADMIN_PASSWORD` in `.env`
2. Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
3. Manage profile (header/footer/contact/about), services, skills, projects, testimonials, journey, and messages

Default local password (change it): set in `.env` — do not commit real secrets.

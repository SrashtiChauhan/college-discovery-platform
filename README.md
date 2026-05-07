# College Discovery Platform

Production-grade MVP for a **college discovery + decision platform** built with:
- **Frontend:** Next.js (React + TypeScript) + Tailwind CSS
- **Backend:** Next.js REST APIs
- **Database:** PostgreSQL + Prisma ORM

## Features Implemented (4)
1. **College Listing + Search**
   - College cards with name, location, fees, rating, placement%
   - Search by college name
   - Filters: location, max fees, course
   - Pagination

2. **College Detail Page**
   - Overview with fees, courses offered, basic info
   - Sections: courses, reviews

3. **Compare Colleges (High Priority)**
   - Select 2–3 colleges
   - Comparison table with fees, placement %, rating, location

4. **Simple Predictor Tool**
   - Input: exam + rank
   - Output: matching colleges based on rule-based cutoff logic

## Project Structure
- `src/app/colleges` → listing + detail UI routes
- `src/app/compare` → compare UI route
- `src/app/predictor` → predictor UI route
- `src/app/api/*` → REST API routes
- `prisma/schema.prisma` → database models
- `prisma/seed.ts` → seed dataset

## REST APIs
- `GET /api/colleges` 
  - Query params: `search`, `location`, `maxFees`, `course`, `page`, `limit`
- `GET /api/colleges/options`
- `GET /api/colleges/:id`
- `GET /api/compare?ids=id1,id2[,id3]`
- `POST /api/predictor` with `{ "exam": "JEE", "rank": 5000 }`

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Ensure `DATABASE_URL` points to a running PostgreSQL instance.
4. Push schema + generate client + seed:
   ```bash
   npm run db:push
   npm run db:seed
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

## Validation
```bash
npm run lint
npm run build
```

## Deployment
### Frontend + Backend (Next.js app)
- Deploy to **Vercel** (recommended)
- Set environment variable:
  - `DATABASE_URL=<your-postgres-url>`
- Run build command: `npm run build`

### Database
- Host PostgreSQL on Railway/Render/Neon/Supabase
- Apply schema and seed data in deployment environment:
  ```bash
  npm run db:push
  npm run db:seed
  ```

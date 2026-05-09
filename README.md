#  College Discovery Platform

A modern full-stack college discovery and comparison platform built using **Next.js 16**, **Prisma**, and **PostgreSQL (Neon DB)**.

Users can explore colleges, compare institutions side-by-side, and predict admission opportunities based on exam rank.

---
  Live Demo: https://college-discovery-platform-alpha.vercel.app

---

# ✨ Features

## 🔍 College Search & Filtering
- Search colleges by name
- Filter by location
- Filter by maximum annual fees
- Filter by course

## 📊 College Comparison
- Compare up to 3 colleges side-by-side
- Analyze:
  - Fees
  - Ratings
  - Placements
  - Locations

## 🤖 Admission Predictor
- Predict likely colleges based on:
  - Exam name
  - Rank
- Displays eligible colleges with cutoff insights

## 🎨 Modern UI
- Responsive design
- Mobile-friendly navigation
- Gradient hero sections
- Interactive cards
- Clean recruiter-friendly layout

## ⚡ Backend Features
- REST API routes using Next.js App Router
- Prisma ORM integration
- PostgreSQL database with Neon
- Dynamic server rendering

---

# 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Next.js 16 | Full-stack framework |
| React 19 | Frontend UI |
| TypeScript | Type safety |
| Prisma ORM | Database ORM |
| PostgreSQL | Database |
| Neon DB | Cloud database |
| Tailwind CSS | Styling |
| Vercel | Deployment |

---

# 📁 Project Structure

```bash
src/
 ├── app/
 │    ├── api/
 │    ├── colleges/
 │    ├── compare/
 │    ├── predictor/
 │    └── layout.tsx
 │
 ├── components/
 │    └── Navbar.tsx
 │
 └── lib/
      └── prisma.ts
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/SrashtiChauhan/college-discovery-platform.git
```

## 2️⃣ Move Into Project

```bash
cd college-discovery-platform
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Create `.env`

```env
DATABASE_URL="your_neon_database_url"
```

## 5️⃣ Push Database Schema

```bash
npm run db:push
```

## 6️⃣ Seed Database

```bash
npm run db:seed
```

## 7️⃣ Run Development Server

```bash
npm run dev
```

---

# 🌐 API Routes

| Route | Description |
|---|---|
| `/api/colleges` | Fetch colleges |
| `/api/colleges/options` | Filter options |
| `/api/compare` | Compare colleges |
| `/api/predictor` | Predict admission chances |

---

# 📈 Future Improvements

- Authentication system
- Saved colleges
- AI recommendation engine
- Dark mode
- Advanced analytics dashboard

---

# 👩‍💻 Author

## Srashti Chauhan

- GitHub: https://github.com/SrashtiChauhan
- LinkedIn: [https://www.linkedin.com/](https://www.linkedin.com/in/srashtichauhan/)

---

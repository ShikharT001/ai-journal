# AI Journal — Complete Ready-to-run Project (Next.js + MongoDB)

## Quick start
1. Copy `.env.example` to `.env` and fill values (`MONGODB_URI`, `JWT_SECRET`).
2. Install:
   ```
   npm install
   ```
3. Run:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Features
- Register / Login / Logout
- Dashboard with list of entries (view, edit, delete)
- Create new entry
- JWT-based auth via HttpOnly cookie
- MongoDB Atlas via Mongoose

## API
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/journal
- POST /api/journal
- GET /api/journal/:id
- PUT /api/journal/:id
- DELETE /api/journal/:id

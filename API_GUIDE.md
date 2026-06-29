# Kudos Board - API & Development Guide

## 🚀 Quick Start for All Developers

### 1. Clone and Install
```bash
git clone <repo-url>
cd kudos-board

# Backend setup
cd backend
npm install
npm run seed
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

### 2. Verify Setup
- Backend: http://localhost:3000/api/health → `{"status":"ok"}`
- Frontend: http://localhost:5173 → Kudos Board app

---

## 📂 Project Structure

```
kudos-board/
├── backend/           ← Feature 3 (API & Data)
│   ├── src/
│   │   ├── routes/    ← URL definitions
│   │   ├── controllers/ ← Feature 1 & 2 implement here
│   │   ├── models/    ← Database queries
│   │   └── middleware/ ← Validation, errors
│   └── prisma/
│       └── schema.prisma ← Database schema (Feature 3 only)
│
└── frontend/          ← Feature 1 & 2
    └── src/
        ├── api/       ← API wrapper (Feature 3)
        └── ...        ← Components (Feature 1 & 2)
```

---

## 🧩 Feature Breakdown

### Feature 1: Home & Boards (Branch: `feature/home-boards`)
**Your job:** Board management on home page

**Backend:**
- Implement `controllers/boards.js` → `getAllBoards`, `createBoard`, `deleteBoard`

**Frontend:**
- Home page layout
- Board grid component
- Create board form
- Filter/search UI

**API Functions to Use:**
```js
import { getBoards, createBoard, deleteBoard } from './api/api';
```

---

### Feature 2: Board Page & Cards (Branch: `feature/board-cards`)
**Your job:** Card management on board detail page

**Backend:**
- Implement `controllers/cards.js` → all methods
- Implement `controllers/boards.js` → `getBoard`

**Frontend:**
- Board detail page
- Card grid component
- Add card form
- Upvote button

**API Functions to Use:**
```js
import { getBoard, getCardsByBoard, createCard, upvoteCard, deleteCard } from './api/api';
```

---

### Feature 3: API & Data (Branch: `api-data`)
**Your job:** Infrastructure & contracts

**Responsibilities:**
- Database schema & migrations
- Model queries (filtering, CRUD)
- Middleware (validation, errors)
- API contracts
- Documentation

**What you DON'T do:**
- Feature-specific controller logic
- Frontend components

---

## 🔒 API Contracts

### Boards

```bash
# List all boards
GET /api/boards?category=Celebration&search=team

# Get single board
GET /api/boards/:id

# Create board
POST /api/boards
Body: { "title": "...", "category": "...", "author": "..." }

# Delete board
DELETE /api/boards/:id
```

### Cards

```bash
# Get cards for board
GET /api/boards/:boardId/cards

# Create card
POST /api/cards
Body: { "message": "...", "gifUrl": "...", "boardId": 1 }

# Upvote card
PATCH /api/cards/:id/upvote

# Delete card
DELETE /api/cards/:id
```

**Full API docs:** See `backend/README.md`

---

## 🧪 Testing Your Work

### Backend Tests (Feature 1 & 2 use these)

```bash
cd backend

# Test models and filtering
node src/test-models.js

# Test validation
./src/test-validation.sh

# Test error handling
./src/test-errors.sh
```

### Manual API Tests

```bash
# Health check
curl http://localhost:3000/api/health

# Get all boards
curl http://localhost:3000/api/boards

# Filter boards
curl "http://localhost:3000/api/boards?category=Celebration"

# Create board (should fail validation)
curl -X POST http://localhost:3000/api/boards \
  -H "Content-Type: application/json" \
  -d '{"category": "Test"}'
# Expected: 400 {"error":"Title is required"}
```

---

## 🔄 Git Workflow

### Merge Order (IMPORTANT)
```
1. api-data → main      (Feature 3 merges first)
2. feature/home-boards → main
3. feature/board-cards → main
```

**Feature 3 MUST merge before Feature 1 & 2 can start.**

### Creating Your Branch

**Feature 1:**
```bash
git checkout main
git pull origin main
git checkout -b feature/home-boards
```

**Feature 2:**
```bash
git checkout main
git pull origin main
git checkout -b feature/board-cards
```

**Feature 3:**
```bash
git checkout -b api-data
# Already created
```

---

## 🚨 Conflict Prevention Rules

### Feature 3 (API & Data)
✅ **YOU TOUCH:**
- `backend/prisma/schema.prisma`
- `backend/src/models/`
- `backend/src/middleware/`
- `backend/src/config/`
- `backend/src/utils/`
- `frontend/src/api/api.js`

❌ **NEVER TOUCH:**
- `backend/src/controllers/` (business logic)
- Frontend components

### Feature 1 & 2
✅ **YOU TOUCH:**
- `backend/src/controllers/` (only the methods assigned to you)
- Frontend components
- Frontend CSS

❌ **NEVER TOUCH:**
- `backend/src/routes/`
- `backend/src/models/`
- `backend/prisma/schema.prisma`
- `frontend/src/api/api.js`

**If you need a change:** Ask Feature 3 first!

---

## 🐛 Common Issues

### Backend won't start
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### No seed data showing
```bash
cd backend
npx prisma migrate reset --force
npm run seed
```

### CORS errors in browser
✅ Backend CORS is already configured for:
- http://localhost:5173 (Vite)
- http://localhost:3000 (React)
- http://localhost:5174 (Vite alt)

If you use a different port, ask Feature 3 to add it to `backend/src/config/cors.js`

### Database connection failed
Check `backend/.env` has:
```
DATABASE_URL="postgresql://user:password@localhost:5432/kudos_board"
```

---

## 📚 Documentation Links

- **Backend API:** `backend/README.md`
- **Frontend API:** `frontend/src/api/README.md`
- **Utils:** `backend/src/utils/README.md`
- **Planning:** `planning.md`

---

## 💬 Communication

### Requesting Changes from Feature 3

**Bad:**
> "I changed schema.prisma to add a color field"

**Good:**
> "Hey Feature 3, can you add a `color` field (String, optional) to the Board model? I need it for Feature 1 board customization."

### Reporting Bugs

Include:
1. What you tried
2. What you expected
3. What actually happened
4. Error message (if any)

---

## ✅ Pre-Merge Checklist

### Feature 1 (Home & Boards)
- [ ] Boards display correctly
- [ ] Create board works
- [ ] Delete board works
- [ ] Category filter works
- [ ] Search works
- [ ] UI updates without refresh

### Feature 2 (Board Page & Cards)
- [ ] Cards display for a board
- [ ] Create card works
- [ ] Upvote increments correctly
- [ ] Delete card works
- [ ] Giphy picker integrated

### Feature 3 (API & Data)
- [ ] All models tested
- [ ] Validation works
- [ ] Error handling works
- [ ] Seed data loads
- [ ] Server starts
- [ ] Documentation complete

---

## 🎓 Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **Express Docs:** https://expressjs.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev

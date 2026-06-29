# Backend Structure (Feature 3 - API & Data Layer)

## 📁 Folder Organization

```
backend/
├── src/
│   ├── server.js          ← Main entry point, mounts routes
│   ├── routes/            ← Route definitions (URL → Controller)
│   │   ├── boards.js
│   │   └── cards.js
│   ├── controllers/       ← Request handlers (business logic)
│   │   ├── boards.js
│   │   └── cards.js
│   ├── models/            ← Database access layer (Prisma)
│   │   ├── board.js
│   │   └── card.js
│   └── middleware/        ← Shared middleware
│       ├── errorHandler.js
│       └── validation.js
└── prisma/
    └── schema.prisma      ← Database schema (LOCKED by Feature 3)
```

## 🔒 API Contracts (LOCKED)

### Boards
- `GET /api/boards` - List all boards (with optional filters)
- `GET /api/boards/:id` - Get single board with cards
- `POST /api/boards` - Create board
- `DELETE /api/boards/:id` - Delete board

### Cards
- `GET /api/boards/:boardId/cards` - List cards for board
- `POST /api/cards` - Create card
- `PATCH /api/cards/:id/upvote` - Increment upvotes
- `DELETE /api/cards/:id` - Delete card

## 👥 Developer Guidelines

### Feature 1 (Home & Boards)
**Implement in:** `controllers/boards.js` → `getAllBoards`, `createBoard`, `deleteBoard`
**Do NOT touch:** Route paths, response shapes, models

### Feature 2 (Board Page & Cards)
**Implement in:** `controllers/cards.js` + `controllers/boards.js` → `getBoard`
**Do NOT touch:** Route paths, response shapes, models

### Feature 3 (You - Data Layer)
**You own:**
- `schema.prisma` (all changes)
- `models/` (all database queries)
- `middleware/` (shared utilities)
- Route structure (not implementation)

**You do NOT touch:**
- Feature-specific controller logic
- Frontend components

## 🚨 Change Request Protocol

Need to change an API contract or add a database field?

1. Create an issue or Slack message
2. Feature 3 reviews and approves
3. Feature 3 makes the change in one commit
4. Everyone pulls the update

**Never edit `schema.prisma` or route paths directly.**

## 🧪 Testing Your Setup

```bash
# Start backend
cd backend
npm run dev

# Test health endpoint
curl http://localhost:3001/api/health

# Should return: {"status":"ok"}
```

# Backend Structure (Feature 3 - API & Data Layer)

## 📁 Folder Organization

```
backend/
├── src/
│   ├── server.js          ← Main entry point, CORS config
│   ├── config/            ← Configuration files
│   │   ├── cors.js        ← CORS whitelist
│   │   └── database.js    ← Prisma singleton
│   ├── routes/            ← Route definitions (URL → Controller)
│   │   ├── boards.js      ← Board endpoints
│   │   └── cards.js       ← Card endpoints
│   ├── controllers/       ← Request handlers (Feature 1 & 2 implement here)
│   │   ├── boards.js      ← Board business logic
│   │   └── cards.js       ← Card business logic
│   ├── models/            ← Database access layer (Prisma queries)
│   │   ├── board.js       ← Board CRUD + filtering
│   │   └── card.js        ← Card CRUD + upvote
│   ├── middleware/        ← Shared middleware
│   │   ├── errorHandler.js ← Prisma error handling
│   │   └── validation.js   ← Request validation
│   └── utils/             ← Helper functions (optional)
│       ├── asyncHandler.js
│       ├── responses.js
│       └── README.md
└── prisma/
    ├── schema.prisma      ← Database schema (LOCKED by Feature 3)
    └── seed.js            ← Sample data (4 boards, 8 cards)
```

## 🔒 API Contracts (LOCKED)

### Boards

#### GET /api/boards
List all boards with optional filtering.

**Query Params:**
- `category` (optional) - Filter by category (exact match)
- `search` (optional) - Search in title (case-insensitive)

**Example:**
```bash
GET /api/boards?category=Celebration&search=team
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Team Wins",
    "category": "Celebration",
    "author": "Jennifer",
    "image": "https://...",
    "createdAt": "2026-06-29T...",
    "cards": [...]
  }
]
```

#### GET /api/boards/:id
Get a single board with all its cards.

**Response:** `200 OK` or `404 Not Found`

#### POST /api/boards
Create a new board.

**Body:**
```json
{
  "title": "Team Wins",      // required
  "category": "Celebration", // required
  "author": "Jennifer",      // optional
  "image": "https://..."     // optional
}
```

**Response:** `201 Created` or `400 Bad Request`

#### DELETE /api/boards/:id
Delete a board (cascades to cards).

**Response:** `200 OK` or `404 Not Found`

---

### Cards

#### GET /api/boards/:boardId/cards
List all cards for a specific board.

**Response:** `200 OK`

#### POST /api/cards
Create a new card.

**Body:**
```json
{
  "message": "Great job!",           // required
  "gifUrl": "https://giphy.com/...", // required
  "boardId": 1,                      // required
  "author": "Alex"                   // optional
}
```

**Response:** `201 Created` or `400 Bad Request`

#### PATCH /api/cards/:id/upvote
Increment the upvote count by 1.

**Response:** `200 OK` with updated card

#### DELETE /api/cards/:id
Delete a card.

**Response:** `200 OK` or `404 Not Found`

---

## 👥 Developer Guidelines

### Feature 1 (Home & Boards)
**Your job:** Implement board management on home page

**Files you edit:**
- `src/controllers/boards.js` → Uncomment and implement:
  - `getAllBoards` - Use `Board.findAll({ category, search })`
  - `createBoard` - Use `Board.create(req.body)`
  - `deleteBoard` - Use `Board.delete(req.params.id)`

**Example implementation:**
```js
const getAllBoards = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const boards = await Board.findAll({ category, search });
    return res.json(boards);
  } catch (error) {
    next(error);
  }
};
```

**Do NOT touch:**
- Route paths (`routes/boards.js`)
- Model queries (`models/board.js`)
- Validation middleware

---

### Feature 2 (Board Page & Cards)
**Your job:** Implement card management on board detail page

**Files you edit:**
- `src/controllers/cards.js` → Implement all card methods
- `src/controllers/boards.js` → Implement `getBoard`

**Example implementation:**
```js
const createCard = async (req, res, next) => {
  try {
    const card = await Card.create(req.body);
    return res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};
```

**Do NOT touch:**
- Route paths
- Model queries
- Validation middleware

---

### Feature 3 (API & Data - You)
**Your job:** Maintain infrastructure, NOT implement features

**You own:**
- `schema.prisma` - All schema changes
- `models/` - All database queries
- `middleware/` - Shared utilities
- `config/` - CORS, database config
- Route structure (not controller logic)

**You do NOT touch:**
- Feature-specific controller implementations
- Frontend components

---

## 🚨 Change Request Protocol

If Feature 1 or 2 needs a schema change:

1. **Request:** Open issue or message → "Need `Board.color` field"
2. **Review:** Feature 3 reviews and approves
3. **Implement:** Feature 3 edits `schema.prisma` + runs migration
4. **Update:** Feature 3 updates models if needed
5. **Merge:** Everyone pulls the changes

**Never edit `schema.prisma` directly from Feature 1/2 branches.**

---

## 🚀 Getting Started

### First Time Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env  # If exists, otherwise check .env has DATABASE_URL

# Run migrations
npx prisma migrate dev

# Seed sample data
npm run seed

# Start server
npm run dev
```

### Available Scripts

```bash
npm run dev              # Start with nodemon (hot reload)
npm start                # Start with node
npm run seed             # Load sample data (4 boards, 8 cards)
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio (database GUI)
```

### Environment Variables

Create a `.env` file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/kudos_board"
PORT=3000
NODE_ENV=development
```

---

## 🧪 Testing Your Setup

### Quick Manual Tests

#### 1. Health Check
```bash
curl http://localhost:3000/api/health
# Expected: {"status":"ok"}
```

#### 2. Get All Boards
```bash
curl http://localhost:3000/api/boards
# Expected: Array of 4 boards (from seed data)
```

#### 3. Filter Boards
```bash
curl "http://localhost:3000/api/boards?category=Celebration"
# Expected: 1 board ("Team Wins")
```

#### 4. Search Boards
```bash
curl "http://localhost:3000/api/boards?search=win"
# Expected: 2 boards ("Team Wins", "Recent Wins")
```

#### 5. Validation (should fail)
```bash
curl -X POST http://localhost:3000/api/boards \
  -H "Content-Type: application/json" \
  -d '{"category": "Test"}'
# Expected: 400 {"error":"Title is required"}
```

### Automated Test Scripts

Run comprehensive tests for models, validation, and error handling:

```bash
# Test all model queries and filtering
node src/tests/test-models.js

# Test validation middleware
./src/tests/test-validation.sh

# Test error handler
./src/tests/test-errors.sh
```

**See:** `src/tests/README.md` for detailed test documentation

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -ti:3000

# Kill existing process
kill -9 $(lsof -ti:3000)
```

### Database connection error
```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Reset database
npx prisma migrate reset
npm run seed
```

### Seed data not showing
```bash
# Clear and re-seed
npx prisma migrate reset --force
npm run seed
```

---

## 📚 Additional Resources

- **Model queries:** See `src/models/README.md` (if exists)
- **Utilities:** See `src/utils/README.md`
- **Prisma docs:** https://www.prisma.io/docs
- **Express docs:** https://expressjs.com

---

## ✅ Ready to Merge Checklist

Before merging `api-data` branch to `main`:

- [ ] All models tested (`node src/test-models.js`)
- [ ] Validation works (`./src/test-validation.sh`)
- [ ] Error handling works (`./src/test-errors.sh`)
- [ ] Seed data loads successfully (`npm run seed`)
- [ ] Server starts without errors (`npm run dev`)
- [ ] Health check responds (`curl localhost:3000/api/health`)
- [ ] Documentation is up-to-date (this file)
- [ ] No console.logs left in code
- [ ] All TODOs have assignee comments (Feature 1 or 2)

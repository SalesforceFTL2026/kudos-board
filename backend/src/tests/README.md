# Backend Tests

Quick test scripts to verify Feature 3 infrastructure works correctly.

## 🧪 Available Tests

### 1. Model Tests (`test-models.js`)
Tests all database queries and filtering logic.

```bash
node src/tests/test-models.js
```

**What it tests:**
- Board.findAll() - Get all boards
- Board.findAll({ category }) - Filter by category
- Board.findAll({ search }) - Search by title
- Board.findAll({ category, search }) - Combined filters
- Board.findById() - Get single board with cards
- Card.findByBoardId() - Get cards for a board

**Expected output:**
```
🧪 Testing Models...

1️⃣  Testing Board.findAll() - no filters
   ✅ Found 4 boards
   Titles: Team Wins, Thank You Notes, Inspiration Wall, Recent Wins

...

✅ All model tests passed!
🎉 Testing complete!
```

---

### 2. Validation Tests (`test-validation.sh`)
Tests that validation middleware rejects bad requests.

```bash
./src/tests/test-validation.sh
```

**What it tests:**
- Board creation without title → 400 error
- Board creation without category → 400 error
- Board creation with empty title → 400 error
- Card creation without message → 400 error
- Card creation without gifUrl → 400 error
- Card creation without boardId → 400 error

**Expected output:**
```
🧪 Testing Validation Middleware
================================

Test 1: Create board WITHOUT title (should fail)
Response: {"error":"Title is required"}
✅ PASS - Validation rejected missing title

...

🎉 Validation tests complete!
```

---

### 3. Error Handler Tests (`test-errors.sh`)
Tests that Prisma errors are caught and return proper HTTP codes.

```bash
./src/tests/test-errors.sh
```

**What it tests:**
- GET non-existent board → 404 or 501
- DELETE non-existent board → 404 or 501
- POST card with invalid boardId → 400 or 501
- Validation middleware → 400 with error message

**Expected output:**
```
🧪 Testing Error Handler
========================

Test 1: GET non-existent board (should return 404 from Prisma P2025)
Status: 404
✅ PASS - Returns 404 or 501 (not implemented yet)

...

🎉 Error handler tests complete!
```

**Note:** Some tests return 501 because controllers aren't implemented yet. Once Feature 1 & 2 implement them, you'll see proper error codes.

---

## 🚀 Run All Tests

```bash
# From backend root
node src/tests/test-models.js && \
./src/tests/test-validation.sh && \
./src/tests/test-errors.sh
```

---

## 📋 Pre-Merge Checklist

Before merging `api-data` to `main`, all tests should pass:

- [ ] **Model tests pass** - All queries work, filtering works
- [ ] **Validation tests pass** - Bad requests rejected with 400
- [ ] **Error tests pass** - Proper error codes returned
- [ ] **Seed data loads** - `npm run seed` works
- [ ] **Server starts** - `npm run dev` starts without errors

---

## 🐛 Troubleshooting

### Test scripts won't run
```bash
# Make sure they're executable
chmod +x src/tests/*.sh
```

### "Cannot find module" errors
```bash
# Make sure you're in the backend directory
cd backend

# Reinstall dependencies
npm install
```

### Database connection errors
```bash
# Check PostgreSQL is running
pg_isready

# Reset database
npx prisma migrate reset --force
npm run seed
```

### Server already running on port
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9
```

---

## 📚 For Feature 1 & 2 Developers

These tests verify the infrastructure works. You don't need to run them unless:
- You suspect a bug in models/validation/errors
- You want to verify filtering works before implementing your controller
- You're debugging an issue

**Your job:** Implement the controller logic, not the tests.

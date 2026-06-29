# Utility Functions

## Response Helpers

Use these for consistent API responses:

```js
const { success, created, error, notFound, badRequest } = require("../utils/responses");

// Success response (200)
success(res, { boards });

// Created response (201)
created(res, { board });

// Error responses
notFound(res, "Board not found");
badRequest(res, "Invalid board ID");
error(res, "Something went wrong", 500);
```

## Async Handler (Alternative Pattern)

Optional wrapper to avoid try-catch blocks:

```js
const asyncHandler = require("../utils/asyncHandler");

// Instead of:
const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    next(error);
  }
};

// You can do:
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.findAll();
  res.json(boards);
});
```

**Note:** Controllers already use try-catch, so this is optional.

## Database Singleton

All models use the shared Prisma client:

```js
const getPrismaClient = require("../config/database");
const prisma = getPrismaClient();

// Now all models share ONE connection pool
```

**Benefits:**
- Single connection pool
- Better performance
- Automatic cleanup on shutdown
- Query logging in development

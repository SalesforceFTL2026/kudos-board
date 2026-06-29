# Frontend API Layer (Feature 3 - LOCKED)

## 📦 Usage

**All developers MUST import from `api.js` — never write raw `fetch()` calls.**

### Example (Feature 1 - Home Page)

```jsx
import { getBoards, createBoard, deleteBoard } from './api/api';

// List boards
const boards = await getBoards({ category: 'Celebration' });

// Create board
const newBoard = await createBoard({
  title: "Team Wins",
  category: "Celebration",
  author: "Jennifer"
});

// Delete board
await deleteBoard(boardId);
```

### Example (Feature 2 - Board Page)

```jsx
import { getBoard, getCardsByBoard, createCard, upvoteCard } from './api/api';

// Get board with cards
const board = await getBoard(boardId);

// Get cards only
const cards = await getCardsByBoard(boardId);

// Create card
const newCard = await createCard({
  message: "Great job!",
  gifUrl: "https://giphy.com/...",
  boardId: 1
});

// Upvote card
await upvoteCard(cardId);
```

## 🔒 Rules

1. **Never write raw fetch()** — always use functions from `api.js`
2. **Never change function signatures** — request changes from Feature 3
3. **Never hardcode URLs** — `api.js` handles the base URL

## 🧪 Environment Setup

Create `.env` in the frontend root:

```
VITE_API_URL=http://localhost:3001/api
```

Default is already set to `http://localhost:3001/api` if not specified.

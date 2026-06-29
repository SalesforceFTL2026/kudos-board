# Frontend API Layer (Feature 3 - LOCKED)

## 📦 Usage

**All developers MUST import from `api.js` — never write raw `fetch()` calls.**

This ensures:
- Consistent error handling
- Single source of truth for API URLs
- Easy updates if backend changes

---

## 🎯 Feature 1: Home & Boards

### Import Functions
```jsx
import { getBoards, createBoard, deleteBoard } from './api/api';
```

### Get All Boards (with optional filters)
```jsx
// Get all boards
const boards = await getBoards();

// Filter by category
const boards = await getBoards({ category: 'Celebration' });

// Search by title
const boards = await getBoards({ search: 'team' });

// Both filters
const boards = await getBoards({ 
  category: 'Celebration', 
  search: 'win' 
});
```

### Create Board
```jsx
const newBoard = await createBoard({
  title: "Team Wins",        // required
  category: "Celebration",   // required
  author: "Jennifer",        // optional
  image: "https://..."       // optional
});

// Returns the created board with ID
console.log(newBoard.id);
```

### Delete Board
```jsx
await deleteBoard(boardId);
// Cascades to delete all cards on this board
```

---

## 🎯 Feature 2: Board Page & Cards

### Import Functions
```jsx
import { 
  getBoard, 
  getCardsByBoard, 
  createCard, 
  upvoteCard, 
  deleteCard 
} from './api/api';
```

### Get Single Board (with all cards)
```jsx
const board = await getBoard(boardId);

console.log(board.title);
console.log(board.cards.length);
```

### Get Cards for a Board
```jsx
const cards = await getCardsByBoard(boardId);
// Returns array of cards sorted by newest first
```

### Create Card
```jsx
const newCard = await createCard({
  message: "Great job!",              // required
  gifUrl: "https://giphy.com/...",    // required
  boardId: 1,                         // required
  author: "Alex"                      // optional
});
```

### Upvote Card
```jsx
const updatedCard = await upvoteCard(cardId);
console.log(updatedCard.upvotes); // Incremented by 1
```

### Delete Card
```jsx
await deleteCard(cardId);
```

---

## 🛡️ Error Handling

All API functions throw errors on failure. Wrap them in try-catch:

```jsx
try {
  const boards = await getBoards();
  setBoards(boards);
} catch (error) {
  console.error('Failed to fetch boards:', error);
  setError('Could not load boards. Please try again.');
}
```

### Common Error Responses

```js
// 400 Bad Request (validation failed)
{
  "error": "Title is required"
}

// 404 Not Found
{
  "error": "Record not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}
```

---

## 🔒 Rules

1. **Never write raw fetch()** — always use functions from `api.js`
2. **Never change function signatures** — request changes from Feature 3
3. **Never hardcode URLs** — `api.js` handles the base URL
4. **Always handle errors** — wrap API calls in try-catch

---

## 🧪 Environment Setup

### Option 1: Use Default (Recommended for Development)
No setup needed! Defaults to `http://localhost:3000/api`

### Option 2: Custom URL
Create `.env` in the frontend root:

```bash
VITE_API_URL=http://localhost:3000/api
```

**Note:** Backend runs on port 3000 (check `backend/.env`)

---

## 🧪 Testing the API

### Quick Test in Browser Console

```js
// Open your app in browser, then in console:
import { getBoards } from './src/api/api.js';

const boards = await getBoards();
console.log(boards);
```

### Test with React Component

```jsx
import { useEffect, useState } from 'react';
import { getBoards } from './api/api';

function TestComponent() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBoards()
      .then(setBoards)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Boards: {boards.length}</h1>
      {boards.map(b => <div key={b.id}>{b.title}</div>)}
    </div>
  );
}
```

---

## 📚 Available Functions

| Function | Params | Returns | Feature |
|----------|--------|---------|---------|
| `getBoards(filters)` | `{ category?, search? }` | `Board[]` | Feature 1 |
| `getBoard(id)` | `number` | `Board` | Feature 2 |
| `createBoard(data)` | `{ title, category, author?, image? }` | `Board` | Feature 1 |
| `deleteBoard(id)` | `number` | `void` | Feature 1 |
| `getCardsByBoard(boardId)` | `number` | `Card[]` | Feature 2 |
| `createCard(data)` | `{ message, gifUrl, boardId, author? }` | `Card` | Feature 2 |
| `upvoteCard(id)` | `number` | `Card` | Feature 2 |
| `deleteCard(id)` | `number` | `void` | Feature 2 |

---

## 🐛 Troubleshooting

### CORS Error in Console
```
Access to fetch at 'http://localhost:3000/api/boards' has been blocked by CORS
```

**Solution:** Make sure backend is running on port 3000 and CORS is configured for your frontend port.

### Network Error / Connection Refused
```
Failed to fetch
```

**Solution:** Backend isn't running. Start it:
```bash
cd backend
npm run dev
```

### 404 on all requests
**Solution:** Check `VITE_API_URL` doesn't have a typo or trailing slash

---

## 🎓 Learning Resources

- [Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await Guide](https://javascript.info/async-await)
- [React useEffect Hook](https://react.dev/reference/react/useEffect)

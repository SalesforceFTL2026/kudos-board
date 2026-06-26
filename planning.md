## Section 1: Component Architecture

### Component Hierarchy
```
App
├── HomePage
│   ├── Header
│   ├── Banner
│   ├── SearchBar
│   ├── FilterNav
│   ├── BoardGrid
│   │   └── BoardCard (multiple instances)
│   └── Footer
│   └── NewBoardModal
├── BoardPage
│   ├── Header
│   ├── BoardHeader
│   ├── CardGrid
│   │   └── CardTile (multiple instances)
│   └── NewCardModal
│       └── GifPicker
```

### Component Details

**App**
- **Responsibility**: Root component, handles routing between HomePage and BoardPage
- **Renders**: Routes for HomePage and BoardPage
- **Props**: None
- **State**: None (routing handled by React Router)
- **Interactions**: None (navigation handled by Router)

**HomePage**
- **Responsibility**: Main landing page displaying all boards with search and filter capabilities
- **Renders**: Header, Banner, SearchBar, FilterNav, BoardGrid, Footer, NewBoardModal
- **Props**: None
- **State**: 
  - `boards` (array of board objects)
  - `filteredBoards` (array of filtered/searched board objects)
  - `currentFilter` (string: 'all', 'recent', 'celebration', 'thank you', 'inspiration')
  - `searchQuery` (string)
  - `showNewBoardModal` (boolean)
- **Interactions**: 
  - Fetch all boards on mount
  - Handle filter changes
  - Handle search input
  - Open/close new board modal
  - Delete board
  - Navigate to board detail page

**Header**
- **Responsibility**: Display app title/logo and navigation
- **Renders**: App title, logo, and any navigation links
- **Props**: None
- **State**: None
- **Interactions**: None

**Banner**
- **Responsibility**: Display welcome message or hero section
- **Renders**: Welcome text, tagline, or hero image
- **Props**: None
- **State**: None
- **Interactions**: None

**SearchBar**
- **Responsibility**: Allow users to search boards by title
- **Renders**: Text input field, search button, clear button
- **Props**: 
  - `searchQuery` (string)
  - `onSearchChange` (function)
  - `onSearchSubmit` (function)
  - `onClear` (function)
- **State**: None (controlled by parent HomePage)
- **Interactions**: 
  - Update search query on input change
  - Submit search on Enter key or button click
  - Clear search input

**FilterNav**
- **Responsibility**: Provide category filter buttons
- **Renders**: Filter buttons or dropdown for categories
- **Props**: 
  - `currentFilter` (string)
  - `onFilterChange` (function)
- **State**: None (controlled by parent HomePage)
- **Interactions**: Click filter button to change active category

**BoardGrid**
- **Responsibility**: Display boards in a grid layout
- **Renders**: Multiple BoardCard components
- **Props**: 
  - `boards` (array of board objects)
  - `onDeleteBoard` (function)
- **State**: None
- **Interactions**: Pass delete handler to BoardCard children

**BoardCard**
- **Responsibility**: Display individual board preview with title, image, and delete option
- **Renders**: Board image/gif, title, category badge, delete button
- **Props**: 
  - `board` (object: { id, title, category, author, image })
  - `onDelete` (function)
- **State**: None
- **Interactions**: 
  - Navigate to board detail page on click
  - Delete board via delete button

**Footer**
- **Responsibility**: Display footer information
- **Renders**: Copyright, links, or additional info
- **Props**: None
- **State**: None
- **Interactions**: None

**NewBoardModal**
- **Responsibility**: Modal form for creating a new board
- **Renders**: Form with inputs for title, category, author, and submit button
- **Props**: 
  - `isOpen` (boolean)
  - `onClose` (function)
  - `onSubmit` (function)
- **State**: 
  - `formData` (object: { title, category, author, image })
  - `errors` (object for validation errors)
- **Interactions**: 
  - Handle form input changes
  - Validate required fields
  - Submit new board data
  - Close modal

**BoardPage**
- **Responsibility**: Display individual board with all its cards
- **Renders**: Header, BoardHeader, CardGrid, NewCardModal
- **Props**: None
- **State**: 
  - `board` (object with board details)
  - `cards` (array of card objects)
  - `showNewCardModal` (boolean)
- **Interactions**: 
  - Fetch board details and cards on mount based on URL param
  - Open/close new card modal
  - Handle card deletion
  - Handle card upvote

**BoardHeader**
- **Responsibility**: Display board title, category, author, and "Add Card" button
- **Renders**: Board title, category badge, author info, "Add Card" button
- **Props**: 
  - `board` (object: { title, category, author })
  - `onAddCardClick` (function)
- **State**: None
- **Interactions**: Open new card modal

**CardGrid**
- **Responsibility**: Display cards in a grid layout
- **Renders**: Multiple CardTile components
- **Props**: 
  - `cards` (array of card objects)
  - `onUpvote` (function)
  - `onDelete` (function)
- **State**: None
- **Interactions**: Pass upvote and delete handlers to CardTile children

**CardTile**
- **Responsibility**: Display individual card with message, gif, upvotes, and delete button
- **Renders**: Card message, gif, upvote count, upvote button, delete button, author (if provided)
- **Props**: 
  - `card` (object: { id, message, gifUrl, upvotes, author })
  - `onUpvote` (function)
  - `onDelete` (function)
- **State**: None
- **Interactions**: 
  - Upvote card
  - Delete card

**NewCardModal**
- **Responsibility**: Modal form for creating a new card
- **Renders**: Form with inputs for message, author, and GifPicker component
- **Props**: 
  - `isOpen` (boolean)
  - `boardId` (number)
  - `onClose` (function)
  - `onSubmit` (function)
- **State**: 
  - `formData` (object: { message, gifUrl, author })
  - `errors` (object for validation errors)
- **Interactions**: 
  - Handle form input changes
  - Validate required fields
  - Submit new card data
  - Close modal

**GifPicker**
- **Responsibility**: Search and select gifs from GIPHY API
- **Renders**: Search input, grid of gif results, selected gif preview
- **Props**: 
  - `onGifSelect` (function)
  - `selectedGif` (string URL)
- **State**: 
  - `searchQuery` (string)
  - `gifs` (array of gif objects from GIPHY)
  - `isLoading` (boolean)
- **Interactions**: 
  - Search GIPHY API
  - Select a gif
  - Display selected gif

---

## Section 2: API Contracts

### Boards Endpoints

**GET /api/boards**
- **Description**: Fetch all boards
- **Query Parameters**: 
  - `filter` (optional): 'recent' | 'celebration' | 'thank you' | 'inspiration'
  - `search` (optional): search query string
- **Request Body**: None
- **Success Response** (200):
  ```json
  {
    "boards": [
      {
        "id": 1,
        "title": "Team Appreciation",
        "category": "thank you",
        "author": "John Doe",
        "image": "https://example.com/image.gif",
        "createdAt": "2026-06-26T10:00:00Z"
      }
    ]
  }
  ```
- **Error Responses**:
  - 500: `{ "error": "Failed to fetch boards" }`

**GET /api/boards/:id**
- **Description**: Fetch a single board by ID
- **Request Body**: None
- **Success Response** (200):
  ```json
  {
    "id": 1,
    "title": "Team Appreciation",
    "category": "thank you",
    "author": "John Doe",
    "image": "https://example.com/image.gif",
    "createdAt": "2026-06-26T10:00:00Z"
  }
  ```
- **Error Responses**:
  - 404: `{ "error": "Board not found" }`
  - 500: `{ "error": "Failed to fetch board" }`

**POST /api/boards**
- **Description**: Create a new board
- **Request Body**:
  ```json
  {
    "title": "Team Appreciation",      // required, string
    "category": "thank you",            // required, string (enum)
    "author": "John Doe",               // optional, string
    "image": "https://example.com/image.gif"  // optional, string (URL)
  }
  ```
- **Success Response** (201):
  ```json
  {
    "id": 1,
    "title": "Team Appreciation",
    "category": "thank you",
    "author": "John Doe",
    "image": "https://example.com/image.gif",
    "createdAt": "2026-06-26T10:00:00Z"
  }
  ```
- **Error Responses**:
  - 400: `{ "error": "Title and category are required" }`
  - 400: `{ "error": "Invalid category" }`
  - 500: `{ "error": "Failed to create board" }`

**DELETE /api/boards/:id**
- **Description**: Delete a board by ID
- **Request Body**: None
- **Success Response** (200):
  ```json
  {
    "message": "Board deleted successfully"
  }
  ```
- **Error Responses**:
  - 404: `{ "error": "Board not found" }`
  - 500: `{ "error": "Failed to delete board" }`

### Cards Endpoints

**GET /api/boards/:boardId/cards**
- **Description**: Fetch all cards for a specific board
- **Request Body**: None
- **Success Response** (200):
  ```json
  {
    "cards": [
      {
        "id": 1,
        "message": "Great job on the presentation!",
        "gifUrl": "https://media.giphy.com/media/xyz/giphy.gif",
        "upvotes": 5,
        "author": "Jane Smith",
        "boardId": 1,
        "createdAt": "2026-06-26T10:30:00Z"
      }
    ]
  }
  ```
- **Error Responses**:
  - 404: `{ "error": "Board not found" }`
  - 500: `{ "error": "Failed to fetch cards" }`

**POST /api/boards/:boardId/cards**
- **Description**: Create a new card for a specific board
- **Request Body**:
  ```json
  {
    "message": "Great job!",           // required, string
    "gifUrl": "https://giphy.com/...", // required, string (URL)
    "author": "Jane Smith"             // optional, string
  }
  ```
- **Success Response** (201):
  ```json
  {
    "id": 1,
    "message": "Great job!",
    "gifUrl": "https://giphy.com/...",
    "upvotes": 0,
    "author": "Jane Smith",
    "boardId": 1,
    "createdAt": "2026-06-26T10:30:00Z"
  }
  ```
- **Error Responses**:
  - 400: `{ "error": "Message and gifUrl are required" }`
  - 404: `{ "error": "Board not found" }`
  - 500: `{ "error": "Failed to create card" }`

**PUT /api/cards/:id/upvote**
- **Description**: Increment the upvote count for a card
- **Request Body**: None
- **Success Response** (200):
  ```json
  {
    "id": 1,
    "upvotes": 6
  }
  ```
- **Error Responses**:
  - 404: `{ "error": "Card not found" }`
  - 500: `{ "error": "Failed to upvote card" }`

**DELETE /api/cards/:id**
- **Description**: Delete a card by ID
- **Request Body**: None
- **Success Response** (200):
  ```json
  {
    "message": "Card deleted successfully"
  }
  ```
- **Error Responses**:
  - 404: `{ "error": "Card not found" }`
  - 500: `{ "error": "Failed to delete card" }`

---

## Section 3: Database Schema Spec

### Board Model
```prisma
model Board {
  id        Int      @id @default(autoincrement())
  title     String
  category  String   // enum: 'celebration', 'thank you', 'inspiration'
  author    String?  // optional
  image     String?  // optional, URL to board image/gif
  createdAt DateTime @default(now())
  cards     Card[]   // one-to-many relationship with Card
}
```

**Field Details**:
- `id`: Primary key, auto-incrementing integer
- `title`: Board title (required)
- `category`: Board category (required) - should be one of: 'celebration', 'thank you', 'inspiration'
- `author`: Board creator name (optional)
- `image`: URL to board image or gif (optional)
- `createdAt`: Timestamp of board creation (auto-generated)
- `cards`: Relationship field - one board has many cards

### Card Model
```prisma
model Card {
  id        Int      @id @default(autoincrement())
  message   String
  gifUrl    String   // URL to GIPHY gif
  upvotes   Int      @default(0)
  author    String?  // optional
  boardId   Int
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}
```

**Field Details**:
- `id`: Primary key, auto-incrementing integer
- `message`: Card message text (required)
- `gifUrl`: URL to GIPHY gif (required)
- `upvotes`: Number of upvotes (defaults to 0)
- `author`: Card author name (optional)
- `boardId`: Foreign key referencing Board (required)
- `board`: Relationship field - many cards belong to one board
- `createdAt`: Timestamp of card creation (auto-generated)
- `onDelete: Cascade`: When a board is deleted, all its cards are automatically deleted

**Relationships**:
- One Board can have many Cards (one-to-many)
- Each Card belongs to exactly one Board
- Deleting a Board cascades to delete all associated Cards

---

## Section 4: State Architecture

### HomePage State

**`boards`**
- **Type**: `Array<Board>` where Board = `{ id, title, category, author, image, createdAt }`
- **Initial Value**: `[]`
- **Owner**: HomePage component
- **Trigger**: Fetched from API on component mount via `GET /api/boards`
- **Updates**: 
  - After creating a new board
  - After deleting a board

**`filteredBoards`**
- **Type**: `Array<Board>`
- **Initial Value**: `[]` (same as boards initially)
- **Owner**: HomePage component
- **Trigger**: 
  - Filter change (dropdown/nav selection)
  - Search query submission
  - Clear search
- **Updates**: Derived from `boards` based on `currentFilter` and `searchQuery`

**`currentFilter`**
- **Type**: `string` ('all' | 'recent' | 'celebration' | 'thank you' | 'inspiration')
- **Initial Value**: `'all'`
- **Owner**: HomePage component
- **Trigger**: User clicks a filter button or dropdown option
- **Updates**: When FilterNav selection changes

**`searchQuery`**
- **Type**: `string`
- **Initial Value**: `''`
- **Owner**: HomePage component
- **Trigger**: 
  - User types in search input
  - User clicks search/submit button
  - User clicks clear button
- **Updates**: 
  - On input change
  - On clear (reset to empty string)

**`showNewBoardModal`**
- **Type**: `boolean`
- **Initial Value**: `false`
- **Owner**: HomePage component
- **Trigger**: 
  - User clicks "Create New Board" button
  - User submits form or cancels
- **Updates**: Toggle between true/false

### NewBoardModal State

**`formData`**
- **Type**: `{ title: string, category: string, author: string, image: string }`
- **Initial Value**: `{ title: '', category: '', author: '', image: '' }`
- **Owner**: NewBoardModal component
- **Trigger**: User types in form inputs or selects category
- **Updates**: On each input change
- **Reset**: When modal closes or form submits successfully

**`errors`**
- **Type**: `{ title?: string, category?: string }`
- **Initial Value**: `{}`
- **Owner**: NewBoardModal component
- **Trigger**: Form validation on submit
- **Updates**: When validation fails (required fields missing)
- **Reset**: When modal closes or form submits successfully

### BoardPage State

**`board`**
- **Type**: `Board | null` where Board = `{ id, title, category, author, image, createdAt }`
- **Initial Value**: `null`
- **Owner**: BoardPage component
- **Trigger**: Fetched from API on component mount via `GET /api/boards/:id`
- **Updates**: Only on initial load (board details don't change)

**`cards`**
- **Type**: `Array<Card>` where Card = `{ id, message, gifUrl, upvotes, author, boardId, createdAt }`
- **Initial Value**: `[]`
- **Owner**: BoardPage component
- **Trigger**: Fetched from API on component mount via `GET /api/boards/:boardId/cards`
- **Updates**: 
  - After creating a new card
  - After deleting a card
  - After upvoting a card

**`showNewCardModal`**
- **Type**: `boolean`
- **Initial Value**: `false`
- **Owner**: BoardPage component
- **Trigger**: 
  - User clicks "Add Card" button
  - User submits form or cancels
- **Updates**: Toggle between true/false

### NewCardModal State

**`formData`**
- **Type**: `{ message: string, gifUrl: string, author: string }`
- **Initial Value**: `{ message: '', gifUrl: '', author: '' }`
- **Owner**: NewCardModal component
- **Trigger**: 
  - User types in message input
  - User selects a gif from GifPicker
  - User types in author input
- **Updates**: On each input change or gif selection
- **Reset**: When modal closes or form submits successfully

**`errors`**
- **Type**: `{ message?: string, gifUrl?: string }`
- **Initial Value**: `{}`
- **Owner**: NewCardModal component
- **Trigger**: Form validation on submit
- **Updates**: When validation fails (required fields missing)
- **Reset**: When modal closes or form submits successfully

### GifPicker State

**`searchQuery`**
- **Type**: `string`
- **Initial Value**: `''`
- **Owner**: GifPicker component
- **Trigger**: User types in gif search input
- **Updates**: On input change

**`gifs`**
- **Type**: `Array<{ id: string, url: string, title: string }>`
- **Initial Value**: `[]`
- **Owner**: GifPicker component
- **Trigger**: User searches for gifs (GIPHY API call)
- **Updates**: After successful API response from GIPHY

**`isLoading`**
- **Type**: `boolean`
- **Initial Value**: `false`
- **Owner**: GifPicker component
- **Trigger**: 
  - Before GIPHY API call starts (set to true)
  - After GIPHY API call completes (set to false)
- **Updates**: Toggle during API call lifecycle

**`selectedGif`**
- **Type**: `string` (URL)
- **Initial Value**: `''`
- **Owner**: GifPicker component (or passed from parent NewCardModal)
- **Trigger**: User clicks on a gif from search results
- **Updates**: When user selects a gif

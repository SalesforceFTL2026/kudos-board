const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boards");
const cardsController = require("../controllers/cards");
const { validateBoardCreate } = require("../middleware/validation");

// GET /api/boards - List all boards (with optional filters)
router.get("/", boardsController.getAllBoards);

// POST /api/boards - Create a new board
router.post("/", validateBoardCreate, boardsController.createBoard);

// GET /api/boards/:id - Get a single board
router.get("/:id", boardsController.getBoard);

// GET /api/boards/:boardId/cards - List all cards for a board
router.get("/:boardId/cards", cardsController.getCardsByBoard);

// DELETE /api/boards/:id - Delete a board
router.delete("/:id", boardsController.deleteBoard);

module.exports = router;

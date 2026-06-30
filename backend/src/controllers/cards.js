const Card = require("../models/card");
const Board = require("../models/board");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/boards/:boardId/cards
const getCardsByBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.boardId);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  const cards = await Card.findByBoardId(req.params.boardId);
  res.json(cards);
});

// POST /api/cards
// Body: { message, gifUrl, author?, boardId }
const createCard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.boardId);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  const card = await Card.create(req.body);
  res.status(201).json(card);
});

// PATCH /api/cards/:id/upvote
const upvoteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  const updated = await Card.upvote(req.params.id);
  res.json(updated);
});

// DELETE /api/cards/:id
const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  await Card.delete(req.params.id);
  res.json({ message: "Card deleted successfully" });
});

module.exports = {
  getCardsByBoard,
  createCard,
  upvoteCard,
  deleteCard,
};

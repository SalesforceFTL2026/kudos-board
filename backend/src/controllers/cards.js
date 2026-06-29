const Card = require("../models/card");

// GET /api/boards/:boardId/cards
const getCardsByBoard = async (req, res) => {
  // TODO: Feature 2 - Implement cards listing for a board
  res.status(501).json({ error: "Not implemented yet" });
};

// POST /api/cards
const createCard = async (req, res) => {
  // TODO: Feature 2 - Implement card creation
  // Body: { message, gifUrl, author?, boardId }
  res.status(501).json({ error: "Not implemented yet" });
};

// PATCH /api/cards/:id/upvote
const upvoteCard = async (req, res) => {
  // TODO: Feature 2 - Implement card upvote
  res.status(501).json({ error: "Not implemented yet" });
};

// DELETE /api/cards/:id
const deleteCard = async (req, res) => {
  // TODO: Feature 2 - Implement card deletion
  res.status(501).json({ error: "Not implemented yet" });
};

module.exports = {
  getCardsByBoard,
  createCard,
  upvoteCard,
  deleteCard,
};

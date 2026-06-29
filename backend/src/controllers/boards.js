const Board = require("../models/board");

// GET /api/boards
const getAllBoards = async (req, res) => {
  // TODO: Feature 1 - Implement board listing with filters
  // Query params: category, search
  res.status(501).json({ error: "Not implemented yet" });
};

// POST /api/boards
const createBoard = async (req, res) => {
  // TODO: Feature 1 - Implement board creation
  // Body: { title, category, author?, image? }
  res.status(501).json({ error: "Not implemented yet" });
};

// GET /api/boards/:id
const getBoard = async (req, res) => {
  // TODO: Feature 2 - Implement single board fetch
  res.status(501).json({ error: "Not implemented yet" });
};

// DELETE /api/boards/:id
const deleteBoard = async (req, res) => {
  // TODO: Feature 1 - Implement board deletion
  res.status(501).json({ error: "Not implemented yet" });
};

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
};

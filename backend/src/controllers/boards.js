const Board = require("../models/board");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/boards
// Query params: category, search
const getAllBoards = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const boards = await Board.findAll({ category, search });
  res.json(boards);
});

// POST /api/boards
// Body: { title, category, author?, image? }
const createBoard = asyncHandler(async (req, res) => {
  const board = await Board.create(req.body);
  res.status(201).json(board);
});

// GET /api/boards/:id
const getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  res.json(board);
});

// DELETE /api/boards/:id
const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  await Board.delete(req.params.id);
  res.json({ message: "Board deleted successfully" });
});

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
};

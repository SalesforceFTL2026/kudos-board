const Board = require("../models/board");

// GET /api/boards
const getAllBoards = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const boards = await Board.findAll({ category, search });
    return res.json(boards);
  } catch (error) {
    next(error);
  }
};

// POST /api/boards
const createBoard = async (req, res, next) => {
  try {
    const { title, category, author, image } = req.body;
    const board = await Board.create({ title, category, author, image });
    return res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

// GET /api/boards/:id
const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    return res.json(board);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/boards/:id
const deleteBoard = async (req, res, next) => {
  try {
    await Board.delete(req.params.id);
    return res.json({ message: "Board deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
};

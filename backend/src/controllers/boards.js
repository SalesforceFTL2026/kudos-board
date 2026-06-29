const Board = require("../models/board");

// GET /api/boards
const getAllBoards = async (req, res, next) => {
  try {
    // TODO: Feature 1 - Implement board listing with filters
    // Query params: category, search
    // const { category, search } = req.query;
    // const boards = await Board.findAll({ category, search });
    // return res.json(boards);

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

// POST /api/boards
const createBoard = async (req, res, next) => {
  try {
    // TODO: Feature 1 - Implement board creation
    // Body: { title, category, author?, image? }
    // const board = await Board.create(req.body);
    // return res.status(201).json(board);

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

// GET /api/boards/:id
const getBoard = async (req, res, next) => {
  try {
    // TODO: Feature 2 - Implement single board fetch
    // const board = await Board.findById(req.params.id);
    // if (!board) {
    //   return res.status(404).json({ error: "Board not found" });
    // }
    // return res.json(board);

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/boards/:id
const deleteBoard = async (req, res, next) => {
  try {
    // TODO: Feature 1 - Implement board deletion
    // await Board.delete(req.params.id);
    // return res.json({ message: "Board deleted successfully" });

    res.status(501).json({ error: "Not implemented yet" });
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

const Card = require("../models/card");

// GET /api/boards/:boardId/cards
const getCardsByBoard = async (req, res, next) => {
  try {
    // TODO: Feature 2 - Implement cards listing for a board
    // const cards = await Card.findByBoardId(req.params.boardId);
    // return res.json(cards);

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

// POST /api/cards
const createCard = async (req, res, next) => {
  try {
    // TODO: Feature 2 - Implement card creation
    // Body: { message, gifUrl, author?, boardId }
    // const card = await Card.create(req.body);
    // return res.status(201).json(card);

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/cards/:id/upvote
const upvoteCard = async (req, res, next) => {
  try {
    // TODO: Feature 2 - Implement card upvote
    // const card = await Card.upvote(req.params.id);
    // return res.json(card);

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cards/:id
const deleteCard = async (req, res, next) => {
  try {
    // TODO: Feature 2 - Implement card deletion
    // await Card.delete(req.params.id);
    // return res.json({ message: "Card deleted successfully" });

    res.status(501).json({ error: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCardsByBoard,
  createCard,
  upvoteCard,
  deleteCard,
};

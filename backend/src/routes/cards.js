const express = require("express");
const router = express.Router();
const cardsController = require("../controllers/cards");

// GET /api/boards/:boardId/cards - List all cards for a board
router.get("/boards/:boardId/cards", cardsController.getCardsByBoard);

// POST /api/cards - Create a new card
router.post("/", cardsController.createCard);

// PATCH /api/cards/:id/upvote - Upvote a card
router.patch("/:id/upvote", cardsController.upvoteCard);

// DELETE /api/cards/:id - Delete a card
router.delete("/:id", cardsController.deleteCard);

module.exports = router;

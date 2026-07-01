const express = require("express");
const router = express.Router();
const cardsController = require("../controllers/cards");
const { validateCardCreate } = require("../middleware/validation");

// POST /api/cards - Create a new card
router.post("/", validateCardCreate, cardsController.createCard);

// PATCH /api/cards/:id/upvote - Upvote a card
router.patch("/:id/upvote", cardsController.upvoteCard);

// DELETE /api/cards/:id - Delete a card
router.delete("/:id", cardsController.deleteCard);

module.exports = router;

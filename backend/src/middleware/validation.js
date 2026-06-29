// Validation middleware for request data

const validateBoardCreate = (req, res, next) => {
  const { title, category } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!category || typeof category !== "string" || category.trim().length === 0) {
    return res.status(400).json({ error: "Category is required" });
  }

  next();
};

const validateCardCreate = (req, res, next) => {
  const { message, gifUrl, boardId } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!gifUrl || typeof gifUrl !== "string") {
    return res.status(400).json({ error: "GIF URL is required" });
  }

  if (!boardId || typeof boardId !== "number") {
    return res.status(400).json({ error: "Board ID is required" });
  }

  next();
};

module.exports = {
  validateBoardCreate,
  validateCardCreate,
};

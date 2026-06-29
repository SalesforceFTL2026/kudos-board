require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Routes
const boardsRouter = require("./routes/boards");
const cardsRouter = require("./routes/cards");

// Middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// API Routes
app.use("/api/boards", boardsRouter);
app.use("/api/cards", cardsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

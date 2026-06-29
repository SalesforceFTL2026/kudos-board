require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Routes
const boardsRouter = require("./routes/boards");
const cardsRouter = require("./routes/cards");

// Middleware
const errorHandler = require("./middleware/errorHandler");

// Config
const corsOptions = require("./config/cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

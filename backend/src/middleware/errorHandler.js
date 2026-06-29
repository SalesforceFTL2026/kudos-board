const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);

  // Prisma Client errors
  if (err.code) {
    switch (err.code) {
      case "P2002":
        // Unique constraint violation
        return res.status(409).json({
          error: "A record with this value already exists",
        });

      case "P2025":
        // Record not found
        return res.status(404).json({
          error: "Record not found",
        });

      case "P2003":
        // Foreign key constraint failed
        return res.status(400).json({
          error: "Invalid reference - related record does not exist",
        });

      case "P2014":
        // Required relation violation
        return res.status(400).json({
          error: "The change violates a required relation",
        });

      case "P2023":
        // Inconsistent column data
        return res.status(400).json({
          error: "Invalid data format",
        });

      default:
        // Other Prisma errors
        console.error("Unhandled Prisma error code:", err.code);
        return res.status(500).json({
          error: "Database error occurred",
        });
    }
  }

  // Validation errors (from express-validator or custom)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: err.message || "Validation failed",
    });
  }

  // JWT errors (if you add authentication later)
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
    });
  }

  // Default error response
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Internal server error",
  });
};

module.exports = errorHandler;

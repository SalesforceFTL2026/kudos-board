const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173", // Vite default
      "http://localhost:3000", // React default
      "http://localhost:5174", // Vite alternative
      "http://localhost:5175", // Vite alternative 2
      "http://localhost:5176", // Vite alternative 3
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5175",
      "http://127.0.0.1:5176",
    ];

    // Add production URLs here when deployed
    // allowedOrigins.push("https://your-production-domain.com");

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOptions;

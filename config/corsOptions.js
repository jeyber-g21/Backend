// config/corsOptions.js
const corsOptions = {
  origin: [
    // "http://localhost:4200", // Tu frontend con angular local
    "http://localhost:5173", // Tu frontend con react local
    "https://tudominio.com", // Tu frontend en producción
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = corsOptions;

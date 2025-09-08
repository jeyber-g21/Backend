// config/corsOptions.js
const corsOptions = {
  origin: [
    "http://localhost:4200", // Tu frontend local
    "https://tudominio.com", // Tu frontend en producción
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = corsOptions;

"use strict";

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_basedatos", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

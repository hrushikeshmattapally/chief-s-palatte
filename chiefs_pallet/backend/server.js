const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const authRoutes = require("./routes/authRoutes"); // ✅ Corrected import
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// ✅ CORS Middleware (Allow requests from frontend)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({ limit: "10mb" })); // Allow JSON up to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes); // ✅ Ensures login and register work
app.use("/api/recipes", recipeRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

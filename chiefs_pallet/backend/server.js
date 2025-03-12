const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// ✅ CORS Middleware (Allow requests from frontend)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({ limit: "10mb" })); // Allow JSON up to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));


// ✅ Middleware for JSON parsing
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

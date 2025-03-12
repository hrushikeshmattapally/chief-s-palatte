const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { updateUser } = require("../controllers/usercontrollers"); // ✅ Import updateUser
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import authMiddleware

// Route: Update user profile
router.put("/update", authMiddleware, updateUser);
// 🔹 Check if Username Exists
router.post("/check-username", async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ username });
        res.json({ exists: !!existingUser });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// 🔹 Register a New User
router.post("/register", async (req, res) => {
    try {
        const { username, password, name, email, phone, address, city, state, zip } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already taken!" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
});


// 🔹 User Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user: { username: user.username, id: user._id } });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;



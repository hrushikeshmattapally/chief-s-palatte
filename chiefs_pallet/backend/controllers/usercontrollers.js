const User = require("../models/User"); // Import User model

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
const updateUser = async (req, res) => {
    try {
        console.log("Received update request:", req.body); // Debugging log
        
        // Ensure user ID is extracted from JWT (set in authMiddleware)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user ID" });
        }

        const userId = req.user.id;
        const { username, email, profilePic } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only the fields that are provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePic !== undefined) user.profilePic = profilePic; // Ensures profilePic is updated even if empty

        // Save updated user details
        await user.save();

        console.log("User updated successfully:", user); // Debugging log

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { updateUser };


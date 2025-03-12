// models/Recipe.js

const mongoose = require('mongoose'); // ✅ Add this at the top


const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    category: { type: String }
});

module.exports = mongoose.model('Recipe', RecipeSchema);

// routes/recipeRoutes.js
const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Create a new recipe
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newRecipe = new Recipe({
            ...req.body,
            createdBy: req.user.id
        });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('createdBy', 'name');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name');
        if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a recipe
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a recipe
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find({});
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single menu item
// @route   GET /api/menu/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
router.post('/', async (req, res) => {
    // Add auth middleware later
    try {
        const { name, price, category, isVeg, spiceLevel, description, imageURL } = req.body;
        const item = new MenuItem({
            name, price, category, isVeg, spiceLevel, description, imageURL
        });
        const createdItem = await item.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

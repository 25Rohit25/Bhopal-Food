const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'Vegetables', 'Paneer', 'Chinese'
    isVeg: { type: Boolean, default: true },
    spiceLevel: { type: String, enum: ['Mild', 'Medium', 'Spicy'], default: 'Medium' },
    isBestseller: { type: Boolean, default: false },
    isOutOfStock: { type: Boolean, default: false },
    imageURL: { type: String }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;

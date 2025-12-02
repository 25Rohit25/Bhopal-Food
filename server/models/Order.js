const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    trainNumber: { type: String, required: true },
    coach: { type: String, required: true },
    seatNumber: { type: String, required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            name: { type: String, required: true }, // Snapshot of name
            price: { type: Number, required: true }, // Snapshot of price
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Placed', 'Accepted', 'Cooking', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Placed'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

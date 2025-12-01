const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { validate, orderSchema } = require('../middleware/validation');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
router.post('/', validate(orderSchema), async (req, res) => {
    const {
        customerName,
        phone,
        trainNumber,
        coach,
        seatNumber,
        items,
        totalAmount
    } = req.body;

    if (items && items.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            customerName,
            phone,
            trainNumber,
            coach,
            seatNumber,
            items,
            totalAmount
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

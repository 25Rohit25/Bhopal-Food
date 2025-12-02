const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all active coupons
// @route   GET /api/coupons
// @access  Public
router.get('/', async (req, res) => {
    try {
        const coupons = await Coupon.find({
            isActive: true,
            expiryDate: { $gte: new Date() }
        });
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { code, description, discountPercentage, maxDiscountAmount, minOrderAmount, expiryDate } = req.body;

    const couponExists = await Coupon.findOne({ code });

    if (couponExists) {
        res.status(400).json({ message: 'Coupon already exists' });
        return;
    }

    const coupon = await Coupon.create({
        code,
        description,
        discountPercentage,
        maxDiscountAmount,
        minOrderAmount,
        expiryDate
    });

    if (coupon) {
        res.status(201).json(coupon);
    } else {
        res.status(400).json({ message: 'Invalid coupon data' });
    }
});

// @desc    Validate a coupon
// @route   POST /api/coupons/validate
// @access  Public
router.post('/validate', async (req, res) => {
    const { code, orderAmount } = req.body;

    const coupon = await Coupon.findOne({ code, isActive: true });

    if (coupon) {
        if (coupon.expiryDate < new Date()) {
            res.status(400).json({ message: 'Coupon expired' });
        } else if (orderAmount < coupon.minOrderAmount) {
            res.status(400).json({ message: `Minimum order amount is ₹${coupon.minOrderAmount}` });
        } else {
            res.json(coupon);
        }
    } else {
        res.status(404).json({ message: 'Invalid coupon code' });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    maxDiscountAmount: { type: Number, required: true },
    minOrderAmount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;

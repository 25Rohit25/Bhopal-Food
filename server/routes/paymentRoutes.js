const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Replace with real key in .env
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_1234567890' // Replace with real secret in .env
});

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Amount in smallest currency unit (paise)
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Verify Payment (Optional but recommended for security)
router.post('/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'secret_1234567890')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

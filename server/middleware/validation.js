const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.errors.map(e => ({ field: e.path[0], message: e.message }))
            });
        }
        return res.status(400).json({ message: 'Validation Error', error: error.message });
    }
};

// User Schemas
const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').optional()
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

// Order Schema
const orderSchema = z.object({
    customerName: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    trainNumber: z.string().min(3, 'Train number is required'),
    coach: z.string().min(1, 'Coach is required'),
    seatNumber: z.string().min(1, 'Seat number is required'),
    items: z.array(z.object({
        menuItem: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
        price: z.number()
    })).min(1, 'Cart cannot be empty'),
    totalAmount: z.number().min(0),
    paymentId: z.string().optional()
});

module.exports = { validate, registerSchema, loginSchema, orderSchema };

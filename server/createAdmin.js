const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        const userExists = await User.findOne({ email: 'admin@example.com' });
        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const user = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            isAdmin: true
        });

        console.log('Admin user created: admin@example.com / password123');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await MenuItem.deleteMany();

        const menuItems = [
            // Vegetables
            {
                name: 'Aloo Gobi',
                price: 120,
                category: 'Vegetables',
                isVeg: true,
                spiceLevel: 'Medium',
                description: 'Potatoes and cauliflower cooked with spices',
                imageURL: '/images/aloo-gobi.jpg'
            },
            {
                name: 'Mix Veg',
                price: 140,
                category: 'Vegetables',
                isVeg: true,
                spiceLevel: 'Mild',
                description: 'Seasonal vegetables cooked in a rich gravy',
                imageURL: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80'
            },
            // Paneer
            {
                name: 'Paneer Butter Masala',
                price: 180,
                category: 'Paneer',
                isVeg: true,
                spiceLevel: 'Mild',
                isBestseller: true,
                description: 'Cottage cheese simmered in a rich tomato gravy',
                imageURL: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80'
            },
            {
                name: 'Kadai Paneer',
                price: 190,
                category: 'Paneer',
                isVeg: true,
                spiceLevel: 'Spicy',
                description: 'Paneer cooked with bell peppers and fresh spices',
                imageURL: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80'
            },
            // Non-Veg Gravy
            {
                name: 'Chicken Curry',
                price: 220,
                category: 'Non-Veg Gravy',
                isVeg: false,
                spiceLevel: 'Spicy',
                isBestseller: true,
                description: 'Traditional chicken curry with aromatic spices',
                imageURL: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80'
            },
            {
                name: 'Butter Chicken',
                price: 240,
                category: 'Non-Veg Gravy',
                isVeg: false,
                spiceLevel: 'Mild',
                description: 'Chicken cooked in a creamy tomato sauce',
                imageURL: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80'
            },
            // Rice/Biryani
            {
                name: 'Veg Biryani',
                price: 160,
                category: 'Rice/Biryani',
                isVeg: true,
                spiceLevel: 'Medium',
                description: 'Aromatic basmati rice cooked with vegetables',
                imageURL: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80'
            },
            {
                name: 'Chicken Biryani',
                price: 200,
                category: 'Rice/Biryani',
                isVeg: false,
                spiceLevel: 'Spicy',
                isBestseller: true,
                description: 'Flavorful rice dish with marinated chicken',
                imageURL: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80'
            },
            // Thali
            {
                name: 'Standard Veg Thali',
                price: 150,
                category: 'Thali',
                isVeg: true,
                spiceLevel: 'Medium',
                description: 'Dal, Seasonal Veg, Rice, 2 Rotis, Salad, Pickle',
                imageURL: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80'
            },
            {
                name: 'Deluxe Veg Thali',
                price: 220,
                category: 'Thali',
                isVeg: true,
                spiceLevel: 'Medium',
                description: 'Paneer, Dal Makhani, Veg Pulao, 2 Naan, Sweet, Salad',
                imageURL: '/images/deluxe-veg-thali.jpg'
            },
            // Chinese
            {
                name: 'Veg Noodles',
                price: 100,
                category: 'Chinese',
                isVeg: true,
                spiceLevel: 'Medium',
                description: 'Stir-fried noodles with vegetables',
                imageURL: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&q=80'
            },
            {
                name: 'Chicken Fried Rice',
                price: 150,
                category: 'Chinese',
                isVeg: false,
                spiceLevel: 'Medium',
                description: 'Fried rice with chicken chunks and egg',
                imageURL: '/images/chicken-fried-rice.jpg'
            }
        ];

        await MenuItem.insertMany(menuItems);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB...`);
    // Log the first few characters to verify it's the cloud URI
    const uri = process.env.MONGO_URI || '';
    console.log(`URI starts with: ${uri.substring(0, 15)}...`);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

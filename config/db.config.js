const mongoose = require("mongoose");


const db_url = 'mongodb://localhost:27017/isti_db';

const connectDB = async () => {
    try {
        await mongoose.connect(db_url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("MongoDB Connected");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Stop app if DB fails
    }
};

module.exports = connectDB;
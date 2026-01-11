const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Connected to MongoDB successfully!"))
            .catch((err) => console.error("MongoDB connection error:", err));
        // console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        if (!url) {
            throw new Error("MONGO_URI not defined.");
        }
        await mongoose.connect(url);
        console.log("Connected to DB.");
    } catch (error) {
        console.log("Failed to connect to DB: ", error.message);
        process.exit(1);
    }
};

export default connectDB;

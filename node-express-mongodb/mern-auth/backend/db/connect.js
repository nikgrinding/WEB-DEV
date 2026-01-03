import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
});

const connectDB = async (url) => {
    try {
        if (!url) {
            throw new Error("MONGO_URI not defined.");
        }
        await mongoose.connect(url);
    } catch (error) {
        console.log("Failed to connect to DB: ", error.message);
        process.exit(1);
    }
};

export default connectDB;

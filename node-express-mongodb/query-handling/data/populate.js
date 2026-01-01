require("dotenv").config();
const connectDB = require("../db/connect");
const Product = require("../models/products");
const products = require("./products.json");

const populate = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to DB");
        await Product.deleteMany();
        console.log("Removed existing products");
        await Product.create(products);
        console.log("Added all products");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

populate();

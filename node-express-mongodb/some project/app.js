require("dotenv").config();
const connectDB = require("./db/connect");
const router = require("./routes/products");
const errorHandler = require("./middleware/errorHandler");

const express = require("express");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    return res.status(200).send('<h1>Store API</h1> <a href = "api/v1/products">products route</a>');
});
app.use("/api/v1/products", router);
app.use((req, res) => res.status(404).send("Route does not exist"));
app.use(errorHandler);

const port = process.env.PORT || 3000;

const startApplication = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to DB.");
        app.listen(port, () => {
            console.log(`Backend running at http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Failed to connect to DB.");
    }
};

startApplication();

import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
    return res.send("API working");
});

const startApplication = async () => {
    await connectDB(process.env.MONGO_URI);
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    });
};

startApplication();

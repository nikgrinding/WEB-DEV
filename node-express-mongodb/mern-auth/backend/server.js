import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "production") {
    const accessLogStream = fs.createWriteStream(path.join(process.cwd(), "access.log"), { flags: "a" });
    app.use(morgan("combined", { stream: accessLogStream }));
} else {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
    return res.send("API working");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
    console.error("Error:", err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

const validateEnvVariables = () => {
    const requiredEnvVars = ["MONGO_URI", "JWT_SECRET_KEY"];
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
        process.exit(1);
    }

    if (process.env.JWT_SECRET_KEY && process.env.JWT_SECRET_KEY.length < 32) {
        console.error("JWT_SECRET_KEY should be at least 32 characters long for security");
        process.exit(1);
    }
};

const startApplication = async () => {
    validateEnvVariables();
    await connectDB(process.env.MONGO_URI);
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    });
};

startApplication();

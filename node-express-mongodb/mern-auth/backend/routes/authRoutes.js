import express from "express";
import { register, login, logout, sendVerificationOTP, verifyEmail } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verification-otp", authMiddleware, sendVerificationOTP);
authRouter.post("/verify-account", authMiddleware, verifyEmail);

export default authRouter;

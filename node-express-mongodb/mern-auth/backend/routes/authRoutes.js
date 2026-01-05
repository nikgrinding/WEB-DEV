import express from "express";
import {
    register,
    login,
    logout,
    sendVerificationOTP,
    verifyEmail,
    isAuthenticated,
    sendResetOTP,
    resetPassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verification-otp", authMiddleware, sendVerificationOTP);
authRouter.post("/verify-account", authMiddleware, verifyEmail);
authRouter.get("/is-authenticated", authMiddleware, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter;

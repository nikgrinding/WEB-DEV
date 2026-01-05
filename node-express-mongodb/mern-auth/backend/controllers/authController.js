import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { getCookieOptions, getClearCookieOptions } from "../utils/cookieOptions.js";
import transporter from "../services/emailService.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing required details" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        res.cookie("token", token, getCookieOptions());

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Welcome to my application",
            text: `Your account has been created with email id: ${email}`,
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`Welcome email failed to ${email}:`, error.message);
        }

        return res.status(201).json({ success: true });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email id or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email id or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        res.cookie("token", token, getCookieOptions());

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token", getClearCookieOptions());
        return res.status(200).json({ success: true, message: "User logged out" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const sendVerificationOTP = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        const OTP = String(crypto.randomInt(100000, 1000000));
        user.verificationOTP = OTP;
        user.verificationOTPExpireTime = Date.now() + 24 * 60 * 60 * 1000; // till 1 day
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Account verification OTP",
            text: `Your OTP is: ${OTP}. Verify your account using this OTP.`,
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`Verification email failed to ${user.email}:`, error.message);
        }

        return res.status(200).json({ success: true, message: "Verification OTP sent to registered mail id" });
    } catch (error) {
        console.error("Send OTP error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const userId = req.userId;
        const { OTP } = req.body;
        if (!OTP) {
            return res.status(400).json({ success: false, message: "OTP is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.verificationOTP || user.verificationOTP !== OTP) {
            return res.status(401).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verificationOTPExpireTime < Date.now()) {
            return res.status(410).json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verificationOTP = "";
        user.verificationOTPExpireTime = 0;

        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error("Verify OTP error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("User authentication status error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const sendResetOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not Found" });
        }

        const OTP = String(crypto.randomInt(100000, 1000000));
        user.resetOTP = OTP;
        user.resetOTPExpireTime = Date.now() + 15 * 60 * 1000; // till 15 mins
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP is: ${OTP}. Reset your password using this OTP.`,
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`Reset password email failed to ${user.email}:`, error.message);
        }

        return res.status(200).json({ success: true, message: "Password reset OTP sent to registered mail id" });
    } catch (error) {
        console.error("Send reset OTP error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    const { email, OTP, newPassword } = req.body;
    if (!email || !OTP || !newPassword) {
        return res.status(400).json({ success: false, message: "Email, OTP and new Password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not Found" });
        }

        if (!user.resetOTP || user.resetOTP !== OTP) {
            return res.status(401).json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOTPExpireTime < Date.now()) {
            return res.status(410).json({ success: false, message: "OTP Expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOTP = "";
        user.resetOTPExpireTime = 0;

        await user.save();

        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Verify password reset OTP error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

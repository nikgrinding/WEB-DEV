import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getCookieOptions, getClearCookieOptions } from "../utils/cookieOptions.js";

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

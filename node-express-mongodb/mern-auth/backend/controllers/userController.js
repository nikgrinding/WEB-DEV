import User from "../models/User.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not Found" });
        }

        res.status(200).json({
            success: true,
            userData: { name: user.name, isAccountVerified: user.isAccountVerified },
        });
    } catch (error) {
        console.error("Get user data error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

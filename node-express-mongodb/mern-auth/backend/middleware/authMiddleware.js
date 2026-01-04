import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { id } = decoded;
        if (!id) {
            return res.status(401).json({ success: false, message: "Not authorized. Login again" });
        }

        req.userId = id;
        next();
    } catch (error) {
        console.error("Invalid token error:", error);
        return res.status(401).json({ success: false, message: "Session expired or invalid token" });
    }
};

export default authMiddleware;

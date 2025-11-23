const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "invalid token",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
    }
}
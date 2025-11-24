const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, accountType }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

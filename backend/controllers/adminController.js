const User = require("../models/User");
const Issue = require("../models/Issue");
const { use } = require("react");


// ➤ Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
// ➤ Get all issues

// ➤ Change user role
exports.updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true },
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Role is updated",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// ➤ Admin dashboard stats
exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalIssues = await Issue.countDocuments();
        const openIssues = await Issue.countDocuments({ status: "open" });

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalIssues,
                openIssues
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ----------- GET PROFILE ----------------
exports.getProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

// ----------- UPDATE PROFILE -------------
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ----------- CHANGE PASSWORD -------------
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select("+password");

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: "Old password incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const Notification = require("../models/Notification");

/**
 * Create a notification
 */
exports.createNotification = async (req, res) => {
    try {
        const { issueId, type, payload } = req.body;
        const userId = req.user.id;

        if (!issueId || !type) {
            return res.status(400).json({ success: false, message: "Issue ID and type are required" });
        }

        const notification = await Notification.create({
            issueId,
            type,
            payload: payload || {},
            read: false,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: "Notification created",
            data: notification,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get notifications of logged-in user
 */
exports.getMyNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await Notification.find({ userId });

        return res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Mark notification as read
 */
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Marked as read",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete notification
 */
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Notification.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

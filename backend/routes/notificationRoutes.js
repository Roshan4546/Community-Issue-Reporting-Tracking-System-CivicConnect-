const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");

const {
    getNotifications,
    markAsRead,
    deleteNotification,
} = require("../controllers/notification.controller");

// Get notifications for logged-in user
router.get("/", auth, getNotifications);

// Mark notification as read
router.put("/:id/read", auth, markAsRead);

// Delete notification
router.delete("/:id", auth, deleteNotification);

module.exports = router;

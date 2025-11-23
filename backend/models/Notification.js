const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        issueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Issue",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: [
                "ISSUE_ASSIGNED",
                "ISSUE_UPDATED",
                "ISSUE_COMMENTED",
                "ISSUE_STATUS_CHANGED",
                "NEW_ATTACHMENT",
            ],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        payload: {
            type: Object,
            default: {},
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);

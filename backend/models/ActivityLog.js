const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        issueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Issue",
            required: true,
        },
        action: {
            type: String,
            required: true,
            enum: [
                "Issue_Created",
                "Issue_Updated",
                "Status_Changed",
                "Assigned",
                "Comment_Added",
                "Priority_Changed",
                "Image_Uploaded",
                "Marked_Duplicate",
            ],
        },
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        meta: {
            type: Object,
            default: {},
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);

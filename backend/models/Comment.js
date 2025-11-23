const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        issueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Issue",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        attachments: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

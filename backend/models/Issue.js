const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        images: [
            {
                type: String,
            },
        ],

        location: {
            lat: Number,
            lng: Number,
            address: String,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        status: {
            type: String,
            enum: ["Pending", "Assigned", "In-Progress", "Resolved", "Rejected"],
            default: "Pending",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],

        isDuplicateOf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Issue",
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);

const Comment = require("../models/Comment");
const Issuse = require("../models/Issue");

exports.addComment = async (req, res) => {
    try {
        const { issueId, text, attachments } = req.body;
        const userId = req.user.id;

        if (!issueId || !text) {
            return res.status(400).json({
                success: false,
                message: "Issue ID and text are required"
            });
        }
        const issueExits = await Issuse.findById(issueId);

        if (!issueExists) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }
        const comment = await Comment.create({
            issueId,
            text,
            attachments: attachments || null,
            createdBy: userId,
        });
        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: comment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const deleted = await Comment.findByIdAndDelete(commentId);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
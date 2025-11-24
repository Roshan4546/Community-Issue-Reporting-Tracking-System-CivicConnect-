const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");

const {
    addComment,
    deleteComment,
    getCommentsByIssue
} = require("../controllers/comment.controller");

// Add comment (citizen/officer)
router.post("/:issueId", auth, addComment);

// Get comments for an issue
router.get("/:issueId", auth, getCommentsByIssue);

// Delete comment (only owner or admin)
router.delete("/:commentId", auth, deleteComment);

module.exports = router;

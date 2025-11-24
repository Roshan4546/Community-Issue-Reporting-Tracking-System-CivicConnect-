const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueStatus,
    deleteIssue
} = require("../controllers/issue.controller");

// Citizen creates issue
router.post("/create", auth, authorizeRoles("citizen"), createIssue);

// Everyone can view issues
router.get("/", auth, getAllIssues);
router.get("/:id", auth, getIssueById);

// Officer updates issue status
router.put("/:id/status", auth, authorizeRoles("officer", "admin"), updateIssueStatus);

// Admin deletes issue
router.delete("/:id", auth, authorizeRoles("admin"), deleteIssue);

module.exports = router;

const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const {
    createCategory,
    getAllCategories,
    deleteCategory,
    getAllUsers,
    assignIssueToOfficer,
} = require("../controllers/admin.controller");

// CATEGORY
router.post("/category", auth, authorizeRoles("admin"), createCategory);
router.get("/categories", auth, authorizeRoles("admin", "officer", "citizen"), getAllCategories);
router.delete("/category/:id", auth, authorizeRoles("admin"), deleteCategory);

// USERS
router.get("/users", auth, authorizeRoles("admin"), getAllUsers);

// ASSIGN ISSUE
router.put("/assign-issue/:issueId", auth, authorizeRoles("admin"), assignIssueToOfficer);

module.exports = router;

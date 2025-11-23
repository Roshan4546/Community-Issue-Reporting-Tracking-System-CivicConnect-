const Issue = require("../models/Issue");

// ------------ CREATE ISSUE ----------------
exports.createIssue = async (req, res) => {
    try {
        const { title, description, categoryId, location, priority } = req.body;

        const issue = await Issue.create({
            title,
            description,
            categoryId,
            location,
            priority,
            images: req.body.images || [],
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Issue created successfully",
            issue,
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ------------ UPDATE STATUS ----------------
exports.updateStatus = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { status } = req.body;

        const issue = await Issue.findByIdAndUpdate(
            issueId,
            { status },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Status updated",
            issue,
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ------------ ASSIGN OFFICER ----------------
exports.assignOfficer = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { officerId } = req.body;

        const issue = await Issue.findByIdAndUpdate(
            issueId,
            { assignedTo: officerId, status: "Assigned" },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Officer assigned",
            issue,
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ------------ GET USER ISSUES ----------------
exports.getMyIssues = async (req, res) => {
    const issues = await Issue.find({ createdBy: req.user._id })
        .populate("categoryId")
        .populate("assignedTo", "firstName lastName email");

    return res.status(200).json({ success: true, issues });
};

// ------------ GET ALL ISSUES (ADMIN) ----------------
exports.getAllIssues = async (req, res) => {
    const issues = await Issue.find()
        .populate("createdBy", "firstName lastName email")
        .populate("assignedTo", "firstName lastName")
        .populate("categoryId");

    return res.status(200).json({ success: true, issues });
};

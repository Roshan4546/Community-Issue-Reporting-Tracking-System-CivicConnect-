exports.authorizedRole = async (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.accountType)) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }
        next();
    };
};
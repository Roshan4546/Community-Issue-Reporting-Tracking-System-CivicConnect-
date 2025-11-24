exports.errorHandler = async (err, req, res, next) => {
    console.log("Error", err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
};
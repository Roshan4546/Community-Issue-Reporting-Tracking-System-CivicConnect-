const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.accountType
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};
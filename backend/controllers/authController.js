const bcrypt = require("bcrypt");

const User = require("../models/User");

const { generateToken } = require("../utils/generateToken");


exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            accountType,
            contactNumber
        } = req.body;

        if (!firstName || !lastName || !email || !password || !accountType || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const exitUser = await User.findById({ email });

        if (exitUser) {
            return res.status(400).json({
                success: false,
                message: "User already exits",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return req.status(400).json({
                success: false,
                message: "user not exits",
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return req.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.accountType,
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }

}
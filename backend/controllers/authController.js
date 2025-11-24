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

        // Validate fields
        if (!firstName || !lastName || !email || !password || !accountType || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate role
        if (!["citizen", "officer", "admin"].includes(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type"
            });
        }

        // Check user exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token
        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.accountType
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

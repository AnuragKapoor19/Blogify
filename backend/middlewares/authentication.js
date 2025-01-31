const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const authenticate = async (req, res, next) => {
    // Ensure req.cookies exists
    if (!req.cookies || !req.cookies.token || req.cookies.token === undefined) {
        return res.status(403).json({
            success: false,
            message: "Please Login First!"
        });
    }

    // Extract token and validate
    const token = req.cookies.token;
    if (typeof token !== "string") {
        return res.status(400).json({
            success: false,
            message: "Invalid token format"
        });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    // Fetch user from DB
    req.user = await userModel.findById(decoded.id);
    if (!req.user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    next();
}

module.exports = authenticate
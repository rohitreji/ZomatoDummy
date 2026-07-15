const jwt  = require("jsonwebtoken");
const User = require("../models/User");

// ── Protect: verify JWT and attach user to req ───────────────────────────────
const protect = async (req, res, next) => {
    try {
        let token;

        // Accept token from Authorization header: "Bearer <token>"
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user (without password) to request
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User belonging to this token no longer exists.",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated.",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token.",
            });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please log in again.",
            });
        }

        console.error("Auth middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

// ── Authorize: restrict to certain roles ────────────────────────────────────
/**
 * Usage: authorize("admin", "restaurantOwner")
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role '${req.user.role}' is not authorized to access this resource.`,
            });
        }
        next();
    };
};

module.exports = { protect, authorize };

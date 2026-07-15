const express = require("express");

const router = express.Router();

const {
    loginUser,
    logoutUser,
    changePassword,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/login",           loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Private routes (require valid JWT)
router.post("/logout",          protect, logoutUser);
router.put("/change-password",  protect, changePassword);

module.exports = router;

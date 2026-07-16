const express = require("express");
const router = express.Router();


const { 
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");

const {
    validateRegister,
    validateLogin,
    validateChangePassword,
    validateForgotPassword,
    validateResetPassword,
} = require("../validators/authValidators");

// Public
router.post(
    "/register",
    validateRegister,
    validate,
    registerUser
);

router.post(
    "/login",
    validateLogin,
    validate,
    loginUser
);

router.post(
    "/forgot-password",
    validateForgotPassword,
    validate,
    forgotPassword
);

router.put(
    "/reset-password/:token",
    validateResetPassword,
    validate,
    resetPassword
);

// Private
router.post(
    "/logout",
    protect,
    logoutUser
);

router.put(
    "/change-password",
    protect,
    validateChangePassword,
    validate,
    changePassword
);

module.exports = router;
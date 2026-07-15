const { body } = require("express-validator");

const VALID_ROLES = ["customer", "admin", "restaurantOwner"];

// ── Register ──────────────────────────────────────────────────────────────────
const validateRegister = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters."),

    body("role")
        .optional()
        .isIn(VALID_ROLES)
        .withMessage(`Role must be one of: ${VALID_ROLES.join(", ")}.`),
];

// ── Login ─────────────────────────────────────────────────────────────────────
const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required."),
];

// ── Change Password ───────────────────────────────────────────────────────────
const validateChangePassword = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required."),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required.")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters."),
];

// ── Forgot Password ───────────────────────────────────────────────────────────
const validateForgotPassword = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),
];

// ── Reset Password ────────────────────────────────────────────────────────────
const validateResetPassword = [
    body("newPassword")
        .notEmpty()
        .withMessage("New password is required.")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters."),
];

module.exports = {
    validateRegister,
    validateLogin,
    validateChangePassword,
    validateForgotPassword,
    validateResetPassword,
};

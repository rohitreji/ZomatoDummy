const { body } = require("express-validator");

const VALID_ROLES = ["customer", "admin", "restaurantOwner"];

// ── Update User ───────────────────────────────────────────────────────────────
const validateUpdateUser = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters."),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),

    body("role")
        .optional()
        .isIn(VALID_ROLES)
        .withMessage(`Role must be one of: ${VALID_ROLES.join(", ")}.`),

    body("password")
        .not()
        .exists()
        .withMessage("Password cannot be updated via this endpoint. Use /change-password."),
];

module.exports = {
    validateUpdateUser,
};

const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT token.
 * @param {Object} payload - { id, role }
 * @returns {string} signed JWT
 */
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "7d",
    });
};

module.exports = generateToken;

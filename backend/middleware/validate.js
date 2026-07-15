const { validationResult } = require("express-validator");

/**
 * Middleware — runs after any express-validator chain.
 * If there are errors it short-circuits with HTTP 400 and a
 * standardised { success, errors } payload.
 * If validation passes it calls next() and the controller runs.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formatted = errors.array().map((err) => ({
            field:   err.path,
            message: err.msg,
        }));

        return res.status(400).json({
            success: false,
            errors:  formatted,
        });
    }

    next();
};

module.exports = validate;

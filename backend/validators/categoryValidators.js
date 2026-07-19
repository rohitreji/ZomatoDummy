const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }
    next();
};

// Validate category creation
exports.validateCreateCategory = [
    body('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Category name must be between 2 and 50 characters'),
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a string')
        .trim(),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
    handleValidationErrors,
];

// Validate category update
exports.validateUpdateCategory = [
    param('id')
        .isMongoId()
        .withMessage('Invalid category ID format'),
    body('name')
        .optional()
        .isString()
        .withMessage('Category name must be a string')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Category name must be between 2 and 50 characters'),
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a string')
        .trim(),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
    handleValidationErrors,
];

// Validate ID parameter
exports.validateIdParam = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    handleValidationErrors,
];
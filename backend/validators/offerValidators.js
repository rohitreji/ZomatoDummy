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

// Validate offer creation
exports.validateCreateOffer = [
    body('title')
        .notEmpty()
        .withMessage('Offer title is required')
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .notEmpty()
        .withMessage('Offer description is required')
        .isString()
        .withMessage('Description must be a string')
        .trim()
        .isLength({ min: 5, max: 500 })
        .withMessage('Description must be between 5 and 500 characters'),
    body('code')
        .notEmpty()
        .withMessage('Offer code is required')
        .isString()
        .withMessage('Code must be a string')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Code must be between 3 and 20 characters')
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage('Code can only contain letters and numbers'),
    body('discount')
        .notEmpty()
        .withMessage('Discount is required')
        .isFloat({ min: 0 })
        .withMessage('Discount must be a positive number')
        .toFloat(),
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a string')
        .trim(),
    body('validTill')
        .notEmpty()
        .withMessage('Valid till date is required')
        .isISO8601()
        .withMessage('Invalid date format. Use ISO 8601 format (YYYY-MM-DD)')
        .toDate(),
    body('restaurants')
        .optional()
        .isArray()
        .withMessage('Restaurants must be an array'),
    body('restaurants.*')
        .optional()
        .isMongoId()
        .withMessage('Invalid restaurant ID format'),
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
    handleValidationErrors,
];

// Validate offer update
exports.validateUpdateOffer = [
    param('id')
        .isMongoId()
        .withMessage('Invalid offer ID format'),
    body('title')
        .optional()
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .trim()
        .isLength({ min: 5, max: 500 })
        .withMessage('Description must be between 5 and 500 characters'),
    body('code')
        .optional()
        .isString()
        .withMessage('Code must be a string')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Code must be between 3 and 20 characters')
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage('Code can only contain letters and numbers'),
    body('discount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Discount must be a positive number')
        .toFloat(),
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a string')
        .trim(),
    body('validTill')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format. Use ISO 8601 format (YYYY-MM-DD)')
        .toDate(),
    body('restaurants')
        .optional()
        .isArray()
        .withMessage('Restaurants must be an array'),
    body('restaurants.*')
        .optional()
        .isMongoId()
        .withMessage('Invalid restaurant ID format'),
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
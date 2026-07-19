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

// Validate collection creation
exports.validateCreateCollection = [
    body('title')
        .notEmpty()
        .withMessage('Collection title is required')
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
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a string')
        .trim(),
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

// Validate collection update
exports.validateUpdateCollection = [
    param('id')
        .isMongoId()
        .withMessage('Invalid collection ID format'),
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
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    body('image')
        .optional()
        .isString()
        .withMessage('Image must be a string')
        .trim(),
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
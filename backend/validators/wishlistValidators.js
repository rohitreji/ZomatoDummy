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

// Validate wishlist creation
exports.validateCreateWishlist = [
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  body('restaurant')
    .notEmpty()
    .withMessage('Restaurant ID is required')
    .isMongoId()
    .withMessage('Invalid restaurant ID format'),
  body('menuItem')
    .optional()
    .isMongoId()
    .withMessage('Invalid menu item ID format'),
  handleValidationErrors,
];

// Validate wishlist update
exports.validateUpdateWishlist = [
  param('id')
    .isMongoId()
    .withMessage('Invalid wishlist ID format'),
  body('restaurant')
    .optional()
    .isMongoId()
    .withMessage('Invalid restaurant ID format'),
  body('menuItem')
    .optional()
    .isMongoId()
    .withMessage('Invalid menu item ID format'),
  handleValidationErrors,
];

// Validate ID parameter
exports.validateIdParam = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors,
];

// Validate user ID parameter
exports.validateUserIdParam = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  handleValidationErrors,
];
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

// Validate review creation
exports.validateCreateReview = [
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
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .notEmpty()
    .withMessage('Comment is required')
    .isString()
    .withMessage('Comment must be a string')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment cannot be empty'),
  handleValidationErrors,
];

// Validate review update
exports.validateUpdateReview = [
  param('id')
    .isMongoId()
    .withMessage('Invalid review ID format'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .isString()
    .withMessage('Comment must be a string')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment cannot be empty'),
  handleValidationErrors,
];

// Validate ID parameter
exports.validateIdParam = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors,
];

// Validate restaurant ID parameter
exports.validateRestaurantIdParam = [
  param('restaurantId')
    .isMongoId()
    .withMessage('Invalid restaurant ID format'),
  handleValidationErrors,
];
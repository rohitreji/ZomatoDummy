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

// Validate address creation
exports.validateCreateAddress = [
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isString()
    .withMessage('Full name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isString()
    .withMessage('Phone number must be a string')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('houseNo')
    .notEmpty()
    .withMessage('House number is required')
    .isString()
    .withMessage('House number must be a string')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('House number must be between 1 and 50 characters'),
  body('street')
    .notEmpty()
    .withMessage('Street is required')
    .isString()
    .withMessage('Street must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Street must be between 2 and 100 characters'),
  body('landmark')
    .optional()
    .isString()
    .withMessage('Landmark must be a string')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Landmark must be less than 100 characters'),
  body('city')
    .notEmpty()
    .withMessage('City is required')
    .isString()
    .withMessage('City must be a string')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  body('state')
    .notEmpty()
    .withMessage('State is required')
    .isString()
    .withMessage('State must be a string')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters'),
  body('pincode')
    .notEmpty()
    .withMessage('Pincode is required')
    .isString()
    .withMessage('Pincode must be a string')
    .trim()
    .matches(/^[0-9]{6}$/)
    .withMessage('Pincode must be 6 digits'),
  body('addressType')
    .optional()
    .isIn(['Home', 'Work', 'Other'])
    .withMessage('Address type must be Home, Work, or Other'),
  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean'),
  handleValidationErrors,
];

// Validate address update
exports.validateUpdateAddress = [
  param('id')
    .isMongoId()
    .withMessage('Invalid address ID format'),
  body('fullName')
    .optional()
    .isString()
    .withMessage('Full name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .isString()
    .withMessage('Phone number must be a string')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('houseNo')
    .optional()
    .isString()
    .withMessage('House number must be a string')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('House number must be between 1 and 50 characters'),
  body('street')
    .optional()
    .isString()
    .withMessage('Street must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Street must be between 2 and 100 characters'),
  body('landmark')
    .optional()
    .isString()
    .withMessage('Landmark must be a string')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Landmark must be less than 100 characters'),
  body('city')
    .optional()
    .isString()
    .withMessage('City must be a string')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  body('state')
    .optional()
    .isString()
    .withMessage('State must be a string')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters'),
  body('pincode')
    .optional()
    .isString()
    .withMessage('Pincode must be a string')
    .trim()
    .matches(/^[0-9]{6}$/)
    .withMessage('Pincode must be 6 digits'),
  body('addressType')
    .optional()
    .isIn(['Home', 'Work', 'Other'])
    .withMessage('Address type must be Home, Work, or Other'),
  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean'),
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
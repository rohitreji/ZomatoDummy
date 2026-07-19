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

// Validate payment creation
exports.validateCreatePayment = [
  body('order')
    .notEmpty()
    .withMessage('Order ID is required')
    .isMongoId()
    .withMessage('Invalid order ID format'),
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['Cash on Delivery', 'UPI', 'Card'])
    .withMessage('Payment method must be Cash on Delivery, UPI, or Card'),
  body('paymentStatus')
    .optional()
    .isIn(['Pending', 'Paid', 'Failed', 'Refunded'])
    .withMessage('Payment status must be Pending, Paid, Failed, or Refunded'),
  body('transactionId')
    .optional()
    .isString()
    .withMessage('Transaction ID must be a string')
    .trim(),
  handleValidationErrors,
];

// Validate payment update
exports.validateUpdatePayment = [
  param('id')
    .isMongoId()
    .withMessage('Invalid payment ID format'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('paymentMethod')
    .optional()
    .isIn(['Cash on Delivery', 'UPI', 'Card'])
    .withMessage('Payment method must be Cash on Delivery, UPI, or Card'),
  body('paymentStatus')
    .optional()
    .isIn(['Pending', 'Paid', 'Failed', 'Refunded'])
    .withMessage('Payment status must be Pending, Paid, Failed, or Refunded'),
  body('transactionId')
    .optional()
    .isString()
    .withMessage('Transaction ID must be a string')
    .trim(),
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
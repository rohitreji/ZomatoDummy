const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentsByUser,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');
const {
  validateCreatePayment,
  validateUpdatePayment,
  validateIdParam,
  validateUserIdParam,
} = require('../validators/paymentValidators');

router.post('/', validateCreatePayment, createPayment);
router.get('/', getPayments);
router.get('/:id', validateIdParam, getPaymentById);
router.get('/user/:userId', validateUserIdParam, getPaymentsByUser);
router.put('/:id', validateUpdatePayment, updatePayment);
router.delete('/:id', validateIdParam, deletePayment);

module.exports = router;
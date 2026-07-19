const express = require('express');
const router = express.Router();
const {
  createCart,
  getCarts,
  getCartById,
  getCartByUser,
  updateCart,
  deleteCart,
  clearCart,
} = require('../controllers/cartController');
const {
  validateCreateCart,
  validateUpdateCart,
  validateIdParam,
  validateUserIdParam,
} = require('../validators/cartValidators');

router.post('/', validateCreateCart, createCart);
router.get('/', getCarts);
router.get('/:id', validateIdParam, getCartById);
router.get('/user/:userId', validateUserIdParam, getCartByUser);
router.put('/:id', validateUpdateCart, updateCart);
router.delete('/:id', validateIdParam, deleteCart);
router.delete('/user/:userId', validateUserIdParam, clearCart);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  getWishlists,
  getWishlistById,
  getWishlistByUser,
  updateWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');
const {
  validateCreateWishlist,
  validateUpdateWishlist,
  validateIdParam,
  validateUserIdParam,
} = require('../validators/wishlistValidators');

router.post('/', validateCreateWishlist, addToWishlist);
router.get('/', getWishlists);
router.get('/:id', validateIdParam, getWishlistById);
router.get('/user/:userId', validateUserIdParam, getWishlistByUser);
router.put('/:id', validateUpdateWishlist, updateWishlist);
router.delete('/:id', validateIdParam, removeFromWishlist);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews,
  getReviewById,
  getReviewsByRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const {
  validateCreateReview,
  validateUpdateReview,
  validateIdParam,
  validateRestaurantIdParam,
} = require('../validators/reviewValidators');

router.post('/', validateCreateReview, createReview);
router.get('/', getReviews);
router.get('/restaurant/:restaurantId', validateRestaurantIdParam, getReviewsByRestaurant);
router.get('/:id', validateIdParam, getReviewById);
router.put('/:id', validateUpdateReview, updateReview);
router.delete('/:id', validateIdParam, deleteReview);

module.exports = router;
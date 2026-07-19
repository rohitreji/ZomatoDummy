const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

const updateRestaurantRating = async (restaurantId) => {
  try {
    const reviews = await Review.find({ restaurant: restaurantId });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      const roundedRating = Math.round(avgRating * 10) / 10;
      await Restaurant.findByIdAndUpdate(restaurantId, { rating: roundedRating });
    } else {
      await Restaurant.findByIdAndUpdate(restaurantId, { rating: 0 });
    }
  } catch (error) {
    console.error("Error updating restaurant rating:", error);
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  try {
    const { user, restaurant, rating, comment } = req.body;

    const review = await Review.create({
      user,
      restaurant,
      rating,
      comment,
    });

    await updateRestaurantRating(restaurant);

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name')
      .populate('restaurant', 'name');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review: populatedReview,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single review by ID
// @route   GET /api/reviews/:id
// @access  Public
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant', 'name');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all reviews for a restaurant
// @route   GET /api/reviews/restaurant/:restaurantId
// @access  Public
exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Public
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name')
      .populate('restaurant', 'name');

    await updateRestaurantRating(review.restaurant);

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    const restaurantId = review.restaurant;
    await review.deleteOne();

    await updateRestaurantRating(restaurantId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
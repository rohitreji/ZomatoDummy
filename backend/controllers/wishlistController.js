const Wishlist = require('../models/wishlist');

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Public
exports.addToWishlist = async (req, res) => {
  try {
    const { user, restaurant, menuItem } = req.body;

    const wishlist = await Wishlist.create({
      user,
      restaurant,
      menuItem,
    });

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('user', 'name')
      .populate('restaurant', 'name image rating')
      .populate('menuItem', 'name price image');

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist successfully',
      wishlist: populatedWishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all wishlist items
// @route   GET /api/wishlist
// @access  Public
exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find()
      .populate('user', 'name')
      .populate('restaurant', 'name image rating')
      .populate('menuItem', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlists.length,
      wishlists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single wishlist item by ID
// @route   GET /api/wishlist/:id
// @access  Public
exports.getWishlistById = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant', 'name image rating')
      .populate('menuItem', 'name price image');

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found',
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get wishlist items by user ID
// @route   GET /api/wishlist/user/:userId
// @access  Public
exports.getWishlistByUser = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.params.userId })
      .populate('user', 'name')
      .populate('restaurant', 'name image rating')
      .populate('menuItem', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlists.length,
      wishlists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a wishlist item
// @route   PUT /api/wishlist/:id
// @access  Public
exports.updateWishlist = async (req, res) => {
  try {
    const { restaurant, menuItem } = req.body;

    let wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found',
      });
    }

    const updateData = {};
    if (restaurant !== undefined) updateData.restaurant = restaurant;
    if (menuItem !== undefined) updateData.menuItem = menuItem;

    wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name')
      .populate('restaurant', 'name image rating')
      .populate('menuItem', 'name price image');

    res.status(200).json({
      success: true,
      message: 'Wishlist updated successfully',
      wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Public
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found',
      });
    }

    await wishlist.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
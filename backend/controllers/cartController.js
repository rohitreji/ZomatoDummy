const Cart = require('../models/cart');

// @desc    Create a new cart
// @route   POST /api/carts
// @access  Public
exports.createCart = async (req, res) => {
  try {
    const { user, restaurant, items } = req.body;

    const cart = await Cart.create({
      user,
      restaurant,
      items,
    });

    const populatedCart = await Cart.findById(cart._id)
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price');

    res.status(201).json({
      success: true,
      message: 'Cart created successfully',
      cart: populatedCart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all carts
// @route   GET /api/carts
// @access  Public
exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: carts.length,
      carts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single cart by ID
// @route   GET /api/carts/:id
// @access  Public
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price');

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get cart by user ID
// @route   GET /api/carts/user/:userId
// @access  Public
exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price');

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found for this user',
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a cart
// @route   PUT /api/carts/:id
// @access  Public
exports.updateCart = async (req, res) => {
  try {
    const { restaurant, items } = req.body;

    let cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const updateData = {};
    if (restaurant) updateData.restaurant = restaurant;
    if (items) updateData.items = items;

    cart = await Cart.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price');

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a cart
// @route   DELETE /api/carts/:id
// @access  Public
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    await cart.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Cart deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear all items from a cart
// @route   DELETE /api/carts/user/:userId
// @access  Public
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found for this user',
      });
    }

    cart.items = [];
    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price');

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
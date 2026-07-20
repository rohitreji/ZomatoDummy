const Order = require("../models/Order");

// @desc Create Order
// @route POST /api/orders
// @access Public
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get All Orders
// @route GET /api/orders
// @access Public
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Order By ID
// @route GET /api/orders/:id
// @access Public
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Orders By User
// @route GET /api/orders/user/:userId
// @access Public
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update Order
// @route PUT /api/orders/:id
// @access Public
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Delete Order
// @route DELETE /api/orders/:id
// @access Public
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Orders By Restaurant
// @route   GET /api/order/restaurant/:restaurantId
// @access  Public
const getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await Order.find({
      restaurant: req.params.restaurantId,
    })
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByRestaurant,
  updateOrder,
  deleteOrder,
};
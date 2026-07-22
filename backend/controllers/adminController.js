const User = require('../models/User');
const Restaurant = require('../models/restaurant');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const Review = require('../models/review');
const Payment = require('../models/payment');
const Wishlist = require('../models/wishlist');
const Coupon = require('../models/coupen');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Public
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalRestaurants,
      totalMenuItems,
      totalOrders,
      totalReviews,
      totalCoupons,
      totalPayments,
      totalWishlists,
    ] = await Promise.all([
      User.countDocuments(),
      Restaurant.countDocuments(),
      Menu.countDocuments(),
      Order.countDocuments(),
      Review.countDocuments(),
      Coupon.countDocuments(),
      Payment.countDocuments(),
      Wishlist.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRestaurants,
        totalMenuItems,
        totalOrders,
        totalReviews,
        totalCoupons,
        totalPayments,
        totalWishlists,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get recent orders (last 10)
// @route   GET /api/admin/recent-orders
// @access  Public
exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

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

// @desc    Get recent users (last 10)
// @route   GET /api/admin/recent-users
// @access  Public
exports.getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get pending payments
// @route   GET /api/admin/pending-payments
// @access  Public
exports.getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ paymentStatus: 'Pending' })
      .populate('user', 'name email')
      .populate('order')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get restaurant ratings
// @route   GET /api/admin/restaurant-ratings
// @access  Public
exports.getRestaurantRatings = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .select('name rating')
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get order status summary using aggregation
// @route   GET /api/admin/order-summary
// @access  Public
exports.getOrderStatusSummary = async (req, res) => {
  try {
    const summary = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          count: 1,
        },
      },
    ]);

    // Format the response to include all statuses even if count is 0
    const statusMap = {
      Pending: 0,
      Preparing: 0,
      'Out for Delivery': 0,
      Delivered: 0,
      Cancelled: 0,
    };

    summary.forEach((item) => {
      if (item.status in statusMap) {
        statusMap[item.status] = item.count;
      }
    });

    const formattedSummary = Object.entries(statusMap).map(([status, count]) => ({
      status,
      count,
    }));

    res.status(200).json({
      success: true,
      summary: formattedSummary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
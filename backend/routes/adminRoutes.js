const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRecentOrders,
  getRecentUsers,
  getPendingPayments,
  getRestaurantRatings,
  getOrderStatusSummary,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/recent-orders', getRecentOrders);
router.get('/recent-users', getRecentUsers);
router.get('/pending-payments', getPendingPayments);
router.get('/restaurant-ratings', getRestaurantRatings);
router.get('/order-summary', getOrderStatusSummary);

module.exports = router;
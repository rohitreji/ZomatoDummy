const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByRestaurant,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/user/:userId", getOrdersByUser);

router.get("/restaurant/:restaurantId", getOrdersByRestaurant);

router.get("/:id", getOrderById);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
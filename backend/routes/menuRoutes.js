const express = require("express");

const {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    getMenuByRestaurant,
    updateMenuItem,
    deleteMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

router.post("/", createMenuItem);

router.get("/", getMenuItems);

router.get("/restaurant/:restaurantId", getMenuByRestaurant);

router.get("/:id", getMenuItemById);

router.put("/:id", updateMenuItem);

router.delete("/:id", deleteMenuItem);

module.exports = router;
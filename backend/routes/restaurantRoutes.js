const express = require("express");

const router = express.Router();

const { createRestaurant,
       getRestaurantById,
       getRestaurants,
       deleteRestaurant,
       searchRestaurant,
       updateRestaurant,
       getRestaurantsByOwner
    
    } = require("../controllers/restaurant.controller");
router.post("/", createRestaurant);

// Get all restaurants
router.get("/", getRestaurants);

// Search restaurants
router.get("/search", searchRestaurant);

// Restaurants by owner
router.get("/owner/:ownerId", getRestaurantsByOwner);

// Get restaurant by ID
router.get("/:id", getRestaurantById);

// Update
router.put("/:id", updateRestaurant);

// Delete
router.delete("/:id", deleteRestaurant);

module.exports = router;


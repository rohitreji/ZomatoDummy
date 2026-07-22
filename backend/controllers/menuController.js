const Menu = require("../models/Menu");

// @desc Create Menu Item
// @route POST /api/menu
// @access Public
const createMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get All Menu Items
// @route GET /api/menu
// @access Public
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find().populate("restaurant", "name city").lean();

    return res.status(200).json({
      success: true,
      count: menuItems.length,
      menuItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Menu Item By ID
// @route GET /api/menu/:id
// @access Public
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id)
      .populate("restaurant", "name city")
      .lean();

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      menuItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Menu Items By Restaurant
// @route GET /api/menu/restaurant/:restaurantId
// @access Public
const getMenuByRestaurant = async (req, res) => {
  try {
    const menuItems = await Menu.find({
      restaurant: req.params.restaurantId,
    }).lean();

    return res.status(200).json({
      success: true,
      count: menuItems.length,
      menuItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update Menu Item
// @route PUT /api/menu/:id
// @access Public
const updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Delete Menu Item
// @route DELETE /api/menu/:id
// @access Public
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem,
};
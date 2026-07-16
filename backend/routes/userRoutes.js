const express = require("express");

const router = express.Router();

const { getUsers, getUserById, UpdateUser, deleteUser } = require("../controllers/userController");



router.get("/" , getUsers);
router.get("/:id" , getUserById);
router.put("/:id" , UpdateUser);
router.delete("/:id" , deleteUser);

module.exports = router;
const express = require("express");

const router = express.Router();

const { registerUser, getUsers, getUserById, UpdateUser, deleteUser } = require("../controllers/userController");


router.post("/register" , registerUser);
router.get("/" , getUsers);
router.get("/:id" , getUserById);
router.put("/:id" , UpdateUser);
router.delete("/:id" , deleteUser);

module.exports = router;
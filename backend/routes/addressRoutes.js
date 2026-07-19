const express = require('express');
const router = express.Router();
const {
  createAddress,
  getAddresses,
  getAddressById,
  getAddressesByUser,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');
const {
  validateCreateAddress,
  validateUpdateAddress,
  validateIdParam,
  validateUserIdParam,
} = require('../validators/addressValidators');

router.post('/', validateCreateAddress, createAddress);
router.get('/', getAddresses);
router.get('/:id', validateIdParam, getAddressById);
router.get('/user/:userId', validateUserIdParam, getAddressesByUser);
router.put('/:id', validateUpdateAddress, updateAddress);
router.delete('/:id', validateIdParam, deleteAddress);

module.exports = router;
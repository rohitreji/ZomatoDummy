const express = require('express');
const router = express.Router();
const {
  createCoupon,
  getCoupons,
  getCouponById,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
} = require('../controllers/coupenController');
const {
  validateCreateCoupon,
  validateUpdateCoupon,
  validateIdParam,
  validateCodeParam,
} = require('../validators/couponValidators');

router.post('/', validateCreateCoupon, createCoupon);
router.get('/', getCoupons);
router.get('/code/:code', validateCodeParam, getCouponByCode);
router.get('/:id', validateIdParam, getCouponById);
router.put('/:id', validateUpdateCoupon, updateCoupon);
router.delete('/:id', validateIdParam, deleteCoupon);

module.exports = router;
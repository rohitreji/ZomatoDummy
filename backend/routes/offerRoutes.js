const express = require('express');
const router = express.Router();
const {
    createOffer,
    getOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
} = require('../controllers/offerController');
const {
    validateCreateOffer,
    validateUpdateOffer,
    validateIdParam,
} = require('../validators/offerValidators');

router.post('/', validateCreateOffer, createOffer);
router.get('/', getOffers);
router.get('/:id', validateIdParam, getOfferById);
router.put('/:id', validateUpdateOffer, updateOffer);
router.delete('/:id', validateIdParam, deleteOffer);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createCollection,
    getCollections,
    getCollectionById,
    updateCollection,
    deleteCollection,
} = require('../controllers/collectionController');
const {
    validateCreateCollection,
    validateUpdateCollection,
    validateIdParam,
} = require('../validators/collectionValidators.js');

router.post('/', validateCreateCollection, createCollection);
router.get('/', getCollections);
router.get('/:id', validateIdParam, getCollectionById);
router.put('/:id', validateUpdateCollection, updateCollection);
router.delete('/:id', validateIdParam, deleteCollection);

module.exports = router;

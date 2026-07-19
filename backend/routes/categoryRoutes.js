const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const {
    validateCreateCategory,
    validateUpdateCategory,
    validateIdParam,
} = require('../validators/categoryValidators');

router.post('/', validateCreateCategory, createCategory);
router.get('/', getCategories);
router.get('/:id', validateIdParam, getCategoryById);
router.put('/:id', validateUpdateCategory, updateCategory);
router.delete('/:id', validateIdParam, deleteCategory);

module.exports = router;
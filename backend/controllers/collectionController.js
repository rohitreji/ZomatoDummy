const Collection = require('../models/collection');

// @desc    Create a new collection
// @route   POST /api/collections
// @access  Public
exports.createCollection = async (req, res) => {
    try {
        const { title, description, image, restaurants, isActive } = req.body;

        const collection = await Collection.create({
            title,
            description,
            image,
            restaurants: restaurants || [],
            isActive: isActive !== undefined ? isActive : true,
        });

        const populatedCollection = await Collection.findById(collection._id).populate(
            'restaurants',
            'name image rating cuisine'
        );

        res.status(201).json({
            success: true,
            message: 'Collection created successfully',
            collection: populatedCollection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all collections
// @route   GET /api/collections
// @access  Public
exports.getCollections = async (req, res) => {
    try {
        const collections = await Collection.find()
            .populate('restaurants', 'name image rating cuisine')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: collections.length,
            collections,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single collection by ID
// @route   GET /api/collections/:id
// @access  Public
exports.getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id).populate(
            'restaurants',
            'name image rating cuisine address'
        );

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: 'Collection not found',
            });
        }

        res.status(200).json({
            success: true,
            collection,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update a collection
// @route   PUT /api/collections/:id
// @access  Public
exports.updateCollection = async (req, res) => {
    try {
        const { title, description, image, restaurants, isActive } = req.body;

        let collection = await Collection.findById(req.params.id);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: 'Collection not found',
            });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (image !== undefined) updateData.image = image;
        if (restaurants !== undefined) updateData.restaurants = restaurants;
        if (isActive !== undefined) updateData.isActive = isActive;

        collection = await Collection.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).populate('restaurants', 'name image rating cuisine');

        res.status(200).json({
            success: true,
            message: 'Collection updated successfully',
            collection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete a collection
// @route   DELETE /api/collections/:id
// @access  Public
exports.deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: 'Collection not found',
            });
        }

        await collection.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Collection deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
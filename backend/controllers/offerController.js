const Offer = require('../models/offer');

// @desc    Create a new offer
// @route   POST /api/offers
// @access  Public
exports.createOffer = async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            discount,
            image,
            validTill,
            restaurants,
            isActive,
        } = req.body;

        const offer = await Offer.create({
            title,
            description,
            code: code.toUpperCase(),
            discount,
            image,
            validTill,
            restaurants: restaurants || [],
            isActive: isActive !== undefined ? isActive : true,
        });

        const populatedOffer = await Offer.findById(offer._id).populate(
            'restaurants',
            'name image rating cuisine'
        );

        res.status(201).json({
            success: true,
            message: 'Offer created successfully',
            offer: populatedOffer,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Offer code already exists',
            });
        }
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all offers
// @route   GET /api/offers
// @access  Public
exports.getOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
            .populate('restaurants', 'name image rating cuisine')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: offers.length,
            offers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single offer by ID
// @route   GET /api/offers/:id
// @access  Public
exports.getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id).populate(
            'restaurants',
            'name image rating cuisine address'
        );

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found',
            });
        }

        res.status(200).json({
            success: true,
            offer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update an offer
// @route   PUT /api/offers/:id
// @access  Public
exports.updateOffer = async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            discount,
            image,
            validTill,
            restaurants,
            isActive,
        } = req.body;

        let offer = await Offer.findById(req.params.id);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found',
            });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (code !== undefined) updateData.code = code.toUpperCase();
        if (discount !== undefined) updateData.discount = discount;
        if (image !== undefined) updateData.image = image;
        if (validTill !== undefined) updateData.validTill = validTill;
        if (restaurants !== undefined) updateData.restaurants = restaurants;
        if (isActive !== undefined) updateData.isActive = isActive;

        offer = await Offer.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).populate('restaurants', 'name image rating cuisine');

        res.status(200).json({
            success: true,
            message: 'Offer updated successfully',
            offer,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Offer code already exists',
            });
        }
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete an offer
// @route   DELETE /api/offers/:id
// @access  Public
exports.deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found',
            });
        }

        await offer.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Offer deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
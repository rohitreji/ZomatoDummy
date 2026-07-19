const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Collection title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        restaurants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant',
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Collection', collectionSchema);
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Offer title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Offer description is required'],
            trim: true,
        },
        code: {
            type: String,
            required: [true, 'Offer code is required'],
            unique: true,
            trim: true,
            uppercase: true,
        },
        discount: {
            type: Number,
            required: [true, 'Discount is required'],
            min: [0, 'Discount cannot be negative'],
        },
        image: {
            type: String,
            trim: true,
        },
        validTill: {
            type: Date,
            required: [true, 'Valid till date is required'],
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

module.exports = mongoose.model('Offer', offerSchema);
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant name is required"],
            trim: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        description: {
            type: String,
            trim: true,
        },

        cuisine: [
            {
                type: String,
                trim: true,
            },
        ],

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },

        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },

        openingTime: {
            type: String,
            required: true,
        },

        closingTime: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
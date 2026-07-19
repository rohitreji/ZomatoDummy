const Restaurant = require("../models/restaurant");
const Collection = require("../models/collection");


//------------------------------------CREATE RESTURANT--------------------------------------------------

const createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);

        await restaurant.save(req.body);

        res.status(201).json({
            success:true,
            message: "Restaurant created successfully",
            restaurant
        });
    } catch (error) {
        console.error("Error while creating restaurant:" , error);
        res.status(500).json({
            success: false,
            message: error.message,
            error

        });
    }

};

//------------------------------------GETRESTAURANT--------------------------------------------------


const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        await res.status(200).json({
            success: true,
            message: "Restaurants fetched successfully",
            restaurants
        });

    }
    catch (error) {
        console.error("Error while fetching restaurants:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
}
//------------------------------------GET RESTAURANT BY ID--------------------------------------------------

const getRestaurantById = async (req, res) => {
    try {
        const getRestaurant = await Restaurant.findById(req.params.id);
        console.log("Params:", req.params);
        console.log("ID:", req.params.id);

        if(!getRestaurant) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Restaurant not found",
                }
            )
        }
        res.status(200).json({
            success: true,
            message: "Restaurant fetched successfully",
            restaurant: getRestaurant
        });
    } catch (error) {
        console.error("Error while fetching restaurant:", error);
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
}




//------------------------------------DELETING--------------------------------------------------

const deleteRestaurant = async(req,res) => {
    try{
        const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if(!deleteRestaurant)
        {
            return res.status(404).json({
                success:false,
                message: "Restaurants not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfuly"

        });
    }
    catch(error) {
        console.error("Error while deleting Restaurant:",error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        })
    }
}
//------------------------------------SEARCHING--------------------------------------------------
const searchRestaurant = async (req,res) => {
    try{
        const { name, city, cuisine, q } = req.query;

        let filter = {};

        // If q is provided, or if name, city, and cuisine are identical, it's a general search keyword
        if (q || (name && name === city && city === cuisine)) {
            const searchVal = q || name;
            
            const searchFilter = [
                { name: { $regex: searchVal, $options: "i" } },
                { city: { $regex: searchVal, $options: "i" } },
                { cuisine: { $regex: searchVal, $options: "i" } }
            ];

            // Also check if searchVal matches any collection title
            const matchedCollections = await Collection.find({
                title: { $regex: searchVal, $options: "i" }
            });

            let collectionRestaurantIds = [];
            if (matchedCollections && matchedCollections.length > 0) {
                matchedCollections.forEach(col => {
                    if (col.restaurants && col.restaurants.length > 0) {
                        collectionRestaurantIds.push(...col.restaurants);
                    }
                });
            }

            let queryFilter;
            if (collectionRestaurantIds.length > 0) {
                queryFilter = {
                    $or: [
                        ...searchFilter,
                        { _id: { $in: collectionRestaurantIds } }
                    ]
                };
            } else {
                queryFilter = { $or: searchFilter };
            }

            const restaurants = await Restaurant.find(queryFilter);

            res.status(200).json({
                success: true,
                count: restaurants.length,
                restaurants
            });
        } else {
            // Otherwise, specific filters (AND logic)
            if (name) {
                filter.name = { $regex: name, $options: "i" };
            }
            if (city) {
                filter.city = { $regex: city, $options: "i" };
            }
            if (cuisine) {
                filter.cuisine = { $regex: cuisine, $options: "i" };
            }

            const restaurants = await Restaurant.find(filter);

            res.status(200).json({
                success: true,
                count: restaurants.length,
                restaurants
            });
        }
    }
    catch(error)
    {
        console.error("Error in searching the restaurant:", error);

        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

//--------------------------------------------------------------------------------------------------------------

const updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if(!updatedRestaurant)
        {
            return res.status(404).json({
                success: false,
                message: "Restro not found",
                
            });
        }

        res.status(200).json({
            success: true,
            message:"Restaurant updated",
            restaurant: updatedRestaurant
        });
    
    } catch(error)
    {
        console.error("Error while updating Restaurant", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
//-----------------------------------------SEARCH OWNER ID-------------------------------------------------
const getRestaurantsByOwner = async (req, res) => {
    try {

        const restaurants = await Restaurant.find({
            owner: req.params.ownerId
        });

        if (restaurants.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No restaurants found for this owner"
            });
        }

        res.status(200).json({
            success: true,
            count: restaurants.length,
            restaurants
        });

    } catch (error) {

        console.error("Error fetching restaurants by owner:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
};
//------------------------------------------------------------------------------------------------

module.exports = { 
    createRestaurant , 
    getRestaurantById, 
    getRestaurants, 
    deleteRestaurant,
    searchRestaurant,
    updateRestaurant,
    getRestaurantsByOwner
};
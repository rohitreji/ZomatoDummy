const User = require("../models/User");


    const getUsers = async (req, res) => {
        try {
            const users = await User.find();

            res.status(200).json(users);
        }
        catch (error)
        {
            res.status(500).json({
                message: "Error while fetching users",
                error
            });
        }
    };

     

     const getUserById = async (req, res) => {
        try{
             console.log("Params:", req.params);
             console.log("ID:", req.params.id);

            const user = await User.findById(req.params.id);

            if(!user) {

                return res.status(404).json({ message: "User not found" });

            }

            res.status(200).json(user);
        }

        catch(error) {
            console.error("Error while fetching user:", error);
            res.status(500).json({
                message: "Error while fetching user",
                error
            });
        }
     };

     const UpdateUser = async (req, res) => {
        try {

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    message : "User updated successfully",
                    new: true,
                    runValidators: true
                }

            );
            if(!updatedUser) 
            {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json(updatedUser);
        }
        catch(error) {
            console.error("Error while updating user:", error);
            res.status(500).json({
                message: "Error while updating user",
                error
            });
        }
     }

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error while deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

module.exports = {  getUsers, getUserById, UpdateUser, deleteUser };
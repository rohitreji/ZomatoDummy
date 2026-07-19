import api from "./axios";

// Add a restaurant or menu item to wishlist
export const addToWishlist = (data) =>
    api.post("/wishlist", data);

// Get all wishlist items for a specific user
export const getWishlistByUser = (userId) =>
    api.get(`/wishlist/user/${userId}`);

// Remove a wishlist item by its wishlist document ID
export const removeFromWishlist = (id) =>
    api.delete(`/wishlist/${id}`);

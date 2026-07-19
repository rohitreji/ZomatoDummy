import api from "./axios";

// Create a new review
export const createReview = (data) =>
    api.post("/review", data);

// Get all reviews
export const getReviews = () =>
    api.get("/review");

// Get reviews for a specific restaurant
export const getReviewsByRestaurant = (restaurantId) =>
    api.get(`/review/restaurant/${restaurantId}`);

// Get a single review by ID
export const getReviewById = (id) =>
    api.get(`/review/${id}`);

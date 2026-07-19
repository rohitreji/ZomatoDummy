import api from "./axios";

// Update user details
export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data);

// Get user details
export const getUserById = (id) =>
    api.get(`/users/${id}`);

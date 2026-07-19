import api from "./axios";

// Create a new address
export const createAddress = (data) =>
    api.post("/address", data);

// Get all addresses for a specific user
export const getAddressesByUser = (userId) =>
    api.get(`/address/user/${userId}`);

// Update an address by ID
export const updateAddress = (id, data) =>
    api.put(`/address/${id}`, data);

// Delete an address by ID
export const deleteAddress = (id) =>
    api.delete(`/address/${id}`);

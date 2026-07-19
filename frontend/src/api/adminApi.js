import api from "./axios";

export const getDashboardStats = (token) =>
    api.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
    });

export const getAllUsers = (token) =>
    api.get("/users", {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateAdminUser = (id, data, token) =>
    api.put(`/users/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteAdminUser = (id, token) =>
    api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const createAdminRestaurant = (data, token) =>
    api.post("/restaurants", data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateAdminRestaurant = (id, data, token) =>
    api.put(`/restaurants/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteAdminRestaurant = (id, token) =>
    api.delete(`/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const createAdminMenuItem = (data, token) =>
    api.post("/menu", data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateAdminMenuItem = (id, data, token) =>
    api.put(`/menu/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteAdminMenuItem = (id, token) =>
    api.delete(`/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const getAllAdminOrders = (token) =>
    api.get("/order", {
        headers: { Authorization: `Bearer ${token}` }
    });

export const getAdminOrderById = (id, token) =>
    api.get(`/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateAdminOrder = (id, data, token) =>
    api.put(`/order/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteAdminOrder = (id, token) =>
    api.delete(`/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const createAdminCoupon = (data, token) =>
    api.post("/coupen", data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateAdminCoupon = (id, data, token) =>
    api.put(`/coupen/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteAdminCoupon = (id, token) =>
    api.delete(`/coupen/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

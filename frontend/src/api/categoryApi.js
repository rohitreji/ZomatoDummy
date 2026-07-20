import api from "./axios";

export const getCategories = () => api.get("/categories");

export const createCategory = (data, token) => 
    api.post("/categories", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateCategory = (id, data, token) => 
    api.put(`/categories/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteCategory = (id, token) => 
    api.delete(`/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });
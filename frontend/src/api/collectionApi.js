import api from "./axios";


export const getCollections = () => api.get("/collections");

export const createCollection = (data, token) => 
    api.post("/collections", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateCollection = (id, data, token) => 
    api.put(`/collections/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteCollection = (id, token) => 
    api.delete(`/collections/${id}`, { headers: { Authorization: `Bearer ${token}` } });
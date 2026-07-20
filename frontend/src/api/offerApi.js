import api from "./axios";

export const getOffers = () => api.get("/offers");
export const getOfferById = (id) => api.get(`/offers/${id}`);

export const createOffer = (data, token) => 
    api.post("/offers", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateOffer = (id, data, token) => 
    api.put(`/offers/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteOffer = (id, token) => 
    api.delete(`/offers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
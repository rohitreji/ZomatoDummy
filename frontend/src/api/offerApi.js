import api from "./axios";

export const getOffers = () => api.get("/offers");
export const getOfferById = (id) => api.get(`/offers/${id}`);
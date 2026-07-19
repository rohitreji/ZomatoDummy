import api from "./axios";


export const getCollections = () => api.get("/collections");
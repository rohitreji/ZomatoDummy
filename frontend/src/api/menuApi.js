import api from './axios';

export const getMenuItems = () => api.get('/menu');

export const getMenuByRestaurant = (restaurantId) => api.get(`/menu/restaurant/${restaurantId}`);

export const getMenuItemById = (id) => api.get(`/menu/${id}`);

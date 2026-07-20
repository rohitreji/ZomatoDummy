import api from './axios';

export const getMenuItems = () => api.get('/menu');

export const getMenuByRestaurant = (restaurantId) => api.get(`/menu/restaurant/${restaurantId}`);

export const getMenuItemById = (id) => api.get(`/menu/${id}`);

export const createMenuItem = (data) => api.post('/menu', data);

export const updateMenuItem = (id, data) => api.put(`/menu/${id}`, data);

export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);

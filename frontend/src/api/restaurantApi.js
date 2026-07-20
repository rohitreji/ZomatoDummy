import api from './axios';

export const getRestaurants = () => api.get('/restaurants');

export const getRestaurantById = (id) => api.get(`/restaurants/${id}`);

export const searchRestaurants = (query) => {
  const params = typeof query === 'string' && query.trim()
    ? { name: query.trim(), city: query.trim(), cuisine: query.trim() }
    : query || {};

  return api.get('/restaurants/search', { params });
};

export const getRestaurantsByOwner = (ownerId) => api.get(`/restaurants/owner/${ownerId}`);

export const createRestaurant = (data) => api.post('/restaurants', data);

export const updateRestaurant = (id, data) => api.put(`/restaurants/${id}`, data);

export const deleteRestaurant = (id) => api.delete(`/restaurants/${id}`);

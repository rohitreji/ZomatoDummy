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

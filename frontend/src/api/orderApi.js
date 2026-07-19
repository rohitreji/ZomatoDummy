import api from './axios';

export const getOrders = () => api.get('/order');

export const getOrderById = (id) => api.get(`/order/${id}`);

export const getOrdersByUser = (userId) => api.get(`/order/user/${userId}`);

export const createOrder = (data) => api.post('/order', data);

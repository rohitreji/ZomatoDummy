import api from "./axios";

// Create a new payment record
export const createPayment = (data) =>
    api.post("/payment", data);

// Get all payments (for current user)
export const getPaymentsByUser = (userId) =>
    api.get(`/payment/user/${userId}`);


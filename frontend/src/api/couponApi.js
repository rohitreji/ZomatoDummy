import api from "./axios";

// Get all coupons
export const getCoupons = () =>
    api.get("/coupen");

// Look up a single coupon by its code (used for validation at Cart)
export const getCouponByCode = (code) =>
    api.get(`/coupen/code/${code}`);

// Get coupon by ID
export const getCouponById = (id) =>
    api.get(`/coupen/${id}`);

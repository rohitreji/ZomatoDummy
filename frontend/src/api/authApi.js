import api from "./axios";

export const registerUser = (data) =>
    api.post("/auth/register", data);

export const loginUser = (data) =>
    api.post("/auth/login", data);

export const logoutUser = (token) =>
    api.post(
        "/auth/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const changePassword = (data, token) =>
    api.put("/auth/change-password", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const forgotPassword = (data) =>
    api.post("/auth/forgot-password", data);

export const resetPassword = (token, data) =>
    api.put(`/auth/reset-password/${token}`, data);
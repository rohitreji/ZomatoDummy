import axios from "axios";

const api = axios.create({
    baseURL:  process.env.BACKEND,
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        const stored = localStorage.getItem("zomato_auth");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.token) {
                    config.headers.Authorization = `Bearer ${parsed.token}`;
                }
            } catch (err) {
                console.error("Error parsing auth token in request interceptor:", err);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
import axios from "axios";

const API = axios.create({
    baseURL: "https://expense-manager-backend-qx1a.onrender.com",
});

let isRefreshing = false;
let failedQueue = [];

// Process queued requests after refresh
const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

// Attach access token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Handle expired access tokens
API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            // If a refresh is already happening,
            // wait for it instead of starting another one.
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    });
                }).then((token) => {
                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return API(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refresh = localStorage.getItem("refresh");

            if (!refresh) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {

                const res = await axios.post(
                    "https://expense-manager-backend-qx1a.onrender.com/api/token/refresh/",
                    {
                        refresh,
                    }
                );

                const newAccess = res.data.access;

                localStorage.setItem("access", newAccess);

                API.defaults.headers.common.Authorization =
                    `Bearer ${newAccess}`;

                processQueue(null, newAccess);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return API(originalRequest);

            } catch (refreshError) {

                processQueue(refreshError, null);

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/login";

                return Promise.reject(refreshError);

            } finally {

                isRefreshing = false;

            }
        }

        return Promise.reject(error);
    }
);

export default API;
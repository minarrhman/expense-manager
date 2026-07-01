import { getToken, removeToken } from "../utils/storage";

const BASE_URL = "http://192.168.0.163:8000/api";

async function request(endpoint, method = "GET", body = null) {
    const token = await getToken();

    const options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const data = await response.json();

    if (response.status === 401) {
        await removeToken();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw data;
    }

    return data;
}

export const getCategoryLimits = () =>
    request("/category-limits/");

export const createCategoryLimit = (budgetData) =>
    request("/category-limits/", "POST", budgetData);

export const updateCategoryLimit = (id, budgetData) =>
    request(`/category-limits/${id}/`, "PATCH", budgetData);

export const deleteCategoryLimit = (id) =>
    request(`/category-limits/${id}/`, "DELETE");
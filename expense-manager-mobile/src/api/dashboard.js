import { removeToken,getToken } from "../utils/storage";

const BASE_URL = "https://expense-manager-backend-qx1a.onrender.com/api";


export const getDashboard = async () => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/dashboard/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (response.status === 401) {
        await removeToken(); // 🔥 clear invalid token
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw data;
    }

    return data;
};
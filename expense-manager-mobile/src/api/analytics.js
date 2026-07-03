import { getToken, removeToken } from "../utils/storage";

const BASE_URL = "https://expense-manager-backend-qx1a.onrender.com/api";

async function fetchAnalytics(endpoint) {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

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

export const getReportSummary = () =>
    fetchAnalytics("/reports/summary/");

export const getCategoryBreakdown = () =>
    fetchAnalytics("/reports/category-breakdown/");

export const getMonthlyTrend = () =>
    fetchAnalytics("/reports/monthly-trend/");
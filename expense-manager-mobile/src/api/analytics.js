import { getToken, removeToken } from "../utils/storage";

const BASE_URL = "http://192.168.0.163:8000/api";

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
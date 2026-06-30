import { getToken, removeToken } from "../utils/storage";

const BASE_URL = "http://192.168.0.163:8000/api";

export const getProfile = async () => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/profile/`, {
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
};

export const updateProfile = async (profileData) => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/profile/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
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
};

export const updateProfilePhoto = async (profilePhoto) => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/profile/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            profile_photo: profilePhoto,
        }),
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
};
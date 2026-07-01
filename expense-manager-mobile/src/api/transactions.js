import { getToken, removeToken } from "../utils/storage";

const BASE_URL = "http://192.168.0.163:8000/api";

export const getTransactions = async (
    page = 1,
    search = "",
    type = 'all'
) => {
    const token = await getToken();

    let url = `${BASE_URL}/transactions/?page=${page}`;

    if (search) {
        url += `&search=${encodeURIComponent(search)}`
    }
    if (type!='all'){
        url += `&type=${type}`
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await response.json();

    if (response === 401){
        await removeToken();
        throw new Error("Unauthorized.")
    }
    if (!response.ok){
        throw data;
    }

    return data;

};


export const getTransaction = async(id) => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/transactions/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const data = await response.json()

    if (response === 401){
        await removeToken();
        throw new Error("Unauthorized.")
    }
    if (!response.ok){
        throw data;
    }

    return data;

};


export const deleteTransaction = async(id) => {

    const token = await getToken();

    const response = await fetch(`${BASE_URL}/transactions/${id}/`,{
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if(response === 401){
        await removeToken();
        throw new Error("Unauthorized")
    }
    if(!response.ok){
        throw new Error("Failed to delete transaction");
    }

    return true;

};

export const updateTransaction = async(id, transactionData) => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/transactions/${id}/`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (response === 401){
        await removeToken();
        throw new Error("Unauthorized.")
    }
    if (!response.ok){
        throw data;
    }

    return data;
};

export const createTransaction = async(transactionData)=>{

    const token = await getToken();

    const response = await fetch(`${BASE_URL}/transactions/`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (response === 401){
        await removeToken();
        throw new Error("Unauthorized.")
    }
    if (!response.ok){
        throw data;
    }

    return data;
};


export const getCategories = async () => {

    const token = await getToken();

    const response = await fetch(`${BASE_URL}/categories/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return data;
}
const BASE_URL = "http://192.168.0.163:8000/api";

export default async function loginUser(username, password){
    const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok){
        throw new Error("Login Failed")
    }

    return await response.json()
}


export async function registerUser(first_name, last_name,email,username,password,date_of_birth){
    const response = await fetch (`${BASE_URL}/register/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({first_name,last_name,username,email,password,date_of_birth}),
    });


    const data = await response.json();
    if (!response.ok){
        throw data;
    }

    return data;


}
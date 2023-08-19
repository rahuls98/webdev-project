import axios from "axios"
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL
const USERS_URL = `${SERVER_API_URL}/authentication`


const api = axios.create({ withCredentials: true })

export const login = async ({ email, password }) => {
    const response = await api.post(`${USERS_URL}/signin`, { email, password })
    console.log("Login success")
    console.log(response.data)
    const user = response.data
    console.log(user + " Fetched from node server...")
    return user
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}`, user);
    return response.data;
};
export const register = async (user) => {
    const response = await api.post(`${USERS_URL}/signup`, user)
    const responseUser = response.data
    console.log("API hit for registering users");
    console.log(responseUser);
    return responseUser
}

import requestMethods from "../apis/base";
const USERS_URL = "/authentication";

export const login = async ({ email, password }) => {
    const response = await requestMethods.post(`${USERS_URL}/signin`, {
        email,
        password,
    });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await requestMethods.post(`${USERS_URL}/logout`);
    return response.data;
};


export const register = async (user) => {
    const response = await requestMethods.post(`${USERS_URL}/signup`, user);
    const responseUser = response.data;
    return responseUser;
};

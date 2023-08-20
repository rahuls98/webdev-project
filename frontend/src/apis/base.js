import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_API_URL;
const api = axios.create({ withCredentials: true });

const get = async (url) => {
    try {
        const response = await api.get(BASE_URL + url);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const post = async (url, data) => {
    try {
        const response = await api.post(BASE_URL + url, data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const del = async (url, data) => {
    try {
        const response = await api.delete(BASE_URL + url, data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const put = async (url, data) => {
    try {
        const response = await api.put(BASE_URL + url, data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const requestMethods = {
    get,
    post,
    del,
    put,
};

export default requestMethods;

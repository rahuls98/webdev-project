import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/authentication`;

const api = axios.create({ withCredentials: true });

export const verifyExpert = async (expertId) => {
    try{
        const response = await api.post(`${USERS_URL}/verifyExperts`, {id : expertId})
        if(response.status === 200){
            return expertId;
        }
    }catch(error){
        return error
    }
};

export const getUnverifiedExperts = async () => {
    try{
        const response = await api.get(`${USERS_URL}/getUnverifiedExperts`);
        return response.data;
    }catch (error){
        return error;
    }
};


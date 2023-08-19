import requestMethods from "./base";

const getFollowingExperts = async (userId) => {
    return await requestMethods.get(`/following/experts?user=${userId}`);
};

const getFollowingTopics = async (userId) => {
    return await requestMethods.get(`/following/topics?user=${userId}`);
};

const followingApis = {
    getFollowingExperts,
    getFollowingTopics,
};

export default followingApis;

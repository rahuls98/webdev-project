import requestMethods from "./base";

const getAllTopics = async () => {
    return await requestMethods.get("/topic");
};

const getExplorableTopics = async (userId) => {
    return await requestMethods.get(`/topic?user=${userId}`);
};

const getFollowingTopics = async () => {
    return await requestMethods.get("/topic");
};

const followTopic = async (data) => {
    return await requestMethods.post("/topic/follow/", data);
};

const unfollowTopic = async (data) => {
    return await requestMethods.del(
        `/topic/unfollow/${data.topic}/${data.user}`,
        data
    );
};

const topicApis = {
    getAllTopics,
    getExplorableTopics,
    getFollowingTopics,
    followTopic,
    unfollowTopic,
};

export default topicApis;

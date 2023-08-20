import requestMethods from "./base";

const getAllExperts = async () => {
    return await requestMethods.get("/expert");
};

const getFollowingExperts = async () => {
    return await requestMethods.get("/expert");
};

const followExpert = async (data) => {
    return await requestMethods.post("/expert/follow/", data);
};

const unfollowExpert = async (data) => {
    return await requestMethods.del(
        `/expert/unfollow/${data.expert}/${data.user}`,
        data
    );
};

const expertApis = {
    getAllExperts,
    getFollowingExperts,
    followExpert,
    unfollowExpert,
};

export default expertApis;

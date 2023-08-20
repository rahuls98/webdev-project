import requestMethods from "./base";

const createPost = async (data) => {
    return await requestMethods.post("/post/", data);
};

const getAllUnauthPosts = async () => {
    return await requestMethods.get("/post/getUnauthenticatedPosts")
}

const getAllPosts = async (userId) => {
    return await requestMethods.get(`/post?user=${userId}`);
};

const getSavedPosts = async (userId) => {
    return await requestMethods.get(`/post/saved?user=${userId}`);
};

const savePost = async (data) => {
    return await requestMethods.put("/post/save", data);
};

const unsavePost = async (data) => {
    return await requestMethods.put("/post/unsave", data);
};

const upvotePost = async (data) => {
    return await requestMethods.put("/post/upvote", data);
};

const removePostUpvote = async (data) => {
    return await requestMethods.del(
        `/post/upvote/${data.post}/${data.expert}`,
        data
    );
};

const downvotePost = async (data) => {
    return await requestMethods.put("/post/downvote", data);
};

const removePostDownvote = async (data) => {
    return await requestMethods.del(
        `/post/downvote/${data.post}/${data.expert}`,
        data
    );
};

const deletePost = async (postId) => {
    return await requestMethods.del(`/post/delete?postId=${postId}`);
};

const postApis = {
    createPost,
    getAllPosts,
    getSavedPosts,
    savePost,
    unsavePost,
    upvotePost,
    removePostUpvote,
    downvotePost,
    removePostDownvote,
    deletePost,
    getAllUnauthPosts
};

export default postApis;

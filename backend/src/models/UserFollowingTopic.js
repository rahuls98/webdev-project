import mongoose from "mongoose";
import UserFollowingTopicSchema from "../schemas/UserFollowingTopic.js";

const UserFollowingTopic = mongoose.model(
    "UserFollowingTopic",
    UserFollowingTopicSchema
);

const createUserFollowingTopic = async (user, topic) => {
    try {
        const userFollowingTopic = new UserFollowingTopic({
            user,
            topic,
        });
        await userFollowingTopic.save();
    } catch (error) {
        console.error("Error createUserFollowingTopic: ", error);
    }
};

const readFollowedTopics = async (user) => {
    try {
        const followedTopicsObjects = await UserFollowingTopic.find(
            { user },
            {
                _id: false,
                topic: true,
            }
        ).populate("topic");
        let followedTopics = [];
        for (let object of followedTopicsObjects) {
            followedTopics.push(object.topic);
        }
        return followedTopics;
    } catch (error) {
        console.error("Error readFollowedTopics: ", error);
    }
};

const readFollowedTopicsIds = async (user) => {
    try {
        const followedTopicsObjects = await UserFollowingTopic.find(
            { user },
            {
                _id: false,
                topic: true,
            }
        ).populate("topic");
        let followedTopicsIds = [];
        for (let object of followedTopicsObjects) {
            followedTopicsIds.push(object.topic._id.toString());
        }
        return followedTopicsIds;
    } catch (error) {
        console.error("Error readFollowedTopicsIds: ", error);
    }
};

const deleteUserFollowingTopic = async (user, topic) => {
    try {
        await UserFollowingTopic.deleteOne({ user, topic });
    } catch (error) {
        console.error("Error deleteUserFollowingTopic: ", error);
    }
};

const UserFollowingTopicModel = {
    createUserFollowingTopic,
    readFollowedTopics,
    readFollowedTopicsIds,
    deleteUserFollowingTopic,
};

export default UserFollowingTopicModel;

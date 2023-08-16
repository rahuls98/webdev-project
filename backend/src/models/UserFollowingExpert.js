import mongoose from "mongoose";
import UserFollowingExpertSchema from "../schemas/UserFollowingExpert.js";

const UserFollowingExpert = mongoose.model(
    "UserFollowingExpert",
    UserFollowingExpertSchema
);

const createUserFollowingExpert = async (user, expert) => {
    try {
        const userFollowingExpert = new UserFollowingExpert({
            user,
            expert,
        });
        await userFollowingExpert.save();
    } catch (error) {
        console.error("Error createUserFollowingExpert: ", error);
    }
};

const readFollowedExperts = async (user) => {
    try {
        const followedExpertsObject = await UserFollowingExpert.find(
            { user },
            { expert: true, _id: false }
        ).populate("expert");
        let followedExperts = [];
        for (let object of followedExpertsObject) {
            followedExperts.push(object.expert);
        }
        return followedExperts;
    } catch (error) {
        console.error("Error readFollowedExperts: ", error);
    }
};

const deleteUserFollowingExpert = async (user, expert) => {
    try {
        await UserFollowingExpert.deleteOne({ user, expert });
    } catch (error) {
        console.error("Error deleteUserFollowingExpert: ", error);
    }
};

const UserFollowingExpertModel = {
    createUserFollowingExpert,
    readFollowedExperts,
    deleteUserFollowingExpert,
};

export default UserFollowingExpertModel;

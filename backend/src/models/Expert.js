import mongoose from "mongoose";
import ExpertSchema from "../schemas/Expert.js";
import UserFollowingExpertModel from "./UserFollowingExpert.js";
import usersModel from "./User.js";

const Expert = mongoose.model("Expert", ExpertSchema);

const createExpert = async (body) => {
    try {
        const newlyCreatedExpert = await Expert.create({
            fullname: body.fullname,
            email: body.email,
            expertiseTopics: body.expertiseTopics,
            password: body.password,
            isVerified: false,
        });
        await UserFollowingExpertModel.createUserFollowingExpert(
            newlyCreatedExpert._doc._id,
            newlyCreatedExpert._doc._id
        );
        return newlyCreatedExpert;
    } catch (error) {
        console.error("Error createExpert: ", error);
    }
};

const findExpertByUsername = (email) => Expert.findOne({ email });

const findExpertByCredentials = (email, password) =>
    Expert.findOne({ email, password });

const readExperts = async () => {
    try {
        return await Expert.find({isVerified: true});
    } catch (error) {
        console.error("Error readExperts: ", error);
    }
};

const updateExpert = async (id, expert) => {
    try {
        const updatedExpert = await Expert.updateOne({ _id: id }, { $set: expert });
        return updatedExpert;
    } catch (error) {
        console.log(error);
    }
};

const readExpertsById = async (expertIds) => {
    try {
        const objectIdExpertIds = expertIds.map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        const experts = await Expert.find({ _id: { $in: objectIdExpertIds } });
        return experts;
    } catch (error) {
        console.error("Error readExpertsById: ", error);
    }
};

const searchExpertsByTopic = async (searchCriteria) => {
    try {
        const regex = new RegExp(searchCriteria, "i");
        const experts = await Expert.find({
            expertiseTopics: { $regex: regex },
        });
        return experts;
    } catch (error) {
        console.error("Error searchExpertsByTopic: ", error);
    }
};

const increaseFollowerCount = async (expertId) => {
    try {
        await Expert.updateOne(
            { _id: expertId },
            { $inc: { followerCount: 1 } }
        );
    } catch (error) {
        console.error("Error increaseFollowerCount: ", error);
    }
};

const decreaseFollowerCount = async (expertId) => {
    try {
        await Expert.updateOne(
            { _id: expertId },
            { $inc: { followerCount: -1 } }
        );
    } catch (error) {
        console.error("Error increaseFollowerCount: ", error);
    }
};

const findAllUnverifiedExperts = async () => {
    try {
        const unverifiedExperts = await Expert.find({ isVerified: false });
        return unverifiedExperts;
    } catch (error) {
        console.error("Error with DB : ", error);
    }
};

export const verifyExpert = async (id) => {
    try {
        const updatedExpert = Expert.updateOne(
            { _id: id },
            { $set: { isVerified: true } }
        );
        return updatedExpert;
    } catch (error) {
        console.log(error);
    }
};

const ExpertModel = {
    createExpert,
    readExperts,
    readExpertsById,
    searchExpertsByTopic,
    increaseFollowerCount,
    decreaseFollowerCount,
    findExpertByUsername,
    findExpertByCredentials,
    findAllUnverifiedExperts,
    verifyExpert,
    updateExpert
};

export default ExpertModel;

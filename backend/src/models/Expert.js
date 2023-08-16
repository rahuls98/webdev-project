import mongoose from "mongoose";
import ExpertSchema from "../schemas/Expert.js";

const Expert = mongoose.model("Expert", ExpertSchema);

const createExpert = async (fullname, email, pangeaUserId, expertiseTopics) => {
    try {
        const expert = new Expert({
            fullname,
            email,
            pangeaUserId,
            expertiseTopics,
        });
        await expert.save();
    } catch (error) {
        console.error("Error createExpert: ", error);
    }
};

const readExperts = async () => {
    try {
        return await Expert.find();
    } catch (error) {
        console.error("Error readExperts: ", error);
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

const readByPangeaId = async (pangeaId) => {
    try {
        const user = await Expert.find({ pangeaUserId: pangeaId });
        return user;
    } catch (error) {
        console.error("Error readByPangeaId: ", error);
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

const ExpertModel = {
    createExpert,
    readExperts,
    readExpertsById,
    readByPangeaId,
    searchExpertsByTopic,
    increaseFollowerCount,
    decreaseFollowerCount,
};

export default ExpertModel;

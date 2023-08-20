import mongoose from "mongoose";
import SessionSchema from "../schemas/Session.js";

const Session = mongoose.model("Session", SessionSchema);

const createSession = async (
    author,
    title,
    description,
    date,
    time,
    topics
) => {
    try {
        const session = new Session({
            author,
            title,
            description,
            sessionDate: date,
            sessionTime: time,
            topics,
        });
        await session.save();
        await addEnrollment(session._id , author);
    } catch (error) {
        console.error("Error createSession: ", error);
    }
};

const readSessions = async (user) => {
    try {
        return await Session.find({ interestedUsers: { $ne: user } }).populate(
            "author"
        );
    } catch (error) {
        console.error("Error readSessions: ", error);
    }
};

const readSessionsByAuthors = async (authors, user) => {
    try {
        const sessions = await Session.find(
            { author: { $in: authors } },
            {},
            { createdDate: -1 }
        ).populate({
            path: "author",
            model: "Expert",
        });
        const sessionsWithSavedInfo = sessions.map((session) => {
            const updatedSession = { ...session };
            if (
                session.interestedUsers.includes(
                    new mongoose.Types.ObjectId(user)
                )
            ) {
                updatedSession["enrolled"] = true;
            }
            return updatedSession;
        });
        return sessionsWithSavedInfo;
    } catch (error) {
        console.error("Error readSessionsByAuthors: ", error);
    }
};

const readSessionsByUser = async (user) => {
    try {
        const sessions = await Session.find(
            { interestedUsers: user },
            { interestedUsers: false }
        );
        return sessions;
    } catch (error) {
        console.error("Error readSessionsByUser: ", error);
    }
};

const searchSessionsByTopic = async (topic) => {
    try {
        const sessions = await Session.find({ topics: topic });
        return sessions;
    } catch (error) {
        console.error("Error searchSessionsByTopic: ", error);
    }
};

const addEnrollment = async (id, user) => {
    try {
        await Session.findOneAndUpdate(
            { _id: id },
            { $addToSet: { interestedUsers: user } },
            { new: true }
        );
    } catch (error) {
        console.log("Error editSessionForInterestedUser: ", error);
    }
};

const deleteEnrollment = async (id, user) => {
    try {
        await Session.findOneAndUpdate(
            { _id: id },
            { $pull: { interestedUsers: user } },
            { new: true }
        );
    } catch (error) {
        console.log("Error editSessionForInterestedUser: ", error);
    }
};

const markSessionComplete = async (id) => {
    try {
        await Session.findOneAndUpdate({ _id: id }, { complete: true });
    } catch (error) {
        console.log("Error markSessionComplete: ", error);
    }
};

const getSessionsByAuthor = async (author) => {
    try {
        const sessions = await Session.find({author : author});
        return sessions;
    } catch (error) {
        console.error("Error getSessionsByAuthor: ", error);
    }
}

const deleteSessionById = async (sessionId) => {
    try{
        const response = await Session.deleteOne({_id : sessionId});
        console.log(response);
    }catch(error){
        console.log(error);
    }
}

const SessionModel = {
    createSession,
    readSessions,
    readSessionsByAuthors,
    readSessionsByUser,
    searchSessionsByTopic,
    addEnrollment,
    markSessionComplete,
    deleteEnrollment,
    getSessionsByAuthor,
    deleteSessionById
};

export default SessionModel;

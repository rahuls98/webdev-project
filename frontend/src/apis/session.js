import requestMethods from "./base";

const createSession = async (data) => {
    return await requestMethods.post("/session/", data);
};

const getAllSessions = async (userId) => {
    return await requestMethods.get(`/session?user=${userId}`);
};

const getEnrolledSessions = async (userId) => {
    const enrolledSessions = await requestMethods.get(
        `/session/enrolled?user=${userId}`
    );
    return enrolledSessions;
};

const enrollInSession = async (data) => {
    return await requestMethods.put("/session/enroll/", data);
};

const unenrollInSession = async (data) => {
    return await requestMethods.put("/session/unenroll/", data);
};

const markSessionComplete = async (data) => {
    return await requestMethods.put("/session/complete/", data);
};

const redactMessage = async (data) => {
    return await requestMethods.post("/session/message/redact/", data);
};

const deleteSession = async (sessionId) => {
    return await requestMethods.del(`/session/delete?sessionId=${sessionId}`);
};

const sessionApis = {
    getAllSessions,
    getEnrolledSessions,
    createSession,
    enrollInSession,
    unenrollInSession,
    redactMessage,
    markSessionComplete,
    deleteSession,
};

export default sessionApis;

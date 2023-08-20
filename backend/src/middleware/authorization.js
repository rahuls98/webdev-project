import "express";
import PostModel from "../models/Post.js";
import SessionModel from "../models/Session.js";

export const isAuthenticated = async (req, res, next) => {
    if (
        req.session.currentUser === null ||
        req.session.currentUser === undefined
    ) {
        res.status(400).send("Unauthorized!");
        return;
    }
    next();
};

export const isAuthenticatedExpert = async (req, res, next) => {
    if (
        req.session.currentUser === null ||
        req.session.currentUser === undefined
    ) {
        res.status(400).send("Unauthorized!");
        return;
    }
    if (req.session.currentUser.role !== "Expert") {
        res.status(400).send("Unauthorized! Not an expert");
        return;
    }
    next();
};

export const isAuthenticatedAdmin = async (req, res, next) => {
    if (
        req.session.currentUser === null ||
        req.session.currentUser === undefined
    ) {
        res.status(400).send("Unauthorized!");
        return;
    }
    if (req.session.currentUser.role !== "Admin") {
        res.status(400).send("Unauthorized! Not an Admin");
        return;
    }
    next();
};

export const isAuthenticatedAndOwnerPost = async (req, res, next) => {
    if (
        req.session.currentUser === null ||
        req.session.currentUser === undefined
    ) {
        res.status(400).send("Unauthorized!");
        return;
    }

    if (req.session.currentUser.role !== "Expert") {
        res.status(400).send("Unauthorized! Not an expert");
        return;
    }
    const postId = req.query.postId;
    let posts = [
        ...(await PostModel.getPostsByAuthor(req.session.currentUser._id)),
    ];
    let filteredPosts = posts.filter((post) => post._id.equals(postId));
    if (filteredPosts.length === 0) {
        res.status(401).send("Unauthorized! Expert not an owner of the post");
        return;
    }
    next();
};

export const isAuthenticatedAndOwnerSession = async (req, res, next) => {
    if (
        req.session.currentUser === null ||
        req.session.currentUser === undefined
    ) {
        res.status(400).send("Unauthorized!");
        return;
    }

    if (req.session.currentUser.role !== "Expert") {
        res.status(400).send("Unauthorized! Not an expert");
        return;
    }
    const sessionId = req.query.sessionId;
    let sessions = [
        ...(await SessionModel.getSessionsByAuthor(
            req.session.currentUser._id
        )),
    ];
    let filteredSessions = sessions.filter((session) =>
        session._id.equals(sessionId)
    );
    if (filteredSessions.length === 0) {
        res.status(401).send(
            "Unauthorized! Expert not an owner of the Session"
        );
        return;
    }
    next();
};

import "express";

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

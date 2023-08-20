import express from "express";
import SessionModel from "../models/Session.js";
import {
    isAuthenticated,
    isAuthenticatedAndOwnerSession
} from "../middleware/authorization.js";

const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const sessions = await SessionModel.readSessions(user) || [];
    res.status(200).send(sessions);
});

router.post('/', isAuthenticated, async (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const time = req.body.time;
    const topics = req.body.topics;
    await SessionModel.createSession(author, title, description, date, time, topics);
    res.status(201).send({
        "msg": "Success!"
    });
});

router.put('/enroll', isAuthenticated, async (req, res) => {
    const session = req.body.session;
    const user = req.body.user;
    await SessionModel.addEnrollment(session, user);
    res.status(200).send({
        "msg": "Success!"
    });
});

router.put('/unenroll', isAuthenticated, async (req, res) => {
    const session = req.body.session;
    const user = req.body.user;
    await SessionModel.deleteEnrollment(session, user);
    res.status(200).send({
        "msg": "Success!"
    });
});

router.get('/enrolled', isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const enrolledSessions = await SessionModel.readSessionsByUser(user);
    res.status(200).send(enrolledSessions);
});

router.post('/message/redact', isAuthenticated, async (req, res) => {
    const content = req.body.content;
    const redactResult = await TextProcessing.redact(content);
    res.status(200).send(redactResult);
});

router.put('/complete', isAuthenticated, async (req, res) => {
    const session = req.body.session;
    await SessionModel.markSessionComplete(session);
    res.status(200).send({
        "msg": "Success!"
    });
})

router.delete('/delete', isAuthenticatedAndOwnerSession, async (req, res) => {
    try {
        const sessionId = req.query.sessionId;
        await SessionModel.deleteSessionById(sessionId);
        res.status(200).send({
            "msg": "Success!"
        })
    } catch (error) {
        console.log(error);
    }
})

export default router;
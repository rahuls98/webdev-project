import express from "express";
import UserFollowingExpertModel from "../models/UserFollowingExpert.js";
import UserFollowingTopicModel from "../models/UserFollowingTopic.js";
import {isAuthenticated} from "../middleware/authorization.js";

const router = express.Router();

router.get('/experts', isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const followedExperts = await UserFollowingExpertModel.readFollowedExperts(user) || [];
    res.status(200).send(followedExperts);
});

router.get('/topics', isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const followedTopics = await UserFollowingTopicModel.readFollowedTopics(user) || [];
    res.status(200).send(followedTopics);
});

export default router;
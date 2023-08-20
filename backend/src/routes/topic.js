import express from "express";
import TopicModel from "../models/Topic.js";
import UserFollowingTopicModel from "../models/UserFollowingTopic.js";
import { isAuthenticated } from "../middleware/authorization.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const topicsToExclude =
        (await UserFollowingTopicModel.readFollowedTopicsIds(user)) || [];
    const topics = (await TopicModel.readTopics(topicsToExclude)) || [];
    res.status(200).send(topics);
});

router.post("/", isAuthenticated, async (req, res) => {
    const topic = req.body.topic;
    await TopicModel.createTopic(topic);
    res.status(201).send({
        msg: "Success!",
    });
});

router.post("/follow", isAuthenticated, async (req, res) => {
    const userId = req.body.user;
    const topicId = req.body.topic;
    try {
        await UserFollowingTopicModel.createUserFollowingTopic(userId, topicId);
        res.status(201).send({
            msg: "Success!",
        });
    } catch (e) {
        console.log(e);
    }
});

router.delete(
    "/unfollow/:topicId/:userId",
    isAuthenticated,
    async (req, res) => {
        const userId = req.params.userId;
        const topicId = req.params.topicId;
        await UserFollowingTopicModel.deleteUserFollowingTopic(userId, topicId);
        res.status(200).send({
            msg: "Success!",
        });
    }
);

export default router;

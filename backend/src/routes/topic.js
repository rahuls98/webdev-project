import express, {Request, Response, Router} from "express";
import TopicModel from "../models/Topic";
import UserFollowingTopicModel from "../models/UserFollowingTopic";
import {verifyToken} from "../middleware/authorization";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const topicsToExclude = await UserFollowingTopicModel.readFollowedTopicsIds(user) || [];
    const topics = await TopicModel.readTopics(topicsToExclude) || [];
    res.status(200).send(topics);
})

router.post('/', verifyToken, async (req, res) => {
    const topic = req.body.topic;
    await TopicModel.createTopic(topic);
    res.status(201).send({
        "msg": "Success!"
    });
})

router.post('/follow', verifyToken, async (req, res) => {
    const userId = req.body.user;
    const topicId = req.body.topic;
    await UserFollowingTopicModel.createUserFollowingTopic(userId, topicId)
    res.status(201).send({
        "msg": "Success!"
    });
});

router.delete('/unfollow', verifyToken, async (req, res) => {
    const userId = req.body.user;
    const topicId = req.body.topic;
    await UserFollowingTopicModel.deleteUserFollowingTopic(userId, topicId)
    res.status(200).send({
        "msg": "Success!"
    });
});

export default router;
import express from "express";
import ExpertModel from "../models/Expert.js";
import PostModel from "../models/Post.js";
import SessionModel from "../models/Session.js";
import TopicModel from "../models/Topic.js";
import UserFollowingExpertModel from "../models/UserFollowingExpert.js";
import {isAuthenticated} from "../middleware/authorization.js";

const router = express.Router();

router.get('/trending', isAuthenticated, async (req, res) => {
    const trendingTopics = await TopicModel.readTrendingTopics() || [];
    res.status(200).json({
        topics: trendingTopics
    });
});

router.get('/search', isAuthenticated, async (req, res) => {
    let searchTopic = req.query.query?.toString() || '';
    searchTopic = searchTopic.replace(/%20/g, " ");
    const relevantPosts = await PostModel.searchPostsByTopic(searchTopic);
    const relevantSessions = await SessionModel.searchSessionsByTopic(searchTopic) || [];
    const relevantTopics = await TopicModel.searchTopics(searchTopic) || [];
    const relevantExperts = await ExpertModel.searchExpertsByTopic(searchTopic) || [];
    await TopicModel.incrementSeachCounter(searchTopic);
    const relevant = {
        posts: relevantPosts,
        sessions: relevantSessions,
        topics: relevantTopics,
        experts: relevantExperts
    }
    res.status(200).json(relevant);
});

router.get('/:userId', isAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const followedExperts = await UserFollowingExpertModel.readFollowedExperts(userId) || [];
    const followedExpertsIds = followedExperts.map(expert => expert._id.toString());
    const followedExpertsPosts = await PostModel.readPostsByAuthors(followedExpertsIds, userId) || [];
    const followedExpertsSessions = await SessionModel.readSessionsByAuthors(followedExpertsIds, userId) || [];
    res.status(200).json({
        posts: followedExpertsPosts,
        sessions: followedExpertsSessions
    });
});

export default router;
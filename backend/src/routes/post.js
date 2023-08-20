import express from "express";
import PostModel from "../models/Post.js";
import {
    isAuthenticated,
    isAuthenticatedAndOwnerPost,
} from "../middleware/authorization.js";

const router = express.Router();


router.get("/getUnauthenticatedPosts", async (req, res) => {
    const posts = (await PostModel.getAllPosts()) || [];
    res.status(200).send(posts);
})

router.get("/", isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const posts = (await PostModel.readPosts(user)) || [];
    res.status(200).send(posts);
});

router.post("/", isAuthenticated, async (req, res) => {
    const author = req.body.author;
    const profilePhoto = req.body.profilePhoto;
    const topics = req.body.topics;
    const content = req.body.content;
    const createRes = await PostModel.createPost(
        author,
        profilePhoto,
        topics,
        content
    );
    if (createRes)
        res.status(200).send({
            msg: "Success!",
        });
    else
        res.status(403).send({
            msg: "Content cannot contain any personal information/vulgarity!",
        });
});

router.put("/upvote", isAuthenticated, async (req, res) => {
    const post = req.body.post;
    const expert = req.body.expert;
    await PostModel.upvotePost(post, expert);
    res.status(200).send({
        msg: "Success!",
    });
});

router.delete(
    "/upvote/:postId/:expertId",
    isAuthenticated,
    async (req, res) => {
        const post = req.params.postId;
        const expert = req.params.expertId;
        await PostModel.removePostUpvote(post, expert);
        res.status(200).send({
            msg: "Success!",
        });
    }
);

router.put("/downvote", isAuthenticated, async (req, res) => {
    const post = req.body.post;
    const expert = req.body.expert;
    await PostModel.downvotePost(post, expert);
    res.status(200).send({
        msg: "Success!",
    });
});

router.delete(
    "/downvote/:postId/:expertId",
    isAuthenticated,
    async (req, res) => {
        const post = req.params.postId;
        const expert = req.params.expertId;
        await PostModel.removePostDownvote(post, expert);
        res.status(200).send({
            msg: "Success!",
        });
    }
);

router.get("/saved", isAuthenticated, async (req, res) => {
    const user = req.query.user?.toString() || "";
    const posts = await PostModel.readUserSavedPosts(user);
    res.status(200).send(posts);
});

router.put("/save", isAuthenticated, async (req, res) => {
    const post = req.body.post;
    const user = req.body.user;
    await PostModel.createSavedPost(user, post);
    res.status(200).send({
        msg: "Success!",
    });
});

router.put("/unsave", isAuthenticated, async (req, res) => {
    const post = req.body.post;
    const user = req.body.user;
    await PostModel.deleteSavedPost(user, post);
    res.status(200).send({
        msg: "Success!",
    });
});

router.delete("/delete", isAuthenticatedAndOwnerPost, async (req, res) => {
    try {
        const postId = req.query.postId;
        await PostModel.deletePostById(postId);
        res.status(200).send({
            msg: "Success!",
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;

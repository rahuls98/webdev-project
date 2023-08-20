import "express";
import ExpertModel from "../models/Expert.js";
import UserFollowingExpertModel from "../models/UserFollowingExpert.js";
import {
    isAuthenticated,
    isAuthenticatedExpert,
} from "../middleware/authorization.js";
import express from "express";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    const experts = await ExpertModel.readExperts();
    res.status(200).send(experts);
});

// router.post('/', isAuthenticatedExpert, async (req, res) => {
//     const email = req.body.email;
//     const fullname = req.body.fullname;
//     const expertiseTopics = req.body.expertiseTopics;
//     await ExpertModel.createExpert(fullname, email, expertiseTopics);
//     res.status(201).send({
//         "msg": "Success!"
//     });
// });

router.post("/follow", isAuthenticated, async (req, res) => {
    const userId = req.body.user;
    const expertId = req.body.expert;
    await UserFollowingExpertModel.createUserFollowingExpert(userId, expertId);
    await ExpertModel.increaseFollowerCount(expertId);
    res.status(201).send({
        msg: "Success!",
    });
});

router.delete(
    "/unfollow/:expertId/:userId",
    isAuthenticated,
    async (req, res) => {
        const userId = req.params.userId;
        const expertId = req.params.expertId;
        await UserFollowingExpertModel.deleteUserFollowingExpert(
            userId,
            expertId
        );
        await ExpertModel.decreaseFollowerCount(expertId);
        res.status(200).send({
            msg: "Success!",
        });
    }
);

export default router;

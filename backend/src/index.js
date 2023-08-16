import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import ExpertModel from "./models/Expert.js";
import PostModel from "./models/Post.js";
import SessionModel from "./models/Session.js";
import TopicModel from "./models/Topic.js";
import UserModel from "./models/User.js";
import UserFollowingExpertModel from "./models/UserFollowingExpert.js";
import UserFollowingTopicModel from "./models/UserFollowingTopic.js";

const PORT = 8000;
const server = express();

mongoose
    .connect(process.env.MONGO_DATABASE_CONN_STRING)
    .then(() => {
        console.log("💽 Database connected!");
    })
    .catch((err) => {
        console.log(err);
    });

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).send("MediHub is live!");
});

server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authenticationRoutes from "./routes/authentication.js";
import dotenv from "dotenv";
import session from "express-session"

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

server.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
server.use(
    session(sessionOptions)
)

server.use(express.json());


server.use("/authentication", authenticationRoutes);

server.get("/", (req, res) => {
    res.status(200).send("MediHub is live!");
});

server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

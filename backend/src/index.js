import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authenticationRoutes from "./routes/authentication.js";
import expertRoutes from "./routes/expert.js";
import topicRoutes from "./routes/topic.js";
import postRoutes from "./routes/post.js";
import sessionRoutes from "./routes/session.js";
import followingRoutes from "./routes/following.js";
import feedRoutes from "./routes/feed.js";
import vaultRoutes from "./routes/vault.js";

import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

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

server.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

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
server.use(session(sessionOptions));

server.use(express.json());

server.use("/authentication", authenticationRoutes);
server.use("/expert", expertRoutes);
server.use("/topic", topicRoutes);
server.use("/feed", feedRoutes);
server.use("/session", sessionRoutes);
server.use("/following", followingRoutes);
server.use("/post", postRoutes);
server.use("/vault", vaultRoutes);

server.get("/", (req, res) => {
    res.status(200).send("MediHub is live!");
});

server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).send("MediHub is live!");
});

server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

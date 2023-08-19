import express from "express";
import { isAuthenticated } from "../middleware/authorization.js";

const router = express.Router();

router.get("/hms", isAuthenticated, async (req, res) => {
    res.status(200).send({
        HMS_ROOM_ID: process.env.HMS_ROOM_ID,
        HMS_TOKEN_ENDPOINT: process.env.HMS_TOKEN_ENDPOINT,
    });
});

export default router;
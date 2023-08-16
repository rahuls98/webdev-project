import express from "express";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {});

router.post("/", verifyToken, async (req, res) => {});

router.put("/upvote", verifyToken, async (req, res) => {});

router.delete("/upvote", verifyToken, async (req, res) => {});

router.put("/downvote", verifyToken, async (req, res) => {});

router.delete("/downvote", verifyToken, async (req, res) => {});

router.get("/saved", verifyToken, async (req, res) => {});

router.put("/save", verifyToken, async (req, res) => {});

router.put("/unsave", verifyToken, async (req, res) => {});

export default router;

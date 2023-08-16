import express from "express";

const router = express.Router();

router.get("/hms", verifyToken, async (req, res) => {});

export default router;

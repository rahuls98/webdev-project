import express from "express";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {});

router.post("/", verifyToken, async (req, res) => {});

router.put("/enroll", verifyToken, async (req, res) => {});

router.put("/unenroll", verifyToken, async (req, res) => {});

router.get("/enrolled", verifyToken, async (req, res) => {});

router.post("/message/redact", verifyToken, async (req, res) => {});

router.put("/complete", verifyToken, async (req, res) => {});

export default router;

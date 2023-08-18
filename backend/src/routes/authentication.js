import express from "express";
import * as authController from "../controller/auth-controller.js";


const router = express.Router();

router.post("/signup", authController.register);

router.post("/signin", authController.login);

router.post("/logout", authController.logout);

router.post("/update" , authController.update);

router.put("/verify", async (req, res) => {});

export default router;

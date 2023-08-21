import express from "express";
import * as authController from "../controller/auth-controller.js";
import {isAuthenticated, isAuthenticatedAdmin} from "../middleware/authorization.js"
import {verifyExpert} from "../controller/auth-controller.js";


const router = express.Router();

router.post("/signup", authController.register);

router.post("/signin", authController.login);

router.post("/logout", authController.logout);

router.post("/profile", isAuthenticated , authController.update);

router.post("/verifyExperts", isAuthenticatedAdmin, authController.verifyExpert);

router.get("/getUnverifiedExperts", isAuthenticatedAdmin, authController.getUnverifiedExperts);

export default router;

import express from "express";
import * as userController from "../modules/user/user.service.js";
import { validateSignup, validteLogin } from "../utils/validation.js";

const router = express.Router();

router.post("/signup", validateSignup, userController.signup);
router.post("/login", validteLogin, userController.login);

export default router;

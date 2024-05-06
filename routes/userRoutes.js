import express from "express";
import * as userController from "../modules/user/user.service.js";
import {
  validateSignup,
  validateLogin,
  validation,
  validateResetPassword,
  validateCheckEmailExists,
} from "../utils/validation.js";

const router = express.Router();

router.post("/signup", validateSignup, validation, userController.signup);
router.post("/login", validateLogin, validation, userController.login);
router.post(
  "/reset-password",
  validateCheckEmailExists,
  userController.resetPassword
);
router.post(
  "/check-email",
  validateResetPassword,
  userController.checkEmailExists
);

export default router;

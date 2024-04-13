import { body, validationResult } from "express-validator";

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validteLogin = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export { validateSignup, validteLogin };

import { body } from "express-validator";

// Validation function for user signup
const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Validation function for user login
const validateLogin = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation function for forgot password request
const validateForgotPassword = [
  body("email").isEmail().withMessage("Email is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];

// Validation functions for student creation
const validateStudentCreation = [
  body("fullName").trim().notEmpty().withMessage("Full Name is required"),
  body("studentId").trim().notEmpty().withMessage("Student ID is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phoneNumber").trim().notEmpty().withMessage("Phone Number is required"),
];

// Validation functions for student update
const validateStudentUpdate = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required"),
];

export {
  validateSignup,
  validateLogin,
  validateForgotPassword,
  validateStudentCreation,
  validateStudentUpdate,
};

import { body, validationResult } from "express-validator";
import { sendResponse } from "./sendResponse.js";
import { responseCodes } from "./constants.js";

//Validation middleware to intercept and process requests
const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, responseCodes.BAD_REQUEST, {
      errors: errors.array(),
    });
  }
  next();
};

// Validation function for user signup
const validateSignup = [
  body("firstName").trim().notEmpty().withMessage("First Name is required"),
  body("lastName").trim().notEmpty().withMessage("Last Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 4, max: 10 })
    .withMessage(
      "Password must be at least 4 characters and maximum 10 characters"
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

// Validation function for user login
const validateLogin = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation function to check if the email exists
const validateCheckEmailExists = [
  body("email").isEmail().withMessage("Invalid email format"),
];

// Validation function for reset password request
const validateResetPassword = [
  body("newPassword")
    .isLength({ min: 4 })
    .withMessage("New password must be at least 4 characters"),
  body("confirmNewPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

// Validation functions for student creation
const validateStudentCreation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("studentId").trim().notEmpty().withMessage("Student ID is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phoneNumber").trim().notEmpty().withMessage("Phone Number is required"),
];

// Validation functions for student update
const validateStudentUpdate = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required"),
];

// Validation functions for book creation
const validateBookCreation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("bookId").trim().notEmpty().withMessage("Book ID is required"),
];

// Validation function for book update
const validateBookUpdate = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
];

export {
  validateSignup,
  validateLogin,
  validateCheckEmailExists,
  validateResetPassword,
  validateStudentCreation,
  validateStudentUpdate,
  validateBookCreation,
  validateBookUpdate,
  validation,
};

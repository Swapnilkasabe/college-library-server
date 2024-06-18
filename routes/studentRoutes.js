import express from "express";
const router = express.Router();
import studentController from "../modules/student/student.controller.js";
import {
  validateStudentCreation,
  validateStudentUpdate,
} from "../utils/validation.js";
import { authorizeAdmin } from "../modules/auth/auth.controller.js";
import { verifyToken } from "../modules/auth/auth.service.js";

// Get all students (public route)
router.get("/", verifyToken, studentController.getAllStudents);
// Get a student by ID (public route)
router.get("/:id", verifyToken, studentController.getStudentById);

// Create a new student (private route with admin authorization)
router.post(
  "/",
  verifyToken,
  validateStudentCreation,
  authorizeAdmin,
  studentController.createStudent
);

// Update a student (private route with admin authorization)
router.put(
  "/:id",
  verifyToken,
  validateStudentUpdate,
  authorizeAdmin,
  studentController.updateStudent
);

// Delete a student (private route with admin authorization)
router.delete(
  "/:id",
  verifyToken,
  authorizeAdmin,
  studentController.deleteStudent
);

export default router;

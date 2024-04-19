import express from "express";
const router = express.Router();
import studentController from "../modules/student/student.controller.js";
import {
  validateStudentCreation,
  validateStudentUpdate,
} from "../utils/validation.js";
import { authorizeAdmin } from "../modules/auth/auth.controller.js";

// Get all students (public route)
router.get("/", studentController.getAllStudents);
// Get a student by ID (public route)
router.get("/:id", studentController.getStudentById);

// Create a new student (private route with admin authorization)
router.post(
  "/",
  validateStudentCreation,
  authorizeAdmin,
  studentController.createStudent
);

// Update a student (private route with admin authorization)
router.put(
  "/:id",
  validateStudentUpdate,
  authorizeAdmin,
  studentController.updateStudent
);

// Delete a student (private route with admin authorization)
router.delete("/", authorizeAdmin, studentController.deleteStudent);

export default router;

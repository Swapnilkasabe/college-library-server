import express from "express";
const router = express.Router();

import bookController from "../modules/book/book.controller.js";
import {
  validateBookCreation,
  validateBookUpdate,
  validation,
} from "../utils/validation.js";
import { authorizeAdmin } from "../modules/auth/auth.controller.js";
import { verifyToken } from "../modules/auth/auth.service.js";

// Get all books (public route)
router.get("/", bookController.getAllBooks);
// Get a book by ID (public route)
router.get("/:id", bookController.getBookById);

// Create a new book (private route with admin authorization)
router.post(
  "/",
  verifyToken,
  // authorizeAdmin,
  validateBookCreation,
  validation,
  bookController.createBook
);

// Update a book (private route with admin authorization)
router.put(
  "/:id",
  verifyToken,
  // authorizeAdmin,
  validateBookUpdate,
  validation,
  bookController.updateBookById
);

// Delete a book (private route with admin authorization)
router.delete(
  "/:id",
  verifyToken,
  // authorizeAdmin,
  bookController.deleteBookById
);

export default router;

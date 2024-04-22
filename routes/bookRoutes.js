import express from "express";
const router = express.Router();

import bookController from "../modules/book/book.controller.js";
import {
  validateBookCreation,
  validateBookUpdate,
} from "../utils/validation.js";
import { authorizeAdmin } from "../modules/auth/auth.controller.js";

// Get all books (public route)
router.get("/", bookController.getAllBooks);
// Get a book by ID (public route)
router.get("/:id", bookController.getBookById);

// Create a new book (private route with admin authorization)
router.post(
  "/",
  authorizeAdmin,
  validateBookCreation,
  bookController.createBook
);

// Update a book (private route with admin authorization)
router.put(
  "/:id",
  authorizeAdmin,
  validateBookUpdate,
  bookController.updateBookById
);

// Delete a book (private route with admin authorization)
router.delete("/:id", authorizeAdmin, bookController.deleteBookById);

export default router;

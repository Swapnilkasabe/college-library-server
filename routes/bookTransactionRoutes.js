import express from "express";
const router = express.Router();
import bookTransactionController from "../modules/bookTransactions/bookTransaction.controller.js";
import { verifyToken } from "../modules/auth/auth.service.js";

//Create a new book lending record
router.post("/", verifyToken, bookTransactionController.createLending);
// Get a book lending record by its ID
router.get(
  "/:lendingId",
  verifyToken,
  bookTransactionController.findLendingById
);
// Get all book lending records
router.get("/", verifyToken, bookTransactionController.getAllLendings);

// Return a book
router.put(
  "/:lendingId/return",
  verifyToken,
  bookTransactionController.updateReturnedDate
);
// Renew a book
router.post(
  "/:lendingId/renew",
  verifyToken,
  bookTransactionController.createRenewal
);
// Get all returned books
router.get(
  "/returned/all",
  verifyToken,
  bookTransactionController.handleGetAllReturnedBooks
);
// Get transactions by student ID
router.get(
  "/student/:studentId",
  verifyToken,
  bookTransactionController.getTransactionByStudentId
);
// Get transactions by book ID
router.get(
  "/book/:bookId",
  verifyToken,
  bookTransactionController.getTransactionByBookId
);

export default router;

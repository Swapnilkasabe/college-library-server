import express from "express";
const router = express.Router();
import bookTransactionController from "../modules/bookTransactions/bookTransaction.controller.js";

//Create a new book lending record
router.post("/", bookTransactionController.createLending);
// Get a book lending record by its ID
router.get("/:lendingId", bookTransactionController.findLendingById);
// Get all book lending records
router.get("/", bookTransactionController.getAllLendings);
router.put("/:lendingId/return", bookTransactionController.updateReturnedDate);
// Renew a book
router.post("/:lendingId/renew", bookTransactionController.createRenewal);
// Get all returned books
router.get(
  "/returned/all",
  bookTransactionController.handleGetAllReturnedBooks
);
// Get transactions by student ID
router.get(
  "/student/:studentId",
  bookTransactionController.getTransactionByStudentId
);
// Get transactions by book ID
router.get("/book/:bookId", bookTransactionController.getTransactionByBookId);

export default router;

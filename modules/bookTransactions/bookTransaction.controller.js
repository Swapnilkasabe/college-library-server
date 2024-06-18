import bookLendingService from "./bookTransaction.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";
import logger from "../../utils/logger.js";

const bookLendingController = {
  // Create a new book lending record
  createLending: async (req, res) => {
    try {
      const lendingData = req.body;
      const newLending = await bookLendingService.createLending(lendingData);
      sendResponse(res, responseCodes.CREATED, {
        message: "Book lending created successfully",
        lendingRecord: newLending,
      });
      logger.info(`Book lending created successfully: ${newLending._id}`);
    } catch (error) {
      logger.error(`Error creating book lending: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Find a book lending record by its ID
  findLendingById: async (req, res) => {
    const lendingId = req.params.lendingId;
    try {
      const lending = await bookLendingService.findLendingById(lendingId);
      if (!lending) {
        return sendResponse(res, responseCodes.NOT_FOUND, {
          error: "Book lending record not found",
        });
      }
      sendResponse(res, responseCodes.SUCCESS, lending);
      logger.info(`Book lending record retrieved successfully: ${lending._id}`);
    } catch (error) {
      logger.error(`Error retrieving book lending record: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Update the returned date of a book
  updateReturnedDate: async (req, res) => {
    const lendingId = req.params.lendingId;
    try {
      const updatedLending = await bookLendingService.updateReturnedDate(
        lendingId
      );
      if (!updatedLending) {
        return sendResponse(res, responseCodes.NOT_FOUND, {
          error: "Book lending record not found",
        });
      }
      sendResponse(res, responseCodes.SUCCESS, {
        message: "Book returned successfully",
        lending: updatedLending,
      });
      logger.info(
        `Book lending record updated successfully: Returned date set for ${updatedLending._id}`
      );
    } catch (error) {
      logger.error(`Error updating book lending record: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Retrieve all returned books
  handleGetAllReturnedBooks: async (req, res) => {
    try {
      const returnedBooks = await bookLendingService.getAllReturnedBooks();
      sendResponse(res, responseCodes.SUCCESS, returnedBooks);
      logger.info("All returned books retrieved successfully");
    } catch (error) {
      logger.error(`Error retrieving returned books: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Create a new book renewal record
  createRenewal: async (req, res) => {
    try {
      const lendingId = req.params.lendingId;
      const renewalData = req.body;
      const newRenewal = await bookLendingService.createRenewal({
        ...renewalData,
        lendingId,
      });
      sendResponse(res, responseCodes.CREATED, {
        message: "Book renewal created successfully",
        renewal: newRenewal,
      });
      logger.info(`Book renewal created successfully: ${newRenewal._id}`);
    } catch (error) {
      logger.error(`Error creating book renewal: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Retrieve all book lending records
  getAllLendings: async (req, res) => {
    try {
      const allLendings = await bookLendingService.getAllLendings();
      sendResponse(res, responseCodes.SUCCESS, allLendings);
      logger.info("All book lending records retrieved successfully");
    } catch (error) {
      logger.error(
        `Error retrieving all book lending records: ${error.message}`
      );
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },
  // Retrieve transactions by student ID
  getTransactionByStudentId: async (req, res) => {
    const studentId = req.params.studentId;
    try {
      const transactions = await bookLendingService.getTransactionByStudentId(
        studentId
      );
      sendResponse(res, responseCodes.SUCCESS, transactions);
      logger.info(
        "Transactions retrieved successfully for student: " + studentId
      );
    } catch (error) {
      logger.error(
        `Error retrieving transactions for student: ${studentId}, ${error.message}`
      );
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },
  // Retrieve transactions by book ID
  getTransactionByBookId: async (req, res) => {
    const bookId = req.params.bookId;
    try {
      const transactions = await bookLendingService.getTransactionByBookId(
        bookId
      );
      sendResponse(res, responseCodes.SUCCESS, transactions);
      logger.info("Transactions retrieved successfully for book: " + bookId);
    } catch (error) {
      logger.error(
        `Error retrieving transactions for book: ${bookId}, ${error.message}`
      );
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },
};

export default bookLendingController;

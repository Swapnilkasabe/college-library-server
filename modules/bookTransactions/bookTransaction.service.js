import BookTransaction from "../../models/BookTransaction.js";
import { setDueDate } from "../../utils/helpers.js";
import logger from "../../utils/logger.js";

const bookLendingService = {
  // Create a new book lending record
  createLending: async (lendingData) => {
    try {
      const newLending = new BookTransaction({
        ...lendingData,
        dueDate: setDueDate(1),
      });

      const savedLending = await newLending.save();
      logger.info(`Book lending created successfully: ${savedLending._id}`);
      return savedLending;
    } catch (error) {
      logger.error(`Error creating book lending: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Find all book lending records
  getAllLendings: async () => {
    try {
      const allLendings = await BookTransaction.find();
      logger.info("All book lending records retrieved");
      return allLendings;
    } catch (error) {
      logger.error(
        `Error retrieving all book lending records: ${error.message}`
      );
      throw new Error(error.message);
    }
  },

  // Find a book lending record by its ID
  findLendingById: async (lendingId) => {
    try {
      const lending = await BookTransaction.findById(lendingId);
      if (!lending) {
        logger.info("Book lending record not found");
        throw new Error("Book lending record not found");
      }
      logger.info(`Book lending record retrieved successfully: ${lending._id}`);
      return lending;
    } catch (error) {
      logger.error(`Error retrieving book lending record: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Update the returned date of a book
  updateReturnedDate: async (lendingId) => {
    try {
      const lending = await BookTransaction.findById(lendingId);
      if (!lending) {
        logger.info("Book lending record not found");
        return null;
      }
      lending.returnedDate = Date.now();
      lending.status = "returned";
      const updatedLending = await lending.save();
      logger.info(
        `Book lending record updated successfully: ${updatedLending._id}`
      );
      return updatedLending;
    } catch (error) {
      logger.error(`Error updating book lending record: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Create a new book renewal record
  createRenewal: async (renewalData) => {
    try {
      const { lendingId, ...rest } = renewalData;
      if (!lendingId) {
        throw new Error("Lending ID is required for renewal");
      }

      const lending = await BookTransaction.findById(lendingId);
      if (!lending) {
        logger.error("Book lending record not found for renewal");
        throw new Error("Book lending record not found for renewal");
      }

      const renewalLimit = 3;

      if (lending.renewalCount >= renewalLimit) {
        logger.info("Cannot renew book, renewal limit reached");
        throw new Error("Cannot renew book, renewal limit reached");
      }
      lending.renewalCount++;
      lending.dueDate = setDueDate(1);
      lending.renewalDate = Date.now();
      const updatedLending = await lending.save();
      logger.info(`Book renewed successfully: ${updatedLending._id}`);
      return updatedLending;
    } catch (error) {
      logger.error(`Error creating book renewal: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Retrieve all returned books
  getAllReturnedBooks: async () => {
    try {
      const returnedBooks = await BookTransaction.find({
        returnedDate: { $ne: null },
      });
      logger.info("All returned books retrieved");
      return returnedBooks;
    } catch (error) {
      logger.error(`Error retrieving returned books: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Retrieve transactions by student ID
  getTransactionByStudentId: async (studentId) => {
    try {
      const transactions = await BookTransaction.find({
        studentId: studentId,
        status: "issued",
      }).populate("bookId");

      const issuedBooksCount = transactions.length;
      logger.info(`Transactions retrieved for student ID: ${studentId}`);
      return { transactions, issuedBooksCount };
    } catch (error) {
      logger.error(
        `Error retrieving transactions for student ID: ${studentId}, ${error.message}`
      );
      throw new Error(error.message);
    }
  },

  // Retrieve transactions by book ID
  getTransactionByBookId: async (bookId) => {
    try {
      const transactions = await BookTransaction.find({
        bookId: bookId,
        status: "issued",
      }).populate("studentId");

      const assignedBorrowersCount = transactions.length;
      logger.info(`Transactions retrieved for book ID: ${bookId}`);
      return { transactions, assignedBorrowersCount };
    } catch (error) {
      logger.error(
        `Error retrieving transactions for book ID: ${bookId}, ${error.message}`
      );
      throw new Error(error.message);
    }
  },
};

export default bookLendingService;

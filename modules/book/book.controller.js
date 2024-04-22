import bookService from "./book.service.js";
import logger from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";
import { validationResult } from "express-validator";
import { validation } from "../../utils/validation.js";

const bookController = {
  // Retrieve all books using the book service and send the response
  getAllBooks: async (req, res) => {
    try {
      const books = await bookService.getAllBooks();
      sendResponse(res, responseCodes.SUCCESS, { books });
      logger.info(`books retrieved successfully: ${books}`);
    } catch (error) {
      logger.error(`Error retrieving books: ${error.message}`);
      return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Retrieve a book by thier ID using the book service and send the response
  getBookById: async (req, res) => {
    const id = req.params.id;
    try {
      const book = await bookService.getBookById(id);
      sendResponse(res, responseCodes.SUCCESS, { book });
      logger.info(`Book retrieved successfully: ${book.title}`);
    } catch (error) {
      logger.error(`Error retrieving book: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Create a book using the book service and send the response
  createBook: async (req, res) => {
    try {
      validation(req, res, () => {});
      const { title, author, description, bookId } = req.body;
      const newBook = await bookService.createBook(
        title,
        author,
        description,
        bookId
      );
      sendResponse(res, responseCodes.CREATED, {
        message: "Book created successfully",
        book: newBook,
      });
    } catch (error) {
      logger.error(`Error creating book: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Update a book by thier ID using the book service and send the response
  updateBookById: async (req, res) => {
    const errors = validationResult(req);
    validation(req, res, () => {});
    const id = req.params.id;
    try {
      const { title, author, description } = req.body;
      const updatedBook = await bookService.updateBookById(
        id,
        title,
        author,
        description
      );
      sendResponse(res, responseCodes.SUCCESS, { updatedBook });
      logger.info(`Book updated successfully: ${updatedBook.title}`);
    } catch (error) {
      logger.error(`Error updating book: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Soft delete a book by thier ID using the book service and send the response
  deleteBookById: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedBook = await bookService.deleteBookById(id);
      sendResponse(
        res,
        responseCodes.SUCCESS,
        `Book deleted successfully: ${deletedBook.title}`
      );
      logger.info(`Book deleted successfully: ${deletedBook.title}`);
    } catch (error) {
      logger.error(`Error deleting book: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },
};

export default bookController;

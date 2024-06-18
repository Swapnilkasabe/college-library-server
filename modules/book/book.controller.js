import bookService from "./book.service.js";
import logger from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";

const bookController = {
  // Retrieve all books using the book service and send the response
  getAllBooks: async (req, res) => {
    try {
      const { books, totalBooksCount } = await bookService.getAllBooks();
      sendResponse(res, responseCodes.SUCCESS, { books, totalBooksCount });
      logger.info(`books retrieved successfully: ${books}`);
    } catch (error) {
      logger.error(`Error retrieving books: ${error.message}`);
      return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Retrieve a book by their ID using the book service and send the response
  getBookById: async (req, res) => {
    const id = req.params.id;
    try {
      const book = await bookService.getBookById(id);
      if (!book) {
        logger.info(`Book not found with id: ${id}`);
        return sendResponse(res, responseCodes.NOT_FOUND, {
          error: "Book not found",
        });
      }
      sendResponse(res, responseCodes.SUCCESS, book);
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
      const newBook = await bookService.createBook(req.body);
      logger.info(`Book created successfully: ${newBook.title}`);
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
    const id = req.params.id;
    const { title, author, description } = req.body;

    try {
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
    const deletedBook = await bookService.deleteBookById(id);
    if (deletedBook) {
      return sendResponse(res, responseCodes.SUCCESS, { id });
    }
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, { id });
  },
};

export default bookController;

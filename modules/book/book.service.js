import mongoose from "mongoose";
import Book from "../../models/Book.js";
import isNotEmptyArray from "../../utils/helpers.js";
import logger from "../../utils/logger.js";

const bookService = {
  // Retrieve all books from the database
  getAllBooks: async () => {
    try {
      const books = await Book.find({ isDeleted: false });
      if (isNotEmptyArray(books)) {
        logger.info(`Books retrieved successfully: ${books}`);
        return books;
      }
      logger.info("No books found");
      return []; // Return an empty array if no books found
    } catch (error) {
      logger.error(`Error retrieving books: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Retrieve a book by their ID from the database
  getBookById: async (bookId) => {
    try {
      const book = await Book.find({ _id: id, isDeleted: false });
      if (isNotEmptyArray(book)) {
        logger.info(`Books retrieved successfully: ${book.title}`);
      }
      logger.info("Book not found");
    } catch (error) {
      logger.error(`Error retrieving book: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Create a book
  createBook: async (title, author, description, bookId) => {
    const existingBook = await Book.find({ bookId: bookId, isDeleted: false });
    if (isNotEmptyArray(existingBook)) {
      logger.error("Book with provided ID already exists");
      throw new Error("Book with provided ID already exists");
    }
    try {
      const newBook = new Book({
        title,
        author,
        description,
        bookId,
      });
      const savedBook = await newBook.save();
      logger.info(`Book created successfully: ${savedBook.title}`);
      return savedBook;
    } catch (error) {
      logger.error(`Error creating book:${error.message}`);
      throw new Error(error.message);
    }
  },

  // Update a book by their ID
  updateBookById: async (id, title, author, description) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, description },
        { new: true }
      );
      if (!updatedBook) {
        logger.info("Book not found");
        throw new Error("Book not found");
      }
      logger.info(`Book updated successfully: ${updatedBook.title}`);
      return updatedBook;
    } catch (error) {
      logger.error(`Error updating book: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Soft delete a book by their ID
  deleteBookById: async (id) => {
    try {
      const deletedBook = await Book.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      if (!deletedBook) {
        logger.info("Book not found");
        throw new Error("Book not found");
      }
      logger.info(`Book soft deleted successfully: ${deletedBook.title}`);
      return deletedBook;
    } catch (error) {
      logger.error(`Error deleting book: ${error.message}`);
      throw new error(error.message);
    }
  },
};

export default bookService;

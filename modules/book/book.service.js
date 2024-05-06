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
      } else {
        logger.info("No Book found");
      }
      return books;
    } catch (error) {
      logger.error(`Error retrieving books: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Retrieve a book by their ID from the database
  getBookById: async (id) => {
    try {
      const book = await Book.find({ bookId: id, isDeleted: false });
      if (!isNotEmptyArray(book)) {
        logger.info("No Book found");
        throw new Error("Book not found");
      }
      logger.info(`Book retrieved successfully: ${book[0].title}`);
      return book[0];
    } catch (error) {
      logger.error(`Error retrieving book: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Create a book
  createBook: async (bookData) => {
    const { title, author, description, bookId } = bookData;
    try {
      const existingBook = await Book.find({
        bookId: bookId,
        isDeleted: true,
      });
      if (isNotEmptyArray(existingBook)) {
        logger.error("Book with provided ID already exists");
        throw new Error("Book with provided ID already exists");
      }

      const newBook = new Book({
        title,
        author,
        description,
        bookId,
      });
      const savedBook = await newBook.save();
      logger.info(`Book created successfully: ${savedBook.title}`);
      return {
        status: "success",
        message: "Book created successfully",
        data: savedBook,
      };
    } catch (error) {
      logger.error(`Error creating book:${error.message}`);
      throw new Error(error.message);
    }
  },

  // Update a book by their ID
  updateBookById: async (id, title, author, description) => {
    try {
      const updatedBook = await Book.find({ bookId: id, isDeleted: false });
      if (!updatedBook[0]) {
        logger.info("Book not found");
        throw new Error("Book not found");
      }
      updatedBook[0].title = title;
      updatedBook[0].author = author;
      updatedBook[0].description = description;
      await updatedBook[0].save();
      logger.info(`Book updated successfully: ${updatedBook[0].title}`);
      return updatedBook[0];
    } catch (error) {
      logger.error(`Error updating book: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Soft delete a book by their ID
  deleteBookById: async (id) => {
    try {
      const deletedBook = await Book.findOneAndUpdate(
        { bookId: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
      if (!deletedBook) {
        logger.info("Book not found");
        throw new Error("Book not found");
      }
      logger.info(`Book soft deleted successfully: ${deletedBook.title}`);
      return true;
    } catch (error) {
      logger.error(`Error deleting book: ${error.message}`);
      return false;
    }
  },
};

export default bookService;

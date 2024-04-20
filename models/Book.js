import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  bookId: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: { type: Boolean, default: false },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;

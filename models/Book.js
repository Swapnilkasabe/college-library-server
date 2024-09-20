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
  status: { type: String, default: "available" },
  isDeleted: { type: Boolean, default: false },
});

bookSchema.index({ title: 1, author: 1, bookId: 1 });

const Book = mongoose.model("Book", bookSchema);

export default Book;

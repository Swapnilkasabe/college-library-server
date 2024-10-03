import mongoose from "mongoose";

const bookTransactionStatus = ["issued", "returned"];
const BookTransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: "BookLending",
  },
  studentId: {
    type: String,
    required: true,
    ref: "Student",
  },
  bookId: {
    type: String,
    required: true,
    ref: "Book",
  },
  status: {
    type: String,
    required: true,
    enum: bookTransactionStatus,
    default: "issued",
  },
  borrowedDate: { type: Date, default: Date.now },
  returnedDate: { type: Date, default: null },
  renewalCount: { type: Number, default: 0 },
  renewalDate: { type: Date, default: null },
  dueDate: { type: Date, required: true },
});

const BookTransaction = mongoose.model(
  "BookTransaction",
  BookTransactionSchema
);

export default BookTransaction;

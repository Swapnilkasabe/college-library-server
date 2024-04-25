import mongoose from "mongoose";

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
  borrowedDate: { type: Date, default: Date.now },
  returnedDate: { type: Date, default: null },
  renewalCount: { type: Number, default: 0 },
  renewalDate: { type: Date, default: null },
  expiryDate: { type: Date, default: null },
});

const BookTransaction = mongoose.model(
  "BookTransaction",
  BookTransactionSchema
);

export default BookTransaction;

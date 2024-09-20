import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: { type: String, unique: true },
  isDeleted: { type: Boolean, default: false },
});

studentSchema.index({ studentId: 1, email: 1 });

const Student = mongoose.model("Student", studentSchema);

export default Student;

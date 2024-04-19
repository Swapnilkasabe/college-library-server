import Student from "../../models/Student.js";
import isNotEmptyArray from "../../utils/helpers.js";
import logger from "../../utils/logger.js";

const studentService = {
  // Retrieve all students from the database
  getAllStudents: async () => {
    try {
      const students = await Student.find();
      if (isNotEmptyArray(students)) {
        logger.info(`Students retrieved successfully: ${students}`);
      }
      logger.info("No student found");
      return students;
    } catch (error) {
      logger.error(`Error retrieving students : ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Retrieve a student by their ID from the database
  getStudentById: async (id) => {
    try {
      const student = await Student.find({ _id: id, isDeleted: false });
      if (!isNotEmptyArray(student)) {
        logger.info("No students found");
        throw new Error("Student not found");
      }
      logger.info(`Student retrieved successfully: ${student[0].fullName}`);
      return student[0];
    } catch (error) {
      logger.error(`Error retrieving student: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Create a student new student
  createStudent: async (fullName, studentId, email, phoneNumber) => {
    const existingStudent = await Student.find({
      studentId: studentId,
      isDeleted: true,
    });
    if (isNotEmptyArray(existingStudent)) {
      logger.info("Student with the provided ID or email already exists");
      throw new Error("Student with the provided ID or email already exists");
    }
    try {
      const newStudent = new Student({
        fullName,
        studentId,
        email,
        phoneNumber,
      });
      const savedStudent = await newStudent.save();
      logger.info(`Student created successfully: ${savedStudent.fullName}`);
      return savedStudent;
    } catch (error) {
      logger.error(`Error creating student: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Update a student by their ID
  updateStudent: async (id, fullName, email, phoneNumber) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { fullName, email, phoneNumber },
        { new: true }
      );

      if (!updatedStudent) {
        throw new Error("Student not found");
      }
      logger.info(`Student updated successfully: ${updatedStudent.fullName}`);
      return updatedStudent;
    } catch (error) {
      logger.error(`Error updating student: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Soft delete a student by their ID
  deleteStudent: async (id) => {
    try {
      const deletedStudent = await findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      if (!deletedStudent) {
        throw new Error("Error deleting student");
      }
      logger.info(
        `Student soft deleted successfully: ${deletedStudent.fullName}`
      );
      return deletedStudent;
    } catch (error) {
      logger.error(`Error deleting student: ${error.message}`);
      throw new Error(error.message);
    }
  },
};

export default studentService;

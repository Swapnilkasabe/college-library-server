import Student from "../../models/Student.js";
import { isNotEmptyArray } from "../../utils/helpers.js";
import logger from "../../utils/logger.js";

const studentService = {
  // Retrieve all students from the database
  getAllStudents: async () => {
    try {
      const students = await Student.find({ isDeleted: false });
      const totalStudentsCount = await Student.countDocuments({
        isDeleted: false,
      });
      if (isNotEmptyArray(students)) {
        logger.info(`Students retrieved successfully: ${students}`);
      } else {
        logger.info("No student found");
      }
      return { students, totalStudentsCount };
    } catch (error) {
      logger.error(`Error retrieving students : ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Retrieve a student by their ID from the database
  getStudentById: async (id) => {
    try {
      const student = await Student.find({ _id: id, isDeleted: false });
      if (!student) {
        logger.info("No students found");
        return null;
      }
      logger.info(`Student retrieved successfully: ${student[0].name}`);
      return student;
    } catch (error) {
      logger.error(`Error retrieving student: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Create a student new student
  createStudent: async (studentData) => {
    const { name, email, phoneNumber, studentId } = studentData;
    try {
      const existingStudent = await Student.find({
        studentId: studentId,
        isDeleted: true,
      });
      if (isNotEmptyArray(existingStudent)) {
        logger.info("Student with the provided ID or email already exists");
        throw new Error("Student with the provided ID or email already exists");
      }

      const newStudent = new Student({
        name,
        email,
        phoneNumber,
        studentId,
      });
      const savedStudent = await newStudent.save();
      logger.info(`Student created successfully: ${savedStudent.name}`);
      return {
        status: "success",
        message: "Student created successfully",
        data: savedStudent,
      };
    } catch (error) {
      logger.error(`Error creating student: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Update a student by their ID
  updateStudent: async (id, name, email, phoneNumber) => {
    try {
      const updatedStudent = await Student.find({
        studentId: id,
        isDeleted: false,
      });

      if (!updatedStudent[0]) {
        throw new Error("Student not found");
      }
      updatedStudent[0].name = name;
      updatedStudent[0].email = email;
      updatedStudent[0].phoneNumber = phoneNumber;
      updatedStudent[0].save();
      logger.info(`Student updated successfully: ${updatedStudent[0].name}`);
      return updatedStudent[0];
    } catch (error) {
      logger.error(`Error updating student: ${error.message}`);
      throw new Error(error.message);
    }
  },

  // Soft delete a student by their ID
  deleteStudent: async (id) => {
    try {
      const deletedStudent = await Student.findOneAndUpdate(
        { studentId: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
      if (!deletedStudent) {
        throw new Error("Error deleting student");
      }
      logger.info(`Student soft deleted successfully: ${deletedStudent.name}`);
      return true;
    } catch (error) {
      logger.error(`Error deleting student: ${error.message}`);
      return false;
    }
  },
};

export default studentService;

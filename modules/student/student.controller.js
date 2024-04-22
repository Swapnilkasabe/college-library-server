import logger from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";
import studentService from "./student.service.js";
import { validation } from "../../utils/validation.js";
const studentController = {
  // Retrieve all students using the student service and send the response
  getAllStudents: async (req, res) => {
    try {
      const students = await studentService.getAllStudents();
      sendResponse(res, responseCodes.SUCCESS, {
        students,
      });
      logger.info(`Students retrieved successfully: ${students}`);
    } catch (error) {
      logger.error(`Error retrieving students: ${error.message}`);
      return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Retrieve a students by thier ID using the student service and send the response
  getStudentById: async (req, res) => {
    const id = req.params.id;
    try {
      const student = await studentService.getStudentById(id);
      sendResponse(res, responseCodes.SUCCESS, student[0]);
      logger.info(`Student retrieved successfully: ${student[0].fullName}`);
    } catch (error) {
      logger.error(`Error retrieving student: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Create a student using the student service and send the response
  createStudent: async (req, res) => {
    try {
      validation(req, res, () => {});
      const { fullName, studentId, email, phoneNumber } = req.body;
      const newStudent = await studentService.createStudent(
        fullName,
        studentId,
        email,
        phoneNumber
      );
      sendResponse(res, responseCodes.CREATED, {
        message: `Student created successfully`,
        student: newStudent,
      });
    } catch (error) {
      logger.error(`Error creating student: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },
  // Update a student by thier ID using the student service and send the response
  updateStudent: async (req, res) => {
    validation(req, res, () => {});
    const id = req.params.id;
    const { fullName, email, phoneNumber } = req.body;
    try {
      const updatedStudent = await studentService.updateStudent(
        id,
        fullName,
        email,
        phoneNumber
      );
      sendResponse(res, responseCodes.SUCCESS, { updatedStudent });
      logger.info(`Student updated successfully: ${updatedStudent.fullName}`);
    } catch (error) {
      logger.error(`Error updating student: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Soft delete a student by thier ID using the student service and send the response
  deleteStudent: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedStudent = await studentService.deleteStudent(id);

      sendResponse(res, responseCodes.SUCCESS);
      logger.info(
        `Student soft deleted successfully: ${deletedStudent.fullName}`
      );
    } catch (error) {
      logger.error(`Error deleting student: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },
};

export default studentController;

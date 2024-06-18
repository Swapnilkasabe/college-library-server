import logger from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";
import studentService from "./student.service.js";

const studentController = {
  // Retrieve all students using the student service and send the response
  getAllStudents: async (req, res) => {
    try {
      const { students, totalStudentsCount } =
        await studentService.getAllStudents();
      sendResponse(res, responseCodes.SUCCESS, {
        students,
        totalStudentsCount,
      });
      logger.info(`Students retrieved successfully: ${students}`);
    } catch (error) {
      logger.error(`Error retrieving students: ${error.message}`);
      return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Retrieve a student by their ID using the student service and send the response
  getStudentById: async (req, res) => {
    const id = req.params.id;
    try {
      const student = await studentService.getStudentById(id);
      if (!student) {
        logger.info(`Student not found with id: ${id}`);
        return sendResponse(res, responseCodes.NOT_FOUND, {
          error: "Student not found",
        });
      }
      sendResponse(res, responseCodes.SUCCESS, student);
      logger.info(`Student retrieved successfully: ${student[0].name}`);
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
      const newStudent = await studentService.createStudent(req.body);
      logger.info(`Student created successfully: ${newStudent.name}`);
      return sendResponse(res, responseCodes.CREATED, {
        message: `Student created successfully`,
        student: newStudent,
      });
    } catch (error) {
      logger.error(`Error creating student: ${error.message}`);
      return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Update a student by their ID using the student service and send the response
  updateStudent: async (req, res) => {
    const id = req.params.id;
    const { name, email, phoneNumber } = req.body;
    try {
      const updatedStudent = await studentService.updateStudent(
        id,
        name,
        email,
        phoneNumber
      );
      sendResponse(res, responseCodes.SUCCESS, { updatedStudent });
      logger.info(`Student updated successfully: ${updatedStudent.name}`);
    } catch (error) {
      logger.error(`Error updating student: ${error.message}`);
      sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
        error: error.message,
      });
    }
  },

  // Soft delete a student by their ID using the student service and send the response
  deleteStudent: async (req, res) => {
    const id = req.params.id;
    const deletedStudent = await studentService.deleteStudent(id);
    if (deletedStudent) {
      return sendResponse(res, responseCodes.SUCCESS, { id });
    }
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, { id });
  },
};

export default studentController;

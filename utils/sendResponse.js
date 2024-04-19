import { responseCodes } from "./constants.js";

// Function to send consistent response format with appropriate status code and data
const sendResponse = (res, code = -1, data) => {
  if (code === -1) {
    return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({
      error: "Invalid status code",
    });
  }
  return res.status(code).json(data);
};

export { sendResponse };

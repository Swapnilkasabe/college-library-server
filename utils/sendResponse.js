import { responseCodes } from "./constants.js";

const sendResponse = (res, code, data) => {
  const statusCode = responseCodes[code];
  return res.status(statusCode).json(data);
};

export default sendResponse;

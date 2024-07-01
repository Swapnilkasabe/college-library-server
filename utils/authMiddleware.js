import jwt from "jsonwebtoken";
import { responseCodes } from "./constants.js";
import { sendResponse } from "./sendResponse.js";
import { getUser } from "../modules/user/user.service.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return sendResponse(res, responseCodes.UNAUTHORIZED, {
      error: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await getUser(decoded.email, res);

    if (!user) {
      return sendResponse(res, responseCodes.UNAUTHORIZED, {
        error: "Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, responseCodes.UNAUTHORIZED, {
      error: "Authentication failed",
    });
  }
};

export default authMiddleware;

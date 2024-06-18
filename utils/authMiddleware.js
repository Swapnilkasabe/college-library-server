import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { responseCodes } from "./constants.js";
import { sendResponse } from "./sendResponse.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return sendResponse(res, responseCodes.UNAUTHORIZED, {
      error: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);

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

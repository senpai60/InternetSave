import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseHandler.js";

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return sendError(res, { message: "Unauthorized", statusCode: 401 });
    }
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return sendError(res, { message: "Invalid or expired token", statusCode: 401 });
  }
};

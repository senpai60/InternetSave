import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseHandler.js";

export const verifyAuth = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return sendError(res, { message: "Unauthorized", statusCode: 401 });
    }
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return sendError(res, {
      message: "Invalid or expired token",
      statusCode: 401,
    });
  }
};

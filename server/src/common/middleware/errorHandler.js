import { sendError } from "../utils/responseHandler.js";
import { AppError } from "../utils/AppError.js";

export const notFoundHandler = (req, res, next) => {
  return sendError(res, {
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  });
};

export const errorHandler = (err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return sendError(res, {
      statusCode: 400,
      message: "Validation failed",
      errors,
    });
  }

  // CastError (invalid ObjectId etc.)
  if (err.name === "CastError") {
    return sendError(res, {
      statusCode: 400,
      message: "Invalid ID format",
    });
  }

  // AppError (custom)
  if (err instanceof AppError) {
    return sendError(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  // Unknown error
  console.error("UNHANDLED_ERROR", err);

  return sendError(res, {
    statusCode: 500,
    message: "Internal server error",
  });
};

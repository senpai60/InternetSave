export class AppError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true; // for logging vs crash
    Error.captureStackTrace(this, this.constructor);
  }
}

export const BadRequestError = (msg = "Bad request", errors) =>
  new AppError(msg, 400, errors);

export const UnauthorizedError = (msg = "Unauthorized") =>
  new AppError(msg, 401);

export const NotFoundError = (msg = "Not found") => new AppError(msg, 404);

export const ConflictError = (msg = "Conflict") => new AppError(msg, 409);

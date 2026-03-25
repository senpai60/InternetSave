import { sendSuccess, sendError } from "../../common/utils/responseHandler.js";

import {
  findUserByEmail,
  registerUserService,
  loginUserService,
} from "./auth.service.js";
import { generateToken } from "../../common/utils/jwt.js";
import { setTokenCookie } from "../../common/utils/cookies.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return sendError(res, { message: "All fields are required", statusCode: 400 });
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return sendError(res, { message: "User already exists", statusCode: 400 });
    }

    const newUser = await registerUserService(username, email, password);
    const token = generateToken(newUser);
    setTokenCookie(res, token);
    return sendSuccess(res, {
      message: "User registered successfully",
      statusCode: 201,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, { message: "All fields are required", statusCode: 400 });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return sendError(res, { message: "User not found", statusCode: 404 });
    }
    const returnedUser = await loginUserService(email, password);
    const token = generateToken(returnedUser);
    setTokenCookie(res, token);
    return sendSuccess(res, {
      message: "User logged in successfully",
      statusCode: 200,
      data: returnedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyAuthController = async (req, res, next) => {
  try {
    const user = req.user;
    return sendSuccess(res, {
      message: "User verified successfully",
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

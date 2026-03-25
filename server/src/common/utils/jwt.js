import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/env.config.js";

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, ENV_CONFIG.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, ENV_CONFIG.JWT_SECRET);
};

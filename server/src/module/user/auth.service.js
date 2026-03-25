import User from "./User.model.js";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

export const registerUserService = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const returnedUser = user.toObject();
    delete returnedUser.password;
    return returnedUser;
  } catch (error) {
    throw error;
  }
};

export const loginUserService = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const returnedUser = user.toObject();
    delete returnedUser.password;
    return returnedUser;
  } catch (error) {
    throw error;
  }
};

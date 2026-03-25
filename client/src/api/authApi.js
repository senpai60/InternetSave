import axiosInstance from "../utils/axios";

export const registerApi = async (userData) => {
  const response = await axiosInstance.post(`/user/register`, userData);
  return response.data;
};

export const loginApi = async (userData) => {
  const response = await axiosInstance.post(`/user/login`, userData);
  return response.data;
};
export const verifyUserApi = async (userData) => {
  const response = await axiosInstance.post(`/user/verify`, userData);
  return response.data;
};

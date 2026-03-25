import axiosInstance from "../utils/axios";

export const getSavedItemsApi = async () => {
  try {
    const response = await axiosInstance.get("/items/get-saved");
    return response.data;
  } catch (error) {
    throw error;
  }
};

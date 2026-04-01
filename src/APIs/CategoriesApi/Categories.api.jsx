import axiosInstance from "../axiosInstance";
import { CATEGORY_ENDPOINTS } from "../endpoints"; // ✅ CORRECT FILE

export const fetchCategories = async () => {
  const response = await axiosInstance.get(
    CATEGORY_ENDPOINTS.LIST
  );
  return response.data;
};

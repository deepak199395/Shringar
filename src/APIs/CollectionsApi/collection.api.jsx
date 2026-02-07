import axiosInstance from "../axiosInstance";
import {COLLECTION_ENDPOINTS} from "../endpoints";

// Get all collections (Frontend)
export const fetchCollections= async()=>{
    const response= await axiosInstance.get(
        COLLECTION_ENDPOINTS.LIST
    );
    return response.data;
};
// Create collection (Admin – not for public UI)
export const createCollection= async()=>{
    const response = await axiosInstance.post(
        COLLECTION_ENDPOINTS.CREATE,
        
    );
    return response.data;
};

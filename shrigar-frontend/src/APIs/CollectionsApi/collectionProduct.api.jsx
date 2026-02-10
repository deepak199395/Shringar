import axios from "axios";

export const fetchCollectionProducts = async (collectionId) => {
  const res = await axios.get(
    `https://devdeepak-backend-api-fbdhhyeddwbab9da.centralindia-01.azurewebsites.net/api/v1/shrigar/Collections/products/list/api56?collectionId=${collectionId}`
  );
  return res.data; // 🔥 VERY IMPORTANT
};

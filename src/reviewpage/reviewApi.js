import api from "../../api/api";

export const getReviews = async () => {
  const response = await api.get(
    "/api/review/getall"
  );

  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await api.post(
    "/api/review/getall",
    reviewData
  );

  return response.data;
};
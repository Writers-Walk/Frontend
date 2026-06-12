import api from "../../api/api";

export const getReviews = async (bookId) => {
  const response = await api.get(
    `/api/review/${bookId}/getallreview`
  );

  return response.data;
};

export const createReview = async (bookId, reviewData) => {
  const response = await api.post(
    `/api/review/${bookId}/save`,
    reviewData
  );

  return response.data;
};
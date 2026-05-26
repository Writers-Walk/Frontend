import api from '../../api/axios';

export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};


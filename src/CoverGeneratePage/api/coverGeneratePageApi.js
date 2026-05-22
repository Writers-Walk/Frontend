import api from '../../api/axios';

export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const updateBook = async (id, data) => {
  const response = await api.patch(`/books/${id}`, data);
  return response.data;
};
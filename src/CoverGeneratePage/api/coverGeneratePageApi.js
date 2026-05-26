import api from '../../api/axios';

export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await api.patch(`/books/${id}`, book);
  return response.data;
};
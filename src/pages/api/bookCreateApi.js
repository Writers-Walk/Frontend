import api from '../../api/axios';

export const createBook = async (book) => {
  const response = await api.post('/books', book);
  return response.data;
};
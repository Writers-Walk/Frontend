import api from '../../api/api';

export const createBook = async (book) => {
  const response = await api.post('/api/bookcreate/create', book);
  return response.data;
};
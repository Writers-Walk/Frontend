import api from '../../api/axios';

export const createBook = async (book) => {
  const response = await api.post('/bookcreate/create', book);
  return response.data;
};
import api from '../../api/axios';

<<<<<<< HEAD
export const getBooks = async () => {
  const response = await api.get('/books');
=======
export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`);
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
  return response.data;
};


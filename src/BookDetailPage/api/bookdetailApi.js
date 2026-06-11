
export const getBooks = async () => {
  api.get('/api/books/getall')
  //const response = await api.get(`/books/${id}`);

  return response.data;
};
 
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
 
export const updateLikes = async (id, currentLikes) => {
  const response = await api.patch(`/books/${id}`, {
    likes: currentLikes + 1,
  });
  return response.data;
};

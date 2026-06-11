// src/Admin/components/BookDeleteList.jsx
import React, { useState, useEffect } from 'react';

const BookDeleteList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:8080/api/bookdetail/books');
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`"${title}"을(를) 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`http://localhost:8080/api/bookdetail/book/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('삭제 실패');
      setBooks(books.filter(b => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="book-delete-list">
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>저자</th>
            <th>장르</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
                <button onClick={() => handleDelete(book.id, book.title)}>🗑️ 삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookDeleteList;
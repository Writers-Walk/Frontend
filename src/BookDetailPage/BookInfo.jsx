import React from 'react';
import { useEffect, useState } from 'react';
import { getBooks } from '../api/bookApi';

const BookDetail = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(console.error);
  }, []);

  return (
    <div className="info-area">
 
      {/* 제목 */}
      <h1 className="book-title">{books.title}</h1>
 
      {/* 작성자 */}
      <p className="book-author">👤 {books.author}</p>
 
      {/* 출판일 */}
      <div className="badge-row">
        <span className="badge genre">📅 출판일: {books.publicationDt}</span>
      </div>
 
      {/* 등록일 / 수정일 */}
      <div className="dates">
        <span>🗓 등록일: {formatDate(books.createdAt)}</span>
        <span>✏️ 수정일: {formatDate(books.updatedAt)}</span>
      </div>
 
      <hr className="divider" />
 
      {/* 도서 내용 */}
      <p className="content-label">도서 내용</p>
      <p className="book-content">{books.content}</p>
    </div>
  );
};
 
export default BookInfo;

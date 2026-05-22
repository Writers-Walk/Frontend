import React from 'react';

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};

const BookInfo = ({ book }) => {
  return (
    <div className="right-section">
      {/* 1. 제목 */}
      <h1 className="book-title">📖 {book.title}</h1>
 
      {/* 2. 작성자 */}
      <p className="book-author">👤 저자: {book.author}</p>
 
      {/* 3. 출판일 구역 (badge-row) */}
      <div className="badge-row">
        <span className="badge">📅 출판일: {book.publicationDt || "정보 없음"}</span>
      </div>
 
      {/* 4. 등록일 / 수정일 구역 (dates) */}
      <div className="dates">
        <span>🗓 등록일: {formatDate(book.createdAt)}</span>
        <span>✏️ 수정일: {formatDate(book.updatedAt)}</span>
      </div>
 
      <hr className="divider" />
 
      {/* 5. 도서 내용 */}
      <p className="content-label">📋 도서 내용</p>
      <p className="book-content">{book.content}</p>
    </div>
  );
};
 
export default BookInfo;
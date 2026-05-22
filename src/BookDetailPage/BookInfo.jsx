const BookDetail = ({ book }) => {
  return (
    <div className="info-area">
 
      {/* 제목 */}
      <h1 className="book-title">{book.title}</h1>
 
      {/* 작성자 */}
      <p className="book-author">👤 {book.author}</p>
 
      {/* 출판일 */}
      <div className="badge-row">
        <span className="badge genre">📅 출판일: {book.publicationDt}</span>
      </div>
 
      {/* 등록일 / 수정일 */}
      <div className="dates">
        <span>🗓 등록일: {formatDate(book.createdAt)}</span>
        <span>✏️ 수정일: {formatDate(book.updatedAt)}</span>
      </div>
 
      <hr className="divider" />
 
      {/* 도서 내용 */}
      <p className="content-label">도서 내용</p>
      <p className="book-content">{book.content}</p>
    </div>
  );
};
 
export default BookInfo;

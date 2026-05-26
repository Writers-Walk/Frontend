import React from "react";
<<<<<<< HEAD
import "../css/BookCard.css";

=======
import "../css/bookCard.css";

// main화면 도서 card형식 출력
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      {book.coverImageUrl ? (
        <img
          src={book.coverImageUrl}
          alt={book.title}
          className="book-card__image"
        />
      ) : (
        <div className="book-card__no-image">이미지 없음</div>
      )}
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
<<<<<<< HEAD
      <p className="book-card__date">{book.createdAt.slice(0, 10)}</p>
=======
      <div className="book-card__title-row">
        <p className="book-card__date">{book.createdAt.slice(0, 10)}</p>
        <span className="book-card__likes">❤️ {book.likes}</span>
      </div>
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
    </div>
  );
};

export default BookCard;

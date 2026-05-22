import React from "react";
import "../css/BookCard.css";

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
      <p className="book-card__date">{book.createdAt.slice(0, 10)}</p>
    </div>
  );
};

export default BookCard;

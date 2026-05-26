import React from 'react';
import RegisterButton from './RegisterButton';
import BookCard from "./bookCard";
import loadBooks from '../api/mainapi';
import '../css/MainPage.css';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

  const {books, loading, error} = loadBooks();
  const navigate = useNavigate();

  
  const handleClickBook = (book) => {
    navigate(`/book/${book.id}`);
  };

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;

    return (
        <div className="main-page">
            <div className="main-toolbar">
                <span className="book-count">
                    도서 목록 <span>({books.length}권)</span>
                </span>
                <RegisterButton />
            </div>
            {books.length === 0 ? (
          <p className="main-page__empty">등록된 도서가 없습니다.</p>
        ) : (
          <div className="main-page__card-list">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onClick={handleClickBook} />
            ))}
          </div>
        )}
        </div>
    );
};

export default MainPage;


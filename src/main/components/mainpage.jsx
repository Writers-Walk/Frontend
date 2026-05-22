
import React, { useState, useEffect } from 'react';
import RegisterButton from './RegisterButton';
import '../css/MainPage.css';
import BookCard from "./bookCard";
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/books';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchBooks = async () => {
      try{
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("도서 목록을 불러오지 못했습니다.");
        const data = await res.json();
        setBooks(data);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };
    fetchBooks();
  },[]);
  
  const handleClickBook = (book) => {
    alert(`${book.title} 상세 페이지로 이동`);
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


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Hansu.css'; 
import BackButton from './BackButton';
import AIButton from './AIButton';

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};



const BookDetailPage = () => {
  //const [book, setBook] = useState(null);
  const [book, setBook] = useState({
  id: 1,
  title: '클린 코드',
  author: '로버트 C. 마틴',
  publicationDt: '2013.12.24',
  createdAt: '2024-01-15T00:00:00',
  updatedAt: '2024-03-01T00:00:00',
  coverImageUrl: 'https://placehold.co/200x280',
  content: '좋은 코드를 작성하는 방법에 대한 책입니다.',
});
  const navigate = useNavigate(); 
  
  const { id } = useParams(); 

  useEffect(() => {
    const getBookData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          throw new Error("서버에서 데이터를 가져오지 못했습니다.");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error("🚨 도서 데이터 로딩 중 에러 발생:", error);
      }
    };
    
    getBookData();
  }, [id]); 

  const handleGoBack = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      navigate('/'); 
    } catch (err) {
      console.error("목록 이동 중 오류 발생:", error);
    }
  };

  const handleAIGenerate = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      navigate(`/cover-generate/${book.id}`); 
    } catch (err) {
      console.error("AI 생성 페이지 이동 중 오류 발생:", error);
    }
  };

  // if (!book) {
  //   return <div style={{ padding: '20px' }}>db.json에서 데이터를 안전하게 불러오는 중...</div>;
  // }

  const currentImageUrl = book.coverImageUrl;

  return (
    <div className="detail-container">
      <BackButton onClick={handleGoBack} />

      <div className="main-layout">
        <div className="left-section">
          <img src={currentImageUrl} alt="책 표지 이미지 공간" className="book-cover-img" />
          <AIButton onClick={handleAIGenerate} />
        </div>
        
        <div className="right-section">
          <h1 className="book-title">📖 {book.title}</h1>
          <p className="book-author">👤 저자: {book.author}</p>
     
          <div className="badge-row">
            <span className="badge">📅 출판일: {book.publicationDt || "정보 없음"}</span>
          </div>
     
          <div className="dates">
            <span>🗓 등록일: {formatDate(book.createdAt)}</span>
            <span>✏️ 수정일: {formatDate(book.updatedAt)}</span>
          </div>
     
          <hr className="divider" />
     
          <p className="content-label">📋 도서 내용</p>
          <p className="book-content">{book.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
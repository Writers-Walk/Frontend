import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookDetailPage.css'; 
import BackButton from './BackButton';
import AIButton from './AIButton';
import LikeButton from './LikeButton'; 
import { getBookById, deleteBook, updateLikes } from "./api/bookdetailApi"; 

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};

const BookDetailPage = () => {
const [book, setBook] = useState(null);
const navigate = useNavigate(); 
const { id } = useParams(); 

  useEffect(() => {
    getBookById(id)
      .then(setBook)
      .catch((err) => console.error("🚨 로딩 에러:", err));
  }, [id]); 

  const handleGoBack = () => navigate('/');
  const handleAIGenerate = () => navigate(`/cover-generate/${book.id}`);

  const handleDelete = async () => {
    if (window.confirm("정말 이 도서를 삭제하시겠습니까?")) {
      await deleteBook(id);
      alert("삭제되었습니다.");
      navigate('/');
    }
  };

  const handleLike = async () => {
    try {
      const updatedBook = await updateLikes(id, book.likes || 0);
      setBook(updatedBook);
    } catch (err) {
      console.error("좋아요 업데이트 실패:", err);
    }
  };

  if (!book) return <div style={{padding:'20px', textAlign:'center'}}>불러오는 중...</div>;

  return (
    <div className="detail-container">
      <BackButton onClick={handleGoBack} />
      <div className="main-layout">
        <div className="left-section">
          <img src={book.coverImageUrl || "https://placehold.co/200x280"} alt="표지" className="book-cover-img" />
          <AIButton onClick={handleAIGenerate} />
          <button onClick={handleDelete} className="delete-btn">🗑️ 삭제</button>
        </div>
        
        <div className="right-section">
          <h1 className="book-title">📖 {book.title}</h1>
          <p className="book-author">👤 저자: {book.author}</p>
          <div className="book-meta">
            <p>📂 장르: {book.genre || "미분류"}</p>
            <p>🏢 출판사: {book.publisher || "정보 없음"}</p>
            <p>📚 총서사항: {book.seriesInfo || "없음"}</p>
        </div>
     
          <div className="badge-row">
            <span className="badge">📅 출판일: {book.publicationDt || "정보 없음"}</span>
            <LikeButton likes={book.likes} onClick={handleLike} />
          </div>
     
          <div className="dates">
            <span>🗓 등록: {formatDate(book.createdAt)}</span>
            <span>✏️ 수정: {formatDate(book.updatedAt)}</span>
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
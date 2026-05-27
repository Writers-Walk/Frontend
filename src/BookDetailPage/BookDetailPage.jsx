import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookDetailPage.css'; 
import BackButton from './BackButton';
import AIButton from './AIButton';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  useEffect(() => {
    const getBookData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) throw new Error("서버에서 데이터를 가져오지 못했습니다.");
        const data = await response.json();
        setBook(data);
        setLikes(data.likes ?? 0);
      } catch (err) {
        console.error("🚨 도서 데이터 로딩 중 에러 발생:", err);
      }
    };
    getBookData();
  }, [id]); 

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    const newLikes = likes + 1;
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: newLikes }),
      });
      if (!response.ok) throw new Error("좋아요 업데이트 실패");
      setLikes(newLikes);
    } catch (err) {
      console.error("❤️ 좋아요 처리 중 오류:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("삭제 실패");
      navigate('/');
    } catch (err) {
      console.error("🗑️ 삭제 중 오류 발생:", err);
    }
  };

  const handleGoBack = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      navigate('/'); 
    } catch (err) {
      console.error("목록 이동 중 오류 발생:", err);
    }
  };

  const handleAIGenerate = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      navigate(`/cover-generate/${book.id}`); 
    } catch (err) {
      console.error("AI 생성 페이지 이동 중 오류 발생:", err);
    }
  };

  if (!book) return <div style={{ padding: '20px', textAlign: 'center' }}>불러오는 중...</div>;

  return (
    <div className="detail-container">
      <BackButton onClick={handleGoBack} />

      <div className="main-layout">
        <div className="left-section">

          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="book-cover-img"
              onError={(e) => { e.target.src = "https://placehold.co/200x280?text=No+Image"; }}
            />
          ) : (
            <div className="book-cover-placeholder">
              <h2>{book.title}</h2>
              <p>이미지 없음</p>
            </div>
          )}

          <AIButton onClick={handleAIGenerate} />
          <ShareButton />
          <DeleteButton onDelete={handleDelete} />
        </div>

        <div className="right-section">
          <h1 className="book-title">📖 {book.title}</h1>
          <p className="book-author">👤 저자: {book.author}</p>
          {book.genre && <p className="book-meta">🗂 장르: {book.genre}</p>}
          {book.publisher && <p className="book-meta">🏢 출판사: {book.publisher}</p>}
          {book.seriesInfo && <p className="book-meta">📚 총서사항: {book.seriesInfo}</p>}

          <div className="badge-row">
            <span className="badge-blue">📅 출판일: {book.publicationDt || "정보 없음"}</span>
            <LikeButton likes={likes} onClick={handleLike} />
          </div>

          <div className="dates">
            <span>🗓 등록: {formatDate(book.createdAt)}</span>
            <span>✏️ 수정: {formatDate(book.updatedAt)}</span>
          </div>

          <hr className="divider" />

          <p className="content-label">📋 도서 내용</p>
          <div className="book-content-box">
            <p className="book-content">{book.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
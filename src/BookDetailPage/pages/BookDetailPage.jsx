import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/BookDetailPage.css';
import BackButton from '../components/BackButton';
import ReviewPreview from "../../reviewpage/components/ReviewPreview.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [wished, setWished] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  const getBookData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookdetail/book/${id}`,
        { credentials: 'include' }            // 세션 쿠키 전송
      );
      if (!response.ok) {
        throw new Error("서버에서 데이터를 가져오지 못했습니다.");
      }

      const data = await response.json();

      setBook(data);
      setWished(data.wished ?? false);
      setWishCount(data.wishCount ?? 0);
    } catch (err) {
      console.error("🚨 도서 데이터 로딩 중 에러 발생:", err);
    }
  };
  
    getBookData();
  }, [id]);

  const handleWish = async () => {
    try {
    const response = await fetch(
      `http://localhost:8080/api/bookdetail/book/${id}`,
      { method: "POST", credentials: 'include' }   // 세션 쿠키 전송
    );

    if (response.status === 401) {                 // 비로그인 분기
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    if (!response.ok) {
      throw new Error("찜하기 업데이트 실패");
    }

    const updated = await response.json();

    setWished(updated.wished);
    setWishCount(updated.wishCount);
    } catch (err) {
      console.error("💖 찜하기 처리 중 오류:", err);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

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
              onError={(e) => {
                e.target.src = "https://placehold.co/200x280?text=No+Image";
              }}
            />
          ) : (
            <div className="book-cover-placeholder">
              <h2>{book.title}</h2>
              <p>이미지 없음</p>
            </div>
          )}
        </div>

        <div className="right-section">
          <h1 className="book-title">📖 {book.title}</h1>
          <p className="book-author">👤 저자: {book.author}</p>

          {book.genre && <p className="book-meta">🗂 장르: {book.genre}</p>}
          {book.publisher && <p className="book-meta">🏢 출판사: {book.publisher}</p>}
          {book.seriesInfo && <p className="book-meta">📚 총서사항: {book.seriesInfo}</p>}

          <div className="badge-row">
            <span className="badge-blue">
              📅 출판일: {book.publicationDt || "정보 없음"}
            </span>

            <button className={`wish-button ${wished ? 'wished' : ''}`} onClick={handleWish}>
              {wished ? '💖 찜 취소' : '🖤 찜하기'} {wishCount}
            </button>
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

          <ReviewPreview bookId={id} />

        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
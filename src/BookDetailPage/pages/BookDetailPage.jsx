import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/BookDetailPage.css';
import BackButton from '../components/BackButton';
import AIButton from '../components/AIButton';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import ReviewList from "../../reviewpage/components/ReviewList";

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [likes, setLikes] = useState(0);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  // 도서 상세 조회
  useEffect(() => {
    const getBookData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookdetail/book/${id}`);

        if (!response.ok) {
          throw new Error("서버에서 데이터를 가져오지 못했습니다.");
        }

        const data = await response.json();
        setBook(data);
        setLikes(data.likes ?? 0);
      } catch (err) {
        console.error("🚨 도서 데이터 로딩 중 에러 발생:", err);
      }
    };

    getBookData();
  }, [id]);

  // 리뷰 조회
  useEffect(() => {
    const getReviewData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/review/${id}/getallreview`);

        if (!response.ok) {
          throw new Error("리뷰 데이터를 가져오지 못했습니다.");
        }

        const data = await response.json();
        console.log("리뷰 데이터:", data);
        setReviews(data);
      } catch (err) {
        console.error("🚨 리뷰 데이터 로딩 중 에러 발생:", err);
      }
    };

    getReviewData();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookdetail/book/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error("좋아요 업데이트 실패");
      }

      const updated = await response.json();
      setLikes(updated.likes);
    } catch (err) {
      console.error("❤️ 좋아요 처리 중 오류:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookdetail/book/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("삭제 실패");
      }

      navigate('/');
    } catch (err) {
      console.error("🗑️ 삭제 중 오류 발생:", err);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleAIGenerate = () => {
    navigate(`/cover-generate/${id}`);
  };

  if (!book) {
    return (
      <div className="detail-container">
        <p>도서 정보를 불러오는 중...</p>
      </div>
    );
  }

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
            <span className="badge-blue">
              📅 출판일: {book.publicationDt || "정보 없음"}
            </span>

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

          <div className="review-section">
            <div className="review-title-row">
              <h3>리뷰</h3>

              <button
                type="button"
                className="review-more-button"
                onClick={() => navigate(`/book/${id}/reviews`)}
              >
                리뷰 전체보기
              </button>
            </div>

            <ReviewList reviews={reviews.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/BookDetailPage.css';
import BackButton from '../components/BackButton';
import AIButton from '../components/AIButton';
import ShareButton from '../components/ShareButton';
import DeleteButton from '../components/DeleteButton';
import ReviewList from "../../reviewpage/ReviewList";

const formatDate = (dateString) => {
  if (!dateString) return "날짜 없음";
  return dateString.split('T')[0];
};

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [wished, setWished] = useState(false);
  const [wishCount, setWishCount] = useState(0);  // ✅ 추가
  const navigate = useNavigate(); 

  const { id } = useParams(); 
  const TEMPORARY_USER_ID = 1; //완성되면 삭제

  const { id } = useParams();
  const [reviews, setReviews] = useState([
    // 나중에 삭제
  {
    id: 1,
    username: "에이블",
    rating: 5,
    content: "정말 재밌게 읽었습니다."
  },
  {
    id: 2,
    username: "에이블러",
    rating: 4,
    content: "추천합니다."
  },
  {
    id: 3,
    username: "눈누",
    rating: 3,
    content: "무난하게 읽기 좋았어요."
  },
  {
    id: 2,
    username: "난나",
    rating: 5,
    content: "어려운 책이네요"
  },
  {
    id: 5,
    username: "룰루",
    rating: 4,
    content: "재밌게 읽었어요."
  },
  {
    id: 6,
    username: "랄라",
    rating: 1,
    content: "이건 별로인 듯"
  }
]);


  useEffect(() => {
    const getBookData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookdetail/book/${id}?userId=${TEMPORARY_USER_ID}`);  // ✅ userId 추가
        if (!response.ok) throw new Error("서버에서 데이터를 가져오지 못했습니다.");
        const data = await response.json();
        setBook(data);
        setWished(data.wished ?? false);
        setWishCount(data.wishCount ?? 0);  // ✅ 초기값 세팅
      } catch (err) {
        console.error("🚨 도서 데이터 로딩 중 에러 발생:", err);
      }
    };
    getBookData();
  }, [id]); 

  const handleWish = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookdetail/book/${id}?userId=${TEMPORARY_USER_ID}`,
        { method: 'POST' }
      );
      if (!response.ok) throw new Error("찜하기 업데이트 실패");
      const updated = await response.json();

      setWished(updated.wished);
      setWishCount(updated.wishCount);
    } catch (err) {
      console.error("💖 찜하기 처리 중 오류:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookdetail/book/${id}`, { method: 'DELETE' });
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
      navigate(`/cover-generate/${id}`); 
    } catch (err) {
      console.error("AI 생성 페이지 이동 중 오류 발생:", err);
    }
  };

  if (!book) {
  return (
    <div className="detail-container">
      <h1>테스트 도서</h1>

      <hr className="divider" />

      <div className="review-section">
        <div className="review-title-row">
          <h3>리뷰</h3>

          <button
            type="button"
            className="review-more-button"
            onClick={() => navigate(`/book/${id}/reviews`)}
          >
            전체보기 →
          </button>
        </div>

        <ReviewList reviews={reviews.slice(0, 5)} />
      </div>
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
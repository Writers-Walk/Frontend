import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList";

function ReviewPreview({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/review/${bookId}/getallreview`
        );

        if (!response.ok) {
          throw new Error("리뷰 데이터를 가져오지 못했습니다.");
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("🚨 리뷰 데이터 로딩 중 에러 발생:", err);
      }
    };

    if (bookId) {
      getReviewData();
    }
  }, [bookId]);

  return (
    <div className="review-section">
      <div className="review-title-row">
        <h3>리뷰</h3>

        <button
          type="button"
          className="review-more-button"
          onClick={() => navigate(`/book/${bookId}/reviews`)}
        >
          전체보기→
        </button>
      </div>

      <ReviewList reviews={reviews.slice(0, 5)} />
    </div>
  );
}

export default ReviewPreview;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import { getReviews } from "../api/reviewApi";
import "../css/reviewpage.css";

function ReviewPage() {
  const { id } = useParams();

  const [sortType, setSortType] = useState("latest");
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const data = await getReviews(id);
      setReviews(data);
    } catch (error) {
      console.error("리뷰 조회 실패:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "highRating") {
      return b.rating - a.rating;
    }

    if (sortType === "lowRating") {
      return a.rating - b.rating;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const averageRating =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map((score) => ({
    score,
    count: reviews.filter((review) => review.rating === score).length,
  }));

  const maxCount = Math.max(...ratingCounts.map((item) => item.count), 1);

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);

    return [1, 2, 3, 4, 5].map((star) => (
      <span key={star}>{star <= roundedRating ? "⭐" : "☆"}</span>
    ));
  };

  return (
    <div className="review-page">
      <h1>전체 리뷰</h1>

      <div className="rating-summary-box">
        <div className="rating-left">
          <div className="average-score">{averageRating}</div>

          <div className="average-stars">
            {renderStars(averageRating)}
          </div>
        </div>

        <div className="rating-divider"></div>

        <div className="rating-right">
          {ratingCounts.map((item) => (
            <div className="rating-row" key={item.score}>
              <span>{item.score}점</span>

              <div className="rating-bar">
                <div
                  className="rating-bar-fill"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewForm onReviewAdded={fetchReviews} />

      <div className="review-list-header">
        <strong>총 {reviews.length}개</strong>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="highRating">별점 높은순</option>
          <option value="lowRating">별점 낮은순</option>
        </select>
      </div>

      <ReviewList reviews={sortedReviews} />
    </div>
  );
}

export default ReviewPage;


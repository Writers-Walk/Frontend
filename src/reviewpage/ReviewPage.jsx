import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function ReviewPage() {
  const [sortType, setSortType] = useState("latest");

  const reviews = [
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
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
   if (sortType === "highRating") {
      return b.rating - a.rating;
    }

    if (sortType === "lowRating") {
      return a.rating - b.rating;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });


  // 리뷰 평점
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

  const maxCount = Math.max(
    ...ratingCounts.map((item) => item.count),
    1
  );

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);

    return [1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {star <= roundedRating ? "⭐" : "☆"}
      </span>
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

      <ReviewForm />

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

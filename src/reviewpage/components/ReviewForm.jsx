import { useState } from "react";
import { useParams } from "react-router-dom";
import { createReview } from "../api/reviewApi";
import { useAuth } from "../../main/components/AuthContext";

function ReviewForm({ onReviewAdded }) {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    if (content.trim().length < 5) {
      alert("리뷰는 최소 5자 이상 입력해주세요.");
      return;
    }

    try {
      await createReview(id, {
      content,
      rating,
      user_id:  user.userId,
    });

      alert("리뷰가 등록되었습니다.");

      onReviewAdded();

      setContent("");
      setRating(0);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>리뷰 작성</h3>

      <div className="rating-box">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="star"
            onClick={() => setRating(star)}
          >
            {star <= rating ? "⭐" : "☆"}
          </span>
        ))}
      </div>

      <textarea
        className="review-textarea"
        placeholder="리뷰를 입력하세요"
        value={content}
        maxLength={100}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="review-count">
        {content.length} / 100
      </div>

      <button type="submit" className="review-submit-button">
        등록
      </button>
    </form>
  );
}

export default ReviewForm;
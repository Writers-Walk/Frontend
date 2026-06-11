import { useState } from "react";

function ReviewForm() {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
        alert("별점을 선택해주세요.");
        return;
    }

    if (content.trim().length < 5) {
        alert("리뷰는 최소 5자 이상 입력해주세요.");
        return;
    }

    console.log({  //await createReview -> API연결하면
      content,
      rating,
    });

    alert("리뷰가 등록되었습니다.");

    setContent("");
    setRating(5);
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
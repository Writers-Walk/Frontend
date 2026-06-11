import ReviewItem from "./ReviewItem";

function ReviewList({ reviews }) {
  const visibleReviews = reviews.slice(0, 5);

  return (
    <div>
      {visibleReviews.map((review, index) => (
        <div key={index}>
          <p>{review.content}</p>
          <p>⭐ {review.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;


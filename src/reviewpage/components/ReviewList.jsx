import ReviewItem from "./ReviewItem";

function ReviewList({ reviews }) {
  return (
    <div>
      {reviews.map((review, index) => (
        <ReviewItem key={review.id ?? index} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;

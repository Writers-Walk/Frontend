function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <div className="review-header">
        <span>{review.username}</span>
        <span> ⭐ {review.rating}</span>
      </div>

      <p>{review.content}</p>
    </div>
  );
}

export default ReviewItem;





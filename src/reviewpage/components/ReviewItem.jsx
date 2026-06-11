function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <div className="review-header">
        <span>{review.username}</span>
        <span> ⭐ {review.rating}</span>
        <span>
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p>{review.content}</p>
    </div>
  );
}

export default ReviewItem;
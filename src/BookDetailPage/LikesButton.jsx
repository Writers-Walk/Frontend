import React from 'react';

const LikesButton = ({ likes, onClick, isLiking, liked }) => {
  return (
    <div className="like-section">
      <button
        className={`like-btn ${liked ? 'liked' : ''} ${isLiking ? 'liking' : ''}`}
        onClick={onClick}
        disabled={isLiking || liked}
      >
        {liked ? '❤️' : '🤍'} 좋아요 {likes}
      </button>
    </div>
  );
};

export default LikesButton;
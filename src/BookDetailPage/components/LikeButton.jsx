import React from 'react';

const LikeButton = ({ likes, onClick }) => {
  return (
    <button onClick={onClick} className="like-btn">
      ❤️ 좋아요: {likes || 0}개
    </button>
  );
};

export default LikeButton;
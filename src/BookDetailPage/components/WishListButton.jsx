import React from 'react';

const WishListButton = ({ wished, onClick }) => {
  return (
    <button onClick={onClick} className="wish-btn">
      {wished ? '💖 찜 완료' : '🤍 찜하기'}
    </button>
  );
};

export default WishListButton;
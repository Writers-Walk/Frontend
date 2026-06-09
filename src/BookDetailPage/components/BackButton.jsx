import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <div className="back-button-zone">
      <button onClick={onClick} className="back-btn">
        ← 목록으로 돌아가기
      </button>
    </div>
  );
};

export default BackButton;
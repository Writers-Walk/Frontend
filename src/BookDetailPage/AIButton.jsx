import React from 'react';

const AIButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="ai-btn">
      🪄 AI 표지 생성
    </button>
  );
};

export default AIButton;
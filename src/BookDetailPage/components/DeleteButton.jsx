import React, { useState } from 'react';

const DeleteButton = ({ onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onDelete();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <button className="delete-btn" onClick={handleDeleteClick}>
        🗑️ 삭제
      </button>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p className="confirm-text">정말 삭제하시겠습니까?</p>
            <div className="confirm-buttons">
              <button className="confirm-ok" onClick={handleConfirm}>확인</button>
              <button className="confirm-cancel" onClick={handleCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
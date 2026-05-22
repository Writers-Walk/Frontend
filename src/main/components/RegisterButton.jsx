import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterButton.css';

const RegisterButton = ({ variant = 'primary' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <button
      className={`btn btn-${variant}`}
      onClick={handleClick}
    >
      <i className="ti ti-plus" aria-hidden="true" />
      도서 등록
    </button>
  );
};

export default RegisterButton;
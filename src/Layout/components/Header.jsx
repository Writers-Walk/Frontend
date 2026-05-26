import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import pageLogo from '../../assets/pageLogo.png'

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => navigate('/')}>
          <img src={pageLogo} alt="로고" className="logo-image" />
          <div className="logo-text">
            <span className="logo-title">걷기가 서재</span>
            <span className="logo-sub">작가의 산책</span>
          </div> 
        </div>
      </div>
    </header>
  );
};

export default Header;
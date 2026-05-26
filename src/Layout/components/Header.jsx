import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
<<<<<<< HEAD
=======
import pageLogo from '../../assets/pageLogo.png'
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => navigate('/')}>
<<<<<<< HEAD
          <span className="logo-title">걷기가 서재</span>
          <span className="logo-sub">작가의 산책</span>
=======
          <img src={pageLogo} alt="로고" className="logo-image" />
          <div className="logo-text">
            <span className="logo-title">걷기가 서재</span>
            <span className="logo-sub">작가의 산책</span>
          </div> 
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
        </div>
      </div>
    </header>
  );
};

export default Header;
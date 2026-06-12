// 메인 우상단 인증 버튼 영역
// 비로그인: 로그인/회원가입 버튼  |  로그인: 유저 표시 + 로그아웃 버튼
import '../css/AuthButtons.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const AuthButtons = () => {
  const { isLoggedIn, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // 첫 /me 호출 중엔 깜빡임 방지 위해 아무것도 안 보임
  if (loading) return null;

  const handleLogout = async () => {
    try {
      await logout();
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="auth-buttons">
        <span className="auth-buttons__user">{user.userId}님</span>
        <button className="auth-buttons__btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <button className="auth-buttons__btn" onClick={() => navigate('/login')}>
        로그인
      </button>
      <button className="auth-buttons__btn" onClick={() => navigate('/signup')}>
        회원가입
      </button>
    </div>
  );
};

export default AuthButtons;

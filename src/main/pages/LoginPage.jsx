// 로그인 페이지
// 아이디·비밀번호 입력 → AuthContext.login() 호출 → 성공 시 메인으로

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    if (!userId.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 입력하세요.');
      return;
    }
    setSubmitting(true);
    try {
      await login(userId, password);   // AuthContext가 상태까지 갱신
      navigate('/');                    // 메인으로
    } catch (err) {
      setError(err.message);            // "아이디 또는 비밀번호가 틀렸습니다" 등
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <h1>로그인</h1>

      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      {error && <p className="login-page__error">{error}</p>}

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? '로그인 중...' : '로그인'}
      </button>

      <button className="login-page__link" onClick={() => navigate('/signup')}>
        계정이 없으신가요? 회원가입
      </button>
    </div>
  );
};

export default LoginPage;

// 회원가입 페이지
// 아이디(중복확인) + 비밀번호 + 버블 장르 3개 → join API 호출

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userApi from '../api/userApi';
import GenreBubbles from '../components/GenreBubbles';
import '../css/SignupPage.css';

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [genres, setGenres] = useState([]);          // 선택된 장르 (최대 3)
  const [idChecked, setIdChecked] = useState(false);  // 중복확인 통과 여부
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // 아이디가 바뀌면 중복확인 다시 받도록 초기화
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setIdChecked(false);
    setMessage('');
  };

  // 아이디 중복 확인
  const handleCheckId = async () => {
    setError('');
    if (!userId.trim()) {
      setError('아이디를 입력하세요.');
      return;
    }
    try {
      const { isDuplicate, message } = await userApi.checkUserId(userId);
      setMessage(message);
      setIdChecked(!isDuplicate);   // 중복 아니면 통과
    } catch (err) {
      setError(err.message);
    }
  };

  // 회원가입 제출
  const handleSubmit = async () => {
    setError('');
    if (!idChecked) {
      setError('아이디 중복 확인을 해주세요.');
      return;
    }
    if (!password.trim()) {
      setError('비밀번호를 입력하세요.');
      return;
    }
    if (genres.length === 0) {
      setError('좋아하는 장르를 선택하세요.');
      return;
    }
    setSubmitting(true);
    try {
      await userApi.join({ userId, password, genres });
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <h1>회원가입</h1>

      {/* 아이디 + 중복확인 */}
      <div className="signup-page__id-row">
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={handleUserIdChange}
        />
        <button onClick={handleCheckId}>중복 확인</button>
      </div>
      {message && (
        <p className={idChecked ? 'signup-page__ok' : 'signup-page__warn'}>
          {message}
        </p>
      )}

      {/* 비밀번호 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* 버블 장르 선택 */}
      <GenreBubbles selected={genres} onChange={setGenres} maxSelect={3} />

      {error && <p className="signup-page__error">{error}</p>}

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? '가입 중...' : '회원가입'}
      </button>
    </div>
  );
};

export default SignupPage;

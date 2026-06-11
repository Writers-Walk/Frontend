// 회원/인증 관련 API 호출 함수 모음
// 모든 요청에 credentials: 'include' — 세션 쿠키를 주고받기 위함 (백엔드 allowCredentials(true)와 짝)

const BASE_URL = 'http://localhost:8080/api/users';

// 아이디 중복 확인
// GET /api/users/check-id?userId=...  →  { isDuplicate, message }
export const checkUserId = async (userId) => {
  const params = new URLSearchParams({ userId });
  const res = await fetch(`${BASE_URL}/check-id?${params}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('아이디 확인에 실패했습니다.');
  return res.json();
};

// 회원가입
// POST /api/users/join  body: { userId, password, role, genres[] }  →  { status, message }
export const join = async ({ userId, password, genres }) => {
  const res = await fetch(`${BASE_URL}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, password, genres }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || '회원가입에 실패했습니다.');
  return data;
};

// 로그인
// POST /api/users/login  body: { userId, password }  →  { status, userId, role }
export const login = async ({ userId, password }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || '로그인에 실패했습니다.');
  return data;
};

// 로그아웃
// POST /api/users/logout
export const logout = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('로그아웃에 실패했습니다.');
};

// 현재 로그인 유저 조회 (권한 분기용)
// GET /api/users/me  →  { userId, role }  또는  401
// 로그인 안 된 상태(401)는 에러가 아니라 "비로그인"으로 처리 → null 반환
export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: 'include',
  });
  if (res.status === 401) return null;       // 비로그인
  if (!res.ok) throw new Error('유저 정보 조회 실패');
  return res.json();
};

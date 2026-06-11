// 로그인 상태를 앱 전체에서 공유하는 Context
// 메인 버튼/등록 버튼/찜·리뷰 권한 분기

import { createContext, useContext, useState, useEffect } from 'react';
import * as userApi from '../api/userApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // { userId, role } 또는 null(비로그인)
  const [loading, setLoading] = useState(true); // 첫 /me 호출 동안 true

  // 앱 시작 시 /me 호출 → 로그인 상태 복원 (새로고침해도 세션 살아있으면 유지)
  useEffect(() => {
    userApi.getMe()
      .then((data) => setUser(data))    // 로그인됨 → {userId, role}, 아니면 null
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // 로그인: API 호출 후 user 상태 갱신
  const login = async (userId, password) => {
    const data = await userApi.login({ userId, password });
    setUser({ userId: data.userId, role: data.role });
    return data;
  };

  // 로그아웃: API 호출 후 user 비우기
  const logout = async () => {
    await userApi.logout();
    setUser(null);
  };

  // 편의 플래그
  const isLoggedIn = user !== null;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 어디서든 로그인 상태를 꺼내 쓰는 훅
// 예: const { isLoggedIn, isAdmin, user, logout } = useAuth();
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  return ctx;
};

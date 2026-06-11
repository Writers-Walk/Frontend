import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BookCreateForm from '../components/BookCreateForm';
import CoverGenerate from '../components/CoverGenerate';
import BookDeleteList from '../components/BookDeleteList';
import BannerGenerate from '../components/BannerGenerate';
import '../css/AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const navigate = useNavigate(); 

  return (
    <div className="admin-page" style={{ position: 'relative', paddingTop: '40px' }}>
      
      {/* ✨ 좌측 상단 메인으로 가기 버튼 */}
      <button 
        onClick={() => navigate('/')} 
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '8px 14px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}
      >
        ⬅️ 메인으로
      </button>

      <h1>📋 관리자 페이지</h1>

      <div className="admin-tabs">
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          📚 도서 등록
        </button>
        <button
          className={activeTab === 'cover' ? 'active' : ''}
          onClick={() => setActiveTab('cover')}
        >
          🎨 AI 이미지 생성
        </button>
        <button
          className={activeTab === 'delete' ? 'active' : ''}
          onClick={() => setActiveTab('delete')}
        >
          🗑️ 도서 삭제
        </button>
        <button
          className={activeTab === 'banner' ? 'active' : ''}
          onClick={() => setActiveTab('banner')}
        >
          🖼️ 광고 배너
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'create' && <BookCreateForm />}
        {activeTab === 'cover' && <CoverGenerate />}
        {activeTab === 'delete' && <BookDeleteList />}
        {activeTab === 'banner' && <BannerGenerate />}
      </div>
    </div>
  );
};

export default AdminPage;
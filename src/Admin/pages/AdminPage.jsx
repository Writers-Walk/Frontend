import React, { useState } from 'react';
import BookCreateForm from '../components/BookCreateForm';
import CoverGenerate from '../components/CoverGenerate';
import BookDeleteList from '../components/BookDeleteList';
import '../css/AdminPage.css';
import BannerGenerate from '../components/BannerGenerate';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="admin-page">
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
// src/Admin/components/CoverGenerate.jsx
import React, { useState, useEffect } from 'react';
// 기존 컴포넌트 재사용
import BookInfoSection from '../../CoverGeneratePage/components/BookInfoSection';
import ImageOptionSection from '../../CoverGeneratePage/components/ImageOptionSection';
import GeneratedResultSection from '../../CoverGeneratePage/components/GeneratedResultSection';
import LoadingOverlay from '../../CoverGeneratePage/components/LoadingOverlay';

const CoverGenerate = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('http://localhost:8080/api/bookdetail/books');
      const data = await res.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="cover-generate-admin">
      <div className="form-group">
        <label>도서 선택</label>
        <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
          <option value="">-- 도서를 선택하세요 --</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
      </div>

      {selectedBookId && (
        <div>
          {/* 기존 CoverGeneratePage 로직을 selectedBookId 기반으로 렌더링 */}
          {/* BookInfoSection, ImageOptionSection 등 */}
        </div>
      )}
    </div>
  );
};

export default CoverGenerate;
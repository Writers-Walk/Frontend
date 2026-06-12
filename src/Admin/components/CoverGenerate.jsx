// src/Admin/components/CoverGenerate.jsx
import React, { useState, useEffect } from 'react';
import getBookDetail from '../../CoverGeneratePage/api/getBookDetail';
import saveCoverImage from '../../CoverGeneratePage/api/saveCoverImage';
import compressImage from '../../CoverGeneratePage/api/compressImage';

import BookInfoSection from '../../CoverGeneratePage/components/BookInfoSection';
import ImageOptionSection from '../../CoverGeneratePage/components/ImageOptionSection';
import GeneratedResultSection from '../../CoverGeneratePage/components/GeneratedResultSection';
import LoadingOverlay from '../../CoverGeneratePage/components/LoadingOverlay';

import '../../CoverGeneratePage/css/CoverGeneratePage.css';

const CoverGenerate = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');

  const [book, setBook] = useState(null);
  const [imageModel, setImageModel] = useState('gpt-image-2');
  const [resolution, setResolution] = useState('1024x1024');
  const [quality, setQuality] = useState('medium');
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('http://localhost:8080/api/bookdetail/books');
      const data = await res.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!selectedBookId) {
      setBook(null);
      setGeneratedImage('');
      return;
    }

    const fetchBook = async () => {
      try {
        const data = await getBookDetail(selectedBookId);
        setBook(data);
        setGeneratedImage(data.coverImageUrl || '');
      } catch (err) {
        console.error(err);
        setError('도서 정보를 불러오지 못했습니다.');
      }
    };
    fetchBook();
  }, [selectedBookId]);

  function makePrompt() {
    if (!book) return '';

    const defaultPrompt = `
      책 제목: ${book.title}
      저자: ${book.author || '미정'}
      장르: ${book.genre || '미정'}
      책 내용: ${book.content || '내용 없음'}

      위 도서 정보를 바탕으로 책 표지 이미지를 생성하세요.
      표지에는 책의 제목과 장르, 내용이 잘 어울려야 합니다.
      독자가 클릭하고 싶을 만큼 시각적으로 매력적이게 생성하세요.
    `.trim();

    if (userPrompt.trim()) {
      return `${defaultPrompt}\n\n사용자 추가 요구사항:\n${userPrompt.trim()}`;
    }
    return defaultPrompt;
  }

  const handleGenerateImage = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:8080/api/books/${selectedBookId}/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userPrompt, imageModel, resolution, quality }),
        }
      );

      if (!response.ok) {
        throw new Error('백엔드 서버에서 AI 이미지 생성에 실패했습니다.');
      }

      const data = await response.json();
      setGeneratedImage(data.coverImageUrl);
      alert('🎉 표지 이미지가 성공적으로 생성되었습니다!');
    } catch (err) {
      console.error(err);
      setError(err.message || '이미지 생성에 실패했습니다.');
      alert(err.message || '이미지 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCover = async () => {
    if (!generatedImage) {
      alert('먼저 표지 이미지를 생성해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const finalPrompt = makePrompt();
      const compressedImage = await compressImage(generatedImage, 500, 700, 0.85);

      await saveCoverImage(selectedBookId, {
        coverImageUrl: compressedImage,
        coverPrompt: finalPrompt,
        imageModel,
        resolution,
        quality,
        updatedAt: new Date().toISOString().slice(0, 10),
      });

      alert('🎉 표지 이미지가 정상적으로 저장되었습니다!');
    } catch (err) {
      console.error(err);
      setError(err.message || '이미지 저장 중 오류가 발생했습니다.');
      alert(err.message || '이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cover-generate-admin">
      {loading && <LoadingOverlay />}

      <div className="form-group">
        <label>도서 선택</label>
        <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
          <option value="">-- 도서를 선택하세요 --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      {book && (
        <>
          <div className="cover-layout">
            <BookInfoSection book={book} />

            <ImageOptionSection
              imageModel={imageModel}
              setImageModel={setImageModel}
              resolution={resolution}
              setResolution={setResolution}
              quality={quality}
              setQuality={setQuality}
              userPrompt={userPrompt}
              setUserPrompt={setUserPrompt}
              handleGenerateImage={handleGenerateImage}
              loading={loading}
            />
          </div>

          <GeneratedResultSection
            generatedImage={generatedImage}
            handleGenerateImage={handleGenerateImage}
            handleSaveCover={handleSaveCover}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default CoverGenerate;
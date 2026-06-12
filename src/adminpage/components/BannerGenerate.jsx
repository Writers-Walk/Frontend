import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBannerGenerate } from '../hooks/useBannerGenerate';

const BannerGenerate = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('latestBanner');
  const [userPrompt, setUserPrompt] = useState('');
  const [imageModel, setImageModel] = useState('gpt-image-2');
  const [resolution, setResolution] = useState('3840x1536');
  const [quality, setQuality] = useState('medium');

  const { result, loading, generateBanner } = useBannerGenerate();

  const handleGenerate = () => {
    generateBanner({ type, userPrompt, imageModel, resolution, quality });
  };

  return (
    <div className="banner-generate">
      <div className="form-group">
        <label>배너 종류</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="latestBanner">📚 신간 소개</option>
          <option value="bestBanner">🏆 이주의 책</option>
        </select>
      </div>

      <div className="form-group">
        <label>추가 요청사항 </label>
        <textarea
          placeholder="원하는 스타일을 입력하세요."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>이미지 모델</label>
        <select value={imageModel} onChange={(e) => setImageModel(e.target.value)}>
          <option value="gpt-image-2">gpt-image-2</option>
        </select>
      </div>

      <div className="form-group">
        <label>해상도</label>
        <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
          <option value="3840x1536">3840x1536</option>
        </select>
      </div>

      <div className="form-group">
        <label>품질</label>
        <select value={quality} onChange={(e) => setQuality(e.target.value)}>
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </select>
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? '생성 중...' : '배너 생성하기'}
      </button>

      {result && (
        <div className="banner-result">
          <p>배너 생성이 완료되었습니다.</p>
        </div>
      )}
    </div>
  );
};

export default BannerGenerate;
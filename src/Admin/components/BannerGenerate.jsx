import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerGenerate = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('latestBanner');
  const [userPrompt, setUserPrompt] = useState('');
  const [imageModel, setImageModel] = useState('dall-e-3');
  const [resolution, setResolution] = useState('1024x1024');
  const [quality, setQuality] = useState('medium');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/admin/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, userPrompt, imageModel, resolution, quality }),
      });
      if (!res.ok) throw new Error('배너 생성 실패');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
          <option value="dall-e-3">DALL·E 3</option>
          <option value="dall-e-2">DALL·E 2</option>
        </select>
      </div>

      <div className="form-group">
        <label>해상도</label>
        <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
          <option value="1024x1024">1024x1024</option>
          <option value="1024x1792">1024x1792 (세로)</option>
          <option value="1792x1024">1792x1024 (가로)</option>
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
          <h3>생성된 배너</h3>
          <img src={result.imageUrl} alt="배너 이미지" />
        </div>
      )}
    </div>
  );
};

export default BannerGenerate;
import { useState } from 'react';

export const useBannerGenerate = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateBanner = async ({ type, userPrompt, imageModel, resolution, quality }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/banner/createbanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, userPrompt, imageModel, resolution, quality }),
      });
      if (!res.ok) throw new Error('배너 생성 실패');
      const data = await res.json();
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, generateBanner };
};
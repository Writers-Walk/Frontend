import React, { useState } from 'react';

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 원래대로
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  return (
    <button
      className={`share-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
    >
      {copied ? '✅ 복사됨!' : '🔗 URL 복사'}
    </button>
  );
};

export default ShareButton;
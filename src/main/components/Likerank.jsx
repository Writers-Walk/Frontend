import React, { useState, useMemo } from 'react';
import '../css/Likerank.css';

/**
 * LikeRanking
 * Props:
 *   books        - 전체 book 배열 (likes, title, author, genre 필드 포함)
 *   topN         - 몇 위까지 표시할지 (기본 5)
 *   onClickBook  - (book) => void  클릭 시 상세 이동
 */
const MEDAL = ['🥇', '🥈', '🥉'];
 
const LikeRank = ({ books = [], topN = 5, onClickBook }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
 
  // 전체 장르 목록 추출
  const genres = useMemo(() => {
    const set = new Set(books.map((b) => b.genre).filter(Boolean));
    return ['전체', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'))];
  }, [books]);
 
  // 장르 필터 후 좋아요 순 정렬
  const ranked = useMemo(() => {
    const filtered = selectedGenre
      ? books.filter((b) => b.genre === selectedGenre)
      : books;
    return [...filtered]
      .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
      .slice(0, topN);
  }, [books, selectedGenre, topN]);
 
  if (books.length === 0) return null;
 
  const maxLikes = ranked[0]?.likes ?? 1;
 
  return (
    <section className="like-ranking">
      <h2 className="like-ranking__title">❤️ 좋아요 순위</h2>
 
      {/* 장르 필터 칩 */}
      <div className="like-ranking__genres">
        {genres.map((genre) => {
          const value = genre === '전체' ? '' : genre;
          const isActive = selectedGenre === value;
          return (
            <button
              key={genre}
              className={`like-ranking__chip ${isActive ? 'like-ranking__chip--active' : ''}`}
              onClick={() => setSelectedGenre(value)}
            >
              {genre}
            </button>
          );
        })}
      </div>
 
      {/* 순위 목록 */}
      {ranked.length === 0 ? (
        <p className="like-ranking__empty">해당 장르의 도서가 없습니다.</p>
      ) : (
        <ol className="like-ranking__list">
          {ranked.map((book, idx) => {
            const pct = maxLikes > 0 ? Math.round(((book.likes ?? 0) / maxLikes) * 100) : 0;
            return (
              <li
                key={book.id}
                className={`rank-item ${idx < 3 ? 'rank-item--top' : ''}`}
                onClick={() => onClickBook?.(book)}
              >
                <span className="rank-item__rank">
                  {idx < 3 ? MEDAL[idx] : <span className="rank-item__num">{idx + 1}</span>}
                </span>
 
                <div className="rank-item__info">
                  <span className="rank-item__title">{book.title}</span>
                  <span className="rank-item__meta">
                    {book.author}
                    {book.genre && <span className="rank-item__genre">{book.genre}</span>}
                  </span>
                  <div className="rank-item__bar-wrap">
                    <div className="rank-item__bar" style={{ width: `${pct}%` }} />
                  </div>
                </div>
 
                <span className="rank-item__likes">
                  <span className="rank-item__likes-icon">♥</span>
                  {(book.likes ?? 0).toLocaleString()}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};
 
export default LikeRank;
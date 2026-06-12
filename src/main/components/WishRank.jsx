import React, { useState, useEffect } from 'react';
import { fetchRanking, fetchGenres } from '../api/rankingApi';
import '../css/Wishrank.css';

const MEDAL = ['🥇', '🥈', '🥉'];
 
const WishRank = ({ topN = 5, onClickBook }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [ranked, setRanked] = useState([]);
 
  // 장르 목록 (마운트 시 1회)
  useEffect(() => {
    fetchGenres()
      .then((data) => setGenres(['전체', ...data]))
      .catch(() => setGenres(['전체']));
  }, []);
 
  // 랭킹 (장르 바뀔 때마다 재요청)
  useEffect(() => {
    fetchRanking(selectedGenre, topN)
      .then(setRanked)
      .catch(() => setRanked([]));
  }, [selectedGenre, topN]);
 
  const maxWish = ranked[0]?.wishCount ?? 1;   // 찜 개수 기준
 
  return (
    <section className="wish-ranking">
      <h2 className="wish-ranking__title">❤️ 찜 순위</h2>
 
      {/* 장르 필터 칩 */}
      <div className="wish-ranking__genres">
        {genres.map((genre) => {
          const value = genre === '전체' ? '' : genre;
          const isActive = selectedGenre === value;
          return (
            <button
              key={genre}
              className={`wish-ranking__chip ${isActive ? 'wish-ranking__chip--active' : ''}`}
              onClick={() => setSelectedGenre(value)}
            >
              {genre}
            </button>
          );
        })}
      </div>
 
      {/* 순위 목록 */}
      {ranked.length === 0 ? (
        <p className="wish-ranking__empty">해당 장르의 도서가 없습니다.</p>
      ) : (
        <ol className="wish-ranking__list">
          {ranked.map((book, idx) => {
           const pct = maxWish > 0 ? Math.round(((book.wishCount ?? 0) / maxWish) * 100) : 0;            return (
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
                  {(book.wishCount ?? 0).toLocaleString()}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};
 
export default WishRank;
// 버블 형태 장르 선택 (회원가입에서 사용)
// 클릭하면 선택/해제 토글, 최대 maxSelect개까지
import '../css/GenreBubbles.css';

const GENRE_OPTIONS = ['소설', 'IT', '에세이', '시', '역사', '과학', '경제', '자기계발', '예술'];

const GenreBubbles = ({ selected, onChange, maxSelect = 3 }) => {

  const toggle = (genre) => {
    if (selected.includes(genre)) {
      // 이미 선택됨 → 해제
      onChange(selected.filter((g) => g !== genre));
    } else {
      // 새로 선택 → 최대 개수 체크
      if (selected.length >= maxSelect) return;
      onChange([...selected, genre]);
    }
  };

  return (
    <div className="genre-bubbles">
      <p className="genre-bubbles__hint">
        좋아하는 장르를 {maxSelect}개까지 선택하세요 ({selected.length}/{maxSelect})
      </p>
      <div className="genre-bubbles__list">
        {GENRE_OPTIONS.map((genre) => {
          const isActive = selected.includes(genre);
          return (
            <button
              key={genre}
              type="button"
              className={`genre-bubble ${isActive ? 'genre-bubble--active' : ''}`}
              onClick={() => toggle(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreBubbles;

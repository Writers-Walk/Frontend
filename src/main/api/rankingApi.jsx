const RANKING_URL = 'http://localhost:8080/api/books/ranking';
const GENRES_URL = 'http://localhost:8080/api/books/genres';

// 좋아요 랭킹 (장르 선택 가능)
export const fetchRanking = async (genre = '', topN = 10) => {
    const params = new URLSearchParams({ genre, topN });
    const res = await fetch(`${RANKING_URL}?${params}`);
    if (!res.ok) throw new Error("랭킹을 불러오지 못했습니다.");
    return res.json();
};

// 장르 목록
export const fetchGenres = async () => {
    const res = await fetch(GENRES_URL);
    if (!res.ok) throw new Error("장르 목록을 불러오지 못했습니다.");
    return res.json();
};
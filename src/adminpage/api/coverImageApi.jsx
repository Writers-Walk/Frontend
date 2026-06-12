const BASE_URL = 'http://localhost:8080/api/books';

// 표지 이미지 삭제
export async function deleteCoverImage(bookId) {
  const res = await fetch(`${BASE_URL}/${bookId}/image`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('표지 이미지 삭제 실패');
}

// 표지 재생성 = 생성 재호출과 동일
export async function regenerateCover(bookId, { userPrompt, imageModel, resolution, quality }) {
  const res = await fetch(`${BASE_URL}/${bookId}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userPrompt, imageModel, resolution, quality }),
  });
  if (!res.ok) throw new Error('표지 재생성 실패');
  return res.json(); // { coverImageUrl, ... }
}
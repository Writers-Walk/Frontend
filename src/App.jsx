import { useState } from "react";
import BookDetail from "./pages/BookDetail";

const MainPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  // 도서 카드 클릭 시
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  // 상세 페이지가 열린 상태면 BookDetail 렌더
  if (selectedBook) {
    return (
      <BookDetail
        book={selectedBook}
        onBack={() => setSelectedBook(null)}  // 목록 버튼 클릭 시 다시 메인으로
      />
    );
  }

  // 도서 목록 (메인 페이지 팀이 만든 카드들)
  return (
    <div>
      {books.map((book) => (
        <div key={book.id} onClick={() => handleBookClick(book)}>
          {book.title}
        </div>
      ))}
    </div>
  );
};
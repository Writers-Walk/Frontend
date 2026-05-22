import React, { useState } from "react";
import BookTable from "./BookTable";
import BookCard from "./bookCard";
import './mainpage.css'

const BOOKS = [
  {
    id: 1,
    title: "클린 코드",
    author: "로버트 C. 마틴",
    createdAt: "2024.01.15",
  },
  {
    id: 2,
    title: "데이터베이스 첫걸음",
    author: "미쿠리야 타카히로",
    createdAt: "2024.02.03",
  },
  {
    id: 3,
    title: "리팩터링 2판",
    author: "마틴 파울러",
    createdAt: "2024.02.20",
  },
  {
    id: 4,
    title: "자바스크립트 딥다이브",
    author: "이웅모",
    createdAt: "2024.03.08",
  },
  { id: 5, title: "사피엔스", author: "유발 하라리", createdAt: "2024.03.22" },
];

const MainPage = () => {
  const [books] = useState(BOOKS);
  const [loading] = useState(false);
  // const navigate = useNavigate();

  const handleRegister = () => {
    alert("도서 등록");
  };
  //d
  const handleClickBook = (book) => {
    alert(`${book.title} 상세 페이지로 이동`);
  };
  if (loading) return <p>불러오는 중...</p>;

  return (
    <div>
      <h1>📚 도서관 관리 시스템</h1>

      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>도서 목록 ({books.length}권)</span>
          <button onClick={handleRegister}>도서 등록</button>
        </div>

        {books.length === 0 ? (
          <p className="main-page__empty">등록된 도서가 없습니다.</p>
        ) : (
          <div className="main-page__card-list">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onClick={handleClickBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

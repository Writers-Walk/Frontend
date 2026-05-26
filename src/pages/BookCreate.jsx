import { useState } from "react";
import "./BookCreate.css";
import api from "../api/api";
import { createBook } from "./api/bookCreateApi";
import {useNavigate} from "react-router-dom";

function BookCreate() {
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    title: "", // 도서 제목
    author: "", // 저자
    publisher: "", // 출판사
    publishedYear: "", //발행년도
    seriesInfo: "", // 총서사항(몇권인지~ 시리즈 인지~)
    isbn: "", // ISBN
    genre: "", // 장르
    content: "", // 상세 설명
    coverImageUrl: "", // 표지 이미지
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoCoverCreate = () => {
    alert("표지 이미지 생성 페이지로 이동합니다.");
    // 나중에 라우터 연결되면 이동 코드 추가
    // navigate("/cover-create");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString();

    const newBook = {
      id: Date.now(),
      title: book.title,
      author: book.author,
      likes: 0,
      content: book.content,
      genre: book.genre,
      coverImageUrl: book.coverImageUrl,
      publisher: book.publisher,
      publishedYear: book.publishedYear,
      seriesInfo: book.seriesInfo,
      isbn: book.isbn,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await api.post("/books", newBook);
      alert("도서가 등록되었습니다!");
      
      console.log(newBook);
      // 나중에 라우터 연결되면 이동 코드 추가
      // navigate("/");
    } catch (error) {
      console.error(error);
      alert("도서 등록에 실패했습니다.");
    }
  };

  return (
    <div className="book-create-page">
      <form onSubmit={handleSubmit}>
        <div className="book-info-box">
          <div className="cover-section">
            <div className="cover-placeholder">
              표지 이미지 영역
            </div>

            <button
              type="button"
              className="cover-create-button"
              onClick={handleGoCoverCreate}
            >
              표지 이미지 생성
            </button>
          </div>

          <div className="info-section">
            <input
              type="text"
              name="title"
              placeholder="도서 제목 입력"
              value={book.title}
              onChange={handleChange}
              className="title-input"
            />

            <div className="info-row">
              <label>저자</label>
              <input
                type="text"
                name="author"
                placeholder="저자 입력"
                value={book.author}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label>발행사항</label>
              <input
                type="text"
                name="publisher"
                placeholder="출판사 입력"
                value={book.publisher}
                onChange={handleChange}
              />
              <input
                type="text"
                name="publishedYear"
                placeholder="발행년도"
                value={book.publishedYear}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label>총서사항</label>
              <input
                type="text"
                name="seriesInfo"
                placeholder="총서사항 입력"
                value={book.seriesInfo}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                placeholder="ISBN 입력"
                value={book.isbn}
                onChange={handleChange}
              />
            </div>

            <div className="info-row">
              <label>분류/장르</label>
              <input
                type="text"
                name="genre"
                placeholder="장르 입력"
                value={book.genre}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>상세정보</h2>

          <textarea
            name="content"
            placeholder="도서 상세 내용을 입력하세요"
            value={book.content}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-button">
          저장하기
        </button>
      </form>
    </div>
  );
}

export default BookCreate;





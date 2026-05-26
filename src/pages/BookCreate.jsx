import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookCreate.css";
import api from "../api/api";

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
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !book.title.trim() ||
      !book.author.trim() ||
      !book.publisher.trim() ||
      !book.content.trim()
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const now = new Date().toISOString();

    const newBook = {
      title: book.title,
      author: book.author,
      likes: 0,
      content: book.content,
      genre: book.genre,
      coverImageUrl: "",
      publisher: book.publisher,
      publicationDt: book.publicationDt,
      seriesInfo: book.seriesInfo,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await api.post("/books", newBook);
      alert("도서가 등록되었습니다!");

      console.log(newBook);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("도서 등록에 실패했습니다.");
    }
  };

  return (
    <div className="book-create-page">
      <form onSubmit={handleSubmit}>
        <h2>상세 정보</h2>
        <div className="book-info-box">
          <div className="cover-section">
            <div className="cover-placeholder"></div>

            <div className="info-section">
              <div className="info-row">
                <label>도서 제목</label>

                <input  
                  type="text"
                  name="title"
                  placeholder="도서 제목 입력"
                  value={book.title}
                  onChange={handleChange}
                  className="title-input"
                />
              </div>

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
                  name="publicationDt"
                  placeholder="발행년도"
                  value={book.publicationDt}
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
        </div>

        <div className="detail-section">
          <h2>도서 내용</h2>

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





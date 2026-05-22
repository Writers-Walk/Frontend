import { useState } from "react";

function BookCreate() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedYear: "",
    seriesInfo: "",
    isbn: "",
    genre: "",
    library: "",
    content: "",
    coverImageUrl: "",
  });

  const [preview, setPreview] = useState("");

  // 입력값 변경
  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  // 이미지 업로드
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 임시 이미지 주소 생성
    const imageUrl = URL.createObjectURL(file);

    setBook({
      ...book,
      coverImageUrl: imageUrl,
    });

    // 미리보기 저장
    setPreview(imageUrl);
  };

  // 저장
  const handleSubmit = (e) => {
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
      library: book.library,
      createdAt: now,
      updatedAt: now,
    };

    console.log("등록된 도서:", newBook);

    alert("도서가 등록되었습니다!");
  };

  return (
    <div className="book-create-page">
      <form onSubmit={handleSubmit}>
        {/* 상단 도서 정보 */}
        <div className="book-info-box">
          {/* 이미지 영역 */}
          <div className="cover-section">
            {preview ? (
              <img
                src={preview}
                alt="도서 표지"
                className="cover-image"
              />
            ) : (
              <label className="image-upload-box">
                표지 이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* 도서 정보 입력 */}
          <div className="info-section">
            {/* 제목 */}
            <input
              type="text"
              name="title"
              placeholder="도서 제목 입력"
              value={book.title}
              onChange={handleChange}
              className="title-input"
            />

            {/* 저자 */}
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

            {/* 출판사 + 발행년도 */}
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

            {/* 총서사항 */}
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

            {/* ISBN */}
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

            {/* 장르 */}
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

            {/* 도서관 */}
            <div className="info-row">
              <label>도서관</label>

              <input
                type="text"
                name="library"
                placeholder="도서관 입력"
                value={book.library}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* 상세정보 */}
        <div className="detail-section">
          <h2>상세정보</h2>

          <textarea
            name="content"
            placeholder="도서 상세 내용을 입력하세요"
            value={book.content}
            onChange={handleChange}
          />
        </div>

        {/* 저장 버튼 */}
        <button type="submit" className="save-button">
          저장하기
        </button>
      </form>
    </div>
  );
}

export default BookCreate;
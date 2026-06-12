import "../../bookcreatepage/css/BookCreate.css";
import useBookCreate from "../../bookcreatepage/hooks/useBookCreate";

const BookCreateForm = () => {
  const { book, handleChange, handleSubmit } = useBookCreate();

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
                  maxLength={30}
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
                  maxLength={30}
                />
              </div>

              <div className="info-row publish-row">
                <label>발행사항</label>
                <input
                  type="text"
                  name="publisher"
                  placeholder="출판사 입력"
                  value={book.publisher}
                  onChange={handleChange}
                  maxLength={30}
                />
                <input
                  type="text"
                  name="publishedDt"
                  placeholder="발행년도"
                  value={book.publishedDt}
                  onChange={handleChange}
                  maxLength={30}
                  className="year-input"
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
                  maxLength={10}
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
                  maxLength={10}
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
            maxLength={3000}
          />
          <div className="text-count">
            {book.content.length} / 3000
          </div>
        </div>

        <button type="submit" className="save-button">
          저장하기
        </button>
      </form>
    </div>
  );
};

export default BookCreateForm;

import BookCover from "../components/BookCover";
import BookInfo from "../components/BookInfo";

const BookDetail = ({ book, onBack }) => {
  return (
    <div className="detail-wrap">

      {/* a. 목록 버튼 */}
      <div className="back-bar">
        <button className="back-btn" onClick={onBack}>
          ← 목록으로
        </button>
      </div>

      {/* 상세 카드 */}
      <div className="detail-card">
        <div className="detail-header">

          {/* b. 표지 이미지 + c. AI 표지 생성 버튼 */}
          <BookCover
            initialUrl={book.coverImageUrl}
            book={book}
          />

          {/* b. 제목 / 작성자 / 등록일·수정일 / 내용 */}
          <BookInfo book={book} />

        </div>
      </div>
    </div>
  );
};

export default BookDetail;

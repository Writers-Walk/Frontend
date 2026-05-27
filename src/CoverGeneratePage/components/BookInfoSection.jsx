function BookInfoSection({ book }) {
    return (
        <section className="book-info">
            <h2>도서 정보</h2>
            <p><strong>제목:</strong> {book.title}</p>
            <p><strong>저자:</strong> {book.author}</p>
            <p><strong>장르:</strong> {book.genre}</p>
            <div className="book-content">
                {book.content || "도서 내용이 없습니다."}
            </div>
        </section>
    );
}

export default BookInfoSection;
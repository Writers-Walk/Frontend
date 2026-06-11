import React, { useState, useEffect } from 'react';
import RegisterButton from '../components/RegisterButton';
import BookCard from "../components/bookCard";
import useBooks from '../api/bookListApi';
import LikeRank from '../components/Likerank';
import '../css/MainPage.css';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

  const navigate = useNavigate();

  //검색, 정렬 usestate
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [page, setPage] = useState(0);


  //검색 정렬기능 백엔드로 이관

  // 디바운스된 값 (실제 API에 넘길 값)
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  useEffect(() => {
      const timer = setTimeout(() => {
          setDebouncedKeyword(searchQuery.trim());   // 0.3초 후 반영
      }, 300);
      return () => clearTimeout(timer);              // 입력 또 들어오면 이전 타이머 취소
  }, [searchQuery]);

  useEffect(() => {
      setPage(0);
  }, [debouncedKeyword, sortOrder]);

  const {books, totalPages, loading, error} = useBooks(sortOrder, debouncedKeyword, page);

  const handleClickBook = (book) => {
    navigate(`/book/${book.id}`);
  };

    return (
        <div className="main-page">
            <div className="main-toolbar">
                <span className="book-count">
                    도서 목록 <span>({books.length}권)</span>
                </span>
                <div className='toolbar-right'>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="제목 또는 저자 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="latest">최신순</option>
                    <option value="title">제목순</option>
                  </select>
                  <RegisterButton />
                </div>
            </div>

            {loading ? (
              <p className="main-page__empty">불러오는 중...</p>
            ) : error ? (
              <p className="main-page__empty">{error}</p>
            ) : books.length === 0 ? (
              debouncedKeyword ? (
                <p className="main-page__empty">검색 결과가 없습니다.</p>
              ) : (
                <p className="main-page__empty">등록된 도서가 없습니다.</p>
              )
            ) : (
              <div className="main-page__card-list">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} onClick={handleClickBook} onWishClick={(e) => handleMainWish(book.id, e)} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                  <button
                      className="pagination__btn"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 0}
                  >
                      ◀
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                      <button
                          key={i}
                          className={`pagination__btn ${page === i ? 'pagination__btn--active' : ''}`}
                          onClick={() => setPage(i)}
                      >
                          {i + 1}
                      </button>
                  ))}

                  <button
                      className="pagination__btn"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages - 1}
                  >
                      ▶
                  </button>
              </div>
            )}

            <LikeRank topN={10} onClickBook={handleClickBook} /> 
        </div>
    );
};

export default MainPage;
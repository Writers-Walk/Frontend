<<<<<<< HEAD
import React from 'react';
import RegisterButton from './RegisterButton';
import BookCard from "./bookCard";
import loadBooks from '../api/mainapi'
=======
import React, { useState } from 'react';
import RegisterButton from './RegisterButton';
import BookCard from "./bookCard";
import useBooks from '../api/mainapi';
import LikeRank from './Likerank';
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
import '../css/MainPage.css';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

<<<<<<< HEAD
  const {books, loading, error} = loadBooks();
  const navigate = useNavigate();

  
  const handleClickBook = (book) => {
    alert(`${book.title} 상세 페이지로 이동`);

=======
  const {books, loading, error} = useBooks();
  const navigate = useNavigate();

  //검색, 정렬 usestate
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  //검색 정렬기능 추가
  const filteredBooks = books
    .filter(book =>
      book.title.includes(searchQuery) || book.author.includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return a.title.localeCompare(b.title, 'ko');
    });

  
  const handleClickBook = (book) => {
    navigate(`/book/${book.id}`);
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
  };

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;

    return (
        <div className="main-page">
            <div className="main-toolbar">
                <span className="book-count">
<<<<<<< HEAD
                    도서 목록 <span>({books.length}권)</span>
                </span>
                <RegisterButton />
            </div>
            {books.length === 0 ? (
          <p className="main-page__empty">등록된 도서가 없습니다.</p>
        ) : (
          <div className="main-page__card-list">
            {books.map((book) => (
=======
                    도서 목록 <span>({filteredBooks.length}권)</span>
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
            {filteredBooks.length === 0 ? (
              searchQuery ? (
                <p className="main-page__empty">검색 결과가 없습니다.</p>
              ) : (
                <p className="main-page__empty">등록된 도서가 없습니다.</p>
              )
            ) : (
              <div className="main-page__card-list">
            {filteredBooks.map((book) => (
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
              <BookCard key={book.id} book={book} onClick={handleClickBook} />
            ))}
          </div>
        )}
<<<<<<< HEAD
        </div>
    );
};

export default MainPage;

=======
        <LikeRank books={books} topN={10} onClickBook={handleClickBook} />
        </div>
        
    );
};

export default MainPage;
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892

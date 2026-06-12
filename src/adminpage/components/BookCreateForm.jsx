import React, { useState } from 'react';
import "../../bookcreatepage/css/BookCreate.css";
import useBookCreate from "../../bookcreatepage/hooks/useBookCreate"; 

// const BookCreateForm = () => {
//   const [book, setbook] = useState({
//     title: '',
//     author: '',
//     publisher: '',
//     publishedDt: '',
//     seriesInfo: '',
//     // isbn: '',
//     genre: '',
//     content: '',
//   });

//   const handleChange = (e) => {
//     setbook({ ...book, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createBook(book);
//       alert('도서가 등록되었습니다!');
//       setbook({
//         title: '', author: '', publisher: '', publishedDt: '',
//         seriesInfo: '', // isbn: '', 
//         genre: '', content: '',
//       });
//     } catch (err) {
//       alert('등록 실패: ' + err.message);
//     }
//   };

function BookCreateForm() {

const { book, handleChange, handleSubmit } = useBookCreate();
  return (
    <form onSubmit={handleSubmit} className="book-create-form">
      <input name="title" placeholder="제목" value={book.title} onChange={handleChange} required />
      <input name="author" placeholder="저자" value={book.author} onChange={handleChange} required />
      <input name="publisher" placeholder="출판사" value={book.publisher} onChange={handleChange} required />
      <input name="publishedDt" placeholder="발행년도 (예: 2024)" value={book.publishedDt} onChange={handleChange} />
      <input name="seriesInfo" placeholder="총서사항" value={book.seriesInfo} onChange={handleChange} />
      {/* <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} /> */}
      <input name="genre" placeholder="장르" value={book.genre} onChange={handleChange} />
      <textarea name="content" placeholder="도서 내용" value={book.content} onChange={handleChange} />
      <button type="submit">등록하기</button>
    </form>
  );
};

export default BookCreateForm;
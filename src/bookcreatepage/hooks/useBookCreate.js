import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../api/bookCreateApi";

function useBookCreate() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "", //제목 
    author: "", //저자
    publisher: "", // 발행사항
    publicationDt: "", // 있고
    seriesInfo: "", // 총서사항
    isbn: "", //엇ㅂㅇ
    genre: "", //
    content: "",
  });

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      isbn: book.isbn,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await createBook(newBook);
      alert("도서가 등록되었습니다!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("도서 등록에 실패했습니다.");
    }
  };

  return { book, handleChange, handleSubmit };
}

export default useBookCreate;

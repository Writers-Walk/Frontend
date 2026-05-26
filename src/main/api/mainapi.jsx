import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/books';

<<<<<<< HEAD
const loadBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
=======
const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // 도서 목록 db.json에서 불러오기
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
    useEffect(()=>{
        const fetchBooks = async () => {
            try{
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("도서 목록을 불러오지 못했습니다.");
            const data = await res.json();
            setBooks(data);
            }catch(err){
            setError(err.message);
            }finally{
            setLoading(false);
            }
        };
        fetchBooks();
    },[]);

    return {books, loading, error};
}

<<<<<<< HEAD
export default loadBooks;
=======
export default useBooks;
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892

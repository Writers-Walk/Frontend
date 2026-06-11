import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/books/getall';

const useBooks = (sortOrder = 'latest', keyword = '', page = 0) => {
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const sortBy = sortOrder === 'latest' ? 'updatedAt' : 'title';
                const direction = sortOrder === 'latest' ? 'desc' : 'asc';

                const params = new URLSearchParams({
                    keyword,
                    sortBy,
                    direction,
                    page,
                    size: 10,
                });
                const res = await fetch(`${API_URL}?${params}`);
                if (!res.ok) throw new Error("도서 목록을 불러오지 못했습니다.");
                const data = await res.json();
                setBooks(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [sortOrder, keyword, page]);

    return { books, totalPages, loading, error };
};

export default useBooks;
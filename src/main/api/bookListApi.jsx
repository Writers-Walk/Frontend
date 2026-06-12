import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/books/getall';

const ROWS = 2;

const getColumns = () => {
    const width = window.innerWidth;
    if (width >= 1600) return 8;
    if (width >= 1300) return 7;
    if (width >= 1000) return 5;
    if (width >= 700) return 3;
    return 2;
};

const useBooks = (sortOrder = 'latest', keyword = '', page = 0) => {
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState(getColumns());

    useEffect(() => {
        const handleResize = () => {
            const newColumns = getColumns();
            setColumns(prev => (prev !== newColumns ? newColumns : prev));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const sortBy = sortOrder === 'latest' ? 'updatedAt' : 'title';
                const direction = sortOrder === 'latest' ? 'desc' : 'asc';
                const size = columns * ROWS;

                const params = new URLSearchParams({ keyword, sortBy, direction, page, size });
                const res = await fetch(`${API_URL}?${params}`, { credentials: 'include' });
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
    }, [sortOrder, keyword, page, columns]);

    return { books, totalPages, loading, error };
};

export default useBooks;
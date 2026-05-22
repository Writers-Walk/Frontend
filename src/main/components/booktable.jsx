import React from 'react';
 
const BookTable = ({ books }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>#</th>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>도서명</th>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>저자</th>
          <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>등록일</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.id}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.title}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.author}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.registeredAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default BookTable;
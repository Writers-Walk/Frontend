import React, { useState } from 'react';
import RegisterButton from './RegisterButton';
import '../css/MainPage.css';

const BOOKS = [
    { id: 1, title: '클린 코드', author: '로버트 C. 마틴', createdAt: '2024.01.15' },
    { id: 2, title: '데이터베이스 첫걸음', author: '미쿠리야 타카히로', createdAt: '2024.02.03' },
    { id: 3, title: '리팩터링 2판', author: '마틴 파울러', createdAt: '2024.02.20' },
    { id: 4, title: '자바스크립트 딥다이브', author: '이웅모', createdAt: '2024.03.08' },
    { id: 5, title: '사피엔스', author: '유발 하라리', createdAt: '2024.03.22' },
];

const MainPage = () => {
    const [books] = useState(BOOKS);

    return (
        <div className="main-page">
            <div className="main-toolbar">
                <span className="book-count">
                    도서 목록 <span>({books.length}권)</span>
                </span>
                <RegisterButton />
            </div>
            <div>
                여기에 카드           
            </div>
        </div>
    );
};

export default MainPage;
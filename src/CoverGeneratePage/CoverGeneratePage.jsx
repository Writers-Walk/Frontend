import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate: 페이지 이동을 위한 훅, useParams: URL 파라미터를 가져오기 위한 훅
// import './CoverGeneratePage.css';

function CoverGeneratePage() {
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const [book, setBook] = useState(null); // 책 정보를 저장할 상태
    const [imageModel, setImageModel] = useState(''); // 이미지 모델을 저장할 상태
    const [generatedImage, setGeneratedImage] = useState(''); // 생성된 이미지를 저장할 상태
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 1. 도서 정보 불러오기
    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`http://localhost:3000/books/${id}`);   // 책 정보를 가져오기

                if(!res.ok){
                    throw new Error('책 정보를 불러오지 못했습니다.');
                }

                const data = await res.json();
                setBook(data); // 책 정보를 상태에 저장

                // 도서 정보 기반 기본 프롬프트 생성
                const defaultPrompt = `
                    책 제목: ${data.title}
                    책 장르: ${data.genre || "미정"}
                    책 내용: ${data.content || "내용 없음"}

                    위 내용을 바탕으로 책 표지 이미지를 생성하세요.
                    표지에는 책의 제목과 장르, 내용이 잘 어울려야 합니다.
                    독자가 클릭하고 싶을 만큼 시각적으로 매력적이게 생성하세요.
                `.trim();

                setPropmt(defaultPrompt); // 기본 프롬프트 설정
            } catch (error) {
                console.error(error);
                setError("도서 정보를 불러오지 못했습니다.");
            }
        }

        fetchBook();
    }, [id])


    // 2. 더미 이미지 생성
    const handleGenerateImage = async () => {
        setLoading(true); // 로딩 상태 시작
        setError("");     // 에러 초기화

        try{
            // 실제 API 연결 전 테스트용 더미 이미지
            setTimeout(() => {
                setGeneratedImage("https://placehold.co/300x400?text=AI+Book+Cover");
                setLoading(false); // 로딩 상태 종료
            }, 2000);
        } catch(error) {
            console.error(error);
            setError("이미지 생성에 실패했습니다.");
            setLoading(false); // 로딩 상태 종료
        }
    };


    // 3. 표지 이미지 저장
    


    // 4. 화면 구성
    return (
        <div className="cover-page">
            <h1>도서 표지 이미지 생성</h1>

            <div className="cover-content">
                <section className="book-info">
                    <h2>도서 정보</h2>

                    <p>
                        <strong>제목:</strong> {book.title}
                    </p>
                    <p>
                        
                    </p>
                </section>
            </div>
        </div>
    );
}

export default CoverGeneratePage;
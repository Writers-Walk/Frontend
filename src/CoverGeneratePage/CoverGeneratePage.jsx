import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate: 페이지 이동을 위한 훅, useParams: URL 파라미터를 가져오기 위한 훅
//import './CoverGeneratePage.css';

function CoverGeneratePage() {
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const [book, setBook] = useState(null); // 책 정보를 저장

    const [apiKey, setApiKey] = useState(''); // 표지 생성 API 호출
    const [imageModel, setImageModel] = useState('gpt-image-2'); // 생성 모델 선택
    const [resolution, setResolution] = useState('1024x1024'); // 해상도 선택
    const [quality, setQuality] = useState('medium'); // 품질 선택

    const [prompt, setPrompt] = useState(''); // 이미지 생성 프롬프트
    const [generatedImage, setGeneratedImage] = useState(''); // 생성 이미지 결과 미리보기

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
    const handleSaveCover = async() => {

    };


    

    // 4. 화면 구성
    if (!book){
        return <p>도서 정보를 불러오는 중...</p>
    }
    
    return (
        <div className="cover-page">
            <h1>도서 표지 이미지 생성</h1>

            <div className="cover-layout">
                <section className="book-info">
                    <h2>도서 정보</h2>

                    <p>
                        <strong>제목:</strong> {book.title}
                    </p>
                    <p>
                        <strong>저자:</strong> {book.author}
                    </p>
                    <p>
                        <strong>장르:</strong> {book.genre}
                    </p>

                    <div className='book-content'>
                        {book.content}
                    </div>
                </section>

                <section className='option-box'>
                    <h2>이미지 생성 옵션</h2>

                    <div className='form-group'>
                        <label>OpenAI API Key</label>
                        <input 
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder='API Key를 입력하세요'
                        />
                    </div>

                    <div className='form-group'>
                        <label>생성 모델</label>
                        <select
                            value={imageModel}
                            onChange={(e) => setImageModel(e.target.value)}
                        >
                            <option value="GPT Image 2">GPT Image 2</option>
                        </select>   
                    </div>

                    <div className='form-group'>
                        <label>해상도</label>
                        <select
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                        >
                            <option value="1024x1024">1024 x 1024</option>
                            <option value="1024x1536">1024 x 1536</option>
                            <option value="1536x1024">1536 x 1024</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>품질</label>
                        <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>요구사항</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows="8"
                        />
                    </div>

                    <button 
                        className="generate-button"
                        onClick={handleGenerateImage}
                        disabled={loading}
                    >
                        {loading ? "이미지 생성 중.." : "AI 표지 생성하기"}
                    </button>
                </section>
            </div>

            <section className='result-box'>
                <h2>생성 결과</h2>

                {generatedImage ? (
                    <div className='result-content'>
                        <img 
                            src={generatedImage}
                            alt="생성된 도서 표지"
                            className='cover-preview'
                        />

                        <div className='button-group'>
                            <button onClick={handleGenerateImage}>다시 생성</button>
                            <button onClick={handleSaveCover}>표지 저장</button>
                        </div>
                    </div>
                ) : (
                    <p>아직 생성된 표지 이미지가 없습니다.</p>
                )}
            </section>

            <button
                className='back-button'
                onClick={() => navigate(`/books/${id}`)}
            >
                상세 페이지로 돌아가기
            </button>
        </div>
    );
}

export default CoverGeneratePage;
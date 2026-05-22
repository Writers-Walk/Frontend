import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate: 페이지 이동을 위한 훅, useParams: URL 파라미터를 가져오기 위한 훅
//import './CoverGeneratePage.css';

function CoverGeneratePage() {
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const [book, setBook] = useState(null); // 책 정보를 저장

    //const [apiKey, setApiKey] = useState(''); // 표지 생성 API 호출 (더미 버전에선 필수 해제)
    const [imageModel, setImageModel] = useState('gpt-image-2'); // 생성 모델 선택
    const [resolution, setResolution] = useState('1024x1024'); // 해상도 선택
    const [quality, setQuality] = useState('medium'); // 품질 선택

    const [prompt, setPrompt] = useState(''); // 이미지 생성 프롬프트
    const [generatedImage, setGeneratedImage] = useState(''); // 생성 이미지 결과 미리보기

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [apiKey, setApiKey] = useState(() => {
    // 🛠️ 컴포넌트가 처음 켜질 때 브라우저에 저장된 키가 있다면 자동으로 가져옵니다.
    return localStorage.getItem('openai_api_key') || '';
});

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
                    책 저자: ${data.author || "미정"}
                    책 장르: ${data.genre || "미정"}
                    책 내용: ${data.content || "내용 없음"}

                    위 내용을 바탕으로 책 표지 이미지를 생성하세요.
                    표지에는 책의 제목과 장르, 내용이 잘 어울려야 합니다.
                    독자가 클릭하고 싶을 만큼 시각적으로 매력적이게 생성하세요.
                `.trim();

                setPrompt(defaultPrompt); // 🛠️ 오타 수정: setPropmt -> setPrompt
            } catch (error) {
                console.error(error);
                setError("도서 정보를 불러오지 못했습니다.");
            }
        }

        fetchBook();
    }, [id])


    // 2. [테스트 전용] 2초 대기 후 옵션이 반영된 더미 이미지 주입 시뮬레이터
    /*const handleGenerateImage = async () => {
        setLoading(true); // 로딩 상태 시작
        setError("");     // 에러 초기화

        try {
            // 실제 네트워크 지연을 체감할 수 있도록 2초(2000ms) 후에 실행
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            // 사용자가 선택한 해상도(resolution)가 텍스트로 박히는 플레이스홀더 더미 이미지 주소 생성
            const dummyUrl = `https://placehold.co/300x400/31343c/ffffff?text=AI+Cover+(${resolution})`;
            
            setGeneratedImage(dummyUrl); // 가짜 생성 이미지 상태에 주입!
        } catch(error) {
            console.error(error);
            setError("이미지 생성에 실패했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 확실하게 종료
        }
    };*/

const handleSaveApiKey = () => {
        if (!apiKey.trim()) {
            alert("API Key를 입력한 후 저장해 주세요.");
            return;
        }
        localStorage.setItem('openai_api_key', apiKey.trim());
        alert("🔒 API Key가 브라우저에 안전하게 저장되었습니다! (이후 자동 입력)");
    };

    // 2-2. API Key 브라우저 삭제 핸들러
    const handleClearApiKey = () => {
        localStorage.removeItem('openai_api_key');
        setApiKey('');
        alert("🗑️ 저장된 API Key가 삭제되었습니다.");
    };

    // 2-3. [진짜 인공지능 호출] OpenAI DALL-E 3 연동 함수
    const handleGenerateImage = async () => {
        if (!apiKey.trim()) {
            alert("OpenAI API Key를 입력하거나 저장된 키를 확인해 주세요!");
            return;
        }

        setLoading(true); // 로딩 스피너 시작
        setError("");     // 에러 초기화

        try {
            // 실제 OpenAI 이미지 생성 엔드포인트 호출
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey.trim()}` // 입력창 혹은 localStorage에서 가져온 키
                },
                body: JSON.stringify({
                    model: "gpt-image-2", // DALL-E 3 고정
                    prompt: prompt,    // 사용자가 수정한 프롬프트 본문
                    n: 1,
                    // 해상도 안전 우회 처리
                    size: (resolution === "1024x1536" || resolution === "1536x1024") ? "1024x1024" : resolution,
                    // 품질 옵션 매핑 (standard 또는 hd)
                    quality: (quality === "high") ? "hd" : "medium",
                    //response_format: "b64_json" // 이미지 데이터를 Base64 문자열로 수신
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || "OpenAI API 호출 중 오류가 발생했습니다.");
            }

            const resData = await response.json();
            
            // 받아온 b64_json을 브라우저가 그릴 수 있는 Data URL 포맷으로 파싱
            const base64Str = resData.data[0].b64_json;
            const dataUrl = `data:image/png;base64,${base64Str}`;
            
            setGeneratedImage(dataUrl); // 미리보기 영역에 이미지 주입!
        } catch(error) {
            console.error(error);
            setError(error.message || "이미지 생성에 실패했습니다.");
            alert(error.message || "이미지 생성에 실패했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };


    // 3. [구현 완료] 더미 표지 이미지 URL을 db.json 서버에 반영하기
    const handleSaveCover = async () => {
        if (!generatedImage) {
            alert("저장할 표지 이미지가 없습니다. 먼저 이미지를 생성해 주세요.");
            return;
        }

        setLoading(true);

        try {
            // PATCH 메서드로 해당 id 도서의 coverImage 필드만 가짜 이미지 주소로 교체 업데이트
            const res = await fetch(`http://localhost:3000/books/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    coverImage: generatedImage // 가짜 이미지 주소 스트링이 db.json에 박힘
                }),
            });

            if (!res.ok) {
                throw new Error("서버에 이미지를 저장하지 못했습니다.");
            }

            alert("🎉 [테스트 성공] 더미 표지 이미지가 db.json에 정상 기록되었습니다!");
            navigate(`/books/${id}`); // 저장 완료 후 원본 상세 페이지로 복귀
        } catch (error) {
            console.error(error);
            alert("이미지 저장 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

//     //OpenAI API 받아오기
//     const handleSaveApiKey = () => {
//         if (!apiKey.trim()) {
//             alert("API Key를 입력한 후 저장해 주세요.");
//             return;
//         }
//         localStorage.setItem('openai_api_key', apiKey.trim());
//         alert("🔒 API Key가 브라우저에 안전하게 저장되었습니다! (이후 자동 입력)");
// };

// // Key 삭제(초기화) 핸들러 함수 추가
//     const handleClearApiKey = () => {
//         localStorage.removeItem('openai_api_key');
//         setApiKey('');
//         alert("🗑️ 저장된 API Key가 삭제되었습니다.");
//     };

    // 4. 화면 구성
    if (!book){
        return <p>도서 정보를 불러오는 중...</p>
    }
    
    return (
        <div className="cover-page">
            <h1>도서 표지 이미지 생성 (테스트 더미 모드)</h1>

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
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input 
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder='sk-... API Key를 입력하세요'
                                style={{ flex: 1 }}
                            />
                            <button type="button" onClick={handleSaveApiKey} style={{ padding: '4px 12px', whiteSpace: 'nowrap' }}>저장</button>
                            {localStorage.getItem('openai_api_key') && (
                                <button type="button" onClick={handleClearApiKey} style={{ padding: '4px 12px', background: '#dc3545', color: '#fff' }}>삭제</button>
                            )}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>생성 모델</label>
                        <select
                            value={imageModel}
                            onChange={(e) => setImageModel(e.target.value)}
                        >
                            <option value="gpt-image-2">GPT Image 2 (Dummy)</option>
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
                        {loading ? "가짜 이미지 빌드 중(2초)..." : "AI 표지 생성하기 (더미)"}
                    </button>
                </section>
            </div>

            <section className='result-box'>
                <h2>생성 결과</h2>

                {generatedImage ? (
                    <div className='result-content'>
                        <img 
                            src={generatedImage}
                            alt="생성된 도서 표지 미리보기"
                            className='cover-preview'
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                        />

                        <div className='button-group' style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <button onClick={handleGenerateImage} disabled={loading}>다시 생성</button>
                            <button onClick={handleSaveCover} disabled={loading}>표지 저장 테스트</button>
                        </div>
                    </div>
                ) : (
                    <p>아직 생성된 표지 이미지가 없습니다.</p>
                )}
            </section>

            <button
                className='back-button'
                onClick={() => navigate(`/books/${id}`)}
                style={{ marginTop: '20px' }}
            >
                상세 페이지로 돌아가기
            </button>
        </div>
    );
}

export default CoverGeneratePage;
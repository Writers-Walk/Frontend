import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate: 페이지 이동을 위한 훅, useParams: URL 파라미터를 가져오기 위한 훅

import getBookDetail from "./api/getBookDetail";
import generateBookCover from "./api/generateBookCover";
import saveCoverImage from "./api/saveCoverImage";
import compressImage from "./api/compressImage";

import './CoverGeneratePage.css';

function CoverGeneratePage() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    const [imageModel, setImageModel] = useState('gpt-image-2'); 
    const [resolution, setResolution] = useState('1024x1024');
    const [quality, setQuality] = useState('medium');

    const [userPrompt, setUserPrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const DEFAULT_API_KEY = import.meta.env.VITE_API_KEY;

    const [apiKey, setApiKey] = useState(() => {
        return localStorage.getItem("openai_api_key") || "";
    });


    // 1. 도서 정보 불러오기
    useEffect(() => {
        async function fetchBook() {
            try {
                const data = await getBookDetail(id);
                
                setBook(data);
                
                // db.json에 기존 이미지가 있다면 화면에 표시
                if(data.coverImageUrl){
                    setGeneratedImage(data.coverImageUrl);
                }
            } catch (error){
                console.error(error);
                setError("도서 정보를 불러오지 못했습니다.");
            }
        }

        fetchBook();
    }, [id])


    // 2. 프롬프트 생성
    function makePrompt() {
        if(!book){
            return "";
        }

        const defaultPrompt = `
            책 제목: ${book.title}
            저자: ${book.author || "미정"}
            장르: ${book.genre || "미정"}
            책 내용: ${book.content || "내용 없음"}

            위 도서 정보를 바탕으로 책 표지 이미지를 생성하세요.
            표지에는 책의 제목과 장르, 내용이 잘 어울려야 합니다.
            독자가 클릭하고 싶을 만큼 시각적으로 매력적이게 생성하세요.
        `.trim();

        if (userPrompt.trim()) {
            return `${defaultPrompt}\n\n사용자 추가 요구사항:\n${userPrompt.trim()}`;
        }

        return defaultPrompt;
    }


    // 3-1. API Key 브라우저 저장
    const handleSaveApiKey = () => {
        if (!apiKey.trim()) {
            alert("API Key를 입력한 후 저장해 주세요.");
            return;
        }

        localStorage.setItem('openai_api_key', apiKey.trim());
        alert("🔒 API Key가 브라우저에 안전하게 저장되었습니다! (이후 자동 입력)");
    };

    // 3-2. API Key 브라우저 삭제
    const handleClearApiKey = () => {
        localStorage.removeItem('openai_api_key');
        setApiKey('');
        alert("🗑️ 저장된 API Key가 삭제되었습니다.");
    };

    // 3-3. .env에서 기본 API Key 불러오기
    const handleLoadEnvKey = () =>{
        if (DEFAULT_API_KEY) {
            setApiKey(DEFAULT_API_KEY.trim());
        } else {
            alert('.env에서 VITE_API_KEY를 찾을 수 없습니다.');
        }
    };


    // 4. AI 표지 이미지 생성
    const handleGenerateImage = async () => {
        const selectedApiKey = apiKey.trim();

        if (!selectedApiKey) {
            alert("OpenAI API Key를 입력하거나 기본 Key 불러오기 버튼을 눌러주세요!");
            return;
        }

        setLoading(true); 
        setError("");     

        try {
            const finalPrompt = makePrompt();

            if(!finalPrompt.trim()){
                alert('프롬프트가 비어 있습니다. 도서 정보를 확인해주세요.');
                return;
            }

            const imageUrl = await generateBookCover({
                apiKey: selectedApiKey,
                prompt: finalPrompt,
                imageModel,
                resolution,
                quality,
            });

            setGeneratedImage(imageUrl); 
            alert("🎉 표지 이미지가 성공적으로 생성되었습니다!");
        } catch(error) {
            console.error(error);
            setError(error.message || "이미지 생성에 실패했습니다.");
            alert(error.message || "이미지 생성에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };


    // 5. 표지 이미지 및 옵션 정보 저장
    const handleSaveCover = async() => {
        if(!generatedImage){
            alert("먼저 표지 이미지를 생성해주세요.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const finalPrompt = makePrompt();

            if(!finalPrompt.trim()){
                alert('저장할 프롬프트가 비어 있습니다.');
                return;
            }

            // 저장용으로 이미지 압축
            const compressedImage = await compressImage(generatedImage, 500, 700, 0.85);

            await saveCoverImage(id, {
                coverImageUrl: compressedImage,
                coverPrompt: finalPrompt,
                imageModel,
                resolution,
                quality,
                updatedAt: new Date().toISOString().slice(0, 10),
            });
            

            alert("🎉 표지 이미지가 db.json에 정상 기록되었습니다!");
            navigate(`/book/${id}`); // 저장 완료 후 원본 상세 페이지로 복귀
        } catch (error) {
            console.error(error);
            setError(error.message || "이미지 저장 중 오류가 발생했습니다.");
            alert(error.message || "이미지 저장 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if(error){
        return <p className='error-message'>{error}</p>
    }

    if(!book){
        return <p>도서 정보를 불러오는 중...</p>
    }
    
    return (
        <div className="cover-page">
            <h1>{book.coverImageUrl 
                ? "도서 표지 이미지 수정 및 재생성" : "도서 표지 이미지 신규 생성"}
            </h1>

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
                        {book.content || "도서 내용이 없습니다."}
                    </div>
                </section>

                <section className='option-box'>
                    <h2>이미지 생성 옵션</h2>

                    <div className='form-group'>
                        <label>OpenAI API Key</label>
                        <div className='api-key-row'>
                            <input 
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder='sk-... API Key를 입력하거나 기본 키를 불러오세요'
                                className='api-key-input'
                            />
                            
                            <button type="button" 
                                onClick={handleLoadEnvKey} 
                                className='env-key-button'
                            >
                                기본 Key 불러오기
                            </button>

                            <button type="button" 
                                    onClick={handleSaveApiKey} 
                                    className='save-key-button'
                            >
                                저장
                            </button>
                            
                            <button type="button" 
                                    onClick={handleClearApiKey} 
                                    className='clear-key-button'
                            >
                                삭제
                            </button>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>생성 모델</label>
                        <select value={imageModel} 
                                onChange={(e) => setImageModel(e.target.value)}>
                            <option value="gpt-image-2">GPT Image 2</option>
                        </select>   
                    </div>

                    <div className='form-group'>
                        <label>해상도</label>
                        <select value={resolution} 
                                onChange={(e) => setResolution(e.target.value)}>
                            <option value="1024x1024">1024 x 1024</option>
                            <option value="1024x1536">1024 x 1536</option>
                            <option value="1536x1024">1536 x 1024</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>품질</label>
                        <select value={quality} 
                                onChange={(e) => setQuality(e.target.value)}>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>요구사항</label>
                        <textarea 
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder="원하는 표지 스타일을 입력하세요."
                            rows="10"
                        />
                    </div>

                    <button 
                        className="generate-button"
                        onClick={handleGenerateImage}
                        disabled={loading}
                    >
                        {loading ? "이미지 생성 중..." : "AI 표지 생성하기"}
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
                        />
                        <div className='button-group'>
                            <button onClick={handleGenerateImage} 
                                    disabled={loading} 
                                    className='regenerate-button'        
                            >다시 생성</button>
                            <button onClick={handleSaveCover} 
                                    disabled={loading}
                                    className='save-cover-button'
                            >표지 저장</button>
                        </div>
                    </div>
                ) : (
                    <p>아직 생성된 표지 이미지가 없습니다.</p>
                )}
            </section>

            <button
                className='back-button'
                onClick={() => navigate(`/book/${id}`)}
            >
                상세 페이지로 돌아가기
            </button>
        </div>
    );
}

export default CoverGeneratePage;
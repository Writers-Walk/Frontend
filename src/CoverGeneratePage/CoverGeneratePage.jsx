import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import getBookDetail from './api/getBookDetail';
import generateBookCover from './api/generateBookCover';
import saveCoverImage from './api/saveCoverImage';
import compressImage from './api/compressImage';

import './CoverGeneratePage.css';

function CoverGeneratePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    // 이미지 생성 옵션 상태들
    const [imageModel, setImageModel] = useState('gpt-image-2'); 
    const [resolution, setResolution] = useState('1024x1024'); 
    const [quality, setQuality] = useState('medium'); 

    // 🌟 프롬프트 관련 상태 일원화 및 동기화
    const [userPrompt, setUserPrompt] = useState(''); 
    const [generatedImage, setGeneratedImage] = useState(''); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 🔒 브라우저 LocalStorage에서 API 키 로드
    // const [apiKey, setApiKey] = useState(() => {
    //     return localStorage.getItem('openai_api_key') || '';
    // });
    const [apiKey, setApiKey] = useState('');

    // 1. 도서 정보 불러오기
    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`http://localhost:3000/books/${id}`);

                if(!res.ok){
                    throw new Error('책 정보를 불러오지 못했습니다.');
                }

                const data = await res.json();
                setBook(data); 

                //db.json에 기존 이미지 있다면 이미지 화면에 띄우기
                if(data.coverImageUrl){
                    setGeneratedImage(data.coverImageUrl);
                }

                // 도서 정보 기반 기본 프롬프트 텍스트 생성 (함수가 아닌 순수 문자열로 저장)
                const defaultPromptText = `
책 제목: ${data.title}
책 장르: ${data.genre || "미정"}
책 내용: ${data.content || "내용 없음"}

위 내용을 바탕으로 책 표지 이미지를 생성하세요.
표지에는 책의 제목과 장르, 내용이 잘 어울려야 합니다.
독자가 클릭하고 싶을 만큼 시각적으로 매력적이게 생성하세요.
                `.trim();

                setUserPrompt(defaultPromptText); 
            } catch (error) {
                console.error(error);
                setError("도서 정보를 불러오지 못했습니다.");
            }
        }

        fetchBook();
    }, [id]);

    // 2-1. API Key 브라우저 저장 핸들러
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

    // .env로 API Key 설정하기
    const handleLoadEnvKey = () =>{
        const envKey = import.meta.env.VITE_API_KEY;

        if(envKey){
            setApiKey(envKey.trim());
        } else{
            alert("OPENAI API KEY를 찾을 수 없습니다.");
        }
    };

    // 2-3. [실제 호출] 인공지능 표지 생성 함수 (중간 서버 규격 최적화)
    const handleGenerateImage = async () => {
        if (!apiKey.trim()) {
            alert("OpenAI API Key를 입력하거나 저장된 키를 확인해 주세요!");
            return;
        }

        setLoading(true); 
        setError("");     

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey.trim()}`
                },
                body: JSON.stringify({
                    model: "gpt-image-2",            
                    prompt: userPrompt.trim(),    
                    n: 1,
                    size: resolution,             
                    quality: quality,             
                    //response_format: "b64_json" 
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || "OpenAI API 호출 중 오류가 발생했습니다.");
            }

            const resData = await response.json();
            const base64Str = resData.data[0].b64_json;
            const dataUrl = `data:image/png;base64,${base64Str}`;
            
            setGeneratedImage(dataUrl); 
            alert("🎉 표지 이미지가 성공적으로 생성되었습니다!");
        } catch(error) {
            console.error(error);
            setError(error.message || "이미지 생성에 실패했습니다.");
            alert(error.message || "이미지 생성에 실패했습니다.");
        } finally {
            setLoading(false); 
        }
    };

    // 3. 표지 이미지 및 옵션 정보 최종 저장 (PATCH)
    const handleSaveCover = async() => {
        if(!generatedImage){
            alert("먼저 표지 이미지를 생성해주세요.");
            return;
        }

        setLoading(true);

        try {
            const finalPrompt = makePrompt();

            // 저장용으로 이미지 압축
            const compressedImage = await compressImage(generatedImage, 300, 0.6);

            await saveCoverImage(id, {
                coverImageUrl: compressedImage,
                coverPrompt: finalPrompt,
                imageModel,
                resolution,
                quality,
                updatedAt: new Date().toISOString().slice(0, 10),
            });
            
            if (!res.ok){
                throw new Error("이미지 저장 실패");
            }

            alert("🎉 표지 이미지가 db.json에 정상 저장되었습니다.");
            navigate(`/book/${id}`);
        } catch (error) {
            console.error(error);
            alert("이미지 저장 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (!book){
        return <p>도서 정보를 불러오는 중...</p>
    }
    
    return (
        <div className="cover-page">
            <h1>{book.coverImageUrl ? "도서 표지 이미지 수정 및 재생성" : "도서 표지 이미지 신규 생성"}</h1>

            <div className="cover-layout">
                <section className="book-info">
                    <h2>도서 정보</h2>
                    <p><strong>제목:</strong> {book.title}</p>
                    <p><strong>저자:</strong> {book.author}</p>
                    <p><strong>장르:</strong> {book.genre}</p>
                    <div className='book-content'>{book.content}</div>
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
                                placeholder='sk-... API Key를 입력하거나 기본 키를 불러오세요'
                                style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            
                            {/* [기능 추가]: .env에서 api 키 받아오기 */}
                            <button 
                                type="button" 
                                onClick={handleLoadEnvKey} 
                                style={{ padding: '4px 12px', whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
                            >
                                기본 Key 불러오기
                            </button>

                            <button type="button" onClick={handleSaveApiKey} style={{ padding: '4px 12px', whiteSpace: 'nowrap', cursor: 'pointer' }}>저장</button>
                            
                            <button type="button" onClick={handleClearApiKey} 
                                style={{ 
                                    padding: '4px 12px', 
                                    background: '#dc3545',
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer'
                                }}>
                                삭제
                            </button>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>생성 모델</label>
                        <select value={imageModel} onChange={(e) => setImageModel(e.target.value)}>
                            <option value="gpt-image-2">GPT Image 2</option>
                        </select>   
                    </div>

                    <div className='form-group'>
                        <label>해상도</label>
                        <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                            <option value="1024x1024">1024 x 1024</option>
                            <option value="1024x1536">1024 x 1536</option>
                            <option value="1536x1024">1536 x 1024</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>품질</label>
                        <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>요구사항 (프롬프트)</label>
                        <textarea 
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder='원하는 표지 스타일을 입력하세요.'
                            rows="10"
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <button 
                        className="generate-button"
                        onClick={handleGenerateImage}
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {loading ? "이미지 생성 중..." : "AI 표지 생성하기"}
                    </button>
                </section>
            </div>

            <section className='result-box' style={{ marginTop: '30px' }}>
                <h2>생성 결과</h2>
                {generatedImage ? (
                    <div className='result-content'>
                        <img 
                            src={generatedImage}
                            alt="생성된 도서 표지 미리보기"
                            className='cover-preview'
                            style={{ maxWidth: '300px', height: 'auto', borderRadius: '8px', display: 'block', margin: '10px 0' }}
                        />
                        <div className='button-group' style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <button onClick={handleGenerateImage} disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer' }}>다시 생성</button>
                            <button onClick={handleSaveCover} disabled={loading} style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>표지 저장</button>
                        </div>
                    </div>
                ) : (
                    <p>아직 생성된 표지 이미지가 없습니다.</p>
                )}
            </section>

            <button
                className='back-button'
                onClick={() => navigate(`/book/${id}`)}
                style={{ marginTop: '20px', padding: '8px 16px', cursor: 'pointer' }}
            >
            상세 페이지로 돌아가기
            </button>
        </div>
    );
}

export default CoverGeneratePage;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import getBookDetail from "./api/getBookDetail";
// import generateBookCover from "./api/generateBookCover";
import saveCoverImage from "./api/saveCoverImage";
import compressImage from "./api/compressImage";

import BookInfoSection from "./components/BookInfoSection";
import ImageOptionSection from "./components/ImageOptionSection";
import GeneratedResultSection from "./components/GeneratedResultSection";
import LoadingOverlay from "./components/LoadingOverlay";

import "./css/CoverGeneratePage.css";

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

    // const DEFAULT_API_KEY = import.meta.env.VITE_API_KEY;

    // // 사용자가 입력하는 OpenAI API Key
    // const [apiKey, setApiKey] = useState(() => {
    //     return localStorage.getItem("openai_api_key") || "";
    // });


    // 1. 도서 정보 불러오기
    useEffect(() => {
        async function fetchBook() {
            try {
                const data = await getBookDetail(id);
                
                setBook(data);
                
                // 기존에 저장된 표지가 있으면 화면에 표시
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


    // // 3-1. API Key 브라우저 저장
    // const handleSaveApiKey = () => {
    //     if (!apiKey.trim()) {
    //         alert("API Key를 입력한 후 저장해 주세요.");
    //         return;
    //     }

    //     localStorage.setItem('openai_api_key', apiKey.trim());
    //     alert("🔒 API Key가 브라우저에 안전하게 저장되었습니다! (이후 자동 입력)");
    // };

    // // 3-2. API Key 브라우저 삭제
    // const handleClearApiKey = () => {
    //     localStorage.removeItem('openai_api_key');
    //     setApiKey('');
    //     alert("🗑️ 저장된 API Key가 삭제되었습니다.");
    // };

    /*
    // 3-3. .env에서 기본 API Key 불러오기
    // const handleLoadEnvKey = () =>{
    //     if (DEFAULT_API_KEY) {
    //         setApiKey(DEFAULT_API_KEY.trim());
    //     } else {
    //         alert('.env에서 VITE_API_KEY를 찾을 수 없습니다.');
    //     }
    // };
    const handleLoadEnvKey = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/config/api-key");
            
            if (!res.ok) {
                throw new Error("백엔드로부터 API 키를 로드하지 못했습니다.");
            }

            const data = await res.json(); // { apiKey: "sk-..." } 형태로 수신
            
            if (data.apiKey) {
                setApiKey(data.apiKey.trim());
                alert("🔑 백엔드에서 기본 API Key를 성공적으로 불러왔습니다!");
            } else {
                alert("백엔드에 설정된 API Key가 비어있습니다. application.properties를 확인하세요.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 연결 실패: API Key를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };
    


    // 4. AI 표지 이미지 생성
    // const handleGenerateImage = async () => {
    //     const selectedApiKey = apiKey.trim();

    //     if (!selectedApiKey) {
    //         alert("OpenAI API Key를 입력하거나 기본 Key 불러오기 버튼을 눌러주세요!");
    //         return;
    //     }

    //     setLoading(true); 
    //     setError("");     

    //     try {
    //         const finalPrompt = makePrompt();

    //         if(!finalPrompt.trim()){
    //             alert('프롬프트가 비어 있습니다. 도서 정보를 확인해주세요.');
    //             return;
    //         }

    //         const imageUrl = await generateBookCover({
    //             apiKey: selectedApiKey,
    //             prompt: finalPrompt,
    //             imageModel,
    //             resolution,
    //             quality,
    //         });

    //         setGeneratedImage(imageUrl); 
    //         alert("🎉 표지 이미지가 성공적으로 생성되었습니다!");
    //     } catch(error) {
    //         console.error(error);
    //         setError(error.message || "이미지 생성에 실패했습니다.");
    //         alert(error.message || "이미지 생성에 실패했습니다.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };*/

    // 3. AI 표지 이미지 생성
    const handleGenerateImage = async () => {
        // const selectedApiKey = apiKey.trim();

        // // 💡 키값이 비어있을 때 막아주는 프론트 방어 로직은 유지합니다.
        // if (!selectedApiKey && !hasDefaultKey) {
        //     alert("OpenAI API Key를 입력해주세요!");
        //     return;
        // }

        setLoading(true); 
        setError("");     

        try {
            // 🌟 백엔드 생성 컨트롤러(@PostMapping("/generate"))로 모든 동적 옵션을 전송합니다.
            const response = await fetch(`http://localhost:8080/api/books/${id}/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userPrompt,                 // 선택한 추가 프롬프트 텍스트
                    imageModel,                 // 드롭다운 모델값
                    resolution,                 // 드롭다운 해상도값
                    quality,                    // 드롭다운 품질값
                }),
            });

            if (!response.ok) {
                throw new Error("백엔드 서버에서 AI 이미지 생성에 실패했습니다.");
            }

            const data = await response.json(); // 백엔드의 GenerateImageResponseDto 수신
            
            // 백엔드가 성공 후 넘겨준 Base64 문자열("data:image/png;base64,...")을 state에 담아 화면에 뿌립니다.
            setGeneratedImage(data.coverImageUrl); 
            alert("🎉 표지 이미지가 성공적으로 생성되었습니다!");
        } catch(error) {
            console.error(error);
            setError(error.message || "이미지 생성에 실패했습니다.");
            alert(error.message || "이미지 생성에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };


    // 4. 표지 이미지 및 옵션 정보 저장
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
            

            alert("🎉 표지 이미지가 정상적으로 저장되었습니다!");
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
            {loading && <LoadingOverlay />}

            <h1>
                {book.coverImageUrl
                    ? "도서 표지 이미지 수정 및 재생성"
                    : "도서 표지 이미지 신규 생성"}
            </h1>

            <div className="cover-layout">
                <BookInfoSection book={book} />

                <ImageOptionSection
                    // apiKey={apiKey}
                    // setApiKey={setApiKey}
                    // handleLoadEnvKey={handleLoadEnvKey}
                    // handleSaveApiKey={handleSaveApiKey}
                    // handleClearApiKey={handleClearApiKey}
                    imageModel={imageModel}
                    setImageModel={setImageModel}
                    resolution={resolution}
                    setResolution={setResolution}
                    quality={quality}
                    setQuality={setQuality}
                    userPrompt={userPrompt}
                    setUserPrompt={setUserPrompt}
                    handleGenerateImage={handleGenerateImage}
                    loading={loading}
                />
            </div>

            <GeneratedResultSection
                generatedImage={generatedImage}
                handleGenerateImage={handleGenerateImage}
                handleSaveCover={handleSaveCover}
                loading={loading}
            />

            <button
                className="back-button"
                onClick={() => navigate(`/book/${id}`)}
            >
                상세 페이지로 돌아가기
            </button>
        </div>
    );
}

export default CoverGeneratePage;
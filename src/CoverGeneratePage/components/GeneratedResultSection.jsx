function GeneratedResultSection({
    generatedImage,
    handleGenerateImage,
    handleSaveCover,
    loading,
}) {
    return (
        <section className="result-box">
            <h2>생성 결과</h2>

            {generatedImage ? (
                <div className="result-content">
                    <img
                        src={generatedImage}
                        alt="생성된 도서 표지 미리보기"
                        className="cover-preview"
                    />

                    <div className="button-group">
                        <button
                            onClick={handleGenerateImage}
                            disabled={loading}
                            className="regenerate-button"
                        >
                            다시 생성
                        </button>

                        <button
                            onClick={handleSaveCover}
                            disabled={loading}
                            className="save-cover-button"
                        >
                            표지 저장
                        </button>
                    </div>
                </div>
            ) : (
                <p>아직 생성된 표지 이미지가 없습니다.</p>
            )}
        </section>
    );
}

export default GeneratedResultSection;
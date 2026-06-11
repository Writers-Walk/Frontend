function ImageOptionSection({
    // apiKey,
    // setApiKey,
    // handleLoadEnvKey,
    // handleSaveApiKey,
    // handleClearApiKey,
    imageModel,
    setImageModel,
    resolution,
    setResolution,
    quality,
    setQuality,
    userPrompt,
    setUserPrompt,
    handleGenerateImage,
    loading,
}) {
    return (
        <section className="option-box">
            <h2>이미지 생성 옵션</h2>

            <div className="form-group">
                <label>OpenAI API Key</label>

                <input
                    type="password"
                    value="server-managed-key"
                    readOnly
                    disabled
                    className="api-key-input"
                    style={{ width: "100%" }}
                />
            
                <p style={{ marginTop: 8, fontSize: 13, color: "#2b7a78" }}>
                    🔒 서버에 설정된 키로 생성됩니다. 별도 입력이 필요하지 않습니다.
                </p>
            </div>

            <div className="form-group">
                <label>생성 모델</label>
                <select
                    value={imageModel}
                    onChange={(e) => setImageModel(e.target.value)}
                >
                    <option value="gpt-image-2">GPT Image 2</option>
                </select>
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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
    );
}

export default ImageOptionSection;
function compressImage(dataUrl, maxWidth=500, maxHeight=700, quality=0.8){
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const originalWidth = img.width;
            const originalHeight = img.height;

            // 원본 비율 유지하면서 maxWidth, maxHeight 안에 들어가도록 비율 계산
            const scale = Math.min(
                maxWidth / originalWidth,
                maxHeight / originalHeight,
                1
            );

            const newWidth = Math.round(originalWidth * scale);
            const newHeight = Math.round(originalHeight * scale);
            
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");

            // jpeg 변환 시 투명 배경이 검게 되는 문제 방지
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, newWidth, newHeight);

            // 원본 비율 유지해서 전체 이미지 그리기
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // jpeg로 바꾸면 png보다 훨씬 작아짐
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

            resolve(compressedDataUrl);
        };

        img.onerror = () => {
            reject(new Error("이미지 압축에 실패했습니다."));
        }

        img.src = dataUrl;
    });
}

export default compressImage;
function compressImage(dataUrl, maxWidth=300, quality=0.6){
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");

            const ratio = maxWidth / img.width;
            const width = maxWidth;
            const height = img.height * ratio;
            
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // jpeg로 바꾸면 png보다 훨씬 작아짐
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

            resolve(compressedDataUrl);
        };

        img.src = dataUrl;
    });
}

export default compressImage;
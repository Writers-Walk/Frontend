async function generateBookCover({
    apiKey,
    prompt,
    imageModel,
    resolution,
    quality,
}){
    const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: imageModel,
            prompt: prompt,
            n: 1,
            size: resolution,
            quality: quality,
            output_format: "png",
        }),
    });

    if(!res.ok){
        const errorData = await res.json().catch(() => null);
        console.error("OpenAI API Error: ", errorData);
        throw new Error("이미지 생성에 실패했습니다.");
    }

    const data = await res.json();

    const b54Json = data.data[0].b64_json;
    const imageUrl = `data:image/png;base64, ${b64Json}`;

    return imageUrl;
}

export default generateBookCover;
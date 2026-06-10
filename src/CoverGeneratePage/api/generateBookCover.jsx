// async function generateBookCover({
//     apiKey,
//     prompt,
//     imageModel,
//     resolution,
//     quality,
// }){
//     const res = await fetch('https://api.openai.com/v1/images/generations', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey.trim()}`,
//         },
//         body: JSON.stringify({
//             model: imageModel,
//             prompt,
//             n: 1,
//             size: resolution,
//             quality,
//         }),
//     });

//     if(!res.ok){
//         const errorData = await res.json().catch(() => null);
//         throw new Error(
//             errorData?.error?.message || "OpenAI 이미지 생성 요청에 실패했습니다."
//         );
//     }

//     const data = await res.json();

//     const b64Json = data.data[0].b64_json;
//     const imageUrl = `data:image/png;base64, ${b64Json}`;

//     return imageUrl;
// }

// export default generateBookCover;
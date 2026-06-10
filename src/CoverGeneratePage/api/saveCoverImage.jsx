async function saveCoverImage(id, coverData) {
    //http://localhost:8080/api/books/${id}/image
    const res = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(coverData),
    });

    if(!res.ok){
        const errorText = await res.text();
        console.error("저장 실패 응답: ", res.status, errorText);
        throw new Error("표지 이미지 저장에 실패했습니다.");
    }

    const data = await res.json();
    return data;
// 백엔드가 저장을 성공한 후 어떤 값을 줄지 모르니(성공 객체 또는 빈 값),
    // 텍스트가 있을 때만 JSON 파싱을 해서 에러를 방지합니다.
    // const text = await res.text();
    // return text ? JSON.parse(text) : { success: true };
}

export default saveCoverImage;
async function saveCoverImage(id, coverData) {
    const res = await fetch(`http://localhost:3000/books/${id}`, {
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
}

export default saveCoverImage;
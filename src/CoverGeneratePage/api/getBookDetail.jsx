// 도서 상세 정보 불러오기
async function getBookDetail(id) {
    const res = await fetch(`http://localhost:3000/books/${id}`);

    if(!res.ok){
        throw new Error("도서 정보를 불러오지 못했습니다.");
    }

    const data = await res.json();
    return data;
}

export default getBookDetail;
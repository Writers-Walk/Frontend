// // 도서 상세 정보 불러오기
// async function getBookDetail(id) {
//     // const res = await fetch(`http://localhost:3000/books/${id}`);
//     const res = await fetch(`http://localhost:8080/api/books/${id}`);

//     if(!res.ok){
//         throw new Error("도서 정보를 불러오지 못했습니다.");
//     }

//     //백엔드에서 데이터가 비어있거나 null일 떄, 팅기지 않도록 방어
//     const text = await res.text();
//     if(!text || text.trim() === ""){
//         return {title : "더미제목", author: "더미작가", genre: "더미장르", content: "더미컨텐츠", coverImageUrl: ""};
//     }

//     // const data = await res.json();
//     // return data;

//     // try {
//     //     return JSON.parse(text);
//     // } catch (e) {
//     //     console.error("JSON 파싱 에러:", e);
//     //     return {};
//     // }
// }

// export default getBookDetail;

// H2 DB로부터 도서 상세 정보 및 표지 이미지 정보 불러오기
async function getBookDetail(id) {
    const res = await fetch(`http://localhost:8080/api/bookdetail/book/${id}`);

    if (!res.ok) {
        throw new Error("H2 데이터베이스로부터 도서 정보를 불러오지 못했습니다.");
    }

    // 🌟 [본질적 해결] text()로 읽지 않고, 곧바로 json()으로 딱 한 번만 깔끔하게 읽습니다.
    const data = await res.json();
    
    // 백엔드에서 조립해서 보낸 { title, author, content, genre, coverImageUrl } 데이터가
    // 그대로 리액트 State에 반영되어 화면에 그려집니다.
    return data; 
}

export default getBookDetail;
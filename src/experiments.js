// 동기 코드
/*console.log('A');
console.log('B');
console.log('C');*/

// 비동기 코드
/*console.log('A');
setTimeout(() => {console.log('B')}, 2000);
console.log('C');*/

// setTimeout() - 콜백 지옥
/*setTimeout(() => {
    console.log('주문 접수');
    setTimeout(() => {
        console.log('조리 완료');
        setTimeout(() => {
            console.log('포장 완료');
            setTimeout(() => {
                console.log('배달 완료');
            }, 3000);
        }, 3000);
    }, 3000);
}, 3000);*/

/*function waitOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve('완료!')}, 3000);
    });
}

// waitOneSecond 테스트
/*const p = waitOneSecond();
console.log(p);*/

// async/await 학습
/*function failAfterOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('서버 오류'));
        }, 3000);
    });
}

async function run() {
    // waintOneSecond 호출
    const result = await waitOneSecond();
    console.log(result);
    
    try {
        const r = await failAfterOneSecond();
        console.log('성공: ', r);
    } catch (err) {
        console.log('실패: ', err.message);
    }
}

console.log('A');
run();
console.log('B');
console.log('C');
console.log('D');*/

// fakeGetPosts 가상 서버
/*function fakeGetPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
            { id: 1, title: '첫 글', author: '홍길동', likes: 0},
            { id: 2, title: '두 번째', author: '김철수', likes: 0}
        ]);
        }, 3000);
    });
}

async function loadPosts() {
    try {
        console.log('게시글 불러오는 중...');
        const posts = await fakeGetPosts();
        console.log('받은 게시글: ', posts);
    } catch(err) {
        console.log('실패: ', err.message);
    }
}

console.log('A');
loadPosts();
console.log('B');
console.log('C');*/

async function test() {
    try {
        const res = await fetch('http://localhost:3000/posts');

        console.log(res.status);
        console.log(res.ok);
        console.log(res);

        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log('실패: ', err.message);
    }
}

test();
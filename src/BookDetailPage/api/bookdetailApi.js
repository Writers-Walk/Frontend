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
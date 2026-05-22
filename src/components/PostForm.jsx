import {useState} from 'react';

function PostForm ({onAddPost}) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleClick = () => {
        if (!title.trim())
            return;

        const newPost = {
            id: Date.now(),
            title,
            author,
            likes: 0
        };

        onAddPost(newPost);
        setTitle('');
        setAuthor('');
    }

    return (
        <div>
            <input 
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요."
            />

            <input 
                value = {author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="작성자"
            />
            <button onClick={handleClick}>작성하기</button>
        </div>
    );
}

export default PostForm
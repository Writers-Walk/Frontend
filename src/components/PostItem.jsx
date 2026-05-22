function PostItem({id, title, author, likes, onDelete, onLike}) {
    // console.log(title, author);
    return(
        <li>
            <h3>{title}</h3>
            <p>글쓴이: {author}</p>
            <button onClick={() => onLike(id)}>
                👍 {likes}
            </button>

            <button onClick={() =>
                onDelete(id)
            }>
                삭제
            </button>
        </li>
    );
}

export default PostItem
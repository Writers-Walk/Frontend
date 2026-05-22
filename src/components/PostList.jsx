import PostItem from './PostItem';

function PostList({posts, onDelete, onLike}) {
    return (
        <ul>
            {posts.map(p =>
            <PostItem 
            key = {p.id}
            id = {p.id}
            title = {p.title}
            author = {p.author}
            likes = {p.likes}
            onDelete = {onDelete}
            onLike = {onLike}
            />
            )}
        </ul>

    );
}

export default PostList
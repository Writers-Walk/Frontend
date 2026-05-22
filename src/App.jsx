import './App.css';
import Header from './components/Header';
import PostItem from './components/PostItem';
import Card from './components/Card';
import PostList from './components/PostList';
import {useState} from 'react';
import LikeButton from './components/LikeButton';
import Counter from './components/Counter';
import NameInput from './components/NameInput';
import PostForm from './components/PostForm';

function App() {

  // 규칙2 - 1
  /*const name = "한울";
  const age = 30;

  return (
    <div>
      <h1>안녕, {name}님</h1>
      <p>내년: {age + 1}세</p>
      <p>{age >= 20 ? '성인' : '미성년'}</p>
    </div>
  )*/

  // 규칙2 - 2
  /*const fruits = ['사과', '바나나', '포도'];

  return (
    <ul>
      <h1 className="test">과일 목록</h1>
      <p style={{color:'red', fontSize: 24}}>맛있어요.</p>
      {fruits.map(f => <li>{f}</li>)}
    </ul>
  );*/
  
  // C3U3 최종 실습
  /*const posts = [
    {id: 1, title: "첫 글", author: "홍길동"},
    {id: 2, title: "두 번째", author: "김철수"},
    {id: 3, title: "세 번째", author: "이영희"}
  ];

  return (
    <>
      <header>
        <h1>미니 게시판</h1>
      </header>

      <main>
        <form id="post-form" className="write-form">
          <input type="text" placeholder="제목을 입력하세요" />
          <input type="text" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </form>

        <ul className="post-list">
        {posts.map(p => (
          <li key={p.id} className="post-card">
            <h3>{p.title}</h3>
            <p>{p.author}</p>
          </li>
        ))}
        </ul>
      </main>    
    </>
  );*/

  // Header 컴포넌트 사용
  /*return (
    <div>
      <Header />
      <Header />
    </div>
  );*/

  // Props 기초
  /*const post = {title: "첫 글", author: "한울"};

  return(
    <PostItem title={post.title} author={post.author}/>
  );*/

  // children prop
  /*return (
    <>
      <Card>
        <h3>공지사항</h3>
        <p>오늘 오후 휴강</p>
      </Card>

      <Card>
        <h3>이벤트</h3>
      </Card>
   </>
  );*/

  // C3U4 최종 실습 전까지 완료
  /*const posts = [
    {id: 1, title: "첫 글", author: "한울"},
    {id: 2, title: "두 번째", author: "영희"},
    {id: 3, title: "세 번째", author: "민수"}
  ];

  return (
    <PostList posts={posts}/>
  );*/

  // useState의 원형
  /*const [count, setCount] = useState(0);*/

  // useState 사용 (LikeButton)
  /*return <LikeButton />*/

  // Counter 예제
  /*return <Counter />*/

  // Nameinput 예제
  /*return <NameInput />;*/
  
  const [posts, setPosts] = useState([
    {id: 1, title: "첫 글", author: "한울", likes: 0},
    {id: 2, title: "두 번째", author: "영희", likes: 0},
    {id: 3, title: "세 번째", author: "민수", likes: 0}
  ]);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  }

  const handleDelete = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1} : p
    )); 
  }

  return (
    <>
      <Header />
      <PostForm onAddPost={handleAddPost}/>
      <PostList posts={posts} onDelete={handleDelete} onLike={handleLike}/>
    </>
  );


}

export default App

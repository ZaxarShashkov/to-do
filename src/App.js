import React, { useState, useMemo} from 'react';
import MyButton from './components/button/MyButton';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import MyInput from './components/input/MyInput';
import MyModal from './components/modal/MyModal';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MySelect from './components/select/MySelect';
import './styles/App.css'


function App() {

  const [posts , setPosts] = useState([
  {id:1, title: 'Javascript', body:'desciption'},
  {id:2, title: 'Java', body:'desciption'},
  {id:3, title: 'Python', body:'desciption'},
  {id:4, title: 'C++', body:'desciption'}
])

const [filter, setFilter] = useState({sort:'', query: ''})
const [modal, setModal] = useState(false);

 const sortedPosts = useMemo(() => {
if(filter.sort) {
    return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
   }
    return posts;
 }, [filter.sort, posts])

 const sortedAndSearchedPosts = useMemo(() => {
  return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
 },[filter.query,sortedPosts])


 const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
 }

 const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
 }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0 '}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
       <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
    </div>
  );
}

export default App;



import Header from './Header.js';
import Nav from './Nav.js';
import NewPost from './NewPost.js';
import PostPage from './PostPage.js';
import Missing from './Missing.js';
import Footer from './Footer.js';
import React, { useState, useEffect} from 'react';
import { Route,Routes, useNavigate } from 'react-router-dom';
import Home from './Home.js';
import EditPost from './EditPost.js'
import About from './About.js';
import api from './api/posts.js';





function App() {
    const [posts, setPosts] = useState([])

    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')



const handleSubmit = async (e) => {
  e.preventDefault();
  const id = posts.length ? posts[posts.length-1].id + 1 : 1;
  const newPost = { id: id, title: postTitle, datetime: "October 31,2023, 18:45:23 PM", body: postBody };
  try{
  const response= await api.post('/posts', newPost)
  const allPosts =  [...posts, response.data];
  setPosts(allPosts);
  setPostBody('');
  setPostTitle('');
  navigate('/');
  } 
  catch(err){
    if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
    }
    else{
    console.log(`Error: ${err.message}`);
    }
  }
};
useEffect(()=>{
  const fetchPosts= async ()=>{
        try{
        const response= await api.get('/posts');
        setPosts(response.data);
      }
      catch(err){
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        }
        else{
        console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
    }, [])

    useEffect(()=>{
      const filterResult =posts.filter((post)=>(
        (post.body).toLowerCase()).includes(search.toLocaleLowerCase())
        ||  ((post.title).toLowerCase()).includes(search.toLocaleLowerCase())
    );
    setSearchResult(filterResult.reverse());
      }, [posts,search])

    const handleDelete =async (id)=>{
      try{
      await api.delete(`/posts/${id}`)
      const postLists = posts.filter(post => post.id !== id);
      setPosts(postLists);
      navigate('/')
      }
      catch(err){
        console.log(`Error: ${err.message}`);
      }
    }
    const handleEdit= async(id)=>{
      const updatePost = { id, title: editTitle, datetime: "October 31,2023, 18:45:23 PM", body: editBody };
      try{
        const response = await api.put(`/posts/${id}`, updatePost)
        setPosts(posts.map(post=> post.id===id ?
          {...response.data}: post
          ));
        setEditBody('');
        setEditTitle('');
        navigate('/');
      }
      catch(err){
         console.log(`Error: ${err.message}`)
      }
    }

  return (
    <div className='App'>
      
      <Header title="Social Media"/>
      <Nav 
       search={search}
       setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={
        <Home posts={searchResult}/>}  />
        <Route path= "post">
      <Route index element={
      <NewPost 
        handleSubmit={handleSubmit} 
        postTitle={postTitle} 
        setPostTitle={setPostTitle}
        postBody={postBody} 
        setPostBody={setPostBody}
      />} />
      <Route path=":id" element={<PostPage posts={posts}
      handleDelete = {handleDelete} />} />
      </Route>
      <Route
      path="/:id"
      element={
        <EditPost
          posts={posts}
          handleEdit={handleEdit}
          editBody={editBody}
          editTitle={editTitle}
          setEditBody={setEditBody}
          setEditTitle={setEditTitle} />
       } />
      <Route path="about" element={
      <About />} />
      <Route path="*" element={
      <Missing />} />
      
      </Routes>
      <Footer />
    </div> 
  );
}

export default App;

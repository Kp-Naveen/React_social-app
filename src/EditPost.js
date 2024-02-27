import React from 'react'
import { useEffect } from 'react'
import { useParams,Link} from 'react-router-dom'

const EditPost = (posts,
    handleEdit,editBody,editTitle,setEditBody,
    setEditTitle) => {

        const {id}= useParams();
        const post=posts.find(post=> (post.id).toString()===id);

        useEffect(()=>{
            if(post){
                setEditBody(post.body);
                setEditTitle(post.title);
            }
        },[post, setEditBody,setEditTitle])
  return (
    <main className='EditPost'>
    {editTitle &&
    <>
        <h2>Edit POST</h2>
        <form className='newPostForm' onSubmit={(e)=>
            e.preventDefault()} >
                <label htmlFor="postTitle">Title:</label>
                <input 
                 type="text"
                 id="postTitle"
                 value={editTitle}
                 onChange={(e)=>{
                    setEditTitle(e.target.value)
                 }}
                 />
                <label htmlFor="postBody">Body:</label>
                <input 
                 type="text"
                 id="postTitle"
                 value={editBody}
                 onChange={(e)=>{
                    setEditBody(e.target.value)
                 }}
                 />
                 <button
                 type='submit'
                 onClick={handleEdit(posts.id)}
                 >Submit</button>

        </form>
        </>   
    }
    {!editTitle && 
    <>
    <h2>Post Not Found</h2>
    <Link to="/">
    <p>Check Homepage</p>
    </Link>
    </>
    
    }
    </main>
  )
}

export default EditPost
import React from 'react'
import { useParams,Link } from 'react-router-dom'


const PostPage = ({posts, handleDelete, handleEdit}) => {
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString()=== id);
  return (
    <main className='PostPage'>
        <article className='post'>
            {post &&
            <>
            <h1>{post.title}</h1>
            <h3 style={{marginTop: '1rem'}}  className='postDate'>{post.datetime}</h3>
            <h2 className='postBody'>{post.body}</h2>
            <div className='rowButton'>
             <Link to={`/edit/${post.id}`}>  
            <button onClick={() => handleEdit(post.id)}
             className='editButton'> 
                Edit
            </button> </Link>
            <button onClick={() => handleDelete(post.id)} className='deleteButton'>
                Delete
            </button>
            </div>
            </>
            }
        {!post && 
        <>
        <h2>Post Not Found</h2><p>Well, that's Disappointmenting</p>
        <p>Visit Our Home page</p>
        </>
        }
        </article>
    
    
     
    </main>
  )
}

export default PostPage
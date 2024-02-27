import React from 'react'

const NewPost = (
    {handleSubmit, postTitle, 
        setPostTitle, postBody, setPostBody}
) => {
  return (
   <main className="NewPost">
    <h2>New Post</h2>
    <form className='newPostForm'  onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> Title: </label>
        <input 
        id="postTitle"
        type="text"
        required
        autoFocus
        value={postTitle}
        onChange={(e)=>setPostTitle(e.target.value)}
        
        />
        <label htmlFor='newPostBody'>Post:</label>
        <textarea 
        id="postBody"
        type="text"
        required
        value={postBody}
        onChange={(e)=> setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
    </form>
   </main>
  )
}

export default NewPost
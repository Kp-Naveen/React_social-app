import React from 'react'
import {Link} from 'react-router-dom'
const Missing = () => {
  return (
    <main className='Missing'>
        <h2>Page Not Found</h2>
        <p>Well, that's Disappointing.</p>
        <Link to="/" style={{color: 'black', fontWeight:'700'}}> 
        <p> Visit Our Homepage</p></Link>
    </main>
  )
}

export default Missing
import React from 'react'

const Footer = () => {
    const toady= new Date();
  return (
    <footer className='footer'>
        <p>Copyrights &copy; {toady.getFullYear()}</p>
    </footer>
  )
}

export default Footer
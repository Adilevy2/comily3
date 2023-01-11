import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function NavBar() {
   const navigate=useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
    <div className="container-fluid">
    <a className="navbar-brand" href="#"></a>
      <ul className="navbar-nav">
      {!localStorage.token?

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/comments">comments</a>
        </li>:''}
        {!localStorage.token?
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/login">login</a>
        </li>:''}{!localStorage.token?
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/signup">signup</a>
        </li>:''}
        {localStorage.token?
        <li className="nav-item">
          <button className='bg-danger' 
            onClick={()=>{
            localStorage.removeItem('token');
            navigate('/login') }}
            >
            LogOut
          </button>
        </li>:''}
      </ul>
   
  </div>
</nav>
  )
}
import React from 'react'
import NavBar from './navBar.jsx'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Comments from './comments'
import Login from './login';
import Signup from './signup';

export default function Main() {
  

    return (
    <div>
    <NavBar/>
    <Routes> 
        <Route path="/comments"  element ={ <Comments/>} />        
        <Route path="/signup"  element ={ <Signup/>} />         
        <Route path="/login"  element ={ <Login/>} />          
    </Routes>     

    </div>
  )
}
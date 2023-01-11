import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const [data, setdata] = useState({});
          const navigator = useNavigate()


    const handleSubmit = async (event)=>{
        event.preventDefault();        
        try{
            const result = await axios.post('http://localhost:5002/api/users',data);
            localStorage.setItem('token',result.data)   
            navigator('/comments')
               }
        catch{
            alert('oh noo')
        }
    }


  return (
    <div>
        <form className='m-4'onSubmit={(e)=>{handleSubmit(e)}}>
        <div class="mb-3">
          <label for="" class="form-label">Name</label>
          <input type="text" class="form-control" 
          onChange={(ev)=>setdata({...data,name:ev.target.value})}/>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control"
          onChange={(ev)=>setdata({...data,email:ev.target.value})} />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" 
          onChange={(ev)=>setdata({...data,password:ev.target.value})}/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
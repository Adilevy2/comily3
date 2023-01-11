import React from "react";
import "../App.css"; 
import { useState,useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';

const Comments = () => {
  const [body, setBody] = useState({});
  const [comments, setComments] = useState([]);
  let decoded=undefined;
  useEffect(() => {
      async function getData(){
          const data=await axios.get('http://localhost:5002/api/comments');
          setComments(data.data)
        }
        getData();
    }, []); 
    
    async function handeleSubmit(){
        try{

            const token=localStorage.getItem('token')
            var decoded = jwt_decode(token);
            await axios.post('http://localhost:5002/api/comments',{name:decoded.name, body:body},{headers: {'x-auth-token': `${token}`}});
            window.location.reload(false);    
        }
        catch{
            alert('aw shit here we go again')
        }
      }
        

      return (
    <div className="cont">
      <div className="p-3 mb-2 bg-primary text-white"> {comments.map(ev=>ev= <div key={ev.id}>
            <p>name: {ev.name}</p>
            <p>body: {ev.body}</p>
            <hr></hr>
        </div>)}</div>
      <div className="p-3 mb-2 bg-primary-subtle text-emphasis-primary">
        <form className="m-4" onSubmit={(e)=>{
         e.preventDefault()
        handeleSubmit(e)}}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Write a comment
            </label>
            <input
              type="text"
              class="form-control"
              onChange={(ev) => setBody(ev.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
import React from 'react'
import "../Display/styles.css"
import axios from 'axios'
import { useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import Header from './Header';

function Teachers() {

    const [listOfPosts, setListOfP0sts] = useState([]);
    let navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3001/auth").then((response)=>{
            setListOfP0sts(response.data)
        })
    }, [])
    const content = listOfPosts.map((user)=>
        <div className='student-name-container' key={user.id} onClick={()=>{navigate(`/auth/${user.id}`)}}>
            <p>{user.id}</p>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
           
            <button>Drop</button>
        </div>
    )
  return (
    <div className='student-container'>
      <Header/>
      <div className='student-name-container'>
        <p>ID</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Phone Number</p>
        <p>Class</p>
      </div>
      {content}
    </div>
   

    )
}

export default Teachers
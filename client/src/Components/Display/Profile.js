import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios"

function Profile() {
    debugger;
    const [authState, setAuthState] = useState(
        JSON.parse(localStorage.getItem("user"))
      );
    const [first_name,setFirstname] = useState("")
    const [last_name,setLastname] = useState("")
    const [role, setRole]  = useState("")

    useEffect(()=>{
        const headers = {
            accessToken: localStorage.getItem("accessToken"),
        }

        axios.get(`http://localhost:3001/auth/user`, { headers:headers }).then((response)=>{
            setFirstname(response.data.first_name)
            setLastname(response.data.last_name)
            setRole(response.data.role)
        })
    },[])
    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState(false);
      
        
      }
  return (
    <div className='ProfilePageContainer'>
        <div className='basicInfo'>
            {""}
            
            <p>{first_name} {last_name}</p>
            <p>{role}</p>
            <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
   

    </div>
  )
}

export default Profile
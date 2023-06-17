import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios"

function Profile() {
    let {id} = useParams();
    const [first_name,setFirstname] = useState("")
    const [last_name,setLastname] = useState("")
    const [role, setRole]  = useState("")

    useEffect(()=>{
        const header = {
            
        }
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response)=>{
            setFirstname(response.data.first_name)
            setLastname(response.data.last_name)
        })
    })
  return (
    <div className='ProfilePageContainer'>
        <div className='basicInfo'>
            {""}
            <h1>Hello</h1>
        </div>
        <div className='listOfPosts'></div>

    </div>
  )
}

export default Profile
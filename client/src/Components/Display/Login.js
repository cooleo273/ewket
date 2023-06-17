import React , {useContext, useState} from 'react'
import axios from "axios"
import {Navigate, useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext'

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole]=useState("")
  const {setAuthState} = useContext(AuthContext)
  let navigate = useNavigate();
  let { id } = useParams();
  const login = () =>{
    
    const data = { username: username, password:password, role:role}
    axios.post("http://localhost:3001/auth/login", data).then((response)=>{
      if(response.data.error) {
        alert (response.data.error)
      }
      else{
        localStorage.setItem("accessToken", response.data)
        setAuthState(true)
        navigate(`/profile`)
        
      }
      
    },[])
  }



  return (
    <div className='login-container'>
      
      <input 
      type="text"
      onChange={(event)=>{
        setUsername(event.target.value)
      }}></input>
      <input 
      type="password"
      onChange={(event)=>{
        setPassword(event.target.value)
      }}></input>
      <select
      onChange={(event)=>{
        setRole(event.target.value)
      }}>
        <option value="student">student</option>
        <option value="teacher">teacher</option>
      </select>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
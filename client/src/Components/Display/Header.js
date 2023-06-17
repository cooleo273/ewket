import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios'
function Header() {
  const [authState, setAuthState] = useState(false);
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/user', {
      headers:{
      accessToken:localStorage.getItem('accessToken')
    }})
    .then((response)=>{
      if (response.data.error){
        setAuthState(false)
    } else {
      setAuthState(true)
    }}
    )
      
    
  })
  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
    <div className="header">
            <Link to="/">Home</Link>
            <Link to="/Department">News</Link>
            
            <Link to='/Schedule'>Schedule</Link>
            {!authState && (
              <>
            <Link to="/AddStudents">Register</Link>
            <Link to="/LoginPage">Login</Link>
            </>
            )}
          </div>
          </AuthContext.Provider>
  )
}
  
export default Header
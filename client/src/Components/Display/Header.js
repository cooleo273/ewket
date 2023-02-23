import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
            <Link to="/">Home</Link>
            <Link to="/Department">News</Link>
            <Link to="/AddStudents">Register</Link>
            <Link to="/LoginPage">Login</Link>
            <Link to='/Schedule'>Schedule</Link>
          </div>
  )
}

export default Header
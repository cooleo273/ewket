import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
function Header() {
  const [authState, setAuthState] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/user", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(null);
        } else {
          setAuthState(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  });
const logout = () => {
  JSON.parse(localStorage.getItem("user"));
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  
  
}

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/Department">News</Link>

        <Link to="/Schedule">Schedule</Link>
        {!authState ? (
          <>
            <Link to="/AddStudents">Register</Link>
            <Link to="/LoginPage">Login</Link>
          </>
        ) : (
          <button className="btn-logout" onClick={logout}>Logout</button>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext'

function Profile() {
  debugger;
  const [user, setAuthState] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const[first_name, setFirstname] = useState("")
  const[last_name, setLastname] = useState("")

  
  useEffect(() => {
    const headers = {
        
      accessToken: localStorage.getItem("accessToken"),
    };

    axios
      .get(`http://localhost:3002/auth/user`, { headers: headers })
      .then((response) => {
        setFirstname(response.data.first_name);
        setLastname(response.data.last_name);
        
      });
  }, []);
  let navigate = useNavigate();
  const logout = () => {
    JSON.parse(localStorage.getItem("user"));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="ProfilePageContainer">
      <AuthContext.Provider value={{ user, setAuthState }}>
        <div className="basicInfo">
          {""}

          <p>
            {first_name} {last_name}
          </p>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default Profile;

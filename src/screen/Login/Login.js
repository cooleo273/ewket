import React, { useContext, useState } from "react";
import axios from "axios";
import "./styles.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const login = async () => {
    try {
      const loginData = { username, password };
      console.log('Sending login request with data:', loginData);

      const response = await axios.post('http://localhost:5001/users/login', loginData);

      console.log('Login response:', response.data);
      

      if (response.data.error) {
        alert(response.data.error);
      } else {
        const { accessToken, user } = response.data;
        
        
        if (!accessToken || !user) {
          throw new Error("User data is missing in the response");
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setAuthState(user);
        
       if (user.role === "teacher"){
        navigate("/teacher")
       }else if(user.role === "student"){

        navigate("/student")
       }
       else if(user.role === "admin"){
        navigate("/admin")
       }
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="y">
          
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="y">
         
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="button">
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

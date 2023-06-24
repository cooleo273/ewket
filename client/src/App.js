import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Post from "./Components/Display/Post";

import Home from "./Components/Display/Home";
import Login from "./Components/Display/Login";
import Department from "./Components/Display/Department";
import About from "./Components/Display/About";
import Instructor from "./Components/Display/Instructor";
import Schedule from "./Components/Display/Schedule";
import Profile from "./Components/Display/Profile";
import Teachers from "./Components/Display/Teachers";
import { AuthContext, UserContexct, UserContext } from "./helpers/AuthContext";
import { useState } from "react";
import Register from "./Components/Display/Register";
import Admin from "./Components/Display/Admin";

function App() {
  debugger
  const [user, setAuthState] = useState(JSON.parse(localStorage.getItem('user')));
  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setAuthState }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/Department" exact element={<Department />}></Route>
            <Route path="/About" exact element={<About />}></Route>
            <Route path="/Schedule" exact element={<Schedule />}></Route>
            <Route path="/Instructors" exact element={<Instructor />}></Route>
            <Route
              path="/teachers"
              exact
              element={
                <ProtectedRoute isAllowed={!!user && user.role === "teacher"} />
              }
            >
              <Route path=""  element={<Teachers />} />
            </Route>

            <Route
              path="/admin"
              exact
              element={
                <ProtectedRoute isAllowed={!!user && user.role === "admin"} />
              }
            >
              <Route path=""  element={<Admin />} />
            </Route>

            <Route
              path="/students"
              exact
              element={
                <ProtectedRoute
                  isAllowed={!!user && user.role === "student"}
                />
              }
            >
              <Route path="" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  debugger;
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default App;

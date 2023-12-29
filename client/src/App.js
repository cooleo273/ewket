import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Post from "./Components/Display/Post";
import Login from "./Components/Display/Login";

import Profile from "./Components/Display/Profile";
import Teachers from "./Components/Display/Teachers";
import { AuthContext, UserContexct, UserContext } from "./helpers/AuthContext";
import { useState } from "react";
import Register from "./Components/Display/Register";
import Admin from "./Components/Display/Admin/Admin";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setAuthState] = useState(JSON.parse(localStorage.getItem('user')));
  debugger;
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className="App">
      
      <AuthContext.Provider value={{ user, setAuthState }}>
        <Router>
          <Routes>
            
            <Route path="/register" element={<Register />} />
            <Route path="/auth/:id" exact element={<Post />} />
            <Route path="/" exact element={<Login />}></Route>
            <Route
              path="/teachers"
              exact
              element={
                <ProtectedRoute
                  isAllowed={!!user && user.role === "teacher"}
                />
              }
            >
              <Route path=""  element={<Teachers />} />
           
            </Route>
            <Route
              path="/admin"
              exact
              element={
                <ProtectedRoute
                  isAllowed={!!user && user.role === "admin"}
                />
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
    </ThemeProvider>
    </ColorModeContext.Provider>
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

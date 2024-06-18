// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teachers from './screen/Teachers/Teachers';
import Admin from './screen/Admin/admin';
import Profile from './screen/Student/Profile';
import Login from './screen/Login/Login';
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from './helpers/AuthContext';
import StudentRegistration from './screen/Admin/aboutStudents/studentRegistration';
import AddClass from './screen/Admin/aboutClasses/addClasses';
import ShowClasses from './screen/Admin/aboutClasses/showClasses';
import ClassDetails from './screen/Admin/aboutClasses/ClassDetail';


function App() {
  
  const storedUser = localStorage.getItem("user");

// Parse the stored user object string into a JavaScript object
const initialUser = storedUser ? JSON.parse(storedUser) : null;

// Set the user state with the parsed user object
const [user, setAuthState] = useState(initialUser);

// Now you can access the user object and its properties like user.role

  
  return (
    
    <AuthContext.Provider value={{ user, setAuthState }}>
      <Router>
          <Routes>
            <Route path="/" exact element={<Login />}></Route>
            
            <Route
              path="/teacher"
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
              <Route path='class/addstudents/:id' element={<StudentRegistration/>}/>

              <Route path="addclass" element={<AddClass />} />
              <Route path="classes" element={<ShowClasses />} />
              <Route path="class/:id" element={<ClassDetails />} />
              
            </Route>
            <Route
              path="/student"
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
  );
}


const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};


export default App;

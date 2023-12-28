import React, { useEffect, useState } from "react";

import { Route, Router, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../helpers/AuthContext";
import "./Admin.css";







function Sidebar() {
  let navigate = useNavigate();
  const logout = () => {
    JSON.parse(localStorage.getItem("user"));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };
  return(
  <div>
    <li>Dashboard</li>
    <li>Students</li>
    <li>Teachers</li>
    <li>Attendance</li>
    <li>Courses</li>
    <li>Exam</li>
    <li>Setting</li>
    <li onClick={logout}>Logout</li>
  </div>
  )
}

export default Sidebar;

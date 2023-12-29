import React, { useEffect, useState } from "react";

import { Route, Router, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../helpers/AuthContext";
import "./Admin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import SearchBar from "../Search/SearchBar";
import SearchResultsList from "../Search/SearchResultsList";








function Admin() {
  const [results, setResults] = useState ([]);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [role, setRole] = useState("");

  const [user, setAuthState] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  useEffect(() => {
    const headers = { 
      accessToken: localStorage.getItem("accessToken"),
    };

    axios
      .get(`http://localhost:3002/auth/user`, { headers: headers })
      .then((response) => {
        setFirstname(response.data.first_name);
        setLastname(response.data.last_name);
        setRole(response.data.role);
      });
  }, []);

  
  return (
    <div className="ProfilePageContainer">
      <div className="sidebar">
      <Sidebar/>
      </div>
      <div className="nameofadmin">
      <h1>Dashboard</h1>
      <div className="searchengine">
      <SearchBar setResults={setResults}/>
      <SearchResultsList results={results}/>
      </div></div>
    </div>
  );
}

export default Admin;

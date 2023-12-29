import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Admin.css";

function AdminDashboard() {

  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch("http://localhost:3002/auth").then((response) =>
      response.json().then((json) => {
        const result = json.filter((user)=>{
            return value && user && user.first_name && user.first_name.toLowerCase().includes(value)
        })
        console.log(result);
      })
    );
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default AdminDashboard;

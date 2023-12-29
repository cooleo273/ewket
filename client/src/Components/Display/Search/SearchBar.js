import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../Admin/Admin.css";
function SearchBar({setResults}) {
  
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch("http://localhost:3002/auth").then((response) =>
      response.json().then((json) => {
        const results = json.filter((user)=>{
            return value && user && user.first_name && user.first_name.toLowerCase().includes(value)
        })
        
        setResults(results)
      })
    );
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="input-wrapper">
      <SearchIcon/>
      <InputBase 
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}/>
      
    </div>
  );
}




export default SearchBar
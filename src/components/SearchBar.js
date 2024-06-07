import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResultsList from './SearchResultsList'; // Adjust the import based on your file structure

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5002/users/getallusers")
      .then((response) => {
        setAllUsers(response.data );
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (input.trim()) {
      const filteredResults = allUsers.filter(user => 
        user.fullName && user.fullName.toLowerCase().includes(input.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]); // Clear results if input is empty
    }
  }, [input, allUsers]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search users by name"
      />
      <SearchResultsList results={results} />
    </div>
  );
};

export default SearchBar;

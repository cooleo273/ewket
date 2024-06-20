import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Student = () => {
  const [studentData, setStudentData] = useState(null);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!token) {
      console.error('No token found');
      return;
    }

    axios.get('http://localhost:5001/users/current', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setStudentData(response.data);
    })
    .catch(error => {
      if (error.response.status === 401){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        navigate("/")
        
      }
      
    });
  }, [token, navigate]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Profile</h1>
      <p>Name: {studentData.username}</p>

      {/* Render other teacher details here */}
    </div>
  );
};

export default Student;

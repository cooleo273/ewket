import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    
    if (!token) {
      console.error('No token found');
      return;
    }

    axios.get('http://localhost:5002/users/current', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setTeacherData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [token]);

  if (!teacherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Teacher Profile</h1>
      <p>Name: {teacherData.username}</p>
      <p>Email: {teacherData.email}</p>
      {/* Render other teacher details here */}
    </div>
  );
};

export default Teacher;

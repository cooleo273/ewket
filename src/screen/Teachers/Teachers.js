import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import TeacherDashboard from './TeachersDashboard';
import "./styles.css"

const Teacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const token = localStorage.getItem('accessToken');

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
    <div className='teachers-profile'>
      <Navbar/>
      <TeacherDashboard/>
    </div>
  );
};

export default Teacher;

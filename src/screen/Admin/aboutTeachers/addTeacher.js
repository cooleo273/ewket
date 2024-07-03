import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { CircularProgress } from '@mui/material';

const AddTeacher = () => {
  const params = useParams();
  const navigate = useNavigate();

  const subjectID = params.id;

  const [subjectDetails, setSubjectDetails] = useState(null);
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [sclassesList, setSclassesList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id;
  const fields = { school, teachSubject, teachSclass }
  const [user, setUser] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    role: "teacher",
    street: "",
    city: "",
    state: "",
    zip: "",
    contactNumber: "",
    schoolName: "",
    email: "",
    nationality: "",
    identificationNumber: "",
    pgname: "",
    pgrelationship: "",
    pgcontactNumber: "",
    pgemail: "",
    pgstreet: "",
    pgcity: "",
    pgstate: "",
    pgzip: "",
    previousSchool: "",
    accountusername: "",
    accountpassword: "",
    rollNum: "",
    adminID: "665b893fbd4f7af08b321eb8",
    sclassName: "" // Initialize sclassName in user state
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

 
  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/Subject/${subjectID}`);
        setSubjectDetails(response.data);
      } catch (error) {
        console.error('Error fetching subject details:', error);
        // Handle error (e.g., setSubjectDetails(null), show error message)
      }
    };

    fetchSubjectDetails();
  }, [subjectID]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
     

      const response = await axios.post('http://localhost:5001/users/register', {user, fields});
      console.log('User registered successfully:', response.data);

      setLoader(false);
      setShowPopup(true);
      setMessage('Teacher added successfully');
      
      // Optionally, you can navigate here after successful registration
      navigate("/Admin/teachers");
    } catch (error) {
      console.error('Error registering teacher:', error);
      setLoader(false);
      setShowPopup(true);
      setMessage(error.message || 'Failed to add teacher');
    }
  };

  return (
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>
            Subject : {subjectDetails && subjectDetails.subName}
          </label>
          <label>
            Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
          </label>
         
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  required
                />
              
              
               
           
                <label htmlFor="rollNum">Roll Number</label>
                <input
                  type="text"
                  id="rollNum"
                  name="rollNum"
                  value={user.rollNum}
                  onChange={handleInputChange}
                />
              
                <label htmlFor="dateOfBirth">Date of birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  required
                />
             
                <label>School Name</label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={user.schoolName}
                  onChange={handleInputChange}
                  required
                />
              
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={user.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={user.nationality}
                  onChange={handleInputChange}
                  required
                />
              
              <label htmlFor="identificationNumber">
                Identification Number
              </label>
              <input
                type="text"
                id="identificationNumber"
                name="identificationNumber"
                value={user.identificationNumber}
                onChange={handleInputChange}
                required
              />
              
                <label htmlFor="previousSchool">Previous School</label>
                <input
                  type="text"
                  id="previousSchool"
                  name="previousSchool"
                  value={user.previousSchool}
                  onChange={handleInputChange}
                  required
                />
             
              <h3>User Address</h3>

              <input
                type="text"
                id="street"
                name="street"
                placeholder="Street"
                value={user.street}
                onChange={handleInputChange}
                required
              />
                             <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={user.state}
                  onChange={handleInputChange}
                  required
                />
             
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={user.city}
                  onChange={handleInputChange}
                  required
                />
         
                <input  
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="Zip Code"
                  value={user.zip}
                  onChange={handleInputChange}
                  required
                />
             
              <h3>Parent Information</h3>
              <label htmlFor="pgname">Parent/Guardian Name</label>
              <input
                type="text"
                id="pgname"
                name="pgname"
                value={user.pgname}
                onChange={handleInputChange}
                required
              />
              
                <label htmlFor="pgrelationship">
                  Relationship with Parent/Guardian
                </label>
                <input
                  type="text"
                  id="pgrelationship"
                  name="pgrelationship"
                  value={user.pgrelationship}
                  onChange={handleInputChange}
                  required
                />
          
                <label htmlFor="pgcontactNumber">
                  Parent/Guardian Contact Number:
                </label>
                <input
                  type="tel"
                  id="pgContactNumber"
                  name="pgcontactNumber"
                  value={user.pgcontactNumber}
                  onChange={handleInputChange}
                  required
                />
           
                <label htmlFor="pgemail">Parent/Guardian Email</label>
                <input
                  type="email"
                  id="pgemail"
                  name="pgemail"
                  value={user.pgemail}
                  onChange={handleInputChange}
                  required
                />
             
                <label htmlFor="pgstreet">Parent/Guardian Address</label>
                <input
                  type="text"
                  id="pgstreet"
                  name="pgstreet"
                  placeholder="Street"
                  value={user.pgstreet}
                  onChange={handleInputChange}
                  required
                />
       
                <input
                  type="text"
                  id="pgCity"
                  name="pgcity"
                  placeholder="City"
                  value={user.pgcity}
                  onChange={handleInputChange}
                  required
                />
              
                <input
                  type="text"
                  id="pgState"
                  name="pgstate"
                  placeholder="State"
                  value={user.pgstate}
                  onChange={handleInputChange}
                  required
                />
              
              
                <input
                  type="text"
                  id="pgzip"
                  name="pgzip"
                  placeholder="ZIP Code"
                  value={user.pgzip}
                  onChange={handleInputChange}
                  required
                />
              

            
              <h3>User Account</h3>
              <label htmlFor="accountusername">Username</label>
              <input
                type="text"
                id="account"
                name="accountusername"
                value={user.accountusername}
                onChange={handleInputChange}
                required
              />
             
                <label htmlFor="accountpassword">Password</label>
                <input
                  type="text"
                  id="account"
                  name="accountpassword"
                  value={user.accountpassword}
                  onChange={handleInputChange}
                  required
                />
              

        
            <input
              type="hidden"
              id="school"
              name="school"
              value={user.adminID}
              required
            />
         
       

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default AddTeacher;

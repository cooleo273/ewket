import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";

function StudentRegistration() {
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem("accessToken");
  const [user, setUser] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    role: "",
    street: "", // Initialize with an empty string
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
    sclassName: "665f38b8c55f0340bacd8dad",
    adminID: "665b893fbd4f7af08b321eb8",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:5002/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/");
        }
      });
  }, [token, navigate]);
  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5002/users/register",
        user
      );
      console.log(user);
      console.log("Registration successful:", response.data);
      // Redirect to a success page or perform other actions
      navigate("/success");
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="register-body">
      <div className="sidebar">
      <Navbar/>
      </div>
      <div className="dbcwibc">
      <h1>User Registration</h1>
      <div className="registration-container">
      <div className="partition">
      <div className="userInfo">
        <h3>User Information</h3>
        <div className="specificInfo">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={user.fullName}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="specificInfo">
          <label htmlFor="rollNum">Roll Number:</label>
          <input
            type="text"
            id="rollNum"
            name="rollNum"
            value={user.rollNum}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="dateOfBirth">Date of birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="gender">gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label>schoolName</label>
        <input
          type="text"
          id="schoolName"
          name="schoolName"
          value={user.schoolName}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="specificInfo">
          <label>Role</label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleInputChange}
          required
        ></input>
        </div>
        <div className="specificInfo">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={user.nationality}
            onChange={handleInputChange}
            required
          />
        </div>
        <label htmlFor="identificationNumber">Identification Number:</label>
        <input
          type="text"
          id="identificationNumber"
          name="identificationNumber"
          value={user.identificationNumber}
          onChange={handleInputChange}
          required
        />
        <div className="specificInfo">
          <label htmlFor="previousSchool">Previous School:</label>
          <input
            type="text"
            id="previousSchool"
            name="previousSchool"
            value={user.previousSchool}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="useradress">
        <h3>User Address</h3>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          value={user.street}
          onChange={handleInputChange}
          required
        />
        <div className="specificInfo">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={user.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="city">city:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="zip">zip code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={user.zip}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      </div>
      <div className="partition">
      <div className="parent-Information">
        <h3>Parent Information</h3>
        <label htmlFor="pgname">Parent/Guardian Name:</label>
        <input
          type="text"
          id="pgname"
          name="pgname"
          value={user.pgname}
          onChange={handleInputChange}
          required
        />
        <div className="specificInfo">
          <label htmlFor="pgrelationship">
            Relationship with Parent/Guardian:
          </label>
          <input
            type="text"
            id="pgrelationship"
            name="pgrelationship"
            value={user.pgrelationship}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
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
        </div>
        <div className="specificInfo">
          <label htmlFor="pgemail">Parent/Guardian Email:</label>
          <input
            type="email"
            id="pgemail"
            name="pgemail"
            value={user.pgemail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <label htmlFor="pgstreet">Parent/Guardian Address:</label>
          <input
            type="text"
            id="pgstreet"
            name="pgstreet"
            placeholder="Street"
            value={user.pgstreet}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <input
            type="text"
            id="pgCity"
            name="pgcity"
            placeholder="City"
            value={user.pgcity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <input
            type="text"
            id="pgState"
            name="pgstate"
            placeholder="State"
            value={user.pgstate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="specificInfo">
          <input
            type="text"
            id="pgzip"
            name="pgzip"
            placeholder="ZIP Code"
            value={user.pgzip}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="useraccount">
        <h3>User Account</h3>
        <label htmlFor="accountusername">Username:</label>
        <input
          type="text"
          id="account"
          name="accountusername"
          value={user.accountusername}
          onChange={handleInputChange}
          required
        />
        <div className="specificInfo"> 
          <label htmlFor="accountpassword">password:</label>
          <input
            type="text"
            id="account"
            name="accountpassword"
            value={user.accountpassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="button" type="button" onClick={registerUser}>
        Register Student
      </button>
      </div>
      </div>

      <div>
        <input
          type="hidden"
          id="sclassName"
          name="sclassName"
          value={user.sclassName}
          onChange={handleInputChange}
          required
        />
      </div>
      <input
        type="hidden"
        id="school"
        name="school"
        value={user.adminID}
        required
      />

</div>
</div>
    </div>
  );
}

export default StudentRegistration;

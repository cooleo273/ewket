import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import PieChart from "../../components/Piechart";
import axios from "axios";
import Topbar from "../../components/Topbar";
import Navbar from "../../components/Navbar";
import "./styles.css";

function Admin() {
  const [usernumber, setUserNumber] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/users/row-count")
      .then((response) => setUserNumber(response.data.count))
      .catch((error) => console.log(error));
  }, []);
  const [studentnumber, setStudentNumber] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/users/row-count")
      .then((response) => setStudentNumber(response.data.student))
      .catch((error) => console.log(error));
  }, []);
  const [teachernumber, setTeacherNumber] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/users/row-count")
      .then((response) => setTeacherNumber(response.data.teacher))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ProfilePageContainer">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="nameofadmin">
        <div className="searchengine">
          <Topbar />
        </div>

        <main className="main-container">
          <div className="main-cards">
            <div className="card">
              <div className="card-inner">
                <BsFillArchiveFill className="card_icon" />
                <h3>Total Users</h3>
                <h1>{usernumber}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <BsFillGrid3X3GapFill className="card_icon" />
                <h3>Total Students</h3>
                <h1>{studentnumber}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <BsPeopleFill className="card_icon" />
                <h3>TEACHERS</h3>
                <h1>{teachernumber}</h1>
              </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <BsFillBellFill className="card_icon" />
                <h3>ALERTS</h3>
                <h1>42</h1>
              </div>
            </div>
          </div>
        </main>
        <div className="content">
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div
            className="pie-chart"
            style={{ width: "400px", height: "400px" }}
          >
            <PieChart className="pie-chart-wrapper" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

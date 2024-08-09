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
import BarChart from "../../components/BarChart";
import BarCharttwo from "../../components/BarChartTwo";

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
                <div className="pentagon">
                  <BsFillArchiveFill className="card_icon" />
                </div>
                <p>Total Users</p>
                <h1>{usernumber}</h1>
              </div>
            </div>
            <div className="card two">
              <div className="card-inner">
                <div className="pentagon">
                  <BsFillGrid3X3GapFill className="card_icon" />
                </div>

                <p>Total Students</p>
                <h1>{studentnumber}</h1>
              </div>
            </div>
            <div className="card three">
              <div className="card-inner">
                <div className="pentagon">
                  <BsPeopleFill className="card_icon" />
                </div>

                <p>Total Teachers</p>
                <h1>{teachernumber}</h1>
              </div>
            </div>
            <div className="card four">
              <div className="card-inner">
                <div className="pentagon">
                  <BsFillBellFill className="card_icon" />
                </div>

                <p>ALERTS</p>
                <h1>42</h1>
              </div>

            </div>
            <div className="donught-chart">
          <BarChart/>
          </div>
          </div>
        </main>
        <div className="content">
          <div
            className="pie-chart"
            style={{ width: "300px", height: "300px" }}
          >
            <PieChart className="pie-chart-wrapper" />
            
          </div>
          <div className="bar-chart">
            <BarCharttwo/>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

import React from "react";
import { Link } from "react-router-dom";
import img from "../images/college students.jpg";
import Header from "./Header";

function Home() {
  return (  
    <div className="home-container">
      <div className="image-container">
        <Header/>
          <img src={img} alt="college students"/>
          
          
      </div>
      <div className="bfwobenqkdno">
        <div className="message">
          <h1>Message from the president </h1>
          <p> Dear Students,  It gives me a great honor and pleasure to extend my best wishes for the Ethiopian New Year 2015 to the entire School. First, I would like to express my heart-felt gratitude to all of you for your incredible efforts in making the last academic year a success by overcoming all the challenges we had encountered.</p>
        </div>
        <h1>Welcome to SMS</h1>
        <p>
          The main entity sets of the database are Schedule, Instructors,
          News and Students.
        </p>
        <div className="links-container">
          <div>
            <Link to="/Schedule">Schedule</Link>
            <p>click to view the Schedule in the School</p>
          </div>
          <div>
          <Link to='/Instructors'>Instructors</Link>
            <p>click to view the list of Instructors in the School</p>
          </div>
          <div className="About">
          <Link to='/Department' >Latest News</Link>
            <p>click to view the News in the School</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState([]);
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState("")

  
  useEffect(() => {
    axios.get(`http://localhost:3002/auth/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3002/grades/${id}`).then((response) => {
      setGrades(response.data)
    });
    
  },[]);

  

  const addGrade = ()=>{
    axios.post("http://localhost:3002/grades", {grade: newGrade, UserId: id},
    {
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        alert(response.data.error)
      }
      else{
        const gradeToAdd = {grade:newGrade};
      setGrades([...grades, gradeToAdd]);
      setNewGrade("")
    }
      
    })
  }
 
  return (
    <div className="objects-container">
      
      <div className="post-objects-container">
        <div className="post-objects-container-one">
          {postObject.first_name}
        </div>
        <div className="post-objects-container-two">
          {postObject.last_name}
        </div>
        <div>{grades.map((user, key)=>{
          return <div key={key} className="grades">
            {user.grade}
            <label>username:{user.username}</label>
            </div>
          
        })}</div>
        
      </div>
      <div className="grade-section">
        <div className="addGradesContainer">
      
          <input type="text" placeholder="Grades" onChange={(event)=>{setNewGrade(event.target.value)}}/>
          <button className="AddGrade" onClick={addGrade}>Add Grade</button>
        </div>
      </div>
      
    </div>
  );  
}

export default Post;

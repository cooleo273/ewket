import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AddStudents from './Components/Display/AddStudents';
import Post from './Components/Display/Post';

import Home from './Components/Display/Home';
import Login from './Components/Display/Login';
import Department from './Components/Display/Department';
import About from './Components/Display/About';
import Instructor from './Components/Display/Instructor';
import Schedule from './Components/Display/Schedule';
import Profile from './Components/Display/Profile';
import Teachers from './Components/Display/Teachers';
import { AuthContext } from './helpers/AuthContext';
import { useState } from 'react';



function App() {
  const [authState, setAuthState] = useState(false);
  return (
   
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
     
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/AddStudents' element={<AddStudents/>}/>
          <Route path='/Teachers' element={<Teachers/>}/>
          <Route path='/auth/:id' exact element={<Post/>}/>
          <Route path='/LoginPage' exact element={<Login/>}></Route>
          <Route path='/Department' exact element={<Department/>}></Route>
          <Route path='/About' exact element={<About/>}></Route>
          <Route path='/Schedule' exact element={<Schedule/>}></Route>
          <Route path='/Instructors' exact element={<Instructor/>}></Route>
          <Route path='/Profile/:id' exact element={<Profile/>}></Route>
        </Routes>
      </Router>
      </AuthContext.Provider>
      </div>
    
    
  );
}

export default App;

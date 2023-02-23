import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AddStudents from './Components/Display/AddStudents';
import Post from './Components/Display/Post';
import Teachers from './Components/Display/Teacher';
import Home from './Components/Display/Home';
import Login from './Components/Display/Login';
import Department from './Components/Display/Department';
import About from './Components/Display/About';
import Instructor from './Components/Display/Instructor';
import Schedule from './Components/Display/Schedule';



function App() {
  return (
    <div className="App">
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
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;

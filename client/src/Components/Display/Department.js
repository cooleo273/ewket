import React from 'react'
import img from "../images/myhc_78689.jpg"
import img1 from "../images/University-Lecturer.jpg"
import img2 from "../images/img-elec.jpg"
import img3 from "../images/Hawassa_University_main_gate_to_the_main_campus.jpg"
import Header from './Header'

function Department() {
  return (
    <div className='department-container'>
      <Header/>
      <h1>Latest News</h1>
      <div className='latest-news'>
        <img src={img} alt='lecturers'/>
        <div className='ha'>
        <h3>Public Lecture on ..</h3>
        <p>Delegates from Hungary Discuss Potential Collaboration with Hawassa University.</p>
        </div>
      </div>
      <div className='latest-news'>
        <img src={img1} alt='lecturers'/>
        <div className='ha'>
        <h3>Public Lecture on ..</h3>
        <p>Delegates from Hungary Discuss Potential Collaboration with Hawassa University.</p>
        </div>
      </div>
      <div className='latest-news'>
        <img src={img2} alt='lecturers'/>
        <div className='ha'>
        <h3>Public Lecture on ..</h3>
        <p>Delegates from Hungary Discuss Potential Collaboration with Hawassa University.</p>
        </div>
      </div>
      <div className='latest-news'>
        <img src={img3} alt='lecturers'/>
        <div className='ha'>
        <h3>Public Lecture on ..</h3>
        <p>Delegates from Hungary Discuss Potential Collaboration with Hawassa University.</p>
        </div>
      </div>
    </div>
  )
}

export default Department
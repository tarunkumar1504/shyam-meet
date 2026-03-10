import React from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {
  const router = useNavigate()
  return (
    <div className='main'>
      <nav>
        <div className="part1">Shyam Meet</div>
        <div className="part2">
          <ul>
            <li onClick={()=>{
              router("/q123")
            }}>Join As Guest</li>
            <li onClick={()=>{
              router("/auth")
            }}>Register</li>
            <li onClick={()=>{
              router("/auth")
            }}>
              <div id='btn'>Login</div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="landingcontainer">
        <div className="left">
          <h1><span id='pt'>Connect</span>. Collaborate. Communicate</h1>
          <p>ShyamMeet makes real-time video meetings simple, secure, and seamless.</p>
          <div className='mainbtn'>
            <Link to={"/home"} >Meet Now</Link>
          </div>
        </div>
        <div className="right">
          <img src="/videocall.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Landing

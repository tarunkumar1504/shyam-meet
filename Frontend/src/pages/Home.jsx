import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import withAuth from '../utils/withAuth'
import { Button, IconButton , TextField} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import '../App.css'
import { AuthContext } from '../contexts/AuthContext';

function Home() {

    let navigate = useNavigate()
    const [meetingCode, setMeetingCode] = useState("");

    const {addtoHistory}= useContext(AuthContext)

    let handleJoinVideo = async () =>{
        navigate(`/${meetingCode}`)
    }

  return (
    <div className='mainHome' style={{fontFamily:'sans-serif'}}>
      <div className="navBar">
        <div style={{display:"flex" , alignItems:"center"}}>
            <h2>Shyam Meet </h2>
        </div>
        <div style={{display:"flex" , alignItems:"center"}}>
            <IconButton onClick={
                ()=>{
                    navigate("/history")
                }
            }>
                <RestoreIcon />
            </IconButton>
                <p>History </p>
            <Button onClick={()=>{
                localStorage.removeItem("token")
                navigate("/auth")
            }}>Logout</Button>
        </div>
      </div>
    

    <div className="meetContainer">
        <div className="leftPanel">
            <div>
                <h2>Providing Quality Video Call Just Like Quality Education</h2>

                <div style={{display:'flex', gap:'11px'}}>
                    <TextField onChange={e=> setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" ></TextField>
                    <Button onClick={handleJoinVideo} variant='contained'>Join</Button>
                </div>
            </div>
        </div>
        <div className="rightPanel">
            <img src="/videocall2.png" alt="" />
        </div>
    </div>
      
    </div>
  )
}

export default withAuth(Home)

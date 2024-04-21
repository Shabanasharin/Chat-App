import React, { useState } from 'react'
// import logo from '../assets/chatlogo.png'
import logo from '../assets/Chat-Logo.png'

import { Link,useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {toast } from 'react-toastify';
function LandingPage() {
  const navigate = useNavigate()
  const [userName,setUserName] = useState("")
  // console.log(userName);


  const groupcreation = () =>{
    if(userName){
      navigate('/chatboat',{state:userName})
    }
    else{
      toast.error('Enter Your Username', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  }

  return (
    <>
         <div className="body1 bg-light  d-flex justify-content-center align-items-center flex-column" style={{width:'100%',height:'100vh'}}>
            
                <img src={logo} style={{width:'50%'}} alt="" />
                {/* <img src="https://logos-world.net/wp-content/uploads/2022/04/Google-Chat-Logo.png"  style={{width:'30%',marginBottom:"50px"}} alt="" /> */}

                    <input className='rounded' type="'text'" onChange={(e)=>setUserName(e.target.value)} placeholder='Enter Username' style={{textAlign:'center',width:'35%',height:'45px'}}/>
                    <br />
                    <button onClick={groupcreation}  className='btn btn-success' style={{textAlign:'center',width:'35%',height:'45px'}}>Start Messaging</button>
                    
                
         </div>

    </>
  )
}

export default LandingPage
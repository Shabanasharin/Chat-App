import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Msgbox from './Msgbox';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Redux/chatSlice";

function ChatPage() {
  const location = useLocation();
  const user = location.state;
  const [typeMessage, setTypeMessage] = useState("");
  const [newSocket, setNewSocket] = useState();
  const [id, setUserId] = useState();
  const boxref = useRef(null);
  const dispatch = useDispatch();
  const datared = useSelector(state => state.chatReducer);

  useEffect(() => {
    const socket = io("https://chat-server-amgb.onrender.com");
    setNewSocket(socket);

    socket.on("connect", () => {
      setUserId(socket.id);
      socket.emit('joined', { user });
    });

    socket.on('welcome', (data) => {
      dispatch(setChat(data));
    });

    socket.on('userJoined', (data) => {
      dispatch(setChat(data));
    });

    socket.on('sendMessage', (data) => {
      dispatch(setChat(data));
    });

    socket.on('leave', (data) => {
      dispatch(setChat(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const send = () => {
    if (typeMessage !== "") {
      newSocket.emit('message', { message: typeMessage, id });
      setTypeMessage("");
    }
  };

  useEffect(() => {
    boxref.current?.lastElementChild?.scrollIntoView();
  }, [datared]);
  

  return (
    <>
      <div className="body2 bg-light">
        <div className="row chatpage  shadow d-flex justify-content-center align-items-center w-100 mt-4">

          
            <div className="row  text-light bg-success p-3 mt-5 " style={{width:"55%"}} >
              <span><Link to={'/'}><i className="fa-solid fa-chevron-left" style={{ color: "#ffffff" }}></i></Link>&ensp; Logout</span>
            </div>
            <div className='chtbg' style={{width:'55%',height:'501px',marginTop:'0px'}}>
  
            <div ref={boxref} className="chatpart w-100">
              {datared && datared.map((item, index) => (
                <Msgbox key={index} user={user} name={item.user} message={item.message} />
              ))}
  
              
            </div>
            <div className="textmsg mt-5 mb-5" style={{height:'200px'}}>
                <input type="text" className="rounded  mt-5 ps-3 w-100" placeholder='Type Message...' onChange={(e) => setTypeMessage(e.target.value)} value={typeMessage} style={{ height: '40px' }} />
                <button onClick={send} className='btn btn-success  mt-5 ms-1 me-2' style={{ width: '50px', height: '40px', border:"1px",borderRadius:'50%'}}><i className="fa-regular fa-paper-plane " style={{ color: "#fcfcfc" ,alignItems:'center'}}></i></button>
              </div>
          </div>

        </div>
        {/* <div className="row watermark" style={{marginTop:'-140px'}}>
          <div className="col-9"></div>
          <div className="col mt-5" style={{marginTop:'-50px'}}>
            <img src={logo} width={'250px'} height={'150px'} style={{zIndex:'99999',position:'absolute'}} alt="" />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ChatPage;

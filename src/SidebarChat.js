import React from 'react';
import "./SidebarChat.css";
import {Typography} from "@material-ui/core"
import {Link} from "react-router-dom";

const SidebarChat = ({id,name})=> {
    // const [seed,setseed]=useState("");

    // useEffect(()=>{
    //     setseed(Math.floor(Math.random()*5000))
    // },[])
    return id?
           (
           <Link to={`/rooms/${id}`} >    
           <div className="sidebar_chat">
          <div className="sidebarchat_info">  
          <Typography variant='subtitle1'
          style={{
            fontWeight:'bold',
            color:'#ffffff'
          }}
          >{name}</Typography>
          <Typography variant='subtitle2'
          style={{
            color:"#5c5d5f"
          }}
          >last chat details</Typography>
          </div>
          </div>
          </Link>
          )
          :
         null
    
    
}

export default SidebarChat

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Switch,Route }from "react-router-dom";
import MainMenu from "./MainMenu";
const App=()=>{
  const [isSidebar, ] = useState(true);
  const [messages, setMessages] = useState(true); 
  const [searchResults, setSearchResults] = useState([]);
  const [mode, setMode] = useState(false);
  const [rooms,setrooms]=useState([]);
  const [users,setUsers]=useState([]);
  
  useEffect(() => {
    const filteredResults = mode ? users : rooms
     console.info(filteredResults);
    setSearchResults(filteredResults);
},[mode, rooms, users])
  return(
      <div className="app">
          <MainMenu messages={messages} setMessages={setMessages} setMode={setMode} mode={mode}/>
      <Sidebar isSidebar={isSidebar} messages={messages} mode={mode} searchResults={searchResults} setSearchResults={setSearchResults}
      users={users}
      setUsers={setUsers}
      rooms={rooms}
      setrooms={setrooms}
      />
      <main className="content">
        <Switch>
         <Route path="/rooms/:roomId">
          <Chat mode={mode}/>
          </Route>
          <Route path="/">
            <Chat mode={mode}/>
            </Route>
            </Switch>
          </main>
      </div>
  )
}
export default App;






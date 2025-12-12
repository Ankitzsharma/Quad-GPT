import './App.css'
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { useState, useEffect } from 'react';
import {v1 as uuidv1} from "uuid";
import Login from './Login.jsx';
import UpgradePlan from './UpgradePlan.jsx';
function App() {
  const [prompt, setPrompt]= useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //Stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [selectedModels, setSelectedModels] = useState([]);
  const apiBase = import.meta.env.VITE_API_BASE || "https://quadgpt-backend.onrender.com";
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme) setTheme(savedTheme);
    const token = localStorage.getItem("token");
    if(token) setUser({ token });
  },[]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    user, setUser,
    theme, setTheme,
    selectedModels, setSelectedModels,
    apiBase,
    showUpgrade, setShowUpgrade
  };
  
  return (
    <div className={`app ${theme}`}>
      <MyContext.Provider value={providerValues}>
        {user ? (
          <>
            <Sidebar></Sidebar>
            <ChatWindow></ChatWindow>
            {showUpgrade && <UpgradePlan></UpgradePlan>}
          </>
        ) : (
          <Login></Login>
        )}
      </MyContext.Provider>
    </div>
  )
}

export default App

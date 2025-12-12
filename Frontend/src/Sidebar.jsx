import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";


function Sidebar(){

    const {allThreads, setAllThreads, currThreadId,setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, user, apiBase, theme, setTheme }=useContext(MyContext);
    const [query, setQuery] = useState("");

    const getAllThreads = async()=>{
        try{
            const response = await fetch(`${apiBase}/api/thread`, {
                headers: {
                    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
                }
            });
            const res= await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title, updatedAt: thread.updatedAt}));
            // console.log(filteredData);
            setAllThreads(filteredData);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getAllThreads();
    }, [currThreadId])



    const createNewChat=()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);

    }



    const changeThread = async(newThreadId)=>{
        setCurrThreadId(newThreadId);

        try{
            const response = await fetch(`${apiBase}/api/thread/${newThreadId}`, {
                headers: {
                    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
                }
            });
            const res= await response.json();
            console.log(res);
            setPrevChats(res)
            setNewChat(false);
            setReply(null);

        }catch(err){
            console.log(err);
        }

    }

    const deleteThread = async (threadId) =>{
        try{
            const response = await fetch(`${apiBase}/api/thread/${threadId}`, {
                method: "DELETE",
                headers: {
                    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
                }
            });
            const res= await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !==threadId));

            if(threadId === currThreadId){
                createNewChat();
            }
            
        }catch(err){
            console.log(err);
        }
    }

    const logoSrc = theme === "light" ? "src/assets/GPT3.png" : "src/assets/GPT3.png";
    const formatAgo = (d)=>{
        const diff = Math.floor((Date.now() - new Date(d).getTime())/60000);
        if(isNaN(diff)) return "";
        if(diff < 1) return "just now";
        if(diff === 1) return "1 minute ago";
        if(diff < 60) return `${diff} minutes ago`;
        const hours = Math.floor(diff/60);
        if(hours === 1) return "1 hour ago";
        return `${hours} hours ago`;
    };
    const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

    return(
        <section className="sidebar">
            <div className="brandRow">
                <img src={logoSrc} alt="Logo" className="logo"></img>
                <div className="brandText">
                    <strong>QuadGPT</strong>
                    <span>Intelligent AI Assistant</span>
                </div>
            </div>
            <button className="newChatBtn" onClick={createNewChat}>
                <span>New Chat &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i class="fa-solid fa-plus"></i></span>
            </button>
            <div className="searchBox">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input placeholder="Search conversations" value={query} onChange={(e)=>setQuery(e.target.value)} />
            </div>
            <div className="sectionTitle">Recent Chats</div>
            <ul className="history">
                {
                    filtered?.map((thread, idx) =>(
                        <li key={idx}
                            onClick={()=>changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : " "}
                        >
                            <div className="threadTitle">{thread.title}</div>
                            <div className="threadTime">{formatAgo(thread.updatedAt)}</div>
                            <i className="fa-solid fa-trash"
                                onClick={(e)=>{
                                    e.stopPropagation(); //to stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>
            <div className="bottomControls">
                <div className="modeRow">
                    <span><i className="fa-regular fa-sun"></i> Dark Mode</span>
                    <label className="switch">
                        <input type="checkbox" checked={theme === "dark"} onChange={()=>setTheme(theme === "dark" ? "light" : "dark")}/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="sign">
                    <p>&copy; Ankit Sharma &hearts;</p>
                </div>
            </div>
        </section>
    )
}
export default Sidebar;

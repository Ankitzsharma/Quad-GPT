import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, setReply, currThreadId, setPrevChats, setNewChat, user, setUser, theme, setTheme, apiBase, setShowUpgrade} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  //set default false value

    const getReply = async () => {
        if (loading || !prompt.trim()) return;
        
        setLoading(true);
        setNewChat(false);

        const currentPrompt = prompt;
        setPrompt("");

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
            },
            body: JSON.stringify({
                message: currentPrompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch(`${apiBase}/api/chat`, options);
            if (!response.ok) {
                const errorRes = await response.json();
                throw new Error(errorRes.error || "Failed to get response");
            }
            const res = await response.json();
            
            setReply(res.reply);
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: currentPrompt
                },{
                    role: "assistant",
                    content: res.reply
                }]
            ));
        } catch(err) {
            console.error("Chat Error:", err);
            // Optionally add an error message to the chat
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: currentPrompt
                },{
                    role: "assistant",
                    content: "You’ve exceeded your API credit limit.\nThis means your available credits have been used up.\nPlease upgrade your plan or add more credits to continue."
                }]
            ));
        } finally {
            setLoading(false);
        }
    }

    // Removed the useEffect that added messages based on 'reply' changes
    // to avoid potential race conditions or double-addition.


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }
    const toggleTheme = () => {
        const t = theme === "dark" ? "light" : "dark";
        setTheme(t);
        localStorage.setItem("theme", t);
        setIsOpen(false);
    }
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsOpen(false);
    }
    
    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>QuadGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem" onClick={toggleTheme}><i className="fa-solid fa-gear"></i> Toggle theme</div>
                    <div className="dropDownItem" onClick={()=>{ setShowUpgrade(true); setIsOpen(false); }}><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            <Chat></Chat>

            <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder=" Ask anything...."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    >
                           
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    QuadGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;

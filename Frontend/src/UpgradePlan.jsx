import { useContext } from "react";
import "./UpgradePlan.css";
import { MyContext } from "./MyContext.jsx";

function UpgradePlan(){
  const { setShowUpgrade } = useContext(MyContext);
  return (
    <div className="upgradeOverlay">
      <div className="upgradeContainer">
        <div className="upgradeHeader">
          <h2>Upgrade your plan</h2>
          
          <button className="closeBtn" onClick={()=>setShowUpgrade(false)}>✕</button>
        </div>
        <div className="plans">
          <div className="planCard">
            <h3>Go</h3>
            <div className="priceRow">
              <span className="strike">₹399</span>
              <span className="price">₹0</span>
              <span className="note">promo until Nov 5, 2026</span>
            </div>
            <button className="currentBtn">Your current plan</button>
            <ul>
              <li>Go deep on harder questions</li>
              <li>Chat longer and upload more content</li>
              <li>Make realistic images for your projects</li>
              <li>Store more context for smarter replies</li>
              <li>Get help with planning and tasks</li>
              <li>Explore projects, tasks, and custom GPTs</li>
            </ul>
          </div>
          <div className="planCard">
            <h3>Plus</h3>
            <div className="priceRow">
              <span className="price">₹1,999</span>
              <span className="note">INR / month</span>
            </div>
            <button className="buyBtn">Get Plus</button>
            <ul>
              <li>Solve complex problems</li>
              <li>Have long chats over multiple sessions</li>
              <li>Create more images, faster</li>
              <li>Remember goals and past conversations</li>
              <li>Plan travel and tasks with agent mode</li>
              <li>Organize projects and customize GPTs</li>
            </ul>
          </div>
          <div className="planCard">
            <h3>Pro</h3>
            <div className="priceRow">
              <span className="price">₹19,900</span>
              <span className="note">INR / month</span>
            </div>
            <button className="buyBtn">Get Pro</button>
            <ul>
              <li>Master advanced tasks and topics</li>
              <li>Unlimited messages for large projects</li>
              <li>High-quality images at any scale</li>
              <li>Keep full context with maximum memory</li>
              <li>Run research and plan tasks with agents</li>
              <li>Scale workflows and automate processes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlan;


import React, { useState } from "react";
import "./style.css";

export default function InitialPrompt({ onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
    }, 300); 
  };

  return (
    <div
      className="initial-prompt-container"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div className="chat-bubble">Hi, I am FM Digital Assistant,<br/> How Can I Help?</div>
      <div className="chat-avatar">
        <img src="/assets/chat/Images/chatani.gif" alt="Chatbot Avatar" />
      </div>
    </div>
  );
}

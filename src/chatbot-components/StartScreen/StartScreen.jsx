import React from "react";
import "./style.css";
import { IoChatbubbleOutline } from "react-icons/io5";

const StartScreen = ({ onOpen, onChatUsClick }) => {
  return (
    <div className="chatbot-wrapper" onClick={onOpen}>
      <div className="chatbot-frame">
        <div className="animated-border">
          <div className="chatbot-inner">
            {/* <video
              className="chatbot-video"
              src="/assets/Images/ai-chatbot.gif"
              autoPlay
              loop
              muted
              playsInline
            /> */}
            <img
              className="chatbot-video"
              src="/Assets/chat/Images/ai-chatbot.gif"
              alt="AI Chatbot animation"
            />
            <div className="ai-label">AI</div>
            <div className="chatbot-content">
              <div className="chatbot-text">We're online!</div>
              <div className="chatbot-buttons">
                <button
                  className="chat-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChatUsClick();
                  }}
                >
                  <IoChatbubbleOutline className="chat-us-icon" />
                  Chat Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

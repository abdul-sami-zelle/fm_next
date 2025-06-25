import React from "react";
import "./style.css";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const StartScreen = ({ onOpen, onChatUsClick, onStartScreenClose }) => {
  return (
    <div className="chatbot-wrapper">
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
              onClick={onOpen}
            />

            <div className="ai-label">AI</div>
            <RxCross2
              className="RxCross2"
              onClick={(e) => {
                e.stopPropagation();
                onStartScreenClose();
              }}
            />

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

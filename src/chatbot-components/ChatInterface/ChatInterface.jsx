import React, { useState, useEffect, useRef } from "react";

import "./style.css";
import { FiArrowLeft } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineAttachFile } from "react-icons/md";
import { LuSend } from "react-icons/lu";

export default function ChatInterface({
  onBack,
  onUserSend,
  onClose,
  initialMessages = [],
}) {
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBack = () => {
    setIsClosing(true);
    setTimeout(() => {
      onBack();
    }, 100);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 100);
  };
  const [messages, setMessages] = useState([...initialMessages]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "/assets/chat/Images/profile-img.png",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      onUserSend();
    }
  };

  return (
    <div className="chat-interface-container">
      <div className="chat-header">
        <button className="close-btn" onClick={handleBack}>
          <FiArrowLeft className="back-icon" />
        </button>
        <div className="headers">
          <h1>Furniture Mecca</h1>
          <div className="online-status">
            <span className="online-dot"></span>
            <p>Online</p>
          </div>
        </div>
        <button className="close-btn" onClick={handleClose}>
          <FaChevronDown className="downs-icon" />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.sender}`}>
            <img
              src={message.avatar}
              alt={`${message.sender} avatar`}
              className="message-avatar"
            />
            <div className={`message ${message.sender}`}>
              <p>{message.text}</p>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <button className="attachment-btn">
          <MdOutlineAttachFile className="attachment-icon" />
        </button>
        <input
          type="text"
          placeholder="Type message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>
          <LuSend className="send-icon" />
        </button>
      </div>
    </div>
  );
}

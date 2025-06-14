import React, { useState, useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FiSend } from "react-icons/fi";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import "./style.css";

const ChatUs = ({ onBack, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = {
        id: messages.length + 1,
        text: `📷 Image sent: ${file.name}`,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
    }
  };

  const handleSend = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setShowEmojiPicker(false);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! Our team will get back to you shortly.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Great to see you back again at Furniture Mecca. How's everything going at XCLUSIVE NETWORK?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsBotTyping(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
};


  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="chatus-container">
      <div className="chatus-header">
        <div className="header-content">
          <div className="cht-back">
            <RiArrowLeftSLine className="back-chat-icon" onClick={onBack} />
            <div className="supportperson">
              <div className="avatarwrapper">
                <img src="https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg" />
                <span className="ailabeltxt">AI</span>
              </div>
              <div className="messageinfo">
                <p className="personname">Bella</p>
                <p className="messagepreview">AI Assistant</p>
              </div>
            </div>
          </div>
          <RxCross1 className="close-icon" onClick={onClose} />
        </div>
      </div>

      <div className="chatus-body">
        <div className="messages-container">
          {isBotTyping && (
            <div className="message-row bot-row">
              <div className="avatarwrapper1">
                <img src="https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg" />
                <span className="ailabeltxt1">AI</span>
              </div>
              <div className="message-bubble bot">
                <div className="message-content typing-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${
                msg.sender === "user" ? "user-row" : "bot-row"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="avatarwrapper1">
                  <img src="https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg" />
                  <span className="ailabeltxt1">AI</span>
                </div>
              )}
              <div className={`message-bubble ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
                <div className="message-timestamp">
                  {formatMessageTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showEmojiPicker && (
          <div
            style={{
              position: "absolute",
              bottom: "100px",
              right: "10px",
              zIndex: 10,
            }}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <div className="chatus-footer">
          <div className="input-container">
            <textarea
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              className="textarea-style"
            />
            <div className="buttonssss">
              <div className="attach-emoji-btn">
                <button className="image-button" onClick={handleImageClick}>
                  <CiImageOn />
                </button>
                <button
                  className="emoji-button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <MdOutlineEmojiEmotions />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <button
                  className="send-button"
                  onClick={handleSend}
                  disabled={message.trim() === ""}
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="poweredby">
          <p>
            Powered By{" "}
            <a
              href="https://zellesolutions.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/Assets/chat/Images/zelle.png"
                style={{ height: "25px", width: "25px" }}
                alt="Chatbot Avatar"
              />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatUs;

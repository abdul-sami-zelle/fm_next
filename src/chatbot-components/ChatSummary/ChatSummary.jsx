import React, { useState } from "react";
import "./style.css";
import { FaChevronDown } from "react-icons/fa";
import { BsMessenger, BsInstagram } from "react-icons/bs";
import { LuPen } from "react-icons/lu";

export default function ChatSummary({
  onClose,
  onMessageClick,
}) {
  const [activeIcon, setActiveIcon] = useState("pen");
  const [isClosing, setIsClosing] = useState(false);
  const [isMessageClick, setIsMessageClick] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleMessageClick = () => {
    setIsMessageClick(true);
    setTimeout(() => {
      onMessageClick();
    }, 100);
  };
  const icons = [
    { id: "pen", Icon: LuPen },
    { id: "messenger", Icon: BsMessenger },
    { id: "instagram", Icon: BsInstagram },
  ];
  return (
   <div className="welcome-screen-container">
      <div className="header-section">
        <div className="btn-main">
          <button className="close-button" onClick={handleClose}>
            <FaChevronDown className="down-icon" />
          </button>
        </div>
        <div className="peoples">
            <div className="people-images">
            <img src="/assets/Images/sami.png" alt="" />
            <img src="/assets/Images/faraz.png" alt="" />
            <img src="/assets/Images/rashid.png" alt="" />
          </div>
          <h1>Furniture Mecca</h1>
          <p>We are here to help</p>
        </div>
      </div>
      <div className="second-container">
        <div className="icons">
          {icons.map(({ id, Icon }) => (
            <div
              key={id}
              className={`icon-wrapper ${activeIcon === id ? "active" : ""}`}
              onClick={() => {
                setActiveIcon(id);
                if (id === "messenger") {
                  window.open(
                    "https://www.facebook.com/myfurnituremecca",
                    "_blank"
                  );
                }
                if (id === "instagram") {
                  window.open(
                    "https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D",
                    "_blank"
                  );
                }
              }}
            >
              <Icon className="chat-icon" />
            </div>
          ))}
        </div>

        <div className="summary-divider">
          <div className="summary-message"  onClick={handleMessageClick}>
            <div className="chatbot">
              <img
                src="/assets/Images/chatbot.png"
                alt="chatbot"
                className=""
              />
            </div>
            <div>
              <h2>Furniture Mecca</h2>
              <p>
                Great question! The UVG Solid comes in one piece and its
                dimensions are: 85" (W) × 35" (D) × 32" (H). We recommend m...
              </p>
            </div>
          </div>
          <div className="border-line">

          </div>
        </div>
        <div className="powered">
          Powered By{" "}
          <a
            href="https://zellesolutions.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Zelle Solutions</strong>
          </a>
        </div>
      </div>
    </div>
  );
}

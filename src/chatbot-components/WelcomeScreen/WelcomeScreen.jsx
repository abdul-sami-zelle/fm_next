import React, { useState } from "react";
import "./style.css";
import { FaChevronDown } from "react-icons/fa";
import { BsMessenger, BsInstagram } from "react-icons/bs";
import { LuPen } from "react-icons/lu";

const faqs = [
  { question: "What materials are used in your furniture?" },
  { question: "How do I care for and maintain my furniture?" },
  { question: "What if my furniture doesn’t fit through the doorway?" },
  { question: "Do you offer delivery services?" },
  { question: "Can I return or exchange my furniture?" },
  { question: "How long is the delivery time?" },
  { question: "Do you offer customization options?" },
];

export default function WelcomeScreen({
  onChatClick,
  onFaqClick,
  activeFaq,
  onClose,
}) {
  const [activeIcon, setActiveIcon] = useState("pen");
  const [isClosing, setIsClosing] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleChatClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dummyMessages = [
        {
          text: "Hi! 👋 Welcome to Furniture Mecca. How can we help you today?",
          sender: "bot",
          time,
          avatar: "/assets/chat/Images/chatbot.png",
        },
        {
          text: "Ask us anything about our furniture, delivery options, or customization!",
          sender: "bot",
          time,
          avatar: "/assets/chat/Images/chatbot.png",
        },
      ];
      onChatClick(dummyMessages);
    }, 300);
  };
  const handleFaqClick = (index) => {
    const selectedQuestion = faqs[index].question;
    setIsClosing(true);
    setTimeout(() => {
      onFaqClick(selectedQuestion);
    }, 300);
  };

  const icons = [
    { id: "pen", Icon: LuPen },
    { id: "messenger", Icon: BsMessenger },
    { id: "instagram", Icon: BsInstagram },
  ];

  return (
    <div
      className={`welcome-screen-container ${
        isClosing ? "animate-out" : "animate-in"
      }`}
    >
      <div className="header-section">
        <div className="btn-main">
          <button className="close-button" onClick={handleClose}>
            <FaChevronDown className="down-icon" />
          </button>
        </div>
        <div className="peoples">
          <div className="people-images">
            <img src="/assets/chat/Images/sami.png" alt="" />
            <img src="/assets/chat/Images/faraz.png" alt="" />
            <img src="/assets/chat/Images/rashid.png" alt="" />
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
        <div className="faq-section">
          <h2>Frequently Asked</h2>
          <div className="faq-subSection">
            {(showAllFaqs ? faqs : faqs.slice(0, 3)).map((faq, index) => (
              <div
                key={index}
                onClick={() => handleFaqClick(index)}
                className="faq-item"
              >
                <div className="faq-question">
                  <p>{faq.question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!showAllFaqs && (
          <div className="view-all" onClick={() => setShowAllFaqs(true)}>
            <p>View all</p>
          </div>
        )}
        <div className="chat-with-us">
          <button className="chat-button" onClick={handleChatClick}>
            Chat with us
          </button>
        </div>
        <div className="powered-by">
          Powered By{" "}
          <a
            href="https://zellesolutions.com"
            target="_blank"
            rel="noopener noreferrer"
          >
{/*             <strong>Zelle Solutions</strong> */}
            <img src="/assets/chat/Images/zelle.png" style={{height:"25px",width:"25px"}} alt="Chatbot Avatar" />
          </a>
        </div>
      </div>
    </div>
  );
}

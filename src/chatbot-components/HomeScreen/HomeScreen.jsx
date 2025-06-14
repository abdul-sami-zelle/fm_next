import React, { useState, useEffect } from "react";
import "./style.css";
import { RxCross1 } from "react-icons/rx";
import { BsFillChatFill } from "react-icons/bs";
import { MdOutlineCalendarToday, MdPhone } from "react-icons/md";
import { PiChatCircleBold } from "react-icons/pi";
import { RiChat3Fill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";

const HomeScreen = ({ onClose, onOpenChatUs, onOpenOffline ,onOpenOnlineChat}) => {
  const [showAllConversations, setShowAllConversations] = useState(false);
  const [isTeamOnline, setIsTeamOnline] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning!");

  const conversations = [
    {
      name: "Bella",
      message: "Hi there! Great to see you back again a...",
      img: "https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg",
    },
    {
      name: "Bella",
      message: "Hello, nice to meet you! How can I help ...",
      img: "https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg",
    },
    {
      name: "Bella",
      message: "Hello, nice to meet you! How can I help ...",
      img: "https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg",
    },
    {
      name: "Bella",
      message: "Just let me know if you have any questi...",
      img: "https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg",
    },
  ];
  const faqs = [
    { id: 1, question: "How long does furniture delivery take?" },
    { id: 2, question: "Do you offer assembly services for furniture?" },
    { id: 3, question: "What is your return policy for furniture items?" },
    { id: 4, question: "How do I care for and maintain leather furniture?" },
    { id: 5, question: "Can I customize furniture dimensions or fabrics?" },
    { id: 6, question: "Do you offer in-home consultation services?" },
    { id: 7, question: "What warranties come with your furniture?" },
  ];

  const visibleConversations = showAllConversations
    ? conversations
    : conversations.slice(0, 2);

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning!");
    else if (hour < 18) setGreeting("Good Afternoon!");
    else setGreeting("Good Evening!");

    const online = Math.random() < 0.6;
    setIsTeamOnline(online);
  }, []);

  return (
    <div className="home-screen-container">
      <div className="home-screen-subcontainer">
        <div className="video-section-wrapper">
          <img
            className="background-video"
            src="/Assets/chat/Images/ai-chatbot.gif"
            alt="AI Chatbot animation"
          />
          <div className="video-overlay-content">
            <div className="header">
              <RxCross1 className="cross-icon" onClick={onClose} />
            </div>

            <div>
              <div className="greeting">
                <h2>{greeting}</h2>
                <p>How can we help you today?</p>
              </div>

              <div className="ai-button-container" onClick={onOpenChatUs}>
                <div className="btn-overlay"></div>
                <div className="image-with-text">
                  <div className="ai-avatar-image-wrapper">
                    <div className="ai-label-text">AI</div>
                    <div className="online-dot"></div>
                    <div className="avatar-image-inner">
                      <img
                        src="https://cdn.servicebell.com/assets/bella-idle-default.c62aea33..jpeg"
                        alt="AI Avatar"
                        className="avatar-image"
                      />
                    </div>
                  </div>
                  <span className="talk-to-ai-text">
                    Chat with Digital Assistant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-screen-box">
          <div className="team">
            <p>
              Our team is{" "}
              <span className={isTeamOnline ? "online" : "offline"}>
                {isTeamOnline ? "Online" : "Offline"}
              </span>
            </p>

            {isTeamOnline ? (
              <div className="peopless">
                <div className="peopleimages">
                  <img src="/Assets/chat/Images/advisor1.png" alt="Advisor" />
                  <img src="/Assets/chat/Images/advisor2.png" alt="Advisor" />
                  <img src="/Assets/chat/Images/advisor3.png" alt="Advisor" />
                </div>
              </div>
            ) : (
              <p className="leave-us-a-message" onClick={onOpenOffline}>
                Leave us a Message
              </p>
            )}
          </div>

          <div className="chat-us-btn" onClick={onOpenOnlineChat}>
            <p>
              <PiChatCircleBold className="chat-us-icon" /> Chat Us
            </p>
          </div>
          <div className="meeting-us-btn">
            <p>
              <MdOutlineCalendarToday className="meeting-us-icon" /> Book
              Meeting
            </p>
          </div>

          <div className="support-people-list">
            {conversations.length > 0 && (
              <>
                <h2>Continue the conversation</h2>
                <div className="support-people-items">
                  {visibleConversations.map((c, i) => (
                    <div className="support-person" key={i}>
                      <div className="avatar-wrapper">
                        <img src={c.img} alt={c.name} />
                        <span className="ai-label-txt">AI</span>
                      </div>
                      <div className="message-info">
                        <p className="person-name">{c.name}</p>
                        <p className="message-preview">{c.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {!showAllConversations && conversations.length > 2 && (
                  <div
                    className="see-all"
                    onClick={() => setShowAllConversations(true)}
                  >
                    See all conversations
                  </div>
                )}
              </>
            )}
          </div>
          <div className="support-people-list">
            <h2>Frequently Asked Questions</h2>
            <div className="faq">
              {visibleFaqs.map((faq) => (
                <div key={faq.id} className="faqitem">
                  {faq.question}
                </div>
              ))}
            </div>

            {!showAllFaqs && faqs.length > 4 && (
              <div
                className="view-all-faqs"
                onClick={() => setShowAllFaqs(true)}
              >
                View All
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <p>
          <IoMdHome className="home-icon" />
          Home
        </p>
        <p>
          <RiChat3Fill className="home-icon" />
          Chat
        </p>
      </div>

      <div className="footer-bottom">
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
  );
};

export default HomeScreen;

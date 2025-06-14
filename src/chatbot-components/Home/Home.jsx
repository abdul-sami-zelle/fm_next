import React, { useState } from "react";
import "./style.css";
import StartScreen from "../StartScreen/StartScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import ChatUs from "../ChatUs/ChatUs";
import OfflineScreen from "../OfflineScreen/OfflineScreen";
import { IoChevronDown } from "react-icons/io5";
import OnlineChatUs from "../OnlineChatUs/OnlineChatUs";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChatUsOnly, setShowChatUsOnly] = useState(false);
  const [showOfflineScreen, setShowOfflineScreen] = useState(false);
  const [showOnlineChatUs, setShowOnlineChatUs] = useState(false);

  const handleOpenOnlineChat = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowOnlineChatUs(true);
      setShowOfflineScreen(false);
      setShowChatUsOnly(false);
      setIsOpen(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleOpen = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsOpen(true);
      setShowChatUsOnly(false);
      setIsTransitioning(false);
    }, 300);
  };
const handleBack = () => {
  setIsTransitioning(true);
  setTimeout(() => {
    setShowOnlineChatUs(false); // ADD THIS
    setIsOpen(true);
    setShowChatUsOnly(false);
    setShowOfflineScreen(false);
    setIsTransitioning(false);
  }, 300);
};


  const handleOpenChatUsOnly = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowChatUsOnly(true);
      setIsOpen(false);
      setIsTransitioning(false);
    }, 300);
  };

const handleClose = () => {
  setIsTransitioning(true);
  setTimeout(() => {
    setShowOnlineChatUs(false);
    setIsOpen(false);
    setShowChatUsOnly(false);
    setShowOfflineScreen(false);
    setIsTransitioning(false);
  }, 300);
};

  const handleOpenOffline = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowOfflineScreen(true);
      setIsOpen(false);
      setShowChatUsOnly(false);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="home-container">
      <div
        className={`fade-wrapper ${
          isTransitioning
            ? "fade-out slide-down"
            : isOpen || showChatUsOnly || showOfflineScreen
            ? "fade-in slide-up"
            : "fade-in"
        }`}
      >
        {!isOpen &&
        !showChatUsOnly &&
        !showOfflineScreen &&
        !showOnlineChatUs ? (
          <StartScreen
            onOpen={handleOpen}
            onChatUsClick={handleOpenChatUsOnly}
          />
        ) : showChatUsOnly ? (
          <>
            <ChatUs onBack={handleOpen} onClose={handleClose} />
            <button className="close-button" onClick={handleClose}>
              <IoChevronDown className="down" />
            </button>
          </>
        ) : showOnlineChatUs ? (
          <>
            <OnlineChatUs onBack={handleBack} onClose={handleClose} />
            <button className="close-button" onClick={handleClose}>
              <IoChevronDown className="down" />
            </button>
          </>
        ) : showOfflineScreen ? (
          <>
            <OfflineScreen onBack={handleBack} onClose={handleClose} />
            <button className="close-button" onClick={handleClose}>
              <IoChevronDown className="down" />
            </button>
          </>
        ) : (
          <>
            <HomeScreen
              onClose={handleClose}
              onOpenChatUs={handleOpenChatUsOnly}
              onOpenOffline={handleOpenOffline}
              onOpenOnlineChat={handleOpenOnlineChat}
            />

            <button className="close-button" onClick={handleClose}>
              <IoChevronDown className="down" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

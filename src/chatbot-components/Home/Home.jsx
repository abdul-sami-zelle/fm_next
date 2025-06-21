import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import StartScreen from "../StartScreen/StartScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import ChatUs from "../ChatUs/ChatUs";
import OfflineScreen from "../OfflineScreen/OfflineScreen";
import { IoChatbubbleOutline } from "react-icons/io5";
import OnlineChatUs from "../OnlineChatUs/OnlineChatUs";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChatUsOnly, setShowChatUsOnly] = useState(false);
  const [showOfflineScreen, setShowOfflineScreen] = useState(false);
  const [showOnlineChatUs, setShowOnlineChatUs] = useState(false);
  const [startScreenClosed, setStartScreenClosed] = useState(true);
const [isMobile, setIsMobile] = useState(false); // Safe initial value

const initialTimerRef = useRef(null);
const autoCloseTimerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize(); // Initial check on client
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearTimers = () => {
    if (initialTimerRef.current) {
      clearTimeout(initialTimerRef.current);
      initialTimerRef.current = null;
    }
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      setStartScreenClosed(false);
      return;
    }

    clearTimers();
    initialTimerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setStartScreenClosed(false);
        setIsTransitioning(false);

        autoCloseTimerRef.current = setTimeout(() => {
          handleStartScreenClose();
        }, 5000);
      }, 300);
    }, 5000);

    return clearTimers;
  }, [isMobile]);

  const resetAutoCloseTimer = () => {
    if (!isMobile || startScreenClosed) return;

    clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => {
      handleStartScreenClose();
    }, 5000);
  };

  const handleStartScreenClose = () => {
    clearTimers();
    setIsTransitioning(true);
    setTimeout(() => {
      setStartScreenClosed(true);
      setIsTransitioning(false);
    }, 300);
  };

  const handleFaqClickFromHome = (faq) => {
    window.selectedFaqFromHome = faq;
    setIsTransitioning(true);
    setTimeout(() => {
      setShowChatUsOnly(true);
      setIsOpen(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleOpenOnlineChat = () => {
    clearTimers();
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
    resetAutoCloseTimer();
    setIsTransitioning(true);
    setTimeout(() => {
      setIsOpen(true);
      setShowChatUsOnly(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    resetAutoCloseTimer();
    setIsTransitioning(true);
    setTimeout(() => {
      setShowOnlineChatUs(false);
      setIsOpen(true);
      setShowChatUsOnly(false);
      setShowOfflineScreen(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleOpenChatUsOnly = () => {
    resetAutoCloseTimer();
    setIsTransitioning(true);
    setTimeout(() => {
      setShowChatUsOnly(true);
      setIsOpen(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleClose = () => {
    clearTimers();
    setIsTransitioning(true);
    setTimeout(() => {
      setShowOnlineChatUs(false);
      setIsOpen(false);
      setShowChatUsOnly(false);
      setShowOfflineScreen(false);
      setStartScreenClosed(true);
      setIsTransitioning(false);
    }, 300);
  };

  const handleOpenOffline = () => {
    resetAutoCloseTimer();
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
            : isOpen || showChatUsOnly || showOfflineScreen || showOnlineChatUs
            ? "fade-in slide-up"
            : "fade-in"
        }`}
      >
        {!startScreenClosed &&
          !isOpen &&
          !showChatUsOnly &&
          !showOfflineScreen &&
          !showOnlineChatUs && (
            <StartScreen
              onOpen={handleOpen}
              onChatUsClick={handleOpenChatUsOnly}
              onStartScreenClose={handleStartScreenClose}
            />
          )}

        {startScreenClosed &&
          !isOpen &&
          !showChatUsOnly &&
          !showOfflineScreen &&
          !showOnlineChatUs && (
            <button className="chat-btn-home" onClick={handleOpenChatUsOnly}>
              <IoChatbubbleOutline className="chat-us-home-icon" />
              Chat Us
            </button>
          )}
        {showChatUsOnly ? (
          <ChatUs onBack={handleOpen} onClose={handleClose} />
        ) : showOnlineChatUs ? (
          <OnlineChatUs onBack={handleBack} onClose={handleClose} />
        ) : showOfflineScreen ? (
          <OfflineScreen onBack={handleBack} onClose={handleClose} />
        ) : isOpen ? (
          <HomeScreen
            onClose={handleClose}
            onOpenChatUs={handleOpenChatUsOnly}
            onOpenOffline={handleOpenOffline}
            onOpenOnlineChat={handleOpenOnlineChat}
            onFaqClick={handleFaqClickFromHome}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;

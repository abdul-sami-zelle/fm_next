import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import StartScreen from "../StartScreen/StartScreen";
import HomeScreen from "../HomeScreen/HomeScreen";
import ChatUs from "../ChatUs/ChatUs";
import OfflineScreen from "../OfflineScreen/OfflineScreen";
import { IoChatbubbleOutline } from "react-icons/io5";
import OnlineChatUs from "../OnlineChatUs/OnlineChatUs";
import ConversationList from "../ConversationList/ConversationList";
import { useChatOpenContext } from "@/context/ChatbotContext/ChatbotContext";

const Home = () => {

  const {
    isOpen, setIsOpen,
    isTransitioning, setIsTransitioning,
    showChatUsOnly, setShowChatUsOnly,
    showOfflineScreen, setShowOfflineScreen,
    showOnlineChatUs, setShowOnlineChatUs,
    startScreenClosed, setStartScreenClosed,
    isMobile, setIsMobile,
    showConversationList, setShowConversationList,
    activeTab, setActiveTab,
    initialTimerRef,
    autoCloseTimerRef,
    onTab,
    clearTimers,
    resetAutoCloseTimer,
    handleTabClickFromFooter,
    handleFaqClickFromHome,
    handleOpenOnlineChat,
    handleOpen,
    handleBack,
    handleOpenChatUsOnly,
    handleClose,
    handleOpenOffline,
    handleStartScreenClose
  } = useChatOpenContext()


  return (
    <div className="home-container">
      <div
        className={`fade-wrapper ${isTransitioning
            ? "fade-out slide-down"
            : showChatUsOnly || showOfflineScreen || showOnlineChatUs
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
        {showConversationList ? (
          <ConversationList
            activeTab={activeTab}
            onCloseConversationList={() => {
              setShowConversationList(false);
              setStartScreenClosed(false);
              setIsOpen(false);
            }}
            onTabClick={handleTabClickFromFooter}
          />
        ) : showChatUsOnly ? (
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
            onOpenConversationList={() => setShowConversationList(true)}
            activeTab={activeTab}
            onTabClick={onTab}
            isOpen={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;

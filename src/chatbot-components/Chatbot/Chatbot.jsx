import React, { useState } from "react";
import "./style.css";
import InitialPrompt from "../InitialPrompt/InitialPrompt";
import ChatInterface from "../ChatInterface/ChatInterface";
import ChatSummary from "../ChatSummary/ChatSummary";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen.jsx";

export default function ChatbotWidget() {
  const [stage, setStage] = useState("initial");
  const [hasChatted, setHasChatted] = useState(false);

const [initialMessages, setInitialMessages] = useState([]);
const handleOpenChat = (faqQuestionOrMessages) => {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (Array.isArray(faqQuestionOrMessages)) {
    setInitialMessages(faqQuestionOrMessages);
  } else if (faqQuestionOrMessages) {
    setInitialMessages([
      {
        text: faqQuestionOrMessages,
        sender: "user",
        time,
        avatar: "/assets/chat/Images/profile-img.png",
      },
      {
        text: getBotResponse(faqQuestionOrMessages),
        sender: "bot",
        time,
        avatar: "/assets/chat/Images/chatbot.png",
      },
    ]);
  } else {
    setInitialMessages([]);
  }

  setStage("chat");
  setHasChatted(true);
};


const getBotResponse = (question) => {
  if (question.includes("materials"))
    return "We use high-quality hardwood and eco-friendly materials.";
  if (question.includes("care"))
    return "Regularly dust and clean with a soft cloth. Avoid harsh chemicals.";
  if (question.includes("fit"))
    return "Please check product dimensions and doorway size before ordering.";
  if (question.includes("delivery services"))
    return "Yes, we offer reliable delivery services across most areas.";
  if (question.includes("return") || question.includes("exchange"))
    return "Yes, we have a 7-day return/exchange policy.";
  if (question.includes("delivery time"))
    return "Delivery usually takes 5–7 business days.";
  if (question.includes("customization"))
    return "Yes, customization options are available on select items.";
  return "Let me find the best answer for you!";
};

  const handleBack = () => {
    if (stage === "chat" && hasChatted) {
      setStage("summary");
    } else if (stage === "chat") {
      setStage("welcome");
    } else if (stage === "summary") {
      setStage("chat");
    }
  };

  const handleClose = () => {
    setStage("initial");
    setHasChatted(false);
    setInitialMessages([]);
  };

  return (
    <div className="chatbot-widget-container">
      {stage === "initial" && (
        <InitialPrompt onClick={() => setStage("welcome")} />
      )}

      {stage === "welcome" && (
        <WelcomeScreen
          onChatClick={() => handleOpenChat(null)}
          onFaqClick={handleOpenChat}
           onClose={handleClose}
        />
      )}

      {stage === "chat" && (
        <ChatInterface
          onBack={handleBack}
          onUserSend={() => {}}
          onClose={handleClose}
          initialMessages={initialMessages}
        />
      )}

      {stage === "summary" && (
        <ChatSummary
          onBack={handleBack}
          onClose={handleClose}
          onMessageClick={() => setStage("chat")}
        />
      )}
    </div>
  );
}

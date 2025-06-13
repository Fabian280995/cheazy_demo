import {
  AiMessage,
  ChatMessage as ChatMessageType,
  TextMessage,
} from "@/types/ai-chat";
import React from "react";
import { AiResponseMessage } from "./AiResponstMessage";
import { UserMessage } from "./UserMessage";

interface Props {
  chatmessage: ChatMessageType;
}

const ChatMessage = ({ chatmessage }: Props) => {
  return chatmessage.role === "user" ? (
    <UserMessage message={chatmessage as TextMessage} />
  ) : chatmessage.role === "assistant" ? (
    <AiResponseMessage message={chatmessage as AiMessage} />
  ) : null;
};

export default ChatMessage;

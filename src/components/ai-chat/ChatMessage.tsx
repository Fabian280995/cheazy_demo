import { View, Text } from "react-native";
import React from "react";
import {
  AiMessage,
  ChatMessage as ChatMessageType,
  TextMessage,
} from "@/types/ai-chat";
import { useTheme } from "@/providers/theme";
import MealSlotEntry from "../meals/MealSlotEntry";

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

const UserMessage = ({ message }: { message: TextMessage }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 4,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          padding: 12,
          backgroundColor: colors.foreground,
          borderRadius: 16,
          shadowColor: "#00000040",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
          marginLeft: 4,
          marginRight: 4,
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: colors.text }}>{message.content}</Text>
      </View>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 32,
          backgroundColor: colors.primary,
          marginLeft: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.textForeground,
            fontWeight: "bold",
          }}
        >
          U
        </Text>
      </View>
    </View>
  );
};

const AiResponseMessage = ({ message }: { message: AiMessage }) => {
  const { attachments } = message;
  const { colors } = useTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 4,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 32,
            backgroundColor: colors.secondary,
            marginRight: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.textForeground,
              fontWeight: "bold",
            }}
          >
            A
          </Text>
        </View>
        <View
          style={{
            padding: 12,
            backgroundColor: colors.foreground,
            borderRadius: 16,
            shadowColor: "#00000040",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
            marginLeft: 4,
            marginRight: 4,
            maxWidth: "80%",
          }}
        >
          <Text style={{ color: colors.text }}>{message.content}</Text>
        </View>
      </View>
      {attachments && attachments.length > 0 ? (
        <View style={{ marginTop: 8, marginBottom: 8 }}>
          {attachments?.map((attachment) => (
            <MealSlotEntry
              entry={attachment}
              key={attachment.entry.name + "-" + attachment.date}
              isLast={
                attachment === attachments[attachments.length - 1]
                  ? true
                  : false
              }
              isFirst={attachment === attachments[0] ? true : false}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default ChatMessage;

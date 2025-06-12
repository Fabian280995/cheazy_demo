import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import {
  AiMessage,
  ChatMessage as ChatMessageType,
  TextMessage,
} from "@/types/ai-chat";
import { useTheme } from "@/providers/theme";
import MealSlotEntry from "../meals/MealSlotEntry";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

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
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          padding: 12,
          backgroundColor: colors.foreground,
          borderRadius: 16,
          shadowColor: "#00000040",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
          marginHorizontal: 4,
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: colors.text }}>{message.content}</Text>
      </View>
      <Avatar label="U" bg={colors.primary} />
    </View>
  );
};

const AiResponseMessage = ({ message }: { message: AiMessage }) => {
  const { colors } = useTheme();

  // 🔄 Shared value für Opazität
  const opacity = useSharedValue(1);

  /* Animation nur, solange message.messageType === "loading" */
  useEffect(() => {
    if (message.messageType === "loading") {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 1200 }),
          withTiming(0.95, { duration: 1200 })
        ),
        -1,
        true
      );
    } else {
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [message.messageType, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  /* Bubble-Komponente wählen */
  const Bubble = message.messageType === "loading" ? Animated.View : View;

  return (
    <View>
      {/* Avatar + Bubble */}
      <View
        style={{
          flexDirection: "row",
          marginVertical: 4,
          alignItems: "center",
        }}
      >
        <Avatar label="A" bg={colors.secondary} />

        <Bubble
          style={[
            {
              padding: 12,
              backgroundColor: colors.foreground,
              borderRadius: 16,
              marginHorizontal: 8,
              maxWidth: "80%",
              shadowColor: "#00000040",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            },
            animatedStyle,
          ]}
        >
          <Text style={{ color: colors.text }}>{message.content}</Text>
        </Bubble>
      </View>

      {/* Attachments erst bei fertiger Antwort */}
      {message.messageType === "text" && message.attachments.length > 0 && (
        <View style={{ marginVertical: 8 }}>
          {message.attachments.map((att, i) => (
            <MealSlotEntry
              key={att.entry.name + "-" + att.date}
              entry={att}
              isFirst={i === 0}
              isLast={i === message.attachments.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const Avatar = ({ label, bg }: { label: string; bg: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 32,
        backgroundColor: bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.textForeground, fontWeight: "bold" }}>
        {label}
      </Text>
    </View>
  );
};

export default ChatMessage;

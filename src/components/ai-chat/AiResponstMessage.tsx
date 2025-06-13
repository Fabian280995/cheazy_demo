import { useTheme } from "@/providers/theme";
import { AiMessage } from "@/types/ai-chat";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import MealSlotEntry from "../meals/MealSlotEntry";
import { ChatAvatar } from "./ChatAvatar";

export const AiResponseMessage = ({ message }: { message: AiMessage }) => {
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
        <ChatAvatar label="A" bg={colors.secondary} />

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

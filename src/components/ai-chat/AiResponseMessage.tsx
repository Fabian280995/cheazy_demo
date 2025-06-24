import { useTheme } from "@/providers/theme";
import { MealSlotEntry as MealSlotEntryType } from "@/types";
import { AiMessage } from "@/types/ai-chat";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import MealSlotEntry from "../meal-slots/MealSlotEntry";
import { ChatAvatar } from "./ChatAvatar";
import { Octicons } from "@expo/vector-icons";
import { useProcessAiGenerations } from "@/hooks/ai-chat/useProcessAiGenerations";

export const AiResponseMessage = ({
  message,
  isLast,
}: {
  message: AiMessage;
  isLast?: boolean;
}) => {
  const { colors } = useTheme();

  const opacity = useSharedValue(1);

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

  const Bubble = message.messageType === "loading" ? Animated.View : View;

  return (
    <View>
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

      {isLast &&
        message.messageType === "text" &&
        message.attachments.length > 0 && (
          <AiResponseAttachementsList attachments={message.attachments} />
        )}
    </View>
  );
};

const AiResponseAttachementsList = ({
  attachments,
}: {
  attachments: MealSlotEntryType[];
}) => {
  const { colors } = useTheme();
  const { mutateAsync: process } = useProcessAiGenerations();

  const handleProcessButtonPress = async () => {
    if (!attachments || attachments.length === 0) return;
    await process(attachments);
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Text
        style={{
          color: colors.textForeground,
          fontSize: 12,
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        Halte gedrückt um die Einträge zu bearbeiten
      </Text>
      {attachments.map((att, i) => {
        console.log(att);
        return (
          <MealSlotEntry
            key={i + "-" + att.id}
            entry={att}
            isLast={i === attachments.length - 1}
            isFirst={i === 0}
          />
        );
      })}
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: colors.background,
            borderRadius: 16,
            marginTop: 8,
          }}
          onPress={handleProcessButtonPress}
        >
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              inset: 1,
              borderRadius: 16,
            }}
          />
          <Text style={{ color: colors.textForeground, fontSize: 12 }}>
            Übernehmen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

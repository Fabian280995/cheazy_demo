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
import { MealSlotEntry as MealSlotEntryType } from "@/types";

export const AiResponseMessage = ({ message }: { message: AiMessage }) => {
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

      {message.messageType === "text" && message.attachments.length > 0 && (
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
  return (
    <View style={{ marginVertical: 8 }}>
      {attachments.map((att, i) => (
        <MealSlotEntry
          key={att.entry.name + "-" + att.date}
          entry={att}
          isFirst={i === 0}
          isLast={i === attachments.length - 1}
        />
      ))}
    </View>
  );
};

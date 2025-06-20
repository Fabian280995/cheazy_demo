import { useTheme } from "@/providers/theme";
import { AiMessage } from "@/types/ai-chat";
import React, { useEffect } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import MealSlotEntry from "../meal-slots/MealSlotEntry";
import { ChatAvatar } from "./ChatAvatar";
import { MealSlotEntry as MealSlotEntryType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";

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
  const [selectedEntries, setSelectedEntries] = React.useState<
    MealSlotEntryType[]
  >([]);

  const handleEntryPress = (entry: MealSlotEntryType) => {
    setSelectedEntries((prev) => {
      const isSelected = prev.find((e) => e.entry.id === entry.entry.id);
      if (isSelected) {
        return prev.filter((e) => e.entry.id !== entry.entry.id);
      } else {
        return [...prev, entry];
      }
    });
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
        const isSelected = selectedEntries.find(
          (e) => e.entry.id === att.entry.id
        );
        console.log(att);
        return (
          <MealSlotEntry
            key={i + "-" + att.entry.id}
            entry={att}
            isFirst={i === 0}
            isLast={i === attachments.length - 1}
            isSelected={!!isSelected}
            showSelectedState
            onPress={handleEntryPress}
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
          onPress={() => console.log("Alle übernehmen")}
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
            {selectedEntries.length > 0
              ? "Auswahl übernehmen"
              : "Alle übernehmen"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

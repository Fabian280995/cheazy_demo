// src/components/meals/MealSlotSelect.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { MealSlot } from "@/types";
import { useTheme } from "@/providers/theme";

interface MealSlotSelectProps {
  /** Aktuell ausgewählter MealSlot */
  mealSlot: MealSlot;
  /** Callback, wenn ein anderer Slot ausgewählt wird */
  onChangeSlot: (slot: MealSlot) => void;
}

/**
 * Setzt in einem String an der optimalen Stelle (letztes Leerzeichen)
 * einen Zeilenumbruch, damit längere Labels schön umbrechen.
 */
const breakAtLastSpace = (label: string): string => {
  const idx = label.lastIndexOf(" ");
  if (idx === -1) return label;
  return label.slice(0, idx) + "\n" + label.slice(idx + 1);
};

const MealSlotSelect: React.FC<MealSlotSelectProps> = ({
  mealSlot,
  onChangeSlot,
}) => {
  const { colors } = useTheme();
  const currentIndex = MEAL_SLOTS.findIndex((slot) => slot.id === mealSlot.id);

  const formattedLabel = breakAtLastSpace(mealSlot.label);
  const isMultiLine = formattedLabel.includes("\n");

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + MEAL_SLOTS.length) % MEAL_SLOTS.length;
    onChangeSlot(MEAL_SLOTS[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % MEAL_SLOTS.length;
    onChangeSlot(MEAL_SLOTS[nextIndex]);
  };

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        height: 64,
        position: "relative",
        paddingHorizontal: 8,
      }}
    >
      <Text
        style={{
          fontSize: isMultiLine ? 12 : 16,
          fontWeight: "bold",
          fontFamily: "Nunito",
          textAlign: "center",
          includeFontPadding: false,
          textAlignVertical: "center",
        }}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        ellipsizeMode="tail"
      >
        {formattedLabel}
      </Text>
      <TouchableOpacity
        onPress={handlePrev}
        style={{
          position: "absolute",
          left: 0,
          top: -4,
          right: 0,
          alignItems: "center",
          justifyContent: "flex-start",
          height: 35,
          padding: 4,
        }}
      >
        <Feather name="chevron-up" size={16} color={colors.textLight} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleNext}
        style={{
          position: "absolute",
          left: 0,
          bottom: -4,
          right: 0,
          alignItems: "center",
          justifyContent: "flex-end",
          height: 35,
          padding: 4,
        }}
      >
        <Feather name="chevron-down" size={16} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
};

export default MealSlotSelect;

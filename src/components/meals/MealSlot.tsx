import { View, Text } from "react-native";
import React from "react";
import { MealSlotEntry as METype } from "@/types";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import MealSlotEntry from "./MealSlotEntry";

interface Props {
  title: string;
  entries: METype[];
}

const MealSlot = ({ title, entries }: Props) => {
  const { colors } = useTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.foreground,
          paddingHorizontal: 12,
          paddingTop: 16,
          paddingBottom: 8,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.background,
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontWeight: "800",
            fontSize: 16,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Feather name="chevron-right" size={20} color={colors.text} />
      </View>

      {/* Section-Items */}
      {entries.map((item, idx) => {
        const isLast = idx === entries.length - 1;

        return (
          <MealSlotEntry
            key={`${item.date}-${item.mealSlot}-${item.entry.id}`}
            entry={item}
            isLast={isLast}
          />
        );
      })}
    </View>
  );
};

export default MealSlot;

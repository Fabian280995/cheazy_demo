import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MealSlotEntry as METype } from "@/types";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import MealSlotEntry from "./MealSlotEntry";
import CardIcon from "../shared/CardIcon";
import { useRouter } from "expo-router";

interface Props {
  title: string;
  entries: METype[];
}

const MealSlot = ({ title, entries }: Props) => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.foreground,
          padding: 12,
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
        return (
          <MealSlotEntry
            key={`${item.date}-${item.mealSlot}-${item.entry.id}`}
            entry={item}
          />
        );
      })}

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.foreground,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
        onPress={
          () => null
          // router.push({
          //   pathname: "/meals/add-entry",
          //   params: { mealSlot: title },
          // })
        }
      >
        <CardIcon
          name="add"
          size={36}
          color={colors.textForeground}
          bgColor={colors.primary}
        />
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontWeight: "700",
            fontSize: 14,
            marginLeft: 8,
          }}
        >
          Eintrag hinzufügen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MealSlot;

import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype } from "@/types";
import { calcTotals } from "@/utils/meals";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CardIcon from "../shared/CardIcon";
import MealSlotEntry from "./MealSlotEntry";

interface Props {
  title: string;
  entries: METype[];
}

const MealSlot = ({ title, entries }: Props) => {
  const { colors } = useTheme();
  const router = useRouter();
  const totals = React.useMemo(() => calcTotals(entries), [entries]);
  const totalCalories = totals.calories.toFixed(0);
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.foreground,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito",
              color: colors.text,
              fontWeight: "900",
              fontSize: 16,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: "Inter",
              color: colors.primary,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            {totalCalories} kcal
          </Text>
        </View>
        <Text
          style={{ fontSize: 12, color: "gray", textAlign: "right" }}
          ellipsizeMode="tail"
        >
          {totals.fat.toFixed(0)}g Fett, {totals.carbs.toFixed(0)}g
          Kohlenhydrate, {totals.protein.toFixed(0)}g Eiweiß
        </Text>
      </View>

      {/* Section-Items */}
      {entries.map((item) => {
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
        onPress={() =>
          router.push({
            pathname: "/foods",
          })
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

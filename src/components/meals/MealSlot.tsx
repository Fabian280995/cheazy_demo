import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype } from "@/types";
import { calcTotals } from "@/utils/meals";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CardIcon from "../shared/CardIcon";
import MealSlotEntry from "./MealSlotEntry";
import NutritionBar from "../nutrition/NutritionBar";

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
          padding: 12,
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
            marginBottom: 8,
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
          <Text
            style={{
              fontFamily: "Inter",
              color: colors.text,
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {totalCalories} kcal
          </Text>
        </View>
        <NutritionBar nutrients={totals} opacity={0.9} />
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
            pathname: "/meal_entries/new",
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

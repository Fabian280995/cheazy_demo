import { useTheme } from "@/providers/theme";
import { FoodItem, MealSlotEntry as MealSlotEntryType, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { FoodItemCard } from "./FoodItemCard";
import { RecipeCard } from "./RecipeCard";

export function isFoodItem(entry: FoodItem | Recipe): entry is FoodItem {
  return (entry as FoodItem).calories_per_100 !== undefined;
}

interface Props {
  entry: MealSlotEntryType;
  isLast?: boolean;
  isFirst?: boolean;
  isSelected?: boolean;
  showSelectedState?: boolean;
  onPress?: (entry: MealSlotEntryType) => void;
  onLongPress?: (entry: MealSlotEntryType) => void;
}

const MealSlotEntry = ({
  entry,
  isLast = false,
  isFirst = false,
  isSelected,
  showSelectedState = false,
  onPress,
  onLongPress,
}: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onPress?.(entry)}
      onLongPress={() => onLongPress?.(entry)}
      disabled={!onPress}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: colors.foreground,
          flexDirection: "row",
          alignItems: "center",
        },
        isLast
          ? {
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }
          : {
              borderBottomWidth: 1,
              borderBottomColor: colors.background,
            },
        isFirst && {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      ]}
    >
      {showSelectedState && (
        <View>
          <Feather
            name={isSelected ? "check-circle" : "circle"}
            size={24}
            color={isSelected ? colors.success : colors.textLight}
            style={{ marginRight: 8 }}
          />
        </View>
      )}
      <View style={{ flex: 1 }}>
        {isFoodItem(entry.entry) ? (
          <FoodItemCard item={entry.entry} />
        ) : (
          <RecipeCard item={entry.entry} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MealSlotEntry;

// src/components/meals/MealSlotEntry.tsx
import { FoodItemCard } from "@/components/food/FoodItemCard";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { SwipeableListItem } from "@/components/shared/list/ListItem";
import { useTheme } from "@/providers/theme";
import { FoodItem, MealSlotEntry as METype, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export function isFoodItem(entry: FoodItem | Recipe): entry is FoodItem {
  return (entry as FoodItem).calories_per_100 !== undefined;
}

interface Props {
  entry: METype;
  showSelectedState?: boolean;
  isSelected?: boolean;
  onPress?: (entry: METype) => void;
  onDelete?: (id: string) => void;
}

const MealSlotEntry: React.FC<Props> = ({
  entry,
  showSelectedState = false,
  isSelected = false,
  onPress,
  onDelete,
}) => {
  const { colors } = useTheme();

  return (
    <>
      {showSelectedState && (
        <View style={styles.iconWrap}>
          <Feather
            name={isSelected ? "check-circle" : "circle"}
            size={24}
            color={isSelected ? colors.success : colors.textLight}
          />
        </View>
      )}

      <SwipeableListItem
        style={styles.contentWrap}
        onDelete={() => onDelete && onDelete(entry.id)}
        onPress={onPress ? () => onPress(entry) : undefined}
      >
        {isFoodItem(entry.entry) ? (
          <FoodItemCard item={entry.entry} />
        ) : (
          <RecipeCard item={entry.entry} portions={entry.portions} />
        )}
      </SwipeableListItem>
    </>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    marginRight: 8,
  },
  contentWrap: {
    flex: 1,
  },
});

export default MealSlotEntry;

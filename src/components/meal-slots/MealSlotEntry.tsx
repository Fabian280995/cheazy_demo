// src/components/meals/MealSlotEntry.tsx
import { FoodItemCard } from "@/components/food/FoodItemCard";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { SwipeableListItem } from "@/components/shared/list/ListItem";
import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype } from "@/types";
import { isFoodItem } from "@/utils/meals";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  entry: METype;
  onPress?: (entry: METype) => void;
  onDelete?: (id: string) => void;

  isFirst?: boolean;
  isLast?: boolean;
}

const MealSlotEntry: React.FC<Props> = ({
  entry,
  onPress,
  onDelete,
  isFirst,
  isLast,
}) => {
  return (
    <SwipeableListItem
      style={styles.contentWrap}
      onDelete={() => onDelete && onDelete(entry.id)}
      onPress={onPress ? () => onPress(entry) : undefined}
      isFirst={isFirst}
      isLast={isLast}
    >
      {isFoodItem(entry.entry) ? (
        <FoodItemCard item={entry.entry} />
      ) : (
        <RecipeCard item={entry.entry} portions={entry.portions} />
      )}
    </SwipeableListItem>
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

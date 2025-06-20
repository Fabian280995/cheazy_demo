// src/components/meals/MealSlotEntry.tsx
import { useTheme } from "@/providers/theme";
import { FoodItem, MealSlotEntry as METype, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FoodItemCard } from "../food/FoodItemCard";
import { RecipeCard } from "../recipes/RecipeCard";
import { SwipeableListItem } from "../shared/list/ListItem";

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

const DELETE_WIDTH = 64;
const SWIPE_THRESHOLD = -DELETE_WIDTH * 0.6; // 60 % des Buttons wischen → Alert

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
          <RecipeCard item={entry.entry} />
        )}
      </SwipeableListItem>
    </>
  );
};

const styles = StyleSheet.create({
  deleteBg: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: DELETE_WIDTH,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  iconWrap: {
    marginRight: 8,
  },
  contentWrap: {
    flex: 1,
  },
});

export default MealSlotEntry;

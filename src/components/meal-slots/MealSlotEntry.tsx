// src/components/meals/MealSlotEntry.tsx
import { useTheme } from "@/providers/theme";
import { FoodItem, MealSlotEntry as METype, Recipe } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FoodItemCard } from "../food/FoodItemCard";
import MealSlotEntryContainer from "./MealSlotEntryContainer";
import { RecipeCard } from "./RecipeCard";

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
  const translateX = useSharedValue(0);

  const reset = () => {
    translateX.value = withTiming(0);
  };

  const confirmDelete = useCallback(() => {
    Alert.alert(
      "Eintrag löschen?",
      "Möchtest du diesen Eintrag wirklich löschen?",
      [
        { text: "Abbrechen", style: "cancel", onPress: reset },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => {
            if (onDelete) onDelete(entry.id);
            reset();
          },
        },
      ]
    );
  }, [entry, onDelete]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = Math.min(0, e.translationX);
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-DELETE_WIDTH, {}, () => {
          runOnJS(confirmDelete)();
        });
      } else {
        runOnJS(reset)();
      }
    });

  const tap = Gesture.Tap()
    .maxDuration(220)
    .onStart(() => {
      if (onPress) {
        runOnJS(onPress)(entry);
      }
    });

  const gesture = Gesture.Exclusive(pan, tap);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <MealSlotEntryContainer key={entry.id}>
      <View style={[styles.deleteBg, { backgroundColor: colors.destructive }]}>
        <Feather name="trash-2" size={24} color={colors.textForeground} />
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.container,
            rStyle,
            {
              backgroundColor: colors.foreground,
              borderBottomColor: colors.background,
            },
          ]}
        >
          {showSelectedState && (
            <View style={styles.iconWrap}>
              <Feather
                name={isSelected ? "check-circle" : "circle"}
                size={24}
                color={isSelected ? colors.success : colors.textLight}
              />
            </View>
          )}

          <View style={styles.contentWrap}>
            {isFoodItem(entry.entry) ? (
              <FoodItemCard item={entry.entry} />
            ) : (
              <RecipeCard item={entry.entry} />
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </MealSlotEntryContainer>
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

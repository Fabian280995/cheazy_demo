import { MEAL_SLOTS } from "@/constants/mealSlots";
import MealSlotDetailScreen from "@/screens/MealSlotDetailScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MealSlot = () => {
  const { meal_slot_id } = useLocalSearchParams();
  const mealSlot = MEAL_SLOTS.find((slot) => slot.id === meal_slot_id);

  if (!mealSlot) {
    return <Text>Meal slot not found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MealSlotDetailScreen mealSlot={mealSlot} />
    </SafeAreaView>
  );
};

export default MealSlot;

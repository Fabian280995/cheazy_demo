import { View, Text } from "react-native";
import React from "react";
import { MealSlot } from "@/types";

interface Props {
  mealSlot: MealSlot;
}

const MealSlotDetailScreen = ({ mealSlot }: Props) => {
  return (
    <View>
      <Text>MealSlotDetailScreen</Text>
      <Text>ID: {mealSlot.id}</Text>
      <Text>Label: {mealSlot.label}</Text>
    </View>
  );
};

export default MealSlotDetailScreen;

import { View, Text } from "react-native";
import React from "react";
import { useMealEntry } from "@/providers/meal-entry";

const MealEntry = () => {
  const { mealEntry } = useMealEntry();
  return (
    <View>
      <Text>{mealEntry.id}</Text>
    </View>
  );
};

export default MealEntry;

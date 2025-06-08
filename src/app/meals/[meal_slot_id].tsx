import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MealSlot = () => {
  const { meal_slot_id } = useLocalSearchParams();
  console.log("MealSlot ID:", meal_slot_id);
  return (
    <View>
      <Text>MealSlot</Text>
    </View>
  );
};

export default MealSlot;

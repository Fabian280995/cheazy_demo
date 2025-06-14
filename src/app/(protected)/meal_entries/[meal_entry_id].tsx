import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MealSlot = () => {
  const { meal_entry_id } = useLocalSearchParams();

  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
};

export default MealSlot;

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MealSlot = () => {
  const { meal_entry_id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Meal Entry ID: {meal_entry_id}</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default MealSlot;

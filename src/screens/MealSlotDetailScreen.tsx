import { View, Text } from "react-native";
import React from "react";
import { MealSlot } from "@/types";
import { mockEntries } from "@/constants/mealSlots";
import MealSlotEntry from "@/components/meals/MealSlotEntry";

interface Props {
  mealSlot: MealSlot;
}

const MealSlotDetailScreen = ({ mealSlot }: Props) => {
  const entries = mockEntries.filter((entry) => entry.mealSlot === mealSlot.id);
  return (
    <View>
      <Text>MealSlotDetailScreen</Text>
      <Text>ID: {mealSlot.id}</Text>
      <Text>Label: {mealSlot.label}</Text>
      <Text>Sort Order: {mealSlot.sortOrder}</Text>
      <Text>Entries:</Text>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <MealSlotEntry key={entry.entry.id} entry={entry} />
        ))
      ) : (
        <Text>No entries found for this meal slot.</Text>
      )}
    </View>
  );
};

export default MealSlotDetailScreen;

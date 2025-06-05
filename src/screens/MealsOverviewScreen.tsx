import { Dish } from "@/types";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MEAL_SLOTS } from "../constants/mealSlots";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  dishesBySlot: Record<string, Dish[]>;
}

export const MealsOverviewScreen: React.FC<Props> = ({ dishesBySlot }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={MEAL_SLOTS}
        keyExtractor={(slot) => slot.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item: slot }) => {
          const dishes = dishesBySlot[slot.id] || [];
          return (
            <View key={slot.id} style={styles.slotContainer}>
              <Text style={styles.slotTitle}>{slot.label}</Text>
              {dishes.length > 0 ? (
                dishes.map((dish) => (
                  <View key={dish.id} style={styles.dishRow}>
                    <Text style={styles.dishName}>{dish.name}</Text>
                    {/* z. B. Gesamt-Kalorien pro Dish (kannst du berechnen) */}
                    <Text style={styles.dishCalories}>
                      {/* berechne hier sum(quantity * calories_per_100g / 100) */}{" "}
                      kcal
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDishes}>Keine Einträge</Text>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    padding: 12,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 12,
    margin: 2,
  },
  slotTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  dishRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  dishName: { fontSize: 16 },
  dishCalories: { fontSize: 16, fontStyle: "italic" },
  noDishes: { fontSize: 14, fontStyle: "italic", color: "#888" },
});

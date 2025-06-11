import MealSlotEntry from "@/components/meals/MealSlotEntry";
import { MEAL_SLOTS, mockEntries } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { FoodItem, Recipe } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";

export default function MealPlanScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const grouped = groupEntriesBySlot(mockEntries);

  const sections = MEAL_SLOTS.map((slot) => ({
    id: slot.id,
    title: slot.label,
    data: grouped[slot.id], // Array<MealSlotEntry>
  }));

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => `${item.date}-${item.mealSlot}-${item.entry.id}`}
      renderSectionHeader={({ section: { title, id } }) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.background,
            padding: 12,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.foreground,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // router.push(`/meals/${id}`); // Navigiere zur Detailseite für diesen Slot
            }}
            style={{
              padding: 6,
              borderRadius: 8,
              backgroundColor: colors.foreground,
            }}
          >
            <Feather name="plus" size={16} color={colors.icon} />
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item, index, section }) => {
        const isLast = index === section.data.length - 1;
        return <MealSlotEntry entry={item} isLast={isLast} />;
      }}
      renderSectionFooter={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ padding: 16 }}
      removeClippedSubviews
      initialNumToRender={5}
      maxToRenderPerBatch={10}
    />
  );
}

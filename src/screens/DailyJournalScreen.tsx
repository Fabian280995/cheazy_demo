import { MEAL_SLOTS, mockEntries } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { FoodItem, Recipe } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";

export function isFoodItem(entry: FoodItem | Recipe): entry is FoodItem {
  return (entry as FoodItem).calories !== undefined;
}

const FoodItemCard = ({ item }: { item: FoodItem }) => {
  return (
    <View>
      <Text>
        {item.name} ({"cal " + item.calories})
      </Text>
    </View>
  );
};

const RecipeCard = ({ item }: { item: Recipe }) => {
  return (
    <View>
      <Text>
        {item.name} (
        {"cal " + item.ingredients.reduce((sum, ing) => sum + ing.calories, 0)})
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        Zutaten: {item.ingredients.map((ing) => ing.name).join(", ")}
      </Text>
    </View>
  );
};

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
              router.push(`/meals/${id}`); // Navigiere zur Detailseite für diesen Slot
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
        return (
          <View
            style={[
              {
                paddingVertical: 12,
                paddingHorizontal: 12,
                backgroundColor: colors.background,
              },
              isLast
                ? {
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }
                : {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.foreground,
                  },
            ]}
          >
            {isFoodItem(item.entry) ? (
              <FoodItemCard item={item.entry} />
            ) : (
              <RecipeCard item={item.entry} />
            )}
          </View>
        );
      }}
      renderSectionFooter={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ padding: 16 }}
      removeClippedSubviews
      initialNumToRender={5}
      maxToRenderPerBatch={10}
    />
  );
}

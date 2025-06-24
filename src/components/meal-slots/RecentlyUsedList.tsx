import { useRecentMealEntriesQuery } from "@/hooks/meal-entries/useRecentMealEntriesQuery";
import React from "react";
import { FlatList, Text, View } from "react-native";
import LoadingIndicator from "../shared/LoadingIndicator";
import MealSlotEntry from "./MealSlotEntry";
import { MealSlotEntry as MealSlotEntryType } from "@/types";
import { useRouter } from "expo-router";

const RecentlyUsedList = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useRecentMealEntriesQuery();

  if (isError) {
    console.error("Error fetching recent meal entries:", error);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const handleEntryPress = (entry: MealSlotEntryType) => {
    if (entry.type === "food") {
      router.push(`/foods/${entry.entry.id}`);
    } else if (entry.type === "recipe") {
      router.push(`/recipes/${entry.entry.id}`);
    }
  };

  return (
    <View style={{ marginTop: 16, paddingHorizontal: 12 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          fontFamily: "Nunito",
        }}
      >
        Zuletzt verwendet
      </Text>
      {isLoading ? <LoadingIndicator /> : null}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MealSlotEntry
            entry={item}
            isFirst={index === 0}
            isLast={index === data.length - 1}
            onPress={() => handleEntryPress(item)}
          />
        )}
        contentContainerStyle={{ marginTop: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecentlyUsedList;

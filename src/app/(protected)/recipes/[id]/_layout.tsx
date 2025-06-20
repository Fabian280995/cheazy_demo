import { RecipeProvider } from "@/providers/recipe";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

function RecipeDetail() {
  const { id, mealEntryId } = useLocalSearchParams<{
    id: string;
    mealEntryId?: string;
    mealSlotId?: string;
  }>();
  return (
    <RecipeProvider id={id as string}>
      <Stack
        screenOptions={{
          headerTransparent: true,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </RecipeProvider>
  );
}

export default RecipeDetail;

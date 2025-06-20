import { RecipeProvider } from "@/providers/recipe";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

function RecipeDetail() {
  const { recipeId } = useLocalSearchParams<{
    recipeId: string;
  }>();
  return (
    <RecipeProvider id={recipeId as string}>
      <Stack
        screenOptions={{
          headerTransparent: true,
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      />
    </RecipeProvider>
  );
}

export default RecipeDetail;

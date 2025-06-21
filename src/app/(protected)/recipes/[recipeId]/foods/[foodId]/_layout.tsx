import { FoodProvider } from "@/providers/food";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

function RecipeFoodLayout() {
  const { foodId } = useLocalSearchParams<{
    foodId: string;
  }>();
  return (
    <FoodProvider id={foodId}>
      <Stack
        screenOptions={{
          headerTransparent: true,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </FoodProvider>
  );
}

export default RecipeFoodLayout;

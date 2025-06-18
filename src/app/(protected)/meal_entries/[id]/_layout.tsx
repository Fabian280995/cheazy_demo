import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { MealEntryProvider } from "@/providers/meal-entry";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const MealEntryLayout = () => {
  const { id: mealEntryId } = useLocalSearchParams();

  return (
    <MealEntryProvider id={mealEntryId as string}>
      <Stack
        screenOptions={{
          headerBackground: () => <ScreenHeaderBackgroundGradient />,
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </MealEntryProvider>
  );
};

export default MealEntryLayout;

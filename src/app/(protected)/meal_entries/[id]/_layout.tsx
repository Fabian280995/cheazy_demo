import ScreenHeaderBackgroundGradient from "@/components/screens/ScreenHeaderBackgroundGradient";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const MealEntryLayout = () => {
  const { id: mealEntryId } = useLocalSearchParams();

  return (
    <Stack
      screenOptions={{
        headerBackground: () => <ScreenHeaderBackgroundGradient />,
        contentStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default MealEntryLayout;

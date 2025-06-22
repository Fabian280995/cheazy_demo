import { Stack } from "expo-router";
import React from "react";

function RecipesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        contentStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    />
  );
}

export default RecipesLayout;

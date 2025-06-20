import { Stack } from "expo-router";
import React from "react";

function RecipeFoodsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        contentStyle: { backgroundColor: "transparent" },
      }}
    />
  );
}

export default RecipeFoodsLayout;

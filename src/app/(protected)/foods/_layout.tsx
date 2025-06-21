import { Stack } from "expo-router";
import React from "react";

function FoodsLayout() {
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

export default FoodsLayout;

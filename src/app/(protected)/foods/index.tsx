import FoodSearch from "@/components/food/FoodSearch";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Foods = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = {
    title: "Mahlzeiten",
    largeTitle: false,
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          ...headerOptions,
          headerLeft: () => (
            <HeaderIconButton
              iconName="arrow-left"
              onPress={() => router.back()}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <FoodSearch />
    </View>
  );
};

export default Foods;

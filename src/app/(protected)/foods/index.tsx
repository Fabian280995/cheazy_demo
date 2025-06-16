import FoodSearch from "@/components/food/FoodSearch";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Foods = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "Lebensmittel",
    largeTitle: false,
  });

  const handleSelect = (id: string) => {
    router.push(`/foods/${id}`);
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
      <FoodSearch onSelect={handleSelect} />
    </View>
  );
};

export default Foods;

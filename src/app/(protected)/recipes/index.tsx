import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/providers/theme";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import HeaderIconButton from "@/components/screens/HeaderIconButton";

const Recipes = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { mealSlotId } = useLocalSearchParams<{
    mealSlotId?: string;
  }>();
  const headerOptions = useHeaderOptions({
    title: "Lebensmittel",
    largeTitle: false,
  });
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 42 }}>
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
    </SafeAreaView>
  );
};

export default Recipes;

import { View, Text, ScrollView } from "react-native";
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
    title: "Deine Rezepte",
    largeTitle: false,
  });
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
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
    </ScrollView>
  );
};

export default Recipes;

import PersonalGoalsHistory from "@/components/goals/PersonalGoalsHistory";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import NutritionGoalsForm from "@/forms/NutritionGoalsForm";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const NutritionGoals = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const headerOptions = useHeaderOptions({
    title: "Nutrition Goals",
    largeTitle: false,
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        padding: 16,
      }}
      keyboardDismissMode="on-drag"
    >
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

      <NutritionGoalsForm />
      <PersonalGoalsHistory />
    </ScrollView>
  );
};

export default NutritionGoals;

import HeaderIconButton from "@/components/screens/HeaderIconButton";
import NutritionGoalsForm from "@/forms/NutritionGoalsForm";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useActivePersonalGoal } from "@/providers/active-personal-goal";
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
  const { personalGoal } = useActivePersonalGoal();

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

      <NutritionGoalsForm
        initialData={
          personalGoal
            ? {
                id: personalGoal.id,
                kcal: personalGoal.kcal,
                proteins_g: personalGoal.proteins_g,
                carbs_g: personalGoal.carbs_g,
                fats_g: personalGoal.fats_g,
                started_at: personalGoal.started_at,
              }
            : undefined
        }
      />
    </ScrollView>
  );
};

export default NutritionGoals;

import DailyCaloriesCard from "@/components/overview/DailyCaloriesCard";
import DailyNutritionScoreCard from "@/components/overview/DailyNutritionScoreCard";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useActivePersonalGoal } from "@/providers/active-personal-goal";
import { useMealEntries } from "@/providers/meal-slot-entries";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const Home = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { dayTotals } = useMealEntries();
  const headerOptions = useHeaderOptions({
    title: "Übersicht",
    largeTitle: false,
  });
  const { personalGoal } = useActivePersonalGoal();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingTop: 32,
        paddingBottom: 96,
      }}
    >
      <Stack.Screen
        options={{
          ...headerOptions,
          headerRight: () => (
            <HeaderIconButton
              iconName="gear"
              onPress={() => router.push("/settings")}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <Animated.View
        layout={LinearTransition}
        style={{ flex: 1, gap: 16, paddingHorizontal: 12 }}
      >
        <DailyCaloriesCard
          consumedCals={dayTotals.calories}
          goalCals={personalGoal?.kcal}
        />
        <DailyNutritionScoreCard
          consumedMacros={{
            carbs: dayTotals.carbs,
            protein: dayTotals.protein,
            fat: dayTotals.fat,
          }}
          targetMacros={
            personalGoal
              ? {
                  carbs: personalGoal.carbs_g,
                  protein: personalGoal.proteins_g,
                  fat: personalGoal.fats_g,
                }
              : undefined
          }
        />
      </Animated.View>
    </ScrollView>
  );
};

export default Home;

import DailyCaloriesCard from "@/components/overview/DailyCaloriesCard";
import DailyNutritionScoreCard from "@/components/overview/DailyNutritionScoreCard";
import MonthOverview from "@/components/calendar/MonthOverview";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const Home = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "Übersicht",
    largeTitle: false,
  });
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: 96,
      }}
    >
      <Stack.Screen
        options={{
          ...headerOptions,
          headerRight: () => (
            <HeaderIconButton
              iconName="settings"
              onPress={() => router.push("/settings")}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <MonthOverview canOpen />
      <Animated.View
        layout={LinearTransition}
        style={{ flex: 1, gap: 16, paddingHorizontal: 12 }}
      >
        <DailyCaloriesCard />
        <DailyNutritionScoreCard />
      </Animated.View>
    </ScrollView>
  );
};

export default Home;

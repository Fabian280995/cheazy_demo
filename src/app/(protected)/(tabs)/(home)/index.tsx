import CalendarDatePickerCard from "@/components/calendar/CalendarDatePickerCard";
import DailyCaloriesCard from "@/components/overview/DailyCaloriesCard";
import DailyNutritionScoreCard from "@/components/overview/DailyNutritionScoreCard";
import MonthOverview from "@/components/overview/MonthOverview";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

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
      <View style={{ marginBottom: 32, marginTop: 32 }}>
        <MonthOverview />
      </View>
      <View style={{ flex: 1, gap: 16, paddingHorizontal: 12 }}>
        <DailyCaloriesCard />
        <DailyNutritionScoreCard />
      </View>
    </ScrollView>
  );
};

export default Home;

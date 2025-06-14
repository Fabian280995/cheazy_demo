import DailyCaloriesCard from "@/components/overview/DailyCaloriesCard";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

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
        padding: 16,
        paddingBottom: 64,
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
      <DailyCaloriesCard />
    </ScrollView>
  );
};

export default Home;

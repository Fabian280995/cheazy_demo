import MonthOverview from "@/components/calendar/MonthOverview";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import DiaryScreen from "@/screens/DiaryScreen";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const Diary = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "Tagebuch",
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
      <MonthOverview />
      <Animated.View
        layout={LinearTransition}
        style={{ flex: 1, gap: 16, paddingHorizontal: 12 }}
      >
        <DiaryScreen />
      </Animated.View>
    </ScrollView>
  );
};

export default Diary;

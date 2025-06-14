import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";

const NewMealEntry = () => {
  const headerOptions = useHeaderOptions({
    title: "Neue Mahlzeit",
    largeTitle: false,
  });
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{}}
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
      <Text>NewMealEntry</Text>
    </ScrollView>
  );
};

export default NewMealEntry;

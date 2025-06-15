import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useTheme } from "@/providers/theme";
import EntryTypeSelect from "@/components/meal-entries/EntryTypeSelect";
import { MealEntryType } from "@/types";

const MealEntries = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = {
    title: "Mahlzeiten",
    largeTitle: false,
  };
  const [selectedType, setSelectedType] = React.useState<MealEntryType>("food");

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
      }}
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
      <EntryTypeSelect selectedType={selectedType} onSelect={setSelectedType} />
    </ScrollView>
  );
};

export default MealEntries;

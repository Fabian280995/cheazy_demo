import FoodSearch from "@/components/food/FoodSearch";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Foods = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { mealSlotId } = useLocalSearchParams<{
    mealSlotId?: string;
  }>();
  const headerOptions = useHeaderOptions({
    title: "Lebensmittel",
    largeTitle: false,
  });

  const handleSelect = (id: string) => {
    if (mealSlotId) {
      router.push(`/foods/${id}?mealSlotId=${mealSlotId}`);
      return;
    }
    router.push(`/foods/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 42 }}>
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
      <FoodSearch onSelect={handleSelect} />
    </SafeAreaView>
  );
};

export default Foods;

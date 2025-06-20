import FoodSearch from "@/components/food/FoodSearch";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useRecipe } from "@/providers/recipe";
import { useTheme } from "@/providers/theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipeFoods = () => {
  const router = useRouter();
  const { recipe } = useRecipe();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: recipe.name,
    largeTitle: false,
  });

  const handleSelect = (id: string) => {
    router.push(`/recipes/${recipe.id}/foods/${id}`);
    return;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 42, backgroundColor: colors.background }}
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
      <FoodSearch onSelect={handleSelect} />
    </SafeAreaView>
  );
};

export default RecipeFoods;

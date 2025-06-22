import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import RecipesScreen from "@/screens/RecipesScreen";
import { Stack, useRouter } from "expo-router";
import React from "react";

const Recipes = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "Deine Rezepte",
    largeTitle: false,
  });
  return (
    <>
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

          headerRight: () => (
            <HeaderIconButton
              iconName="plus"
              text="Rezept"
              onPress={() => router.push("/recipes/new")}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <RecipesScreen />
    </>
  );
};

export default Recipes;

import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useTheme } from "@/providers/theme";
import RecipeDetailScreen from "@/screens/RecipeDetailScreen";
import { Stack, useRouter } from "expo-router";
import React from "react";

const RecipeDetail = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
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
        }}
      />
      <RecipeDetailScreen />
    </>
  );
};

export default RecipeDetail;

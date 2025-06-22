import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useCreateRecipe } from "@/hooks/recipes/useCreateRecipe";
import { useAuth } from "@/providers/auth";
import { useTheme } from "@/providers/theme";

const NewRecipe = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { mutateAsync: createRecipe } = useCreateRecipe();

  const handleCreateRecipe = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    await createRecipe({
      name: "New Recipe",
      description: "This is a new recipe",
      servings: 1,
      user_id: user.id,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <LoadingIndicator />
      </View>
    </>
  );
};

export default NewRecipe;

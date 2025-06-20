import RecipeDetails from "@/components/recipes/RecipeDetails";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useRecipeByIdQuery } from "@/hooks/recipes/useRecipeByIdQuery";
import { useTheme } from "@/providers/theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RecipeDetailScreen = () => {
  const { colors } = useTheme();
  const { id, mealEntryId } = useLocalSearchParams<{
    id: string;
    mealEntryId?: string;
    mealSlotId?: string;
  }>();
  const { data: recipe, isLoading } = useRecipeByIdQuery(id as string);
  return isLoading ? (
    <LoadingIndicator />
  ) : !recipe ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ color: colors.text }}>Rezept nicht gefunden.</Text>
    </View>
  ) : (
    <RecipeDetails
      recipe={recipe}
      isLoading={isLoading}
      onAddRecipe={() => {}}
      addLabel={mealEntryId ? "Eintrag aktualisieren" : "Rezept hinzufügen"}
    />
  );
};

export default RecipeDetailScreen;

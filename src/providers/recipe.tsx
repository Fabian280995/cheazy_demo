import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useRecipeByIdQuery } from "@/hooks/recipes/useRecipeByIdQuery";
import { Recipe } from "@/types";
import { useRouter } from "expo-router";
import { createContext, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./theme";

type RecipeContextType = {
  recipe: Recipe;
};

export const RecipeContext = createContext<RecipeContextType>(
  {} as RecipeContextType
);

interface RecipeProviderProps {
  id: string;
}

export const RecipeProvider: React.FC<
  React.PropsWithChildren<RecipeProviderProps>
> = ({ children, id }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const {
    data: recipe,
    isLoading,
    error,
    isError,
  } = useRecipeByIdQuery(id as string);

  if (isLoading) {
    <LoadingIndicator />;
  }

  if (isError || !recipe) {
    console.error("Error fetching recipe:", error);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Rezept nicht gefunden.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 16,
          }}
        >
          <Text style={{ color: colors.secondary }}>Zurück</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <RecipeContext.Provider value={{ recipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};

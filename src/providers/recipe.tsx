import EntryNotFoundScreen from "@/components/shared/EntryNotFoundScreen";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useRecipeByIdQuery } from "@/hooks/recipes/useRecipeByIdQuery";
import { Recipe } from "@/types";
import { createContext, useContext } from "react";

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
  const {
    data: recipe,
    isLoading,
    error,
    isError,
  } = useRecipeByIdQuery(id as string);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    console.error("Error fetching recipe:", error);
    return <EntryNotFoundScreen title="Rezept nicht gefunden." />;
  }

  if (!recipe) {
    return <LoadingIndicator />;
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

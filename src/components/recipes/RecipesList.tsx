import { Recipe } from "@/types";
import React from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import EntryNotFoundScreen from "../shared/EntryNotFoundScreen";
import { PressableListItem, SwipeableListItem } from "../shared/list/ListItem";
import { RecipeCard } from "./RecipeCard";
import { useDeleteRecipe } from "@/hooks/recipes/useDeleteRecipe";

interface Props {
  recipes: Recipe[];
  onSelect?: (recipe: Recipe) => void;
}

const RecipesList = ({ recipes, onSelect }: Props) => {
  const { mutateAsync: deleteRecipe } = useDeleteRecipe();
  const handleRecipeSelect = (recipe: Recipe) => {
    if (onSelect) {
      onSelect(recipe);
    }
  };

  const handleRecipeDelete = async (recipeId: string) => {
    await deleteRecipe(recipeId);
  };

  if (recipes.length === 0) {
    return <EntryNotFoundScreen title="Keine Rezepte gefunden." />;
  }
  return (
    <Animated.View layout={LinearTransition}>
      {recipes.map((recipe) => {
        return (
          <SwipeableListItem
            key={recipe.id}
            isFirst={recipe === recipes[0]}
            isLast={recipe === recipes[recipes.length - 1]}
            onPress={() => handleRecipeSelect(recipe)}
            onDelete={() => handleRecipeDelete(recipe.id)}
            style={{ flex: 1 }}
          >
            <RecipeCard item={recipe} portions={1} />
          </SwipeableListItem>
        );
      })}
    </Animated.View>
  );
};

export default RecipesList;

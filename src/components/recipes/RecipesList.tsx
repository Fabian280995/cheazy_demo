import { Recipe } from "@/types";
import React from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import EntryNotFoundScreen from "../shared/EntryNotFoundScreen";
import { PressableListItem } from "../shared/list/ListItem";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes: Recipe[];
  onSelect?: (recipe: Recipe) => void;
}

const RecipesList = ({ recipes, onSelect }: Props) => {
  const handleRecipeSelect = (recipe: Recipe) => {
    if (onSelect) {
      onSelect(recipe);
    }
  };

  if (recipes.length === 0) {
    return <EntryNotFoundScreen title="Keine Rezepte gefunden." />;
  }
  return (
    <Animated.View layout={LinearTransition}>
      {recipes.map((recipe) => {
        return (
          <PressableListItem
            key={recipe.id}
            isFirst={recipe === recipes[0]}
            isLast={recipe === recipes[recipes.length - 1]}
            onPress={() => handleRecipeSelect(recipe)}
            style={{ flex: 1 }}
          >
            <RecipeCard item={recipe} />
          </PressableListItem>
        );
      })}
    </Animated.View>
  );
};

export default RecipesList;

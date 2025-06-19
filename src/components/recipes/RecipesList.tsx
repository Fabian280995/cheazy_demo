import { useTheme } from "@/providers/theme";
import { Recipe } from "@/types";
import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import ListItem from "../shared/list/ListItem";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes: Recipe[];
  onSelect?: (recipe: Recipe) => void;
}

const RecipesList = ({ recipes, onSelect }: Props) => {
  const { colors } = useTheme();

  const handleRecipeSelect = (recipe: Recipe) => {
    if (onSelect) {
      onSelect(recipe);
    }
  };

  if (recipes.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text
          style={{ fontSize: 16, color: colors.textLight, textAlign: "center" }}
        >
          No recipes found.
        </Text>
      </View>
    );
  }
  return (
    <Animated.View layout={LinearTransition}>
      {recipes.map((recipe) => {
        return (
          <ListItem
            key={recipe.id}
            isFirst={recipe === recipes[0]}
            isLast={recipe === recipes[recipes.length - 1]}
          >
            <TouchableOpacity
              onPress={() => handleRecipeSelect(recipe)}
              style={{ flex: 1 }}
            >
              <RecipeCard item={recipe} />
            </TouchableOpacity>
          </ListItem>
        );
      })}
    </Animated.View>
  );
};

export default RecipesList;

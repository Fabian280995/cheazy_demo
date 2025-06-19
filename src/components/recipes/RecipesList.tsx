import { useTheme } from "@/providers/theme";
import { Recipe } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import ListItem from "../shared/list/ListItem";

interface Props {
  recipes: Recipe[];
  onSelect?: (recipe: Recipe) => void;
}

const RecipesList = ({ recipes }: Props) => {
  const { colors } = useTheme();
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
      {recipes.map((recipe) => (
        <ListItem key={recipe.id}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {recipe.name}
          </Text>
          <Text style={{ color: "gray", marginTop: 4 }}>
            {recipe.description}
          </Text>
        </ListItem>
      ))}
    </Animated.View>
  );
};

export default RecipesList;

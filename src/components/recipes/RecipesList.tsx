import { View, Text } from "react-native";
import React from "react";
import { Recipe } from "@/types";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useTheme } from "@/providers/theme";
import MealSlotEntryContainer from "../meal-slots/MealSlotEntryContainer";

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
        <MealSlotEntryContainer key={recipe.id}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {recipe.name}
          </Text>
          <Text style={{ color: "gray", marginTop: 4 }}>
            {recipe.description}
          </Text>
        </MealSlotEntryContainer>
      ))}
    </Animated.View>
  );
};

export default RecipesList;
